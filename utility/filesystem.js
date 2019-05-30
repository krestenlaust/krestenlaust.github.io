
let filesystem = function () {

    const illegal_characters = [':', ';', '+', '\\'];
    const illegal_names = ['..'];

    let systemdrive = {
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

    const empty_dir = {
        "@property": {truename: "", directory: true}
    };
	
	const empty_file = {
		"@property": {address: ""}
	};


    let cd = "C:\\Users\\kress";
    let cd_drive = "C";
    //let cd_p = (typeof cd.split("\\")[cd.split("\\").length - 2] === "undefined") ? cd_drive + ':\\' : cd.split("\\")[cd.split("\\").length - 2];

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

    function validate_directory(targ_path) {
        return get_directory(targ_path) !== undefined
    }

    /*
    function level_down(){
        cd = cd_p;
    }*/

    function get_directory(targ_path = "") {
        if (targ_path  === "%cd%" || targ_path === ""){
            targ_path = filesystem.cd;
        }
        var directories = targ_path.replace(":","").toLowerCase().split("\\");
        var query = "systemdrive";
        for(var i=0;i<directories.length; i++){
            query += '["' + directories[i] + '"]'
        }
        console.log(query);
        return eval(query);
    }

    function make_directory(instance, dirname, path = cd) {
        if (illegal_names.indexOf(dirname) !== -1){
            cmd.env.errorlevel = 1;

            return false;
        }
        for (var i=0;i<illegal_characters.length;i++){
            if (dirname.indexOf(illegal_characters[i])){
                cmd.env.errorlevel = 1;
                return false;
            }
        }


        var new_dir = empty_dir;
        new_dir["@property"].truename = dirname;

        var directories = path.replace(":","").toLowerCase().split("\\");
        var query = "systemdrive";
        for(var i=0;i<directories.length; i++){
            query += '["' + directories[i] + '"]'
        }
        query += '["' + dirname.toLowerCase() + '"]=' + JSON.stringify(new_dir);

        eval(query);
    }

    return { /* Globalization */
        cd: cd,
        cd_drive: cd_drive,
        //cd_p: cd_p,

        change_directory: change_directory,
        //level_down: level_down,
        make_directory: make_directory,
        get_directory: get_directory,
        validate_directory: validate_directory
    };
}();