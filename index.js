//const lastline_cmd_element = document.getElementById("cmdline-last").cloneNode(false);

//var tmp = document.createElement("div");
//var cloned = document.getElementsByClassName("cmdline")[document.getElementsByClassName("cmdline").length -1].cloneNode(false);
//const cmd_last_line_element = tmp.appendChild(cloned).innerHTML;
const cmd_last_line_element = '<input class="cmdline cmd" type="text" value="" autocomplete="off" autocapitalize="off" spellcheck="false">';

let _n = '\n';
let command_output = {
    "help":
        'Help options:' + _n +
        ' help - ' + _n +
        '',
    "cookies":
        'Run command \'cookies accept\' to accept cookies' + _n +
        'Run command \'cookies deny\' to deny cookies(prevents using some commands)' + _n +
        'I use cookies for different stuff'
};

document.getElementsByTagName("body")[0].onkeydown = function(e) {
    if (e.key === "Enter" && document.activeElement.classList.contains("cmd")){
        cmd_prompt_enter()
    }
};

function cmd_prompt_enter(){

    /*
    let cmdline_last = document.getElementById("cmdline_last");    //document.getElementById("cmdline-last");
    cmdline_last.readOnly = true;
    cmdline_last.removeAttribute("id");
    document.getElementById("cmd-text").appendChild(cmdline_last);
    //document.getElementById("cmd-box").appendChild(lastline_cmd_element);
    document.getElementById("cmd-box").innerHTML += lastline_cmd_element;*/

    let lastline_value = document.getElementsByClassName("cmdline")[document.getElementsByClassName("cmdline").length -1].value;
    cmd.echo(lastline_value);
    cmd_command(lastline_value);

    document.getElementsByClassName("cmdline")[document.getElementsByClassName("cmdline").length - 1].focus();

}

function cmd_command(s){
    let args = s.split(" "); //Command arguments
    args[0] = args[0].toLocaleLowerCase();
    let _args = s.substring(s.indexOf(' ') + 1); //Command arguments excluding first argument
    //let _count = (temp.match(/ /g) || []).length; //Counts spaces
    let _count = (s.match(/ /g) || []).length
    if (_count === 0 || _count === _args.length){ //Prevents arguments like "" or ones that's just multiple spaces in being sent
        _args = "";
    }

    console.log("args: "+args);
    console.log("_args: "+_args);
    console.log("_count: "+_count);

    switch (args[0]) {
        case "help":
            cmd.echo(command_output["help"]);
            break;
        case "cookies":
            if (args.length >= 2){

            }else {
                cmd.echo(command_output["cookies"]);
            }
            break;
        default:
            if (typeof cmd[args[0]] === "function"){
                cmd[args[0]](_args);
            }else {
                cmd.echo("'" + args[0] + "' is not recognized as an internal or external command,\n" +
                    "operable program or batch file.")
            }
    }
}

make_draggable(document.getElementById("cmd-box"), document.getElementById("cmd-top"));

/* w3schools.com */
function make_draggable(elmnt, elmnt_dragpart){
    let pos1 = 0;
    let pos2 = 0;
    let pos3 = 0;
    let pos4 = 0;

    if (elmnt_dragpart){
        elmnt_dragpart.onmousedown = dragMouseDown;
    }else {
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

console.log(atob("ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIApOTk5OTk5OTiAgICAgICAgTk5OTk5OTk4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR0dHQgICAgICAgICAgICAgICB0dHR0ICAgICAgICAgICAgMTExMTExMSAgICAgICAgODg4ODg4ODg4ICAgICAKTjo6Ojo6OjpOICAgICAgIE46Ojo6OjpOICAgICAgICAgICAgICAgICAgICAgICAgICB0dHQ6Ojp0ICAgICAgICAgICAgdHR0Ojo6dCAgICAgICAgICAgMTo6Ojo6OjEgICAgICA4ODo6Ojo6Ojo6Ojg4ICAgCk46Ojo6Ojo6Ok4gICAgICBOOjo6Ojo6TiAgICAgICAgICAgICAgICAgICAgICAgICAgdDo6Ojo6dCAgICAgICAgICAgIHQ6Ojo6OnQgICAgICAgICAgMTo6Ojo6OjoxICAgIDg4Ojo6Ojo6Ojo6Ojo6Ojg4IApOOjo6Ojo6Ojo6TiAgICAgTjo6Ojo6Ok4gICAgICAgICAgICAgICAgICAgICAgICAgIHQ6Ojo6OnQgICAgICAgICAgICB0Ojo6Ojp0ICAgICAgICAgIDExMTo6Ojo6MSAgIDg6Ojo6Ojo4ODg4ODo6Ojo6OjgKTjo6Ojo6Ojo6OjpOICAgIE46Ojo6OjpOICAgIGVlZWVlZWVlZWVlZSAgICB0dHR0dHR0Ojo6Ojp0dHR0dHR0dHR0dHR0dDo6Ojo6dHR0dHR0dCAgICAgICAxOjo6OjEgICA4Ojo6Ojo4ICAgICA4Ojo6Ojo4Ck46Ojo6Ojo6Ojo6Ok4gICBOOjo6Ojo6TiAgZWU6Ojo6Ojo6Ojo6OjplZSAgdDo6Ojo6Ojo6Ojo6Ojo6Ojo6dHQ6Ojo6Ojo6Ojo6Ojo6Ojo6OnQgICAgICAgMTo6OjoxICAgODo6Ojo6OCAgICAgODo6Ojo6OApOOjo6Ojo6Ok46Ojo6TiAgTjo6Ojo6Ok4gZTo6Ojo6OmVlZWVlOjo6OjplZXQ6Ojo6Ojo6Ojo6Ojo6Ojo6OnR0Ojo6Ojo6Ojo6Ojo6Ojo6Ojp0ICAgICAgIDE6Ojo6MSAgICA4Ojo6Ojo4ODg4ODo6Ojo6OCAKTjo6Ojo6Ok4gTjo6OjpOIE46Ojo6OjpOZTo6Ojo6OmUgICAgIGU6Ojo6OmV0dHR0dHQ6Ojo6Ojo6dHR0dHR0dHR0dHR0Ojo6Ojo6OnR0dHR0dCAgICAgICAxOjo6OmwgICAgIDg6Ojo6Ojo6Ojo6Ojo6OCAgCk46Ojo6OjpOICBOOjo6Ok46Ojo6Ojo6TmU6Ojo6Ojo6ZWVlZWU6Ojo6OjplICAgICAgdDo6Ojo6dCAgICAgICAgICAgIHQ6Ojo6OnQgICAgICAgICAgICAgMTo6OjpsICAgIDg6Ojo6Ojg4ODg4Ojo6Ojo4IApOOjo6Ojo6TiAgIE46Ojo6Ojo6Ojo6Ok5lOjo6Ojo6Ojo6Ojo6Ojo6OjplICAgICAgIHQ6Ojo6OnQgICAgICAgICAgICB0Ojo6Ojp0ICAgICAgICAgICAgIDE6Ojo6bCAgIDg6Ojo6OjggICAgIDg6Ojo6OjgKTjo6Ojo6Ok4gICAgTjo6Ojo6Ojo6OjpOZTo6Ojo6OmVlZWVlZWVlZWVlICAgICAgICB0Ojo6Ojp0ICAgICAgICAgICAgdDo6Ojo6dCAgICAgICAgICAgICAxOjo6OmwgICA4Ojo6Ojo4ICAgICA4Ojo6Ojo4Ck46Ojo6OjpOICAgICBOOjo6Ojo6Ojo6TmU6Ojo6Ojo6ZSAgICAgICAgICAgICAgICAgdDo6Ojo6dCAgICB0dHR0dHQgIHQ6Ojo6OnQgICAgdHR0dHR0ICAgMTo6OjpsICAgODo6Ojo6OCAgICAgODo6Ojo6OApOOjo6Ojo6TiAgICAgIE46Ojo6Ojo6Ok5lOjo6Ojo6OjplICAgICAgICAgICAgICAgIHQ6Ojo6Ojp0dHR0Ojo6Ojp0ICB0Ojo6Ojo6dHR0dDo6Ojo6dDExMTo6Ojo6OjExMTg6Ojo6Ojo4ODg4ODo6Ojo6OjgKTjo6Ojo6Ok4gICAgICAgTjo6Ojo6OjpOIGU6Ojo6Ojo6OmVlZWVlZWVlICAgICAgICB0dDo6Ojo6Ojo6Ojo6Ojo6dCAgdHQ6Ojo6Ojo6Ojo6Ojo6OnQxOjo6Ojo6Ojo6OjEgODg6Ojo6Ojo6Ojo6Ojo6ODggCk46Ojo6OjpOICAgICAgICBOOjo6Ojo6TiAgZWU6Ojo6Ojo6Ojo6Ojo6ZSAgICAgICAgICB0dDo6Ojo6Ojo6Ojo6dHQgICAgdHQ6Ojo6Ojo6Ojo6OnR0MTo6Ojo6Ojo6OjoxICAgODg6Ojo6Ojo6Ojo4OCAgIApOTk5OTk5OTiAgICAgICAgIE5OTk5OTk4gICAgZWVlZWVlZWVlZWVlZWUgICAgICAgICAgICB0dHR0dHR0dHR0dCAgICAgICAgdHR0dHR0dHR0dHQgIDExMTExMTExMTExMSAgICAgODg4ODg4ODg4ICAgICAKCmh0dHA6Ly9wYXRvcmprLmNvbS9zb2Z0d2FyZS90YWFnLyNwPWRpc3BsYXkmZj1Eb2gmdD1OZXR0MTg="));