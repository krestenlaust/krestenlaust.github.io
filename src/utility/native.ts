//import {system} from "./system";

//export class native{
let Native = function () {

    let _environmentalVariables = {  // Er vel det samme som er i System.ts.

    };

    let _envObject = {
        "working_directory": system.env.user_home,
        "errorlevel": 0
    };

    function get(pid: string, key: string) {
        if (_environmentalVariables[pid] === undefined){
            _environmentalVariables[pid] = _envObject;
        }
        return _environmentalVariables[pid][key];
    }

    function set(pid: string, key: string, value: string) {
        if (_environmentalVariables[pid] === undefined){
            _environmentalVariables[pid] = _envObject;
        }
        _environmentalVariables[pid][key] = value;
    }

    return {
        get: get,
        set: set
    }
}();