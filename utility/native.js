let native = function () {

    const environmental_variables = {

    };

    const envObject = {
        "working_directory": system.env.user_home,
        "errorlevel": 0
    };

    function get(pid, key) {
        if (environmental_variables[pid] === undefined){
            environmental_variables[pid] = envObject;
        }
        return environmental_variables[pid][key];
    }

    function set(pid, key, value) {
        if (environmental_variables[pid] === undefined){
            environmental_variables[pid] = envObject;
        }
        environmental_variables[pid][key] = value;
    }

    return {
        get: get,
        set: set
    };
}();