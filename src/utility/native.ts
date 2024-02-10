import {System} from "./system";

export class Native {
    // List of environments specified by process ID.
    static localEnvironmentList = {};

    // Individual environment accessed by individual applications.
    static localEnvironment = {
        "cd": System.env.user_home,
        "errorlevel": 0,
    };

    static get(pid: string, key: string): object {
        if (Native.localEnvironmentList[pid] === undefined) {
            Native.localEnvironmentList[pid] = Native.localEnvironment;
        }

        return Native.localEnvironmentList[pid][key];
    }

    static set(pid: string, key: string, value: object) {
        if (Native.localEnvironmentList[pid] === undefined) {
            Native.localEnvironmentList[pid] = Native.localEnvironment;
        }

        Native.localEnvironmentList[pid][key] = value;
    }
}