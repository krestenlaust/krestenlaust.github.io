import { system } from "./System";
export class native {
    static get(pid, key) {
        if (native._environmental_variables[pid] === undefined) {
            native._environmental_variables[pid] = native._envObject;
        }
        return native._environmental_variables[pid][key];
    }
    static set(pid, key, value) {
        if (native._environmental_variables[pid] === undefined) {
            native._environmental_variables[pid] = native._envObject;
        }
        native._environmental_variables[pid][key] = value;
    }
}
native._environmental_variables = { // Er vel det samme som er i System.ts.
};
native._envObject = {
    "working_directory": system.env.user_home,
    "errorlevel": 0
};
