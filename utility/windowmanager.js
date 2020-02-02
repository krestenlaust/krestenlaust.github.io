let windowmanager = function () {

    const zindex_window_min = 9, zindex_window_max = 5000;
    const window_hierarchy = [

    ];
    const maximized_windows = [

    ];

    function minimize_window(pid){

    }    
    function maximize_window(pid) {
        let window = document.getElementById(`window-${pid}`);
        window.setAttribute("data-top", window.style.top);
        window.setAttribute("data-left", window.style.left);

        // Add window to fullscreen list
        maximized_windows.push(pid);
    }
    function refresh_maximized_windows(){
        for (let i=0;i<maximized_windows.length; i++){
            let window = document.getElementById(`window-${maximized_windows[i]}`);
            
            window.style.width = document.body.clientWidth;
            window.style.height = document.body.clientHeight;
        }
    }
    function restore_window(pid) {
        let window = document.getElementById(`window-${pid}`);
        let top = window.getAttribute("data-top");
        let left = window.getAttribute("data-left");

        window.style.top = top === undefined ? 0 : top;
        window.style.left = left === undefined ? 0 : left;

        // Remove window from fullscreen list
        let index = maximized_windows.indexOf(pid);
        do{
            maximized_windows.splice(index, 1);
            index = maximized_windows.indexOf(pid);
        }
        while(index !== -1);
    }

    function bring_front(pid){
        console.log("Brought to front");
    }

    function update_window_hierarchy() {
        /*
        for (i = 0; i < window_hierarchy.length; i++) {
            if ((i + zindex_window_min) % 2 === 0) {
                console.log(i);
            }
        }*/
    }

    /* Privates */


    return {
        minimize_window: minimize_window,
        maximize_window: maximize_window,
        restore_window: restore_window
    };
}();