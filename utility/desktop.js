const doubleclick_interval = 500; //Windows standard according to https://ux.stackexchange.com/a/40366
const gridwidth = 8;
const gridheight = 4;
const gridicons = {
    0: {
        "type": "shortcut",
        "launch": "",
        "name": "Recycle bin",
        "icon": "resources/Windows-icons/recycle_bin.ico"
    },
    3: {
        "type": "shortcut",
        "launch": "taskmanager.start_application('cmd')",
        "icon": "resources/Windows-icons/cmd.ico",
        "name": "Command Prompt"
    },
    2: {
        "type": "shortcut",
        "launch": "taskmanager.start_application('notepad')",
        "icon": "resources/Windows-icons/notepad.ico",
        "name": "Notepad"
    }
};

let doubleclick_pending = false;

let desktop = function () {

    let icon_array = [];

    function generate_shortcut(icon_href, icon_text, icon_launch, index) {
        return `<div ondrop="desktop_drop(event)" ondragover="desktop_dragOver(event)" class="icon-parent"><div class="space desktop-icon" data-index="${index}" data-launch="${icon_launch}" onclick="icon_click(this)" draggable="true" ondragstart="desktop_dragStart(event)"><img class="desktop-icon-image" src="${icon_href}"><p class="desktop-icon-text">${icon_text}</p></div></div>`
    }
    function empty_icon(index) {
        return `<div ondrop="desktop_drop(event)" ondragover="desktop_dragOver(event)" class="icon-parent"><div class="space" data-index="${index}"></div></div>`
    }

    function refresh_desktop() {
        let desktop_directory = filesystem.get_directory("C:\\Users\\kress\\desktop");
        let icons = [];
        document.getElementById("desktop").innerHTML = "";

        for (let i=0; i < gridheight * gridwidth; i++){
            let current_icon = gridicons[i];
            if (current_icon === undefined){
                document.getElementById("desktop").innerHTML += empty_icon(i);
            }else if (current_icon["type"] === "shortcut"){
                document.getElementById("desktop").innerHTML += generate_shortcut(current_icon["icon"], current_icon["name"], current_icon["launch"], i)
            }
        }
        /*
        for (var item in desktop_directory) {
            if (item === "@property") {
                continue;
            }
            if (!desktop_directory.hasOwnProperty(item)) {
                continue;
            }

            // Implement this
            let icon_obj = {"directory": desktop_directory[item]["@property"].directory === true};

            icons.push(item);
        }*/
    }

    return {
        refresh_desktop: refresh_desktop
    };
}();

function icon_click(element){
    if (doubleclick_pending){
        eval(element.dataset.launch);
        doubleclick_pending = false;
    }

    doubleclick_pending = true;
    doubleclick_timer_start();
}

let doubleclick_timer_start = _.debounce(function () {
    doubleclick_pending = false;
}, doubleclick_interval);


let selectionProperties = {
    selected_icons: [],
    keyboardSelectionIndex: 0
};

function update_selected_icons() {
    var desktopiconlist = document.getElementsByClassName("desktop-icon");
    for (var i=0; i<desktopiconlist.length; i++){
        if (selectionProperties.selected_icons.indexOf(i) !== -1){
            desktopiconlist[i].classList.add("selected")
        }else {
            try{
                desktopiconlist[i].classList.remove("selected");
            }catch (e) {}
        }
    }
}

function desktop_click(e){
    var objectdiv;
    switch (e.target.tagName) {
        case "IMG":
            objectdiv = e.target.parentElement;
            break;
        case "P":
            objectdiv = e.target.parentElement;
            break;
        case "DIV":
            objectdiv = e.target;
            break;
        default:
            selectionProperties.selected_icons = [];
    }
    if (objectdiv.getAttribute("class") === "desktop-icon"){
        var desktopIconList = document.getElementsByClassName("desktop-icon");
        for (var i=0; i < desktopIconList.length; i++){

            if (desktopIconList[i] === objectdiv && selectionProperties.selected_icons.indexOf(i) === -1){
                if (e.ctrlKey || e.shiftKey){
                    selectionProperties.selected_icons.push(i);
                }else {
                    selectionProperties.selected_icons = [i];
                }
            }
        }
    }else{
        selectionProperties.selected_icons = [];
    }
    update_selected_icons();
}
function desktop_dragStart(e) {
    let targetElement = e.target;
    console.log(targetElement);
    if (!targetElement.classList.contains("space")) {
        if (targetElement.classList.contains("icon-parent")){
            targetElement = targetElement.children[0];
        }else{
            targetElement = targetElement.parentElement;
        }
    }
    console.log(targetElement);
    draggingIndex = parseInt(targetElement.dataset.index);
}
let draggingIndex = 0;
function desktop_drop(e) {
    e.preventDefault();

    let targetElement = e.target;
    if (e.dataTransfer.items){
        for (let i=0; i < e.dataTransfer.items.length; i++){
            if (e.dataTransfer.items[i].kind === "file"){
                let file = e.dataTransfer.items[i].getAsFile();
                filesystem.make_file("C:\\Users\\kress\\desktop", file.name, file, file.text);
            }
        }
    }

    let fromIndex = draggingIndex;
    if (!targetElement.classList.contains("space")) {
        if (targetElement.classList.contains("icon-parent")){
            targetElement = targetElement.children[0];
        }else{
            targetElement = targetElement.parentElement;
        }
    }
    let toIndex = parseInt(targetElement.dataset.index);
    console.log("From index: ", fromIndex);
    console.log("To: ", e.target);

    if (targetElement.classList.contains("desktop-icon")) { // Not empty

    }else{
        let tempObj = gridicons[fromIndex];
        gridicons[fromIndex] = gridicons[toIndex];
        gridicons[toIndex] = tempObj;
        desktop.refresh_desktop();
        //e.target.appendChild(document.getElementsByClassName("space")[parseInt(dataIndex)]);
    }
    
    console.log(e);
}
function desktop_dragOver(e) {
    e.preventDefault();
}
function desktop_keydown(e){
    //console.log(e);
    var desktopiconlist = document.getElementsByClassName("desktop-icon");
    if (e.srcElement === document.body){
        let lastIndex = selectionProperties.keyboardSelectionIndex;
        switch (e.code) {
            case "Enter":
                for (var i=0; i < selectionProperties.selected_icons.length; i++){
                    eval(desktopiconlist[selectionProperties.selected_icons[i]].dataset.launch);
                }
                break;
            case "ArrowUp":
                //selection = index - width
                selectionProperties.keyboardSelectionIndex -= gridwidth;
                if (selectionProperties.keyboardSelectionIndex < 0){
                    selectionProperties.keyboardSelectionIndex += gridwidth;
                }
                
                if (e.shiftKey){
                    //selectionProperties.selected_icons = [... range(lastIndex, dawdwa)]
                }else{
                    selectionProperties.selected_icons = [selectionProperties.keyboardSelectionIndex];
                }
                
                break;
            case "ArrowDown":
                //selection = index + width
                selectionProperties.keyboardSelectionIndex += gridwidth;
                if (selectionProperties.keyboardSelectionIndex >= gridwidth * gridheight){
                    selectionProperties.keyboardSelectionIndex -= gridwidth;
                }

                break;
            case "ArrowLeft":
                //selection = index - 1
                selectionProperties.keyboardSelectionIndex -= 1;
                if (selectionProperties.keyboardSelectionIndex < 0){
                    selectionProperties.keyboardSelectionIndex += 1;
                }

                break;
            case "ArrowRight":
                //selection = index + 1
                selectionProperties.keyboardSelectionIndex += 1;
                if (selectionProperties.keyboardSelectionIndex >= gridwidth * gridheight){
                    selectionProperties.keyboardSelectionIndex -= 1;
                }
                break;
        }
        if (e.code === "Enter"){

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