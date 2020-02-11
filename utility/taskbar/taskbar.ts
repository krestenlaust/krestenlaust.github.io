import {windowmanager} from "../windowmanager";

class taskbar{

    static icon_click(element: HTMLElement){
        console.log(element);
        let pid: string = element.dataset.pid;

        windowmanager.bring_front(pid);
    }

    static update_process(){
        document.getElementById("taskbar-process")
    }

    static add_process(programname: string, pid: string){
        /*
        if (document.getElementsByClassName(`taskbar-icon-${programname}`).length !== 0){

        }*/
        document.getElementById("taskbar-process").innerHTML += `<div class="taskbar-icon taskbar-icon-${programname} taskbar-icon-${pid}" onclick="taskbar.icon_click(this);" data-pid="${pid}">
                <img class="taskbar-icon-image" src="resources/Windows-icons/${programname}.png">
            </div>`;
    }
}