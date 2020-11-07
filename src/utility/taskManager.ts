/*
import {saveload} from "./saveload-system";
import {filesystem} from "./filesystem";
export class taskmanager {
*/

let TaskManager = function (){
    /* Public variables */
    let runningApplications: string[] = [

    ];/*
    let windowHierarchy = [

    ];*/

    /* Public methods */

    function startApplication(appname: string) {
        // @ts-ignore
        $.get(`applications/${appname}/${appname}.html`, function (data) {
            let pid: string = generatePid();
            document.getElementById("applications").innerHTML += data.replace(/00fff/g, pid);

            if (!document.getElementById(`${appname}-css`)){
                document.getElementsByTagName("head")[0].innerHTML += `<link rel="stylesheet" type="text/css" id="${appname}-css" href="applications/${appname}/${appname}.css">`
            }

            let appref = document.getElementsByClassName(appname + "-window");
            let apptopref = document.getElementsByClassName(appname + "-window-top");
            appref[appref.length-1].setAttribute("id", "window-"+pid);
            appref[appref.length-1].setAttribute("data-pid", pid);
            apptopref[apptopref.length-1].setAttribute("id", "window-top-"+pid);
            // @ts-ignore
            make_draggable(document.getElementById("window-"+pid), document.getElementById("window-top-"+pid));
            runningApplications.push(pid);

            WindowManager.windowHierarchy.unshift(pid);
            // @ts-ignore
            Taskbar.addProcess(appname, pid);

            if (document.querySelector("script[src*='cmd.js']") === null){
                // @ts-ignore
                $.getScript('applications/'+appname+"/"+appname+".js");
            }

            let onload = interpretOnload(pid, document.getElementById("window-"+pid));
            if (onload !== null){
                eval(onload);
            }
        });
    }

    function killApplication(pid) {
        document.getElementById("window-"+pid).parentElement.removeChild(document.getElementById("window-"+pid));
        //runningApplications = runningApplications.filter(e => e !== pid);
        let pidIndex = runningApplications.indexOf(pid);
        if (pidIndex !== -1){
            runningApplications.splice(pidIndex, 1)
        }
    }
    
    /* Private methods */
    function generatePid() { /* 10*10*6*6*6 */
        let cur_pid: string;
        do {
            cur_pid = Math.floor(Math.random() * 10).toString() + Math.floor(Math.random() * 10).toString();
            cur_pid += String.fromCharCode(Math.floor(Math.random() * 7) + 97);
            cur_pid += String.fromCharCode(Math.floor(Math.random() * 7) + 97);
            cur_pid += String.fromCharCode(Math.floor(Math.random() * 7) + 97);
        }
        while (runningApplications.includes(cur_pid));

        return cur_pid;
    }

    function interpretOnload(pid: string, element: HTMLElement){
        let target_str = element.dataset.onload;
        let occurrences = (target_str.match(/\${/g) || []).length;
        let variables = [];
        let lastFound = 0;


        for (let i=0; i < occurrences; i++){
            let openBracket = target_str.indexOf("${", lastFound);
            if (1 - openBracket >= 0 && target_str.slice(openBracket-1,openBracket) === "\\"){
                continue;
            }
            let closingBracket = target_str.indexOf("}", openBracket);
            if (openBracket < closingBracket && 2 + openBracket < closingBracket){
                variables.push(target_str.slice(openBracket + 2, closingBracket));
                lastFound = closingBracket;
            }
        }

        for (let i=0; i<variables.length;i++){
            let variableValue = eval(variables[i]);
            target_str = target_str.replace("${" + variables[i] + "}", variableValue)
        }
        return target_str;
    }

    return {
        killApplication: killApplication,
        startApplication: startApplication
    }
}();
