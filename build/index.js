/* Windows Peek */
let windows_peek = function () {
    let mouse_hover_timeout;
    //let peek_clicked = false;
    /**
     * @type {{peek_opacity}}
     * @description Note, to also change animation, change keyframe called "peek_opacity" in index.css.
     */
    let peek_opacity = "0.1";
    function peek_on() {
        let windows = document.getElementsByClassName("window");
        for (let i = 0; i < windows.length; i++) {
            windows[i].style.animation = "peek_opacity 0.3s";
            windows[i].style.opacity = "0.1";
        }
    }
    function peek_off() {
        let windows = document.getElementsByClassName("window");
        for (let i = 0; i < windows.length; i++) {
            windows[i].style.animation = "";
            windows[i].style.opacity = "";
        }
    }
    function peek_click() {
        console.log("Peek clicked");
    }
    function __init__() {
        document.getElementById("windows-peek").addEventListener("mouseenter", function (e) {
            mouse_hover_timeout = setTimeout(function () {
                peek_on();
            }, 500);
        }, false);
        document.getElementById("windows-peek").addEventListener("mouseleave", function (e) {
            //mouse_hovering = false;
            clearTimeout(mouse_hover_timeout);
            peek_off();
        }, false);
        document.getElementById("windows-peek").addEventListener("click", peek_click);
    }
    return {
        __init__: __init__,
        peek_opacity
    };
}();
windows_peek.__init__();
function close_window(window) {
    // @ts-ignore
    taskmanager.kill_application(window.parentElement.parentElement.getAttribute("data-pid"));
}
function minimize_window(window) {
    //window.parentElement.parentElement.style.display = "none";
}
function maximize_window(window) {
}
//Compressed
function make_draggable(a, b) { function c(k) { k = k || window.event, k.preventDefault(), i = k.clientX, j = k.clientY, document.onmouseup = f, document.onmousemove = d; } function d(k) { k = k || window.event, k.preventDefault(), g = i - k.clientX, h = j - k.clientY, i = k.clientX, j = k.clientY, a.style.top = a.offsetTop - h + "px", a.style.left = a.offsetLeft - g + "px"; } function f() { document.onmouseup = null, document.onmousemove = null; } let g = 0, h = 0, i = 0, j = 0; b ? b.onmousedown = c : a.onmousedown = c; }
function range(start, end) {
    let ans = [];
    for (let i = start; i <= end; i++) {
        ans.push(i);
    }
    return ans;
}
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
//# sourceMappingURL=index.js.map