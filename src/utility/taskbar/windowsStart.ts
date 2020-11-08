// start menu class
let WindowsStart = function () {
    let isOpen = false;

    function setup() {
        document.getElementById("windows-startbutton").addEventListener("click", startClick);
    }
    
    function refreshMenuState() {
        let elem = document.getElementsByClassName("startmenu")[0];
        if (isOpen){
            elem.setAttribute("data-expanded", "1");
        }else{
            elem.setAttribute("data-expanded", "");
        }
    }

    function startClick() {
        isOpen = !isOpen;
        refreshMenuState();
    }

    return{
        setup: setup,
        isOpen: isOpen,
        refresh_menu_state: refreshMenuState
    }
}();