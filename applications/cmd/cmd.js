//import {filesystem} from "../../utility/filesystem";

let cmd = function () { //_namespace

    let promptVar = "%cd%>";

    /* Private */
    function setErrorlevel(pid, errorcode){
        Native.set(pid, "errorlevel", errorcode);
    }

    /* Public */
    function changeDirectory(pid, path) {
        let statusCode;
        if (Filesystem.validate_directory(path)){
            Native.set(pid, "working_directory", path);
            statusCode = 0;
        }else{
            statusCode = 1;
        }

        setErrorlevel(pid, statusCode);
        return statusCode;
    }

    function getPrompt(pid){
        return promptVar.replace("%cd%", Native.get(pid, "working_directory"));
    }

    function exit(pid, args = []) {
        TaskManager.killApplication(pid);
    }

    /* Maybe look into implementing some
    * sort of stdout and some sort of spool
    * to update the command-line window
    */
    function echo(pid, args = []) {
        let statusCode = 0;
        let isEchoEnabled = true;

        if (args.length >= 2)
            isEchoEnabled = args[1];

        let currentLines = document.getElementsByClassName("cmdline-"+pid);
        currentLines[currentLines.length-1].readOnly = true;

        let emptyLines = document.getElementsByClassName("cmdline-empty-"+pid);
        $(emptyLines[0]).clone().appendTo("#cmd-text-"+pid);
        emptyLines[0].value = args[0];
        emptyLines[0].readOnly = true;
        emptyLines[0].setAttribute("class", `cmdline cmdline-${pid} cmd`);

        if (isEchoEnabled){
            $(emptyLines[0]).clone().appendTo("#cmd-text-"+pid);
            emptyLines[0].value = getPrompt();
            emptyLines[0].readOnly = false;
            emptyLines[0].setAttribute("class", `cmdline cmdline-${pid} cmd`);
        }

        setErrorlevel(pid, statusCode);
        return statusCode;
    }
    
    function prompt(pid, args = []) {
        if (args.length === 0 || typeof args[0] !== "string")
            return;

        promptVar = args[0];
    }

    /* Not to be confused with Filesystem.makeDirectory,
    * this is the cmd interface to the Filesystem command */
    function makeDirectory(pid, args = []) {
        let statusCode = 0;
        console.log(args);
        if (args.length >= 1){
            console.log(Filesystem.makeDirectory(args[0], Native.get(pid, "working_directory")));
            echo(pid, [""]);
        } else {
            statusCode = 1;
        }

        //local_env.errorlevel = statusCode;
        setErrorlevel(pid, statusCode);
        return statusCode;
    }

    function cd(pid, args = []) {
        let statusCode = 0;

        if (args.length === 0){
            echo(pid, [Native.get(pid, "working_directory")]);
        }else{
            let targetPath;
            if (args[0] === ".."){
                targetPath = Native.get(pid, "working_directory").split("\\");
                if (targetPath.length !== 1)
                    targetPath.pop();

                targetPath = targetPath.join("\\");
            }else{
                targetPath = args[0];
            }
            if (changeDirectory(pid, targetPath)){
                echo(pid, ['']);
            }else{
                echo(pid, ['Cannot find the path specified.']);
                statusCode = 1;
            }

        }

        setErrorlevel(pid, statusCode);
        return statusCode;
    }

    /* dir - Lists directory */
    function listDirectory(pid, args = []) {
        let statusCode = 0;

        let path = args.length === 0 ? Native.get(pid, "working_directory") : args[0];
        let currentDirectory = Filesystem.getDirectory(path);
        console.log(currentDirectory);

        let output = [
            "",
            " Directory of " + path,
            ""
        ];

        let currentLine = 3;

        delete currentDirectory["@property"];

        for (let item in currentDirectory) {
            if (!currentDirectory.hasOwnProperty(item))
                continue;

            output[currentLine] = "";
            let property = currentDirectory[item]["@property"];

            if (property === undefined)
                continue;

            output[currentLine] += property.directory ? "   <DIR>   " : "           ";
            output[currentLine] += item;
            currentLine++;
        }

        for (let i = 0; i<output.length; i++){
            echo(pid, [output[i], false]);
        }

        echo(pid, ['', true]);

        setErrorlevel(pid, statusCode);
        return statusCode;
    }

    function cls(pid, args = []) {
        let statusCode = 0;
        let cmdBox = document.getElementById("cmd-text-"+pid);

        let children = cmdBox.children;
        let amount = children.length;
        for (let child in children){
            cmdBox.removeChild(children[child]);
            amount--;
            if (amount <= 26) {
                break;
            }
        }

        let notEmpty = document.getElementsByClassName("cmdline-"+pid);
        for (let i = 0; i < notEmpty.length; i++){
            notEmpty[0].value = "";
            notEmpty[0].readOnly = true;
            notEmpty[0].setAttribute("class", `cmdline cmdline-empty-${pid} cmd`);
        }

        children = document.getElementById("cmd-text-"+pid).children;
        children[0].setAttribute("class", `cmdline cmdline-${pid} cmd`);
        children[0].value = "";
        children[0].readOnly = true;

        $(document.getElementsByClassName("cmdline-empty-" + pid)[0]).clone().appendTo("#cmd-text-"+pid);

        children[1].setAttribute("class", `cmdline cmdline-${pid} cmd`);
        children[1].value = getPrompt();
        children[1].readOnly = false;

        $(document.getElementsByClassName("cmdline-empty-" + pid)[0]).clone().appendTo("#cmd-text-"+pid);

        setErrorlevel(pid, statusCode);
        return statusCode;
    }

    /* writes a file's contents to standard out */
    function type(pid, args = []) {
        if (args.length === 0){
            echo(pid, ["The syntax of the command is incorrect."]);
            setErrorlevel(pid, 1);
            return 1;
        }

        let path = args[0];
        if (!Filesystem.isPathAbsolute(path))
            path = Native.get(pid, "working_directory") + "\\" + path;

        // Echo file contents
        let fileContents = Filesystem.readFile(path);
        if (fileContents === -1) {
            echo(pid, ["File not found."]);

            setErrorlevel(pid, 1);
            return 1;
        }
        echo(pid, [fileContents]);

        setErrorlevel(pid, 0);
        return 0;
    }
    
    function set(pid, args = []) {
        let statusCode = 0;
        console.log("Args: "+args);

        if (args.length === 0){
            let env_keys = Object.keys(local_env);
            let env_values = Object.values(local_env);

            for (let i in env_keys){
                echo(pid, [env_keys[i] + '=' + env_values[i]]);
            }
        }else {

        }

        setErrorlevel(pid, statusCode);
        return statusCode;
    }

    /*
    function help(pid, args = []){

    }*/

    /* Tab completion and other things
     * that should not be accessible from cmd, but from js
     */
    let Utils = function() {
        function tabSuggest(s) {

        }

        return {
            tabSuggest: tabSuggest
        }
    }();

    return { /* Globalization */
        //env: local_env,
        Utils: Utils,

        echo: echo,
        exit: exit,
        cls: cls,
        set: set,
        type: type,
        prompt: prompt,
        md: makeDirectory,
        dir: listDirectory,
        cd: cd
        //help: help
    };
}();

function focus_cmd(e) {
    let pid = e.srcElement.parentNode.parentNode.dataset.pid;
    if (pid !== undefined){
        let cmdLines = document.getElementsByClassName("cmdline-" + pid);
        cmdLines[cmdLines.length-1].focus();

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

function cmd_command(stdin, pid){
    stdin = stdin.replace(stdin.slice(0, stdin.indexOf(">") + 1), "");
    console.log(stdin);
    //cmd_log.push(s);
    cmd_log.unshift(stdin);

    //let args = s.split(">")[s.split(">").length - 1].split(" "); //Command arguments
    let args = stdin.split(" ");

    let args_only = stdin.substring(stdin.indexOf(' ') + 1); //Command arguments excluding first argument

    let _count = (stdin.match(/ /g) || []).length;
    if (_count === 0 || _count === args_only.length){ //Prevents arguments like "" or ones that's just multiple spaces in being sent
        args_only = [];
    }else {
        args_only = args_only.split(" ");
    }
    switch (args[0].toLowerCase()) {
        case "":
            cmd.echo(pid, ['']);
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