let desktop_menu = [
    {
        name: 'View',
        //img: ''
        //title: 'View',
        subMenu: [
            {
                name: 'Large icons',
                //title: 'Large icons',
                fun: function () {
                    alert("Enabled Large icons");
                }
            },
            {
                name: 'Medium icons',
                fun: function () {
                    alert("Enabled Medium icons");
                }
            },
            {
                name: 'Small icons',
                fun: function () {
                    alert("Enabled Small icons");
                }
            },
            {
                name: '',
                seperator: true
            },
            {
                name: 'Arrange icons automatically',
                fun: function () {
                    alert("Arranging icons automatically");
                }
            },
            {
                name: 'Adjust icons to grid',
                fun: function () {
                    alert("Adjusting icons to grid");
                }
            },
            {
                name: '',
                seperator: true
            },
            {
                name: 'Show icons on desktop',
                fun: function () {
                    alert("Showing icons");
                }
            }
        ]
    },
    {
        name: 'Sort by',
        disable: true,
        subMenu: [
            {
                name: 'Dud'
            }
        ]
    },
    {
        name: 'Refresh',
        fun: function () {
            desktop.refresh_desktop();
        }
    },
    {
        name: '',
        seperator: true
    },
    {
        name: 'Paste',
        fun: function () {
            alert("Pasting")
        }
    },
    {
        name: 'Next wallpapert',
        fun: function () {
            alert("Rotating wallpaper");
        }
    },
    {
        name: 'New',
        subMenu: [
            {
                name: 'Folder',
                img: 'resources/Windows-icons/folder_icon.ico',
                fun: function () {
                    alert("Creating folder");
                }
            },
            {
                name: 'Shortcut',
                fun: function () {
                    alert("Shortcut");
                }
            },
            {
                name: '',
                seperator: true
            },
            {
                name: 'Text Document',
                fun: function () {
                    alert("Txt");
                }
            }
        ]
    },
    {
        name: '',
        seperator: true
    },
    {
        name: 'Personalize',
        img: 'resources/Windows-icons/personalize_icon.ico',
        fun: function () {
            alert("Opening");
        }
    }
];

$('body').contextMenu(desktop_menu,{triggerOn:'contextmenu'});