export class WindowManager{
    static ZINDEX_WINDOW_MIN = 9;
    static ZINDEX_WINDOW_MAX = 5000;

    static windowHierarchy = [];
    static maximized_windows = [];

    static minimizeWindow(pid) {

    }

    static maximizeWindow(pid: string) {
        let window = document.getElementById(`window-${pid}`);
        window.setAttribute("data-top", window.style.top);
        window.setAttribute("data-left", window.style.left);

        // Add window to fullscreen list
        WindowManager.maximized_windows.push(pid);
    }

    static refreshMaximizedWindows() {
        for (let i = 0; i < WindowManager.maximized_windows.length; i++) {
            let window = document.getElementById(`window-${WindowManager.maximized_windows[i]}`);

            window.style.width = document.body.clientWidth.toString();
            window.style.height = document.body.clientHeight.toString();
        }
    }

    static restoreWindow(pid: string) {
        let window = document.getElementById(`window-${pid}`);
        let top = window.getAttribute("data-top");
        let left = window.getAttribute("data-left");

        window.style.top = (top === undefined ? 0 : top).toString();
        window.style.left = (left === undefined ? 0 : left).toString();

        // Remove window from fullscreen list
        let index = WindowManager.maximized_windows.indexOf(pid);
        do {
            WindowManager.maximized_windows.splice(index, 1);
            index = WindowManager.maximized_windows.indexOf(pid);
        }
        while (index !== -1);
    }

    static bringFront(pid: string) {
        console.log("Brought to front");
    }

    static update_window_hierarchy() {
        /*
        for (i = 0; i < windowHierarchy.length; i++) {
            if ((i + ZINDEX_WINDOW_MIN) % 2 === 0) {
                console.log(i);
            }
        }*/
    }
}
