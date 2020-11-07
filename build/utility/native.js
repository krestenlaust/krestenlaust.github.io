//import {system} from "./system";
//export class native{
let Native = function () {
    let _environmentalVariables = { // Er vel det samme som er i System.ts.
    };
    let _envObject = {
        "working_directory": System.env.user_home,
        "errorlevel": 0
    };
    function get(pid, key) {
        if (_environmentalVariables[pid] === undefined) {
            _environmentalVariables[pid] = _envObject;
        }
        return _environmentalVariables[pid][key];
    }
    function set(pid, key, value) {
        if (_environmentalVariables[pid] === undefined) {
            _environmentalVariables[pid] = _envObject;
        }
        _environmentalVariables[pid][key] = value;
    }
    return {
        get: get,
        set: set
    };
}();
//# sourceMappingURL=native.js.map