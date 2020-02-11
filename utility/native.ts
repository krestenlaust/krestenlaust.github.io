import {system} from "./System";

export class native{

    static _environmental_variables = {  // Er vel det samme som er i System.ts.

    };

    static _envObject = {
        "working_directory": system.env.user_home,
        "errorlevel": 0
    };

    static get(pid: string, key: string) {
        if (native._environmental_variables[pid] === undefined){
            native._environmental_variables[pid] = native._envObject;
        }
        return native._environmental_variables[pid][key];
    }

    static set(pid: string, key: string, value: string) {
        if (native._environmental_variables[pid] === undefined){
            native._environmental_variables[pid] = native._envObject;
        }
        native._environmental_variables[pid][key] = value;
    }
}