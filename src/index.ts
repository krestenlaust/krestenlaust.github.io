import {Boot} from "./utility/boot";

function make_draggable(element, elementDragpart){ // w3schools.com
    let pos1 = 0;
    let pos2 = 0;
    let pos3 = 0;
    let pos4 = 0;

    if (elementDragpart){
        elementDragpart.onmousedown = dragMouseDown;
    }else {
        element.onmousedown = dragMouseDown;
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
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

function range(start, end) {
    let ans = [];
    for (let i = start; i <= end; i++) {
        ans.push(i);
    }
    return ans;
}

Boot.loadSystem()

//console.log(atob("ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIApOTk5OTk5OTiAgICAgICAgTk5OTk5OTk4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR0dHQgICAgICAgICAgICAgICB0dHR0ICAgICAgICAgICAgMTExMTExMSAgICAgICAgODg4ODg4ODg4ICAgICAKTjo6Ojo6OjpOICAgICAgIE46Ojo6OjpOICAgICAgICAgICAgICAgICAgICAgICAgICB0dHQ6Ojp0ICAgICAgICAgICAgdHR0Ojo6dCAgICAgICAgICAgMTo6Ojo6OjEgICAgICA4ODo6Ojo6Ojo6Ojg4ICAgCk46Ojo6Ojo6Ok4gICAgICBOOjo6Ojo6TiAgICAgICAgICAgICAgICAgICAgICAgICAgdDo6Ojo6dCAgICAgICAgICAgIHQ6Ojo6OnQgICAgICAgICAgMTo6Ojo6OjoxICAgIDg4Ojo6Ojo6Ojo6Ojo6Ojg4IApOOjo6Ojo6Ojo6TiAgICAgTjo6Ojo6Ok4gICAgICAgICAgICAgICAgICAgICAgICAgIHQ6Ojo6OnQgICAgICAgICAgICB0Ojo6Ojp0ICAgICAgICAgIDExMTo6Ojo6MSAgIDg6Ojo6Ojo4ODg4ODo6Ojo6OjgKTjo6Ojo6Ojo6OjpOICAgIE46Ojo6OjpOICAgIGVlZWVlZWVlZWVlZSAgICB0dHR0dHR0Ojo6Ojp0dHR0dHR0dHR0dHR0dDo6Ojo6dHR0dHR0dCAgICAgICAxOjo6OjEgICA4Ojo6Ojo4ICAgICA4Ojo6Ojo4Ck46Ojo6Ojo6Ojo6Ok4gICBOOjo6Ojo6TiAgZWU6Ojo6Ojo6Ojo6OjplZSAgdDo6Ojo6Ojo6Ojo6Ojo6Ojo6dHQ6Ojo6Ojo6Ojo6Ojo6Ojo6OnQgICAgICAgMTo6OjoxICAgODo6Ojo6OCAgICAgODo6Ojo6OApOOjo6Ojo6Ok46Ojo6TiAgTjo6Ojo6Ok4gZTo6Ojo6OmVlZWVlOjo6OjplZXQ6Ojo6Ojo6Ojo6Ojo6Ojo6OnR0Ojo6Ojo6Ojo6Ojo6Ojo6Ojp0ICAgICAgIDE6Ojo6MSAgICA4Ojo6Ojo4ODg4ODo6Ojo6OCAKTjo6Ojo6Ok4gTjo6OjpOIE46Ojo6OjpOZTo6Ojo6OmUgICAgIGU6Ojo6OmV0dHR0dHQ6Ojo6Ojo6dHR0dHR0dHR0dHR0Ojo6Ojo6OnR0dHR0dCAgICAgICAxOjo6OmwgICAgIDg6Ojo6Ojo6Ojo6Ojo6OCAgCk46Ojo6OjpOICBOOjo6Ok46Ojo6Ojo6TmU6Ojo6Ojo6ZWVlZWU6Ojo6OjplICAgICAgdDo6Ojo6dCAgICAgICAgICAgIHQ6Ojo6OnQgICAgICAgICAgICAgMTo6OjpsICAgIDg6Ojo6Ojg4ODg4Ojo6Ojo4IApOOjo6Ojo6TiAgIE46Ojo6Ojo6Ojo6Ok5lOjo6Ojo6Ojo6Ojo6Ojo6OjplICAgICAgIHQ6Ojo6OnQgICAgICAgICAgICB0Ojo6Ojp0ICAgICAgICAgICAgIDE6Ojo6bCAgIDg6Ojo6OjggICAgIDg6Ojo6OjgKTjo6Ojo6Ok4gICAgTjo6Ojo6Ojo6OjpOZTo6Ojo6OmVlZWVlZWVlZWVlICAgICAgICB0Ojo6Ojp0ICAgICAgICAgICAgdDo6Ojo6dCAgICAgICAgICAgICAxOjo6OmwgICA4Ojo6Ojo4ICAgICA4Ojo6Ojo4Ck46Ojo6OjpOICAgICBOOjo6Ojo6Ojo6TmU6Ojo6Ojo6ZSAgICAgICAgICAgICAgICAgdDo6Ojo6dCAgICB0dHR0dHQgIHQ6Ojo6OnQgICAgdHR0dHR0ICAgMTo6OjpsICAgODo6Ojo6OCAgICAgODo6Ojo6OApOOjo6Ojo6TiAgICAgIE46Ojo6Ojo6Ok5lOjo6Ojo6OjplICAgICAgICAgICAgICAgIHQ6Ojo6Ojp0dHR0Ojo6Ojp0ICB0Ojo6Ojo6dHR0dDo6Ojo6dDExMTo6Ojo6OjExMTg6Ojo6Ojo4ODg4ODo6Ojo6OjgKTjo6Ojo6Ok4gICAgICAgTjo6Ojo6OjpOIGU6Ojo6Ojo6OmVlZWVlZWVlICAgICAgICB0dDo6Ojo6Ojo6Ojo6Ojo6dCAgdHQ6Ojo6Ojo6Ojo6Ojo6OnQxOjo6Ojo6Ojo6OjEgODg6Ojo6Ojo6Ojo6Ojo6ODggCk46Ojo6OjpOICAgICAgICBOOjo6Ojo6TiAgZWU6Ojo6Ojo6Ojo6Ojo6ZSAgICAgICAgICB0dDo6Ojo6Ojo6Ojo6dHQgICAgdHQ6Ojo6Ojo6Ojo6OnR0MTo6Ojo6Ojo6OjoxICAgODg6Ojo6Ojo6Ojo4OCAgIApOTk5OTk5OTiAgICAgICAgIE5OTk5OTk4gICAgZWVlZWVlZWVlZWVlZWUgICAgICAgICAgICB0dHR0dHR0dHR0dCAgICAgICAgdHR0dHR0dHR0dHQgIDExMTExMTExMTExMSAgICAgODg4ODg4ODg4ICAgICAKCmh0dHA6Ly9wYXRvcmprLmNvbS9zb2Z0d2FyZS90YWFnLyNwPWRpc3BsYXkmZj1Eb2gmdD1OZXR0MTg="));
