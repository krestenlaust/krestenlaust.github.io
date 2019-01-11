
let cmd = function () { //_namespace

    let env = {
        "errorlevel": 0
    };

    let prompt_var = "%cd%>";
    //let prompt_cur = prompt_var.replace("%cd%", filesystem.cd);

    function get_prompt(){
        return prompt_var.replace("%cd%", filesystem.cd);
    }

    function exit(pid, args = []) {
        taskmanager.kill_application(pid);
    }

    function echo(pid, args) {
        let status_code = 0;

        var current_lines = document.getElementsByClassName("cmdline-"+pid);
        current_lines[current_lines.length-1].readOnly = true;

        var empty_lines = document.getElementsByClassName("cmdline-empty-"+pid);
        $(empty_lines[0]).clone().appendTo("#cmd-text-"+pid);
        empty_lines[0].value = args[0];
        empty_lines[0].readOnly = true;
        empty_lines[0].setAttribute("class", `cmdline cmdline-${pid} cmd`);

        $(empty_lines[0]).clone().appendTo("#cmd-text-"+pid);
        empty_lines[0].setAttribute("class", `cmdline cmdline-${pid} cmd`);

        $(empty_lines[0]).clone().appendTo("#cmd-text-"+pid);
        empty_lines[0].value = get_prompt();
        empty_lines[0].readOnly = false;
        empty_lines[0].setAttribute("class", `cmdline cmdline-${pid} cmd`);

        env.errorlevel = status_code;
        return status_code;
    }
    
    function prompt(pid, new_prompt) {
        prompt_var = new_prompt;
    }

    function md(pid, args = []) {
        let status_code = 0;
        if (args.length >= 1){
            filesystem.make_directory(args[0]);
            echo(pid, [""]);
        } else {
            status_code = 1;
        }

        env.errorlevel = status_code;
        return status_code;
    }

    function cd(pid, path) {

    }

    function dir(pid, args = []) {
        let status_code = 0;
        var path = "%cd%";
        switch (args.length) {
            case 1:
                path = args[0];
                break;
        }

        var cur_dir = filesystem.get_directory(path);
        var output = [];
        output[0] = "";
        output[1] = " Directory of " + filesystem.cd;
        output[2] = "";
        var cur_line = 3;

        delete cur_dir["@property"];

        for (var item in cur_dir) {
            output[cur_line] = "";
            if (cur_dir[item]["@property"]["directory"] === true){
                output[cur_line] += "   <DIR>   "
            }else {
                output[cur_line] += "           "
            }
            output[cur_line] += item;
            cur_line++;
        }
        for (var i=0;i<output.length;i++){
            echo(pid, [output[i]]);
        }

        env.errorlevel = status_code;
        return status_code;
    }

    function cls(pid, args = []) {
        let status_code = 0;
        //26
        var cmdbox = document.getElementById("cmd-text-"+pid);

        var children = cmdbox.children;
        var amount = children.length;
        for (var child in children){
            cmdbox.removeChild(children[child]);
            amount--;
            if (amount <= 26) {
                break;
            }
        }

        var notempty = document.getElementsByClassName("cmdline-"+pid);
        for (var i=0; i<notempty.length;i++){
            notempty[0].value = "";
            notempty[0].readOnly = true;
            notempty[0].setAttribute("class", `cmdline cmdline-empty-${pid} cmd`);
        }

        children = document.getElementById("cmd-text-"+pid).children;
        children[0].setAttribute("class", `cmdline cmdline-${pid} cmd`);
        children[0].value = "";
        children[0].readOnly = true;

        $(document.getElementsByClassName("cmdline-empty-"+pid)[0]).clone().appendTo("#cmd-text-"+pid);

        children[1].setAttribute("class", `cmdline cmdline-${pid} cmd`);
        children[1].value = get_prompt();
        children[1].readOnly = false;

        $(document.getElementsByClassName("cmdline-empty-"+pid)[0]).clone().appendTo("#cmd-text-"+pid);

        env.errorlevel = status_code;
        return status_code;
    }
    
    function set(pid, args = []) {
        let status_code = 0;
        console.log("Args: "+args);
        if (args.length === 0){
            var env_keys = Object.keys(env);
            var env_values = Object.values(env);
            for (var i in env_keys){
                echo(pid, [env_keys[i] + '=' + env_values[i]]);
            }

        }else {

        }

        env.errorlevel = status_code;
        return status_code;
    }

    function help(pid, args = []){

    }

    return { /* Globalization */
        env: env,

        echo: echo,
        exit: exit,
        cls: cls,
        set: set,
        prompt: prompt,
        md: md,
        dir: dir,
        help: help
    };
}();

function focus_cmd(e) {
    //console.log(e);
    var pid = e.srcElement.parentNode.parentNode.dataset.pid;
    if (pid !== undefined){
        var cmdlines = document.getElementsByClassName("cmdline-"+pid);
        cmdlines[cmdlines.length-1].focus();

        //[document.getElementsByClassName("cmdline-"+pid).length-1].focus();
    }
}


let cmd_log = [];
let cmd_log_index = 0;

document.getElementsByTagName("body")[0].onkeydown = function(e) {
    if (document.activeElement.classList.contains("cmd")){
        if (e.key === "Enter"){ // && document.activeElement.classList.contains("cmd")
            cmd_prompt_enter(e);
            cmd_log_index = 0;
        }
        else if(e.key === "ArrowUp"){
            console.log(cmd_log[cmd_log_index]);
            if (cmd_log_index < cmd_log.length-1){
                cmd_log_index++;
            }else {
                cmd_log_index = 0;
            }
        }else if(e.key === "ArrowDown"){
            console.log(cmd_log[cmd_log_index]);
            if (cmd_log_index-1 >= 0){

            } else {

            }
        }
    }
};

function cmd_prompt_enter(e){
    var pid = e.srcElement.offsetParent.dataset.pid;
    var cmdlines = document.getElementsByClassName("cmdline-"+pid);
    let lastline_value = cmdlines[cmdlines.length -1].value;
    //cmd.echo(lastline_value, pid);
    cmd_command(lastline_value, pid);

    cmdlines[cmdlines.length-1].focus();
}

function cmd_command(s, pid){
    s = s.replace(s.slice(0, s.indexOf(">") + 1), "");

    //cmd_log.push(s);
    cmd_log.unshift(s);

    //let args = s.split(">")[s.split(">").length - 1].split(" "); //Command arguments
    let args = s.split(" ");

    let args_only = s.substring(s.indexOf(' ') + 1); //Command arguments excluding first argument

    let _count = (s.match(/ /g) || []).length;
    if (_count === 0 || _count === args_only.length){ //Prevents arguments like "" or ones that's just multiple spaces in being sent
        args_only = [];
    }else {
        args_only = args_only.split(" ");
    }

    switch (args[0].toLowerCase()) {
        case "":

            break;
        case "cookies":
            if (args.length >= 2){

            }else {
                cmd.echo(pid, command_output["cookies"]);
            }
            break;
        default:
            if (typeof cmd[args[0].toLowerCase()] === "function"){
                cmd[args[0]](pid, args_only);
            }else {
                cmd.echo(pid, ["'" + args[0] + "' is not recognized as an internal or external command,\n" +
                "operable program or batch file."]);
                cmd.env.errorlevel = 9009;
            }
    }
}