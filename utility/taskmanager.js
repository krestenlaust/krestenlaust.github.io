let taskmanager = function (){

    /* Public variables */
    const running_applications = [

    ];
    const window_hierarchy = [

    ];

    /* Public methods */

    function start_application(appname) {
        $.get('applications/'+appname+"/"+appname+".html", function (data) {
            var pid = generate_pid();
            document.getElementById("applications").innerHTML += data.replace(/00fff/g, pid);

            if (!document.getElementById(appname+"-css")){
                document.getElementsByTagName("head")[0].innerHTML += `<link rel="stylesheet" type="text/css" id="${appname}-css" href="applications/${appname}/${appname}.css">`
            }

            var appref = document.getElementsByClassName(appname + "-window");
            var apptopref = document.getElementsByClassName(appname + "-window-top");
            appref[appref.length-1].setAttribute("id", "window-"+pid);
            appref[appref.length-1].setAttribute("data-pid", pid);
            apptopref[apptopref.length-1].setAttribute("id", "window-top-"+pid);
            make_draggable(document.getElementById("window-"+pid), document.getElementById("window-top-"+pid));
            running_applications.push(pid);
            window_hierarchy.unshift(pid);
            taskbar.add_process(appname, pid);

            if (document.querySelector("script[src*='cmd.js']") === null){
                $.getScript('applications/'+appname+"/"+appname+".js");
            }

            var onload = interpret_onload(pid, document.getElementById("window-"+pid));
            if (onload !== null){
                eval(onload);
            }
        });
    }

    function kill_application(pid) {
        document.getElementById("window-"+pid).parentElement.removeChild(document.getElementById("window-"+pid));
        //running_applications = running_applications.filter(e => e !== pid);
        pidIndex = running_applications.indexOf(pid);
        if (pidIndex !== -1){
            running_applications.pop(pidIndex)
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
        do {
            var cur_pid = Math.floor(Math.random() * 10).toString() + Math.floor(Math.random() * 10).toString();
            cur_pid += String.fromCharCode(Math.floor(Math.random() * 7) + 97);
            cur_pid += String.fromCharCode(Math.floor(Math.random() * 7) + 97);
            cur_pid += String.fromCharCode(Math.floor(Math.random() * 7) + 97);
        }
        while (running_applications.includes(cur_pid));

        return cur_pid;
    }

    function interpret_onload(PID, element){
        var target_str = element.dataset.onload;
        var occurrences = (target_str.match(/\${/g) || []).length;
        let variables = [];
        var lastfound = 0;


        for (var i=0; i < occurrences; i++){
            var openbracket = target_str.indexOf("${", lastfound);
            if (1 - openbracket >= 0 && target_str.slice(openbracket-1,openbracket) === "\\"){
                continue;
            }
            var closingbracket = target_str.indexOf("}", openbracket);
            if (openbracket < closingbracket && 2 + openbracket < closingbracket){
                variables.push(target_str.slice(openbracket + 2, closingbracket));
                lastfound = closingbracket;
            }
        }

        for (var i=0; i<variables.length;i++){
            var variablevalue = eval(variables[i]);
            target_str = target_str.replace("${" + variables[i] + "}", variablevalue)
        }
        return target_str;
    }

}();