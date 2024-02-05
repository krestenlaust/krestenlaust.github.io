import {WindowManager} from "../windowManager";

namespace Taskbar {
    class Taskbar {
        iconClick(element: HTMLElement) {
            console.log(element);
            let pid: string = element.dataset.pid;

            WindowManager.bringFront(pid);
        }

        updateProcess() {
            document.getElementById("taskbar-process")
        }

        addProcess(programname: string, pid: string) {
            /*
            if (document.getElementsByClassName(`taskbar-icon-${programname}`).length !== 0){

            }*/
            document.getElementById("taskbar-process").innerHTML += `<div class="taskbar-icon taskbar-icon-${programname} taskbar-icon-${pid}" onclick="Taskbar.iconClick(this);" data-pid="${pid}">
                <img class="taskbar-icon-image" src="resources/Windows-icons/${programname}.png">
            </div>`;
        }
    }
}
