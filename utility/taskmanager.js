let taskmanager = function (){

    /* Public variables */
    let running_applications = [

    ];

    /* Public methods */

    function start_application(appname) {
        jQuery.get('applications/'+appname+"/"+appname+".html", function (data) {
            var pid = generate_pid();
            document.getElementById("applications").innerHTML += data.replace(/00fff/g, pid);
            if (document.querySelector("script[src*='cmd.js']") === null){
                $.getScript('applications/'+appname+"/"+appname+".js");
            }
            if (!document.getElementById(appname+"-css")){
                document.getElementsByTagName("head")[0].innerHTML += `<link rel="stylesheet" type="text/css" id="${appname}-css" href="applications/${appname}/${appname}.css">`
            }

            var appref = document.getElementsByClassName(appname + "-window");
            var apptopref = document.getElementsByClassName(appname + "-window-top");
            appref[appref.length-1].setAttribute("id", "window-"+pid);
            appref[appref.length-1].setAttribute("data-pid", pid);
            apptopref[apptopref.length-1].setAttribute("id", "window-top-"+pid);
            //appref[appref.length-1].classList.add(pid + "-window");
            //apptopref[apptopref.length-1].classList.add(pid + "-window-top");
            make_draggable(document.getElementById("window-"+pid), document.getElementById("window-top-"+pid));
            running_applications.push(pid);

            var onload = document.getElementById("window-"+pid).dataset.onload;
            if (onload !== null){
                console.log(`Onload ${pid}: ${onload}("${pid}")`);
                eval(onload+"("+pid+")");
            }
        });
    }



    function interpret_onload(elmnt){
        var target_str = elmnt; //elmnt.dataset.onload;
        var occurences = (target_str.match(/\${/g) || []).length;
        let variables = [];
        var lastfound = 0;


        for (var i=0; i < occurences; i++){
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
        console.log(variables);

        for (var i=0; i< variables.length;i++){
            target_str = target_str.replace("${"+variables[i]+"}", eval(variables[i].slice(2, variables[i].length-1)));
        }
        return target_str;
    }

    function kill_application(pid) {
        document.getElementById("window-"+pid).parentElement.removeChild(document.getElementById("window-"+pid));
        running_applications = running_applications.filter(e => e !== pid);

        //$('link[rel=stylesheet][href*="mystyle"]').remove();
    }

    return {
        //running_applications: running_applications,

        start_application: start_application,
        kill_application: kill_application
    };

    
    /* Private methods */
    function generate_pid() { /* 10*10*6*6*6 */
        do {
            var cur_pid = Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10);
            cur_pid += String.fromCharCode(Math.floor(Math.random() * 7) + 97);
            cur_pid += String.fromCharCode(Math.floor(Math.random() * 7) + 97);
            cur_pid += String.fromCharCode(Math.floor(Math.random() * 7) + 97);
        }
        while (running_applications.includes(cur_pid)){
            cur_pid = Math.floor(Math.random() * 10).toString() + Math.floor(Math.random() * 10).toString();
            cur_pid += String.fromCharCode(Math.floor(Math.random() * 7) + 97);
            cur_pid += String.fromCharCode(Math.floor(Math.random() * 7) + 97);
            cur_pid += String.fromCharCode(Math.floor(Math.random() * 7) + 97);
        }

        return cur_pid;
    }
}();