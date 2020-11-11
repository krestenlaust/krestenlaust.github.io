//import {system} from "./system";
//export class native{
let Native = function () {
    // List of environments specified by process ID.
    const _localEnvironmentList = {};
    // Individual environment accessed by individual applications.
    const _localEnvironment = {
        "working_directory": System.globalEnv.user_home,
        "errorlevel": 0,
    };
    function get(pid, key) {
        if (_localEnvironmentList[pid] === undefined) {
            _localEnvironmentList[pid] = _localEnvironment;
        }
        return _localEnvironmentList[pid][key];
    }
    function set(pid, key, value) {
        if (_localEnvironmentList[pid] === undefined) {
            _localEnvironmentList[pid] = _localEnvironment;
        }
        _localEnvironmentList[pid][key] = value;
    }
    return {
        get: get,
        set: set
    };
}();
//# sourceMappingURL=native.js.map