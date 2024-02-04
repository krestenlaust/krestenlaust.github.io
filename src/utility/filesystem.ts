import {SaveLoad} from "./saveloadSystem";

export class Filesystem {

    static ILLEGAL_CHARACTERS = [':', ';', '+', '\\'];
    static ILLEGAL_NAMES = ['..'];

    static _systemdrive = {
        "c": {
            "@property": {truename: "C", directory: true},

            "users": {
                "@property": {truename: "Users", directory: true},

                "kress": {
                    "@property": {truename: "kress", directory: true},

                    "desktop": {
                        "@property": {truename: "Desktop", directory: true}
                    }
                }

            },
            "Windows": {
                "@property": {truename: "Windows", directory: true},
                "System32": {
                    "@property": {truename: "System32", directory: true}
                }

            }
        },
        "d": {
            "@property": {truename: "D", directory: true}
        }
    };

    static EMPTY_DIR = {
        "@property": {truename: undefined, directory: true}
    };
    static EMPTY_FILE = {
        "@property": {address: undefined}
    };

    static parsePath(path: string): string[] {
        return path.replace(":", "").toLowerCase().split("\\");
    }

    static isPathAbsolute(path: string): boolean {
        return path.length >= 2 && path.slice(1, 2) === ":";
    }

    static validateDirectory(path: string): boolean {
        return true;//Filesystem.getDirectory(path).length !== 0;
    }

    static getDirectory(path: string): object {
        if (path === undefined) {
            return [];
        }

        let pathArray = Filesystem.parsePath(path);

        // Generate directory-query string
        let query = "_systemdrive";
        for (let i = 0; i < pathArray.length; i++) {
            query += '["' + pathArray[i] + '"]'
        }

        return eval(query);
    }

    // instance, first arg
    static makeDirectory(path: string, directoryName: string) {
        // Verify that the directory name is valid
        if (Filesystem.ILLEGAL_NAMES.indexOf(directoryName) !== -1) {
            return 1;
        }

        for (let i = 0; i < Filesystem.ILLEGAL_CHARACTERS.length; i++) {
            if (directoryName.indexOf(Filesystem.ILLEGAL_CHARACTERS[i]) !== -1) {
                return 1;
            }
        }

        // Initialize new directory object
        let directoryObj = Filesystem.EMPTY_DIR;
        directoryObj["@property"].truename = directoryName;

        let pathArray: string[] = this.parsePath(path);

        // Generate directory-creation string
        let query = "_systemdrive";
        for (let i = 0; i < pathArray.length; i++) {
            query += '["' + pathArray[i] + '"]'
        }
        query += '["' + directoryName.toLowerCase() + '"]=' + JSON.stringify(directoryObj);

        eval(query);
        return 0;
    }

    /* maybe convert into writeFile */
    static makeFile(filepath: string, data: string): boolean {
        console.log(`WriteFile: ${filepath} - content: ${data}`);
        console.log("Data", data);
        // Check if filename is invalid.

        // Initialize new file object
        let fileObj = Filesystem.EMPTY_FILE;
        let address = SaveLoad.Address.generate();
        fileObj["@property"].address = address;
        SaveLoad.Address.write(address, data);

        let pathArray: string[] = Filesystem.parsePath(filepath);
        console.log("Parsed path", pathArray);
        let filename = pathArray.pop();

        // Generate file-creation string
        let evaluation = "_systemdrive";
        for (let i = 0; i < pathArray.length; i++) {
            evaluation += '["' + pathArray[i] + '"]'
        }

        evaluation += '["' + filename.toLowerCase() + '"]=' + JSON.stringify(fileObj);
        console.log(evaluation);
        eval(evaluation);
        return true;
    }

    static readFile(filepath: string): string {
        let pathArray: string[] = filepath.replace(":", "").toLowerCase().split("\\");

        // Generate file-query string
        let query: string = "_systemdrive";

        for (let i = 0; i < pathArray.length; i++) {
            query += '["' + pathArray[i] + '"]'
        }
        query += '["@property"]["address"]';

        let fileAddress = eval(query);
        return JSON.stringify(SaveLoad.Address.read(fileAddress));
    }

    static filedrop(event: DragEvent, path: string) {
        console.log(event, "File has been dropped");
    }
}
