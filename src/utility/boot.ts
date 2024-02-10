import {Filesystem} from "./filesystem";
import {System} from "./system";

export class Boot {
    // Loads hard-coded things onto the system if they aren't already present
    static loadSystem() {
        Filesystem.makeFile(`C:\\Users\\${System.env.username}\\readme.txt`, "Hello there");
    }
}
