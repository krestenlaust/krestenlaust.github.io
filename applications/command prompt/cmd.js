
let cmd = function () { //_namespace

    let cmdline_last;

    let env = {
        "errorlevel": 0
    };

    function echo(s) {
        let status_code = 0;
        console.log("cmd: " + s);

        cmdline_last = document.getElementsByClassName("cmdline")[document.getElementsByClassName("cmdline").length - 1];

        cmdline_last.readOnly = true; //Makes it readonly
        cmdline_last.setAttribute("value",s);

        document.getElementById("cmd-text").appendChild(cmdline_last); //Moves element to div

        document.getElementById("cmd-box").innerHTML += cmd_last_line_element; //Adds new last line

        make_draggable(document.getElementById("cmd-box"), document.getElementById("cmd-top"));

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
        set: set

    };
}();