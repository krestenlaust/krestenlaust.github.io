//import {system} from "./system";
//export class native{
let native = function () {
    let _environmental_variables = { // Er vel det samme som er i System.ts.
    };
    let _envObject = {
        "working_directory": system.env.user_home,
        "errorlevel": 0
    };
    function get(pid, key) {
        if (_environmental_variables[pid] === undefined) {
            _environmental_variables[pid] = _envObject;
        }
        return _environmental_variables[pid][key];
    }
    function set(pid, key, value) {
        if (_environmental_variables[pid] === undefined) {
            _environmental_variables[pid] = _envObject;
        }
        _environmental_variables[pid][key] = value;
    }
    return {
        get: get,
        set: set
    };
}();
//# sourceMappingURL=native.js.map