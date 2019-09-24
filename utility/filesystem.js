
let filesystem = function () {

    const illegal_characters = [':', ';', '+', '\\'];
    const illegal_names = ['..'];

    const systemdrive = {
        "c": {
            "@property": {truename: "C", directory: true},

            "users": {
                "@property": {truename: "Users", directory: true},

                "kress": {
                    "@property": {truename: "kress", directory: true},

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


    //let cd = "C:\\Users\\kress";
    //let cd_drive = "C";
    //let cd_p = (typeof cd.split("\\")[cd.split("\\").length - 2] === "undefined") ? cd_drive + ':\\' : cd.split("\\")[cd.split("\\").length - 2];

    function validate_directory(targ_path) {
        return get_directory(targ_path).length !== 0;
    }

    /*
    function level_down(){
        cd = cd_p;
    }*/

    function get_directory(targ_path) {
        /*if (targ_path  === "%cd%" || targ_path === ""){
            targ_path = filesystem.cd;
        }*/
        if (targ_path === undefined){
            return []
        }
        var directories = targ_path.replace(":","").toLowerCase().split("\\");
        var query = "systemdrive";
        for(var i=0;i<directories.length; i++){
            query += '["' + directories[i] + '"]'
        }
        console.log(query);
        return eval(query);
    }

    // instance, first arg
    function make_directory(directory_name, path) {
        console.log("dirname: ");
        console.log(directory_name);
        console.log("path");
        console.log(path);
        if (illegal_names.indexOf(directory_name) !== -1){
            return 1;
        }
        for (var i=0;i<illegal_characters.length;i++){
            if (directory_name.indexOf(illegal_characters[i])){
                return 1;
            }
        }


        var new_dir = EMPTY_DIR;
        new_dir["@property"].truename = directory_name;

        var directories = path.replace(":","").toLowerCase().split("\\");
        var query = "systemdrive";
        for (i=0; i<directories.length; i++){
            query += '["' + directories[i] + '"]'
        }
        query += '["' + directory_name.toLowerCase() + '"]=' + JSON.stringify(new_dir);

        eval(query);
        return 0;
    }

    return { /* Globalization */
        //cd: cd,
        //cd_drive: cd_drive,
        //cd_p: cd_p,

        //change_directory: change_directory,
        //level_down: level_down,
        make_directory: make_directory,
        get_directory: get_directory,
        validate_directory: validate_directory,
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