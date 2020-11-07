const DOUBLE_CLICK_INTERVAL = 500; //Windows standard according to https://ux.stackexchange.com/a/40366
const GRID_WIDTH = 8;
const GRID_HEIGHT = 4;
const gridicons = {
    0: {
        "type": "shortcut",
        "launch": "",
        "name": "Recycle bin",
        "icon": "resources/Windows-icons/recycle_bin.ico"
    },
    3: {
        "type": "shortcut",
        "launch": "TaskManager.startApplication('cmd')",
        "icon": "resources/Windows-icons/cmd.ico",
        "name": "Command Prompt"
    },
    2: {
        "type": "shortcut",
        "launch": "TaskManager.startApplication('notepad')",
        "icon": "resources/Windows-icons/notepad.ico",
        "name": "Notepad"
    }
};
let doubleClickPending = false;
let Desktop = function () {
    let iconArray = [];
    function generateShortcut(icon_href, icon_text, icon_launch, index) {
        return `<div ondrop="desktop_drop(event)" ondragover="desktop_dragOver(event)" class="icon-parent"><div class="space desktop-icon" data-index="${index}" data-launch="${icon_launch}" onclick="icon_click(this)" draggable="true" ondragstart="desktop_dragStart(event)"><img class="desktop-icon-image" src="${icon_href}"><p class="desktop-icon-text">${icon_text}</p></div></div>`;
    }
    function emptyIcon(index) {
        return `<div ondrop="desktop_drop(event)" ondragover="desktop_dragOver(event)" class="icon-parent"><div class="space" data-index="${index}"></div></div>`;
    }
    function refreshDesktop() {
        // @ts-ignore
        let desktopDirectory = Filesystem.getDirectory("C:\\Users\\kress\\desktop");
        let icons = [];
        document.getElementById("desktop").innerHTML = "";
        for (let i = 0; i < GRID_HEIGHT * GRID_WIDTH; i++) {
            let current_icon = gridicons[i];
            if (current_icon === undefined) {
                document.getElementById("desktop").innerHTML += emptyIcon(i);
            }
            else if (current_icon["type"] === "shortcut") {
                document.getElementById("desktop").innerHTML += generateShortcut(current_icon["icon"], current_icon["name"], current_icon["launch"], i);
            }
        }
    }
    return {
        refreshDesktop: refreshDesktop
    };
}();
function icon_click(element) {
    if (doubleClickPending) {
        eval(element.dataset.launch);
        doubleClickPending = false;
    }
    doubleClickPending = true;
    doubleclick_timer_start();
}
// @ts-ignore
let doubleclick_timer_start = _.debounce(function () {
    doubleClickPending = false;
}, DOUBLE_CLICK_INTERVAL);
let selectionProperties = {
    selected_icons: [],
    keyboardSelectionIndex: 0
};
function update_selected_icons() {
    let iconList = document.getElementsByClassName("desktop-icon");
    for (let i = 0; i < iconList.length; i++) {
        if (selectionProperties.selected_icons.indexOf(i) !== -1) {
            iconList[i].classList.add("selected");
        }
        else {
            try {
                iconList[i].classList.remove("selected");
            }
            catch (e) { }
        }
    }
}
function desktop_click(e) {
    console.log("Desktop click");
    if (WindowsStart.isOpen) {
        WindowsStart.isOpen = false;
        WindowsStart.refresh_menu_state();
    }
    let objectDiv;
    switch (e.target.tagName) {
        case "IMG":
            objectDiv = e.target.parentElement;
            break;
        case "P":
            objectDiv = e.target.parentElement;
            break;
        case "DIV":
            objectDiv = e.target;
            break;
        default:
            selectionProperties.selected_icons = [];
    }
    if (objectDiv.getAttribute("class") === "desktop-icon") {
        let iconList = document.getElementsByClassName("desktop-icon");
        for (let i = 0; i < iconList.length; i++) {
            if (iconList[i] === objectDiv && selectionProperties.selected_icons.indexOf(i) === -1) {
                if (e.ctrlKey || e.shiftKey) {
                    selectionProperties.selected_icons.push(i);
                }
                else {
                    selectionProperties.selected_icons = [i];
                }
            }
        }
    }
    else {
        selectionProperties.selected_icons = [];
    }
    update_selected_icons();
}
function desktop_dragStart(e) {
    let targetElement = e.target;
    if (!targetElement.classList.contains("space")) {
        if (targetElement.classList.contains("icon-parent")) {
            targetElement = targetElement.children[0];
        }
        else {
            targetElement = targetElement.parentElement;
        }
    }
    draggingIndex = parseInt(targetElement.dataset.index);
}
let draggingIndex = 0;
function desktop_drop(e) {
    e.preventDefault();
    let targetElement = e.target;
    if (e.dataTransfer.items) {
        for (let i = 0; i < e.dataTransfer.items.length; i++) {
            if (e.dataTransfer.items[i].kind === "file") {
                let file = e.dataTransfer.items[i].getAsFile();
                // @ts-ignore
                Filesystem.makeFile("C:\\Users\\kress\\desktop", file.name, file, file.text);
            }
        }
    }
    let fromIndex = draggingIndex;
    if (!targetElement.classList.contains("space")) {
        if (targetElement.classList.contains("icon-parent")) {
            targetElement = targetElement.children[0];
        }
        else {
            targetElement = targetElement.parentElement;
        }
    }
    let toIndex = parseInt(targetElement.dataset.index);
    if (targetElement.classList.contains("desktop-icon")) { // Not empty
        // Launch icon with dragged icon as parameter to mimic default windows behavior.
    }
    else {
        let tempObj = gridicons[fromIndex];
        gridicons[fromIndex] = gridicons[toIndex];
        gridicons[toIndex] = tempObj;
        Desktop.refreshDesktop();
    }
    console.log(e);
}
function desktop_dragOver(e) {
    e.preventDefault();
}
function desktop_keydown(e) {
    let iconList = document.getElementsByClassName("desktop-icon");
    if (e.srcElement === document.body) {
        let lastIndex = selectionProperties.keyboardSelectionIndex;
        switch (e.code) {
            case "ArrowUp":
                //selection = index - width
                selectionProperties.keyboardSelectionIndex -= GRID_WIDTH;
                if (selectionProperties.keyboardSelectionIndex < 0) {
                    selectionProperties.keyboardSelectionIndex += GRID_WIDTH;
                }
                if (e.shiftKey) {
                    //selectionProperties.selected_icons = [... range(lastIndex, dawdwa)]
                }
                else {
                    selectionProperties.selected_icons = [selectionProperties.keyboardSelectionIndex];
                }
                break;
            case "ArrowDown":
                //selection = index + width
                selectionProperties.keyboardSelectionIndex += GRID_WIDTH;
                if (selectionProperties.keyboardSelectionIndex >= GRID_WIDTH * GRID_HEIGHT) {
                    selectionProperties.keyboardSelectionIndex -= GRID_WIDTH;
                }
                break;
            case "ArrowLeft":
                //selection = index - 1
                selectionProperties.keyboardSelectionIndex -= 1;
                if (selectionProperties.keyboardSelectionIndex < 0) {
                    selectionProperties.keyboardSelectionIndex += 1;
                }
                break;
            case "ArrowRight":
                //selection = index + 1
                selectionProperties.keyboardSelectionIndex += 1;
                if (selectionProperties.keyboardSelectionIndex >= GRID_WIDTH * GRID_HEIGHT) {
                    selectionProperties.keyboardSelectionIndex -= 1;
                }
                break;
            case "Enter":
                for (let i = 0; i < selectionProperties.selected_icons.length; i++) {
                    eval(iconList[selectionProperties.selected_icons[i]].dataset.launch);
                }
                break;
        }
    }
}
document.getElementById("desktop").addEventListener("click", desktop_click);
document.addEventListener("keydown", desktop_keydown);
/*
function doubleclick_timer() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('resolved');
        }, 500);
    });
}

async function doubleclick_timer_start() {
    var result = await doubleclick_timer();
    console.log(result);
}*/ 
//# sourceMappingURL=desktop.js.map