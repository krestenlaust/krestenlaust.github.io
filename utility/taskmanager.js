var taskmanager = function () {
    /* Public variables */
    var running_applications = [];
    var window_hierarchy = [];
    /* Public methods */
    function start_application(appname) {
        // @ts-ignore
        $.get("applications/" + appname + "/" + appname + ".html", function (data) {
            var pid = generate_pid();
            document.getElementById("applications").innerHTML += data.replace(/00fff/g, pid);
            if (!document.getElementById(appname + "-css")) {
                document.getElementsByTagName("head")[0].innerHTML += "<link rel=\"stylesheet\" type=\"text/css\" id=\"" + appname + "-css\" href=\"applications/" + appname + "/" + appname + ".css\">";
            }
            var appref = document.getElementsByClassName(appname + "-window");
            var apptopref = document.getElementsByClassName(appname + "-window-top");
            appref[appref.length - 1].setAttribute("id", "window-" + pid);
            appref[appref.length - 1].setAttribute("data-pid", pid);
            apptopref[apptopref.length - 1].setAttribute("id", "window-top-" + pid);
            // @ts-ignore
            make_draggable(document.getElementById("window-" + pid), document.getElementById("window-top-" + pid));
            running_applications.push(pid);
            window_hierarchy.unshift(pid);
            // @ts-ignore
            taskbar.add_process(appname, pid);
            if (document.querySelector("script[src*='cmd.js']") === null) {
                // @ts-ignore
                $.getScript('applications/' + appname + "/" + appname + ".js");
            }
            var onload = interpret_onload(pid, document.getElementById("window-" + pid));
            if (onload !== null) {
                eval(onload);
            }
        });
    }
    function kill_application(pid) {
        document.getElementById("window-" + pid).parentElement.removeChild(document.getElementById("window-" + pid));
        //running_applications = running_applications.filter(e => e !== pid);
        var pidIndex = running_applications.indexOf(pid);
        if (pidIndex !== -1) {
            running_applications.splice(pidIndex, 1);
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
    function generate_pid() {
        var cur_pid;
        do {
            cur_pid = Math.floor(Math.random() * 10).toString() + Math.floor(Math.random() * 10).toString();
            cur_pid += String.fromCharCode(Math.floor(Math.random() * 7) + 97);
            cur_pid += String.fromCharCode(Math.floor(Math.random() * 7) + 97);
            cur_pid += String.fromCharCode(Math.floor(Math.random() * 7) + 97);
        } while (running_applications.includes(cur_pid));
        return cur_pid;
    }
    function interpret_onload(pid, element) {
        var target_str = element.dataset.onload;
        var occurrences = (target_str.match(/\${/g) || []).length;
        var variables = [];
        var lastFound = 0;
        for (var i_1 = 0; i_1 < occurrences; i_1++) {
            var openBracket = target_str.indexOf("${", lastFound);
            if (1 - openBracket >= 0 && target_str.slice(openBracket - 1, openBracket) === "\\") {
                continue;
            }
            var closingBracket = target_str.indexOf("}", openBracket);
            if (openBracket < closingBracket && 2 + openBracket < closingBracket) {
                variables.push(target_str.slice(openBracket + 2, closingBracket));
                lastFound = closingBracket;
            }
        }
        for (var i = 0; i < variables.length; i++) {
            var variablevalue = eval(variables[i]);
            target_str = target_str.replace("${" + variables[i] + "}", variablevalue);
        }
        return target_str;
    }
}();
