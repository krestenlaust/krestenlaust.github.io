
let cmd = function () { //_namespace

    let env = {
        "errorlevel": 0
    };

    let prompt_var = "%cd%>";
    //let prompt_cur = prompt_var.replace("%cd%", filesystem.cd);

    function get_prompt(){
        return prompt_var.replace("%cd%", filesystem.cd);
    }

    function exit(args, pid) {
        taskmanager.kill_application(pid);
    }

    function echo(s, pid) {
        let status_code = 0;

        var current_lines = document.getElementsByClassName("cmdline-"+pid);
        current_lines[current_lines.length-1].readOnly = true;

        var empty_lines = document.getElementsByClassName("cmdline-empty-"+pid);
        $(empty_lines[0]).clone().appendTo("#cmd-text-"+pid);
        empty_lines[0].value = s;
        empty_lines[0].readOnly = true;
        empty_lines[0].setAttribute("class", `cmdline cmdline-${pid} cmd`);

        $(empty_lines[0]).clone().appendTo("#cmd-text-"+pid);
        empty_lines[0].setAttribute("class", `cmdline cmdline-${pid} cmd`);

        $(empty_lines[0]).clone().appendTo("#cmd-text-"+pid);
        empty_lines[0].value = get_prompt();
        empty_lines[0].readOnly = false;
        empty_lines[0].setAttribute("class", `cmdline cmdline-${pid} cmd`);

        //make_draggable(document.getElementById("window-"+pid), document.getElementById("window-top-"+pid));

        //document.getElementById("cmd-text-"+pid).innerHTML += cmd_last_line_element.replace("00fff", pid);
        //document.getElementById("cmd-text-"+pid).innerHTML += cmd_last_line_element.replace("00fff", pid);
        env.errorlevel = status_code;
        return status_code;
    }
    
    function prompt(new_prompt) {
        prompt_var = new_prompt;
    }

    function md(dirname) {
        let status_code = 0;

        filesystem.make_directory(dirname);
        echo("");

        env.errorlevel = status_code;
        return status_code;
    }

    function cd(path) {

    }

    function dir(path = "%cd%") {
        let status_code = 0;

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
            echo(output[i]);
        }

        env.errorlevel = status_code;
        return status_code;
    }

    function exit(args = []) {
        let status_code = 0;

        env.errorlevel = status_code;
        return status_code;
    }

    function cls(args = []) {
        let status_code = 0;

        env.errorlevel = status_code;
        return status_code;
    }
    
    function set(args = []) {
        let status_code = 0;
        if (args.length === 0){
            var env_keys = Object.keys(env);
            var env_values = Object.values(env);
            for (var i in env_keys){
                echo(env_keys[i] + '=' + env_values[i]);
            }

        }else {

        }

        env.errorlevel = status_code;
        return status_code;
    }

    return { /* Globalization */
        env: env,

        echo: echo,
        exit: exit,
        cls: cls,
        set: set,
        prompt: prompt,
        md: md,
        dir: dir

    };
}();