"use strict";
exports.__esModule = true;
var saveload_system_1 = require("./saveload-system");
var filesystem = function () {
    var illegal_characters = [':', ';', '+', '\\'];
    var illegal_names = ['..'];
    var systemdrive = {
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
    var EMPTY_DIR = {
        "@property": { truename: undefined, directory: true }
    };
    var EMPTY_FILE = {
        "@property": { address: null }
    };
    function isPathAbsolute(path) {
        return path.length >= 2 && path.slice(1, 2) === ":";
    }
    function validate_directory(path) {
        return get_directory(path).length !== 0;
    }
    function get_directory(path) {
        if (path === undefined) {
            return [];
        }
        var path_array = path.replace(":", "").toLowerCase().split("\\");
        // Generate directory-query string
        var query = "systemdrive";
        for (var i = 0; i < path_array.length; i++) {
            query += '["' + path_array[i] + '"]';
        }
        return eval(query);
    }
    // instance, first arg
    function make_directory(path, directory_name) {
        // Verify that the directory name is valid
        if (illegal_names.indexOf(directory_name) !== -1) {
            return 1;
        }
        for (var i = 0; i < illegal_characters.length; i++) {
            if (directory_name.indexOf(illegal_characters[i])) {
                return 1;
            }
        }
        // Initialize new directory object
        var directory_obj = EMPTY_DIR;
        directory_obj["@property"].truename = directory_name;
        var path_array = path.replace(":", "").toLowerCase().split("\\");
        // Generate directory-creation string
        var query = "systemdrive";
        for (var i = 0; i < path_array.length; i++) {
            query += '["' + path_array[i] + '"]';
        }
        query += '["' + directory_name.toLowerCase() + '"]=' + JSON.stringify(directory_obj);
        eval(query);
        return 0;
    }
    function make_file(path, filename, data) {
        console.log("Path", path);
        console.log("Filename", filename);
        console.log("Data", data);
        // Check if filename is invalid.
        // Initialize new file object
        var file_obj = EMPTY_FILE;
        var address = saveload_system_1.saveload.address.generate();
        file_obj["@property"].address = address;
        saveload_system_1.saveload.address.write(address, data);
        var path_array = path.replace(":", "").toLowerCase().split("\\");
        console.log("Parsed path", path_array);
        // Generate file-creation string
        var evaluation = "systemdrive";
        for (var i = 0; i < path_array.length; i++) {
            evaluation += '["' + path_array[i] + '"]';
        }
        evaluation += '["' + filename.toLowerCase() + '"]=' + JSON.stringify(file_obj);
        console.log(evaluation);
        eval(evaluation);
        return 0;
    }
    function read_file(filepath) {
        var path_array = filepath.replace(":", "").toLowerCase().split("\\");
        // Generate file-query string
        var query = "systemdrive";
        for (var i = 0; i < path_array.length; i++) {
            query += '["' + path_array[i] + '"]';
        }
        query += '["@property"]["address"]';
        var file_address = eval(query);
        // @ts-ignore
        return saveload_system_1.saveload.address.read(file_address);
    }
    function filedrop(event, path) {
        console.log(event);
    }
    return {
        make_directory: make_directory,
        get_directory: get_directory,
        validate_directory: validate_directory,
        read_file: read_file,
        make_file: make_file,
        isPathAbsolute: isPathAbsolute,
        filedrop: filedrop,
        systemdrive: systemdrive
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
