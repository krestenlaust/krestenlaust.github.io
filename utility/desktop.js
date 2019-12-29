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

    function generate_shortcut(icon_href, icon_text, icon_launch) {
        return `<div class="desktop-icon" data-launch="${icon_launch}" onclick="icon_click(this)"><img class="desktop-icon-image" src="${icon_href}"><p class="desktop-icon-text">${icon_text}</p></div>`
    }
    function empty_icon(index) {
        return `<div data-index="${index}"></div>`
    }

    function refresh_desktop() {
        let desktop_directory = filesystem.get_directory("C:\\Users\\kress\\desktop");
        let icons = [];
        document.getElementById("desktop").innerHTML = "";

        for (var i=0; i < gridheight * gridwidth; i++){
            var current_icon = gridicons[i];
            if (current_icon === undefined){
                document.getElementById("desktop").innerHTML += empty_icon(i);
            }else if (current_icon["type"] === "shortcut"){
                document.getElementById("desktop").innerHTML += generate_shortcut(current_icon["icon"], current_icon["name"], current_icon["launch"])
            }
        }/*
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


let desktop_selection_properties = {
    selected_icons: []
};

function update_selected_icons() {
    var desktopiconlist = document.getElementsByClassName("desktop-icon");
    for (var i=0; i<desktopiconlist.length; i++){
        if (desktop_selection_properties.selected_icons.indexOf(i) !== -1){
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
            desktop_selection_properties.selected_icons = [];
    }
    if (objectdiv.getAttribute("class") === "desktop-icon"){
        var desktopIconList = document.getElementsByClassName("desktop-icon");
        for (var i=0; i < desktopIconList.length; i++){

            if (desktopIconList[i] === objectdiv && desktop_selection_properties.selected_icons.indexOf(i) === -1){
                if (e.ctrlKey || e.shiftKey){
                    desktop_selection_properties.selected_icons.push(i);
                }else {
                    desktop_selection_properties.selected_icons = [i];
                }
            }
        }
    }else{
        desktop_selection_properties.selected_icons = [];
    }
    update_selected_icons();
}
function desktop_keydown(e){
    //console.log(e);
    var desktopiconlist = document.getElementsByClassName("desktop-icon");
    if (e.srcElement === document.body){
        switch (e.code) {
            case "Enter":
                for (var i=0; i < desktop_selection_properties.selected_icons.length; i++){
                    eval(desktopiconlist[desktop_selection_properties.selected_icons[i]].dataset.launch);
                }
                break;
            case "ArrowUp":
                //selection
                
                break;
            case "ArrowDown":
                //selection

                break;
            case "ArrowLeft":
                //selection
                break;
            case "ArrowRight":
                //selection
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