import {System} from "./system";

export class Native {
    // List of environments specified by process ID.
    static _localEnvironmentList = {};

    // Individual environment accessed by individual applications.
    static _localEnvironment = {
        "cd": System.env.user_home,
        "errorlevel": 0,
    };

    static get(pid: string, key: string): object {
        if (Native._localEnvironmentList[pid] === undefined) {
            Native._localEnvironmentList[pid] = Native._localEnvironment;
        }

        return Native._localEnvironmentList[pid][key];
    }

    static set(pid: string, key: string, value: object) {
        if (Native._localEnvironmentList[pid] === undefined) {
            Native._localEnvironmentList[pid] = Native._localEnvironment;
        }

        Native._localEnvironmentList[pid][key] = value;
    }
}