namespace Taskbar {
    export class WindowsStart {
        isOpen = false;
        containerElement: HTMLDivElement;

        constructor(containerElement: HTMLDivElement) {
            this.containerElement = containerElement;

            containerElement.addEventListener("click", this.startClick);
        }

        refreshMenuState() {
            let elem = this.containerElement.getElementsByClassName("startmenu")[0];
            if (this.isOpen) {
                elem.setAttribute("data-expanded", "1");
            } else {
                elem.setAttribute("data-expanded", "");
            }
        }

        startClick() {
            this.isOpen = !this.isOpen;
            this.refreshMenuState();
        }
    }
}
