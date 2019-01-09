//const cmd_last_line_element = '<input class="cmdline cmdline-empty-00fff cmd" type="text" value="" autocomplete="off" autocapitalize="off" spellcheck="false" readonly>';

let cmd_log = [];
let cmd_log_index = 0;

/*
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
};*/

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


/* Windows Peek */
let windows_peek = function(){
    //let mouse_hovering = false;
    let mouse_hover_timeout;

    function peek_on(){

    }
    function peek_off(){

    }

    document.getElementById("windows-peek").addEventListener("mouseenter", function(e){
        mouse_hover_timeout = setTimeout(function () {
            peek_on();
        }, 500)
    }, false);
    document.getElementById("windows-peek").addEventListener("mouseleave", function(e){
        //mouse_hovering = false;
        clearTimeout(mouse_hover_timeout);
        peek_off();
    }, false);

    return{
        //mouse_hovering: mouse_hovering
    }
}();


function close_window(window){
    taskmanager.kill_application(window.parentElement.parentElement.getAttribute("data-pid"));
    //window.parentElement.dataset.pid
    //window.parentElement.parentElement.parentElement.removeChild(window.parentElement.parentElement);
}
function minimize_window(window){
    //window.parentElement.parentElement.style.display = "none";
}
function maximize_window(window){

}

//Compressed
function make_draggable(a,b){function c(k){k=k||window.event,k.preventDefault(),i=k.clientX,j=k.clientY,document.onmouseup=f,document.onmousemove=d}function d(k){k=k||window.event,k.preventDefault(),g=i-k.clientX,h=j-k.clientY,i=k.clientX,j=k.clientY,a.style.top=a.offsetTop-h+"px",a.style.left=a.offsetLeft-g+"px"}function f(){document.onmouseup=null,document.onmousemove=null}let g=0,h=0,i=0,j=0;b?b.onmousedown=c:a.onmousedown=c}


//console.log(atob("ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIApOTk5OTk5OTiAgICAgICAgTk5OTk5OTk4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR0dHQgICAgICAgICAgICAgICB0dHR0ICAgICAgICAgICAgMTExMTExMSAgICAgICAgODg4ODg4ODg4ICAgICAKTjo6Ojo6OjpOICAgICAgIE46Ojo6OjpOICAgICAgICAgICAgICAgICAgICAgICAgICB0dHQ6Ojp0ICAgICAgICAgICAgdHR0Ojo6dCAgICAgICAgICAgMTo6Ojo6OjEgICAgICA4ODo6Ojo6Ojo6Ojg4ICAgCk46Ojo6Ojo6Ok4gICAgICBOOjo6Ojo6TiAgICAgICAgICAgICAgICAgICAgICAgICAgdDo6Ojo6dCAgICAgICAgICAgIHQ6Ojo6OnQgICAgICAgICAgMTo6Ojo6OjoxICAgIDg4Ojo6Ojo6Ojo6Ojo6Ojg4IApOOjo6Ojo6Ojo6TiAgICAgTjo6Ojo6Ok4gICAgICAgICAgICAgICAgICAgICAgICAgIHQ6Ojo6OnQgICAgICAgICAgICB0Ojo6Ojp0ICAgICAgICAgIDExMTo6Ojo6MSAgIDg6Ojo6Ojo4ODg4ODo6Ojo6OjgKTjo6Ojo6Ojo6OjpOICAgIE46Ojo6OjpOICAgIGVlZWVlZWVlZWVlZSAgICB0dHR0dHR0Ojo6Ojp0dHR0dHR0dHR0dHR0dDo6Ojo6dHR0dHR0dCAgICAgICAxOjo6OjEgICA4Ojo6Ojo4ICAgICA4Ojo6Ojo4Ck46Ojo6Ojo6Ojo6Ok4gICBOOjo6Ojo6TiAgZWU6Ojo6Ojo6Ojo6OjplZSAgdDo6Ojo6Ojo6Ojo6Ojo6Ojo6dHQ6Ojo6Ojo6Ojo6Ojo6Ojo6OnQgICAgICAgMTo6OjoxICAgODo6Ojo6OCAgICAgODo6Ojo6OApOOjo6Ojo6Ok46Ojo6TiAgTjo6Ojo6Ok4gZTo6Ojo6OmVlZWVlOjo6OjplZXQ6Ojo6Ojo6Ojo6Ojo6Ojo6OnR0Ojo6Ojo6Ojo6Ojo6Ojo6Ojp0ICAgICAgIDE6Ojo6MSAgICA4Ojo6Ojo4ODg4ODo6Ojo6OCAKTjo6Ojo6Ok4gTjo6OjpOIE46Ojo6OjpOZTo6Ojo6OmUgICAgIGU6Ojo6OmV0dHR0dHQ6Ojo6Ojo6dHR0dHR0dHR0dHR0Ojo6Ojo6OnR0dHR0dCAgICAgICAxOjo6OmwgICAgIDg6Ojo6Ojo6Ojo6Ojo6OCAgCk46Ojo6OjpOICBOOjo6Ok46Ojo6Ojo6TmU6Ojo6Ojo6ZWVlZWU6Ojo6OjplICAgICAgdDo6Ojo6dCAgICAgICAgICAgIHQ6Ojo6OnQgICAgICAgICAgICAgMTo6OjpsICAgIDg6Ojo6Ojg4ODg4Ojo6Ojo4IApOOjo6Ojo6TiAgIE46Ojo6Ojo6Ojo6Ok5lOjo6Ojo6Ojo6Ojo6Ojo6OjplICAgICAgIHQ6Ojo6OnQgICAgICAgICAgICB0Ojo6Ojp0ICAgICAgICAgICAgIDE6Ojo6bCAgIDg6Ojo6OjggICAgIDg6Ojo6OjgKTjo6Ojo6Ok4gICAgTjo6Ojo6Ojo6OjpOZTo6Ojo6OmVlZWVlZWVlZWVlICAgICAgICB0Ojo6Ojp0ICAgICAgICAgICAgdDo6Ojo6dCAgICAgICAgICAgICAxOjo6OmwgICA4Ojo6Ojo4ICAgICA4Ojo6Ojo4Ck46Ojo6OjpOICAgICBOOjo6Ojo6Ojo6TmU6Ojo6Ojo6ZSAgICAgICAgICAgICAgICAgdDo6Ojo6dCAgICB0dHR0dHQgIHQ6Ojo6OnQgICAgdHR0dHR0ICAgMTo6OjpsICAgODo6Ojo6OCAgICAgODo6Ojo6OApOOjo6Ojo6TiAgICAgIE46Ojo6Ojo6Ok5lOjo6Ojo6OjplICAgICAgICAgICAgICAgIHQ6Ojo6Ojp0dHR0Ojo6Ojp0ICB0Ojo6Ojo6dHR0dDo6Ojo6dDExMTo6Ojo6OjExMTg6Ojo6Ojo4ODg4ODo6Ojo6OjgKTjo6Ojo6Ok4gICAgICAgTjo6Ojo6OjpOIGU6Ojo6Ojo6OmVlZWVlZWVlICAgICAgICB0dDo6Ojo6Ojo6Ojo6Ojo6dCAgdHQ6Ojo6Ojo6Ojo6Ojo6OnQxOjo6Ojo6Ojo6OjEgODg6Ojo6Ojo6Ojo6Ojo6ODggCk46Ojo6OjpOICAgICAgICBOOjo6Ojo6TiAgZWU6Ojo6Ojo6Ojo6Ojo6ZSAgICAgICAgICB0dDo6Ojo6Ojo6Ojo6dHQgICAgdHQ6Ojo6Ojo6Ojo6OnR0MTo6Ojo6Ojo6OjoxICAgODg6Ojo6Ojo6Ojo4OCAgIApOTk5OTk5OTiAgICAgICAgIE5OTk5OTk4gICAgZWVlZWVlZWVlZWVlZWUgICAgICAgICAgICB0dHR0dHR0dHR0dCAgICAgICAgdHR0dHR0dHR0dHQgIDExMTExMTExMTExMSAgICAgODg4ODg4ODg4ICAgICAKCmh0dHA6Ly9wYXRvcmprLmNvbS9zb2Z0d2FyZS90YWFnLyNwPWRpc3BsYXkmZj1Eb2gmdD1OZXR0MTg="));

/* //Uncompressed
function make_draggable(elmnt, elmnt_dragpart){ // w3schools.com
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
}*/