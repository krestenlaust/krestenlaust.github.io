// start menu class
let WindowsStart = function () {
    let isOpen = false;
    function refreshMenuState() {
        let elem = document.getElementsByClassName("startmenu")[0];
        if (isOpen) {
            elem.setAttribute("data-expanded", "1");
        }
        else {
            elem.setAttribute("data-expanded", "");
        }
    }
    function startClick() {
        isOpen = !isOpen;
        refreshMenuState();
    }
    function __init__() {
        document.getElementById("windows-startbutton").addEventListener("click", startClick);
    }
    return {
        __init__: __init__,
        isOpen: isOpen,
        refresh_menu_state: refreshMenuState
    };
}();
//# sourceMappingURL=windowsStart.js.map