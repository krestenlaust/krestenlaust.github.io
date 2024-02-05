import {Filesystem} from "../filesystem";

namespace Desktop {
    export class Desktop {
        static desktopFileGrid: FileGrid;

        static async transferDataToFile(file: File) {
            Filesystem.makeFile("C:\\Users\\kress\\desktop\\" + file.name, await file.text());
        }

        static refreshDesktop() {
            this.desktopFileGrid.updateGrid();
        }

        static loadDesktop() {
            this.desktopFileGrid = new FileGrid(
                <HTMLDivElement>document.getElementById("desktop"),
                8,
                4,
                "\"C:\\Users\\kress\\desktop"
            )
        }
    }
}
