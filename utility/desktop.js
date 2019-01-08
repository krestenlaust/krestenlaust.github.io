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
    console.log(desktopiconlist);
    for (var i=0;i<desktopiconlist.length;i++){
        if (i in desktop_selection_properties.selected_icons){
            desktopiconlist[i].classList.add("selected")
        }else {
            try{
                desktopiconlist[i].classList.remove("selected");
            }catch (e) {

            }
        }
    }
}

function desktop_click(e){
    console.log(e);
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
    }
    if (objectdiv.classList.contains("desktop-icon")){
        var desktopiconlist = document.getElementsByClassName("desktop-icon");
        for (var i=0;i<desktopiconlist.length;i++){
            if (desktopiconlist[i] === objectdiv && desktop_selection_properties.selected_icons.indexOf(i) === -1){
                desktop_selection_properties.selected_icons.push(i);
            }
        }
    }else{
        desktop_selection_properties.selected_icons = [];
    }
    update_selected_icons();
}
document.getElementById("desktop").addEventListener("click", desktop_click);

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