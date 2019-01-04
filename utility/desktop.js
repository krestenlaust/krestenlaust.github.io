doubleclick_interval = 900;
doubleclick_pending = false;


function icon_click(object){
    if (doubleclick_pending){
        eval(object.dataset.launch);
    }

    doubleclick_pending = true;

    debounce(function() {
        doubleclick_pending = false;
    }, doubleclick_interval)
}

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