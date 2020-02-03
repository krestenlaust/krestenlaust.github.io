let taskmanager = function (){

    /* Public variables */
    const running_applications: string[] = [

    ];
    const window_hierarchy = [

    ];

    /* Public methods */

    function start_application(appname: string) {
        // @ts-ignore
        $.get(`applications/${appname}/${appname}.html`, function (data) {
            let pid: string = generate_pid();
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
            running_applications.push(pid);
            window_hierarchy.unshift(pid);
            // @ts-ignore
            taskbar.add_process(appname, pid);

            if (document.querySelector("script[src*='cmd.js']") === null){
                // @ts-ignore
                $.getScript('applications/'+appname+"/"+appname+".js");
            }

            let onload = interpret_onload(pid, document.getElementById("window-"+pid));
            if (onload !== null){
                eval(onload);
            }
        });
    }

    function kill_application(pid) {
        document.getElementById("window-"+pid).parentElement.removeChild(document.getElementById("window-"+pid));
        //running_applications = running_applications.filter(e => e !== pid);
        let pidIndex = running_applications.indexOf(pid);
        if (pidIndex !== -1){
            running_applications.splice(pidIndex, 1)
        }

        //$('link[rel=stylesheet][href*="mystyle"]').remove();
    }
    
    function get_running_programs() {
        return running_applications;
    }

    return {
        //running_applications: running_applications,
        start_application: start_application,
        kill_application: kill_application,
        get_running_programs: get_running_programs
    };

    
    /* Private methods */
    function generate_pid() { /* 10*10*6*6*6 */
        let cur_pid: string;
        do {
            cur_pid = Math.floor(Math.random() * 10).toString() + Math.floor(Math.random() * 10).toString();
            cur_pid += String.fromCharCode(Math.floor(Math.random() * 7) + 97);
            cur_pid += String.fromCharCode(Math.floor(Math.random() * 7) + 97);
            cur_pid += String.fromCharCode(Math.floor(Math.random() * 7) + 97);
        }
        while (running_applications.includes(cur_pid));

        return cur_pid;
    }

    function interpret_onload(pid: string, element: HTMLElement){
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

        for (var i=0; i<variables.length;i++){
            var variablevalue = eval(variables[i]);
            target_str = target_str.replace("${" + variables[i] + "}", variablevalue)
        }
        return target_str;
    }

}();