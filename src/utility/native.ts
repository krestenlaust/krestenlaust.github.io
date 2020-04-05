//import {system} from "./system";

//export class native{
let native = function () {

    let _environmental_variables = {  // Er vel det samme som er i System.ts.

    };

    let _envObject = {
        "working_directory": system.env.user_home,
        "errorlevel": 0
    };

    function get(pid: string, key: string) {
        if (_environmental_variables[pid] === undefined){
            _environmental_variables[pid] = _envObject;
        }
        return _environmental_variables[pid][key];
    }

    function set(pid: string, key: string, value: string) {
        if (_environmental_variables[pid] === undefined){
            _environmental_variables[pid] = _envObject;
        }
        _environmental_variables[pid][key] = value;
    }

    return {
        get: get,
        set: set
    }
}();