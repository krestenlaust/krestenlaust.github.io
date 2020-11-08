
/* Windows Peek -
* In windows, when you hover your cursor
* above the tiny vertical tab next to the
* notification center, all windows become
* transparent. At least that's how it used to be.
* */
let WindowsPeek = function(){
    let mouseHoverTimeout;
    //let peek_clicked = false;

    /**
     * @type {{peek_opacity}}
     * @description Note, to also change animation, change keyframe called "peek_opacity" in index.css.
     */
    let peekOpacity = "0.1";


    function peekOn(){
        let windows = <HTMLCollectionOf<HTMLDivElement>>document.getElementsByClassName("window");

        for (let i=0; i < windows.length; i++){
            windows[i].style.animation = "peek_opacity 0.3s";
            windows[i].style.opacity = "0.1";
        }
    }
    function peekOff(){
        let windows = <HTMLCollectionOf<HTMLDivElement>>document.getElementsByClassName("window");

        for (let i=0; i < windows.length; i++){
            windows[i].style.animation = "";
            windows[i].style.opacity = "";
        }
    }
    function peekClick(){
        console.log("Peek clicked");
    }

    function setup(){
        document.getElementById("windows-peek").addEventListener("mouseenter", function(e){
            mouseHoverTimeout = setTimeout(function () {
                peekOn();
            }, 500)
        }, false);
        document.getElementById("windows-peek").addEventListener("mouseleave", function(e){
            //mouse_hovering = false;
            clearTimeout(mouseHoverTimeout);
            peekOff();
        }, false);
        document.getElementById("windows-peek").addEventListener("click", peekClick);
    }

    return {
        setup: setup,
        peekOpacity: peekOpacity
    }
}();