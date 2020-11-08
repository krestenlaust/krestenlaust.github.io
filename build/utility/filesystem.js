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
                        "@property": { truename: "Desktop", directory: true },
                        "notepad.lnk": {
                            "@property": { address: "" }
                        }
                    },
                    "readme.txt": {
                        "@property": { address: "" }
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
    function isPathAbsolute(path) {
        return path.length >= 2 && path.slice(1, 2) === ":";
    }
    function validateDirectory(path) {
        return Filesystem.getDirectory(path).length !== 0;
    }
    function getDirectory(path) {
        if (path === undefined) {
            return [];
        }
        let pathArray = path.replace(":", "").toLowerCase().split("\\");
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
            if (directoryName.indexOf(ILLEGAL_CHARACTERS[i])) {
                return 1;
            }
        }
        // Initialize new directory object
        let directoryObj = EMPTY_DIR;
        directoryObj["@property"].truename = directoryName;
        let pathArray = path.replace(":", "").toLowerCase().split("\\");
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
    function makeFile(path, filename, data) {
        console.log("Path", path);
        console.log("Filename", filename);
        console.log("Data", data);
        // Check if filename is invalid.
        // Initialize new file object
        let fileObj = EMPTY_FILE;
        // @ts-ignore
        let address = SaveLoad.address.generate();
        fileObj["@property"].address = address;
        // @ts-ignore
        SaveLoad.address.write(address, data);
        let pathArray = path.replace(":", "").toLowerCase().split("\\");
        console.log("Parsed path", pathArray);
        // Generate file-creation string
        let evaluation = "_systemdrive";
        for (let i = 0; i < pathArray.length; i++) {
            evaluation += '["' + pathArray[i] + '"]';
        }
        evaluation += '["' + filename.toLowerCase() + '"]=' + JSON.stringify(fileObj);
        console.log(evaluation);
        eval(evaluation);
        return 0;
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
        // @ts-ignore
        return SaveLoad.address.read(fileAddress);
    }
    function filedrop(event, path) {
        console.log(event);
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