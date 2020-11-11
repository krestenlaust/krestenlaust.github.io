//import {saveload} from "./saveload-system";
let Filesystem = function () {
    //export class filesystem{
    const ILLEGAL_CHARACTERS = [':', ';', '+', '\\'];
    const ILLEGAL_NAMES = ['..'];
    const _systemdrive = {
        "c": {
            "@property": { truename: "C", directory: true },
            "users": {
                "@property": { truename: "Users", directory: true },
                "kress": {
                    "@property": { truename: "kress", directory: true },
                    "desktop": {
                        "@property": { truename: "Desktop", directory: true }
                    }
                }
            },
            "Windows": {
                "@property": { truename: "Windows", directory: true },
                "System32": {
                    "@property": { truename: "System32", directory: true }
                }
            }
        },
        "d": {
            "@property": { truename: "D", directory: true }
        }
    };
    const EMPTY_DIR = {
        "@property": { truename: undefined, directory: true }
    };
    const EMPTY_FILE = {
        "@property": { address: null }
    };
    function parsePath(path) {
        return path.replace(":", "").toLowerCase().split("\\");
    }
    function isPathAbsolute(path) {
        return path.length >= 2 && path.slice(1, 2) === ":";
    }
    function validateDirectory(path) {
        return true; //Filesystem.getDirectory(path).length !== 0;
    }
    function getDirectory(path) {
        if (path === undefined) {
            return [];
        }
        let pathArray = parsePath(path);
        // Generate directory-query string
        let query = "_systemdrive";
        for (let i = 0; i < pathArray.length; i++) {
            query += '["' + pathArray[i] + '"]';
        }
        return eval(query);
    }
    // instance, first arg
    function makeDirectory(path, directoryName) {
        // Verify that the directory name is valid
        if (ILLEGAL_NAMES.indexOf(directoryName) !== -1) {
            return 1;
        }
        for (let i = 0; i < ILLEGAL_CHARACTERS.length; i++) {
            if (directoryName.indexOf(ILLEGAL_CHARACTERS[i]) !== -1) {
                return 1;
            }
        }
        // Initialize new directory object
        let directoryObj = EMPTY_DIR;
        directoryObj["@property"].truename = directoryName;
        let pathArray = parsePath(path);
        // Generate directory-creation string
        let query = "_systemdrive";
        for (let i = 0; i < pathArray.length; i++) {
            query += '["' + pathArray[i] + '"]';
        }
        query += '["' + directoryName.toLowerCase() + '"]=' + JSON.stringify(directoryObj);
        eval(query);
        return 0;
    }
    /* maybe convert into writeFile */
    function makeFile(filepath, data) {
        console.log(`WriteFile: ${filepath} - content: ${data}`);
        console.log("Data", data);
        // Check if filename is invalid.
        // Initialize new file object
        let fileObj = EMPTY_FILE;
        let address = SaveLoad.address.generate();
        fileObj["@property"].address = address;
        SaveLoad.address.write(address, data);
        let pathArray = parsePath(filepath);
        console.log("Parsed path", pathArray);
        let filename = pathArray.pop();
        // Generate file-creation string
        let evaluation = "_systemdrive";
        for (let i = 0; i < pathArray.length; i++) {
            evaluation += '["' + pathArray[i] + '"]';
        }
        evaluation += '["' + filename.toLowerCase() + '"]=' + JSON.stringify(fileObj);
        console.log(evaluation);
        eval(evaluation);
        return true;
    }
    function readFile(filepath) {
        let pathArray = filepath.replace(":", "").toLowerCase().split("\\");
        // Generate file-query string
        let query = "_systemdrive";
        for (let i = 0; i < pathArray.length; i++) {
            query += '["' + pathArray[i] + '"]';
        }
        query += '["@property"]["address"]';
        let fileAddress = eval(query);
        return JSON.stringify(SaveLoad.address.read(fileAddress));
    }
    function filedrop(event, path) {
        console.log(event, "File has been dropped");
    }
    return {
        makeDirectory: makeDirectory,
        getDirectory: getDirectory,
        validate_directory: validateDirectory,
        readFile: readFile,
        makeFile: makeFile,
        isPathAbsolute: isPathAbsolute,
        filedrop: filedrop,
        _systemdrive: _systemdrive
    };
}();
//# sourceMappingURL=filesystem.js.map