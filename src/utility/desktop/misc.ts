import {WindowStart} from "../Taskbar/windowsStart";

namespace Desktop {
    export class Misc {
        static desktopClick(e) {
            console.log("Desktop click");

            let objectDiv: HTMLElement;
            switch (e.target.tagName) {
                case "IMG":
                    objectDiv = e.target.parentElement;
                    break;
                case "P":
                    objectDiv = e.target.parentElement;
                    break;
                case "DIV":
                    objectDiv = e.target;
                    break;
                default:
                    selectionProperties.selected_icons = [];
            }

            if (objectDiv.getAttribute("class") === "desktop-icon") {
                let iconList = <HTMLCollectionOf<HTMLDivElement>>document.getElementsByClassName("desktop-icon");
                for (let i = 0; i < iconList.length; i++) {

                    if (iconList[i] === objectDiv && selectionProperties.selected_icons.indexOf(i) === -1) {
                        if (e.ctrlKey || e.shiftKey) {
                            selectionProperties.selected_icons.push(i);
                        } else {
                            selectionProperties.selected_icons = [i];
                        }
                    }
                }
            } else {
                selectionProperties.selected_icons = [];
            }
            update_selected_icons();
        }

        static desktopKeydown(e) {
            let iconList = <HTMLCollectionOf<HTMLDivElement>>document.getElementsByClassName("desktop-icon");

            if (e.srcElement !== document.body) {
                return;
            }

            let lastIndex = selectionProperties.keyboardSelectionIndex;
            switch (e.code) {
                case "ArrowUp":
                    //selection = index - width
                    selectionProperties.keyboardSelectionIndex -= GRID_WIDTH;
                    if (selectionProperties.keyboardSelectionIndex < 0) {
                        selectionProperties.keyboardSelectionIndex += GRID_WIDTH;
                    }

                    if (e.shiftKey) {
                        //selectionProperties.selected_icons = [... range(lastIndex, dawdwa)]
                    } else {
                        selectionProperties.selected_icons = [selectionProperties.keyboardSelectionIndex];
                    }

                    break;
                case "ArrowDown":
                    //selection = index + width
                    selectionProperties.keyboardSelectionIndex += GRID_WIDTH;
                    if (selectionProperties.keyboardSelectionIndex >= GRID_WIDTH * GRID_HEIGHT) {
                        selectionProperties.keyboardSelectionIndex -= GRID_WIDTH;
                    }

                    break;
                case "ArrowLeft":
                    //selection = index - 1
                    selectionProperties.keyboardSelectionIndex -= 1;
                    if (selectionProperties.keyboardSelectionIndex < 0) {
                        selectionProperties.keyboardSelectionIndex += 1;
                    }

                    break;
                case "ArrowRight":
                    //selection = index + 1
                    selectionProperties.keyboardSelectionIndex += 1;
                    if (selectionProperties.keyboardSelectionIndex >= GRID_WIDTH * GRID_HEIGHT) {
                        selectionProperties.keyboardSelectionIndex -= 1;
                    }
                    break;
                case "Enter":
                    for (let i = 0; i < selectionProperties.selected_icons.length; i++) {
                        eval(iconList[selectionProperties.selected_icons[i]].dataset.launch);
                    }
                    break;
            }
        }
    }
}