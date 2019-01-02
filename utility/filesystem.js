
let filesystem = function () {

    let systemdrive = {
        "c": {
            "@property": {truename: "C", directory: true},

            "users": {
                "@property": {truename: "Users", directory: true},

                "kress": {
                    "@property": {},

                    "index.html": {
                        "@property": {address: ""}
                    }
                }

            },
            "Windows": {
                "@property": {truename: "Windows"}

            }
        },
        "d": {
            "@property":{truename: "D", directory: true}
        }
    };

    const empty_dir = {
        "@property": {truename: "", directory: true}
    };


    let cd = "C:\\Users\\kress";
    let cd_drive = "C";
    let cd_p = (typeof cd.split("\\")[cd.split("\\").length - 2] === "undefined") ? cd_drive + ':\\' : cd.split("\\")[cd.split("\\").length - 2];

    function cd_relative(folder) {

    }

    function level_down(){
        cd = cd_p;
    }

    function get_directory(targ_path = "") {
        if (targ_path  === "%cd%" || targ_path === ""){
            targ_path = filesystem.cd;
        }
        var directories = targ_path.replace(":","").toLowerCase().split("\\");
        var query = "systemdrive";
        for(var i=0;i<directories.length; i++){
            query += '["' + directories[i] + '"]'
        }
        return eval(query);
    }

    function make_directory(dirname, path = cd) {
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
        cd_p: cd_p,

        cd_relative: cd_relative,
        level_down: level_down,
        make_directory: make_directory,
        get_directory: get_directory
    };
}();