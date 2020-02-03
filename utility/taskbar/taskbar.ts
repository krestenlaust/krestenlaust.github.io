let taskbar = function () {

    function icon_click(element){
        console.log(element);
        var pid = element.dataset.pid;

        taskmanager.bring_front(pid);
    }

    function update_process(){
        document.getElementById("taskbar-process")
    }

    function add_process(programname: string, pid: string){
        /*
        if (document.getElementsByClassName(`taskbar-icon-${programname}`).length !== 0){

        }*/
        document.getElementById("taskbar-process").innerHTML += `<div class="taskbar-icon taskbar-icon-${programname} taskbar-icon-${pid}" onclick="taskbar.icon_click(this);" data-pid="${pid}">
                <img class="taskbar-icon-image" src="resources/Windows-icons/${programname}.png">
            </div>`;
    }

    return{
        update_process: update_process,
        icon_click: icon_click,
        add_process: add_process
    }
}();