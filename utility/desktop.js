const doubleclick_interval = 500; //Windows standard according to https://ux.stackexchange.com/a/40366

let doubleclick_pending = false;

function icon_click(object){
    if (doubleclick_pending){
        eval(object.dataset.launch);
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
        var desktopiconlist = document.getElementsByClassName("desktop-icon");
        for (var i=0; i<desktopiconlist.length; i++){

            if (desktopiconlist[i] === objectdiv && desktop_selection_properties.selected_icons.indexOf(i) === -1){
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