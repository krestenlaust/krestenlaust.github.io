import {Filesystem} from "../filesystem";

namespace Desktop {
    export class Desktop {
        static desktopFileGrid: FileGrid = new FileGrid(8, 4, "\"C:\\Users\\kress\\desktop", <HTMLDivElement>document.getElementById("desktop"));

        static async transferDataToFile(file: File) {
            Filesystem.makeFile("C:\\Users\\kress\\desktop\\" + file.name, await file.text());
        }

        static refreshDesktop() {
            this.desktopFileGrid.updateGrid();
        }

        static loadDesktop() {
            document.getElementById("desktop").addEventListener("click", desktop_click);
            document.addEventListener("keydown", desktop_keydown);
        }

        static desktopFiledrop(e) {
            e.preventDefault();

            if (!e.dataTransfer.items) {
                return;
            }

            for (let i = 0; i < e.dataTransfer.items.length; i++) {
                if (e.dataTransfer.items[i].kind === "file") {
                    let file = e.dataTransfer.items[i].getAsFile();
                    transferDataToFile(file);
                }
            }
        }

        static desktopDragOver(e) {
            e.preventDefault();
        }
    }

    /*
    function doubleclick_timer() {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve('resolved');
            }, 500);
        });
    }*/
}
