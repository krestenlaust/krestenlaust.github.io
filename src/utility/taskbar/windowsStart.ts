namespace Taskbar {
    export class WindowsStart {
        static isOpen = false;

        setup() {
            document.getElementById("windows-startbutton").addEventListener("click", startClick);
        }

        static refreshMenuState() {
            let elem = document.getElementsByClassName("startmenu")[0];
            if (isOpen) {
                elem.setAttribute("data-expanded", "1");
            } else {
                elem.setAttribute("data-expanded", "");
            }
        }

        static startClick() {
            this.isOpen = !this.isOpen;
            this.refreshMenuState();
        }
    }
}
