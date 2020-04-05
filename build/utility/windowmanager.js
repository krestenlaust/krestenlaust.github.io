//export class windowmanager{
let windowmanager = function () {
    const ZINDEX_WINDOW_MIN = 9;
    const ZINDEX_WINDOW_MAX = 5000;
    let window_hierarchy = [];
    let maximized_windows = [];
    function minimize_window(pid) {
    }
    function maximize_window(pid) {
        let window = document.getElementById(`window-${pid}`);
        window.setAttribute("data-top", window.style.top);
        window.setAttribute("data-left", window.style.left);
        // Add window to fullscreen list
        maximized_windows.push(pid);
    }
    function refresh_maximized_windows() {
        for (let i = 0; i < maximized_windows.length; i++) {
            let window = document.getElementById(`window-${maximized_windows[i]}`);
            window.style.width = document.body.clientWidth.toString();
            window.style.height = document.body.clientHeight.toString();
        }
    }
    function restore_window(pid) {
        let window = document.getElementById(`window-${pid}`);
        let top = window.getAttribute("data-top");
        let left = window.getAttribute("data-left");
        window.style.top = (top === undefined ? 0 : top).toString();
        window.style.left = (left === undefined ? 0 : left).toString();
        // Remove window from fullscreen list
        let index = maximized_windows.indexOf(pid);
        do {
            maximized_windows.splice(index, 1);
            index = maximized_windows.indexOf(pid);
        } while (index !== -1);
    }
    function bring_front(pid) {
        console.log("Brought to front");
    }
    function update_window_hierarchy() {
        /*
        for (i = 0; i < window_hierarchy.length; i++) {
            if ((i + ZINDEX_WINDOW_MIN) % 2 === 0) {
                console.log(i);
            }
        }*/
    }
    /* Privates */
    return {
        minimize_window: minimize_window,
        maximize_window: maximize_window,
        restore_window: restore_window,
        bring_front: bring_front
    };
}();
//# sourceMappingURL=windowmanager.js.map