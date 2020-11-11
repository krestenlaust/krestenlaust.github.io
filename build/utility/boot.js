// Loads hard-coded things onto the system if they aren't already present
function loadSystem() {
    Filesystem.makeFile(`C:\\Users\\${System.globalEnv.username}\\readme.txt`, "Hello there");
}
loadSystem();
//# sourceMappingURL=boot.js.map