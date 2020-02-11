
export class windowmanager{
    static ZINDEX_WINDOW_MIN = 9;
    static ZINDEX_WINDOW_MAX = 5000;

    static window_hierarchy = [

    ];
    static maximized_windows = [

    ];

    static minimize_window(pid){

    }
    static maximize_window(pid) {
        let window = document.getElementById(`window-${pid}`);
        window.setAttribute("data-top", window.style.top);
        window.setAttribute("data-left", window.style.left);

        // Add window to fullscreen list
        windowmanager.maximized_windows.push(pid);
    }
    static refresh_maximized_windows(){
        for (let i=0; i < windowmanager.maximized_windows.length; i++){
            let window = document.getElementById(`window-${windowmanager.maximized_windows[i]}`);
            
            window.style.width = document.body.clientWidth.toString();
            window.style.height = document.body.clientHeight.toString();
        }
    }
    static restore_window(pid: string) {
        let window = document.getElementById(`window-${pid}`);
        let top = window.getAttribute("data-top");
        let left = window.getAttribute("data-left");

        window.style.top = (top === undefined ? 0 : top).toString();
        window.style.left = (left === undefined ? 0 : left).toString();

        // Remove window from fullscreen list
        let index = windowmanager.maximized_windows.indexOf(pid);
        do{
            windowmanager.maximized_windows.splice(index, 1);
            index = windowmanager.maximized_windows.indexOf(pid);
        }
        while(index !== -1);
    }

    static bring_front(pid: string){
        console.log("Brought to front");
    }

    static update_window_hierarchy() {
        /*
        for (i = 0; i < window_hierarchy.length; i++) {
            if ((i + ZINDEX_WINDOW_MIN) % 2 === 0) {
                console.log(i);
            }
        }*/
    }

    /* Privates */

/*
    return {
        minimize_window: minimize_window,
        maximize_window: maximize_window,
        restore_window: restore_window
    };*/
}

