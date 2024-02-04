namespace Taskbar {
    /* Windows Peek -
    * In windows, when you hover your cursor
    * above the tiny vertical tab next to the
    * notification center, all windows become
    * transparent. At least that's how it used to be.
    * */
    export class WindowsPeak {
        static mouseHoverTimeout: number = 0;
        //let peek_clicked = false;

        /**
         * @type {{peek_opacity}}
         * @description Note, to also change animation, change keyframe called "peek_opacity" in index.css.
         */
        peekOpacity = "0.1";


        static peekOn() {
            let windows = <HTMLCollectionOf<HTMLDivElement>>document.getElementsByClassName("window");

            for (let i = 0; i < windows.length; i++) {
                windows[i].style.animation = "peek_opacity 0.3s";
                windows[i].style.opacity = "0.1";
            }
        }

        static peekOff() {
            let windows = <HTMLCollectionOf<HTMLDivElement>>document.getElementsByClassName("window");

            for (let i = 0; i < windows.length; i++) {
                windows[i].style.animation = "";
                windows[i].style.opacity = "";
            }
        }

        private static peekClick() {
            console.log("Peek clicked");
        }

        static setup() {
            document.getElementById("windows-peek").addEventListener("mouseenter", function (e) {
                WindowsPeak.mouseHoverTimeout = setTimeout(function () {
                    WindowsPeak.peekOn();
                }, 500)
            }, false);
            document.getElementById("windows-peek").addEventListener("mouseleave", function (e) {
                //mouse_hovering = false;
                clearTimeout(WindowsPeak.mouseHoverTimeout);
                WindowsPeak.peekOff();
            }, false);
            document.getElementById("windows-peek").addEventListener("click", WindowsPeak.peekClick);
        }
    }
}
