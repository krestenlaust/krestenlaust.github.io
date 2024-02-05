import {Filesystem} from "../filesystem";
import * as lodash from "ext/lodash.js"

namespace Desktop {
    export class FileGrid {
        static readonly DOUBLE_CLICK_INTERVAL = 500; //Windows standard according to https://ux.stackexchange.com/a/40366
        doubleClickPending: boolean = false;

        gridIcons = {
            0: {
                "type": "shortcut",
                "launch": "",
                "name": "Recycle bin",
                "icon": "resources/Windows-icons/recycle_bin.ico"
            },
            3: {
                "type": "shortcut",
                "launch": "TaskManager.startApplication('cmd')",
                "icon": "resources/Windows-icons/cmd.ico",
                "name": "Command Prompt"
            },
            2: {
                "type": "shortcut",
                "launch": "TaskManager.startApplication('notepad')",
                "icon": "resources/Windows-icons/notepad.ico",
                "name": "Notepad"
            }
        };

        gridWidth: number; //GRID_WIDTH = 8;
        gridHeight: number; //GRID_HEIGHT = 4;
        folderPath: string; // "C:\\Users\\kress\\desktop"
        containerElement: HTMLDivElement; // document.getElementById("desktop")

        constructor(gridWidth: number, gridHeight: number, folderPath: string, containerElement: HTMLDivElement) {
            this.gridWidth = gridWidth;
            this.gridHeight = gridHeight;
            this.folderPath = folderPath;
            this.containerElement = containerElement;
        }

        updateGrid(){
            let desktopDirectory = Filesystem.getDirectory(this.folderPath);
            let icons = [];
            this.containerElement.innerHTML = "";

            for (let i = 0; i < this.gridHeight * this.gridWidth; i++) {
                let current_icon = this.gridIcons[i];

                if (current_icon === undefined) {
                    this.containerElement.innerHTML += FileGrid.emptyIcon(i);
                } else if (current_icon["type"] === "shortcut") {
                    this.containerElement.innerHTML += FileGrid.generateShortcut(current_icon["icon"], current_icon["name"], current_icon["launch"], i)
                }
            }
        }

        private static emptyIcon(index: number) {
            return `<div ondrop="desktop_drop(event)" ondragover="desktop_dragOver(event)" class="icon-parent"><div class="space" data-index="${index}"></div></div>`
        }

        private static generateShortcut(icon_href: string, icon_text: string, icon_launch: string, index: number) {
            return `<div ondrop="desktop_drop(event)" ondragover="desktop_dragOver(event)" class="icon-parent"><div class="space desktop-icon" data-index="${index}" data-launch="${icon_launch}" onclick="icon_click(this)" draggable="true" ondragstart="desktop_dragStart(event)"><img class="desktop-icon-image" src="${icon_href}"><p class="desktop-icon-text">${icon_text}</p></div></div>`
        }

        iconClick(element) {
            if (this.doubleClickPending) {
                eval(element.dataset.launch);
                this.doubleClickPending = false;
            }

            this.doubleClickPending = true;
            this.doubleclickTimerStart();
        }

        private doubleclickTimerStart = lodash._.debounce(() => this.doubleClickPending = false, FileGrid.DOUBLE_CLICK_INTERVAL);

        private updateSelectedIcons() {
            let iconList = <HTMLCollectionOf<HTMLDivElement>>this.containerElement.getElementsByClassName("desktop-icon");

            for (let i = 0; i < iconList.length; i++) {
                if (this.selectionProperties.selected_icons.indexOf(i) !== -1) {
                    iconList[i].classList.add("selected")
                } else {
                    try {
                        iconList[i].classList.remove("selected");
                    } catch (e) {
                    }
                }
            }
        }

        private selectionProperties = {
            selected_icons: [],
            keyboardSelectionIndex: 0
        };

        dragging = class {
            private draggingIndex = 0;
        }

        desktopDrop(e) {
            e.preventDefault();

            let targetElement = e.target;
            /*if (e.dataTransfer.items){
                for (let i=0; i < e.dataTransfer.items.length; i++){
                    if (e.dataTransfer.items[i].kind === "file"){
                        let file = e.dataTransfer.items[i].getAsFile();
                        Filesystem.makeFile("C:\\Users\\kress\\desktop\\" + file.name, file.text);
                    }
                }
            }*/

            let fromIndex = this.draggingIndex;
            if (!targetElement.classList.contains("space")) {
                if (targetElement.classList.contains("icon-parent")) {
                    targetElement = targetElement.children[0];
                } else {
                    targetElement = targetElement.parentElement;
                }
            }

            let toIndex = parseInt(targetElement.dataset.index);
            if (targetElement.classList.contains("desktop-icon")) { // Not empty
                // Launch icon with dragged icon as parameter to mimic default windows behavior.
            } else {
                let tempObj = this.gridIcons[fromIndex];
                this.gridIcons[fromIndex] = this.gridIcons[toIndex];
                this.gridIcons[toIndex] = tempObj;
                this.updateGrid();
            }

            console.log(e);
        }

        static desktopDragStart(e) {
            let targetElement = e.target;

            if (!targetElement.classList.contains("space")) {
                if (targetElement.classList.contains("icon-parent")) {
                    targetElement = targetElement.children[0];
                } else {
                    targetElement = targetElement.parentElement;
                }
            }

            draggingIndex = parseInt(targetElement.dataset.index);
        }
    }
}