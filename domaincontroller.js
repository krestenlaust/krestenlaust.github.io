const subdomains = {
    "git": "http://github.com/kres0345",
    "github": "http://github.com/kres0345"
};

let full_domain = window.location.href.replace("http://","").replace("https://","").split("?")[0].split(".");
let _sld = ""; //sub level domain: www.kresten.top = "www"
let _param = "";

if (typeof full_domain[full_domain.length - 3] === "string"){
    _sld = full_domain[full_domain.length - 3];
}
if (window.location.href.indexOf("?") !== -1){
    _param = window.location.href.split("?")[1];
}

if (subdomains[_sld] !== undefined){
    window.location.replace(subdomains[_sld]);
}