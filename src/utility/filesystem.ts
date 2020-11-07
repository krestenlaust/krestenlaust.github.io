//import {saveload} from "./saveload-system";

let Filesystem = function () {
//export class filesystem{

    const ILLEGAL_CHARACTERS = [':', ';', '+', '\\'];
    const ILLEGAL_NAMES = ['..'];

    const _systemdrive = {
        "c": {
            "@property": {truename: "C", directory: true},

            "users": {
                "@property": {truename: "Users", directory: true},

                "kress": {
                    "@property": {truename: "kress", directory: true},

                    "desktop": {
                        "@property": {truename: "Desktop", directory: true},

                        "notepad.lnk": {
                            "@property": {address: ""}
                        }
                    },

                    "readme.txt": {
                        "@property": {address: ""}
                    }
                }

            },
            "Windows": {
                "@property": {truename: "Windows", directory: true},
                "System32": {
                    "@property": {truename: "System32", directory: true}
                }

            }
        },
        "d": {
            "@property":{truename: "D", directory: true}
        }
    };

    const EMPTY_DIR = {
        "@property": {truename: undefined, directory: true}
    };
	const EMPTY_FILE = {
		"@property": {address: null}
	};

    function isPathAbsolute(path: string) {
        return path.length >= 2 && path.slice(1, 2) === ":";
    }
	
    function validateDirectory(path: string) {
        return Filesystem.getDirectory(path).length !== 0;
    }

    function getDirectory(path: string) {
        if (path === undefined){
            return []
        }
        let pathArray = path.replace(":","").toLowerCase().split("\\");

        // Generate directory-query string
        let query = "_systemdrive";
        for (let i=0; i < pathArray.length; i++){
            query += '["' + pathArray[i] + '"]'
        }

        return eval(query);
    }

    // instance, first arg
    function makeDirectory(path: string, directoryName: string) {
        // Verify that the directory name is valid
        if (ILLEGAL_NAMES.indexOf(directoryName) !== -1){
            return 1;
        }

        for (let i=0; i < ILLEGAL_CHARACTERS.length; i++){
            if (directoryName.indexOf(ILLEGAL_CHARACTERS[i])){
                return 1;
            }
        }

        // Initialize new directory object
        let directoryObj = EMPTY_DIR;
        directoryObj["@property"].truename = directoryName;

        let pathArray: string[] = path.replace(":","").toLowerCase().split("\\");

        // Generate directory-creation string
        let query = "_systemdrive";
        for (let i=0; i < pathArray.length; i++){
            query += '["' + pathArray[i] + '"]'
        }
        query += '["' + directoryName.toLowerCase() + '"]=' + JSON.stringify(directoryObj);

        eval(query);
        return 0;
    }

    /* maybe convert into writeFile */
    function makeFile(path: string, filename: string, data: object) {
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

        let pathArray: string[] = path.replace(":", "").toLowerCase().split("\\");
        console.log("Parsed path", pathArray);

        // Generate file-creation string
        let evaluation = "_systemdrive";
        for (let i=0; i < pathArray.length; i++) {
            evaluation += '["' + pathArray[i] + '"]'
        }
        evaluation += '["' + filename.toLowerCase() + '"]=' + JSON.stringify(fileObj);
        console.log(evaluation);
        eval(evaluation);
        return 0;
    }
    
    function readFile(filepath: string) {
        let pathArray: string[] = filepath.replace(":", "").toLowerCase().split("\\");

        // Generate file-query string
        let query: string = "_systemdrive";

        for (let i=0; i<pathArray.length; i++){
            query += '["' + pathArray[i] + '"]'
        }
        query += '["@property"]["address"]';

        let fileAddress = eval(query);
        // @ts-ignore
        return SaveLoad.address.read(fileAddress);
    }
    
    function filedrop(event: DragEvent, path: string) {
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


/*
    function change_directory(targ_path) {
        var new_path;
        if (targ_path.indexOf(":") === 1){ //Absolute path.
            new_path = targ_path;
        }else{ //Relative path.
            new_path = cd + '\\' + targ_path;
        }

        var dir_result = get_directory(new_path);

        if (dir_result !== undefined){ //Directory exists
            this.cd = new_path;
            return true;
        }else { //Directory doesnt exist
            return false;
        }
    }*/