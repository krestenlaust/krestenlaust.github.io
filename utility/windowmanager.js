let windowmanager = function () {

    const zindex_window_min = 9, zindex_window_max = 5000;
    const window_hierarchy = [

    ];

    function minimize_window(pid){

    }
    
    function maximize_window(pid) {
        
    }
    
    function restore_window(pid) {

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