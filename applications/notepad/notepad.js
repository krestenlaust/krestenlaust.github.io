//make_draggable(document.getElementById("notepad-window-1"), document.getElementById("notepad-window-top-1"));
let Notepad = function () {
    
    function save() {
        
    }
    
    function load() {
        
    }
    
    return{
        save: save,
        load: load
    };
}();


/* Context menus */
let notepad_toolbar_menu__files = [
    {
        name: 'New'
    },
    {
        name: 'Open...'
    },
    {
        name: 'Save'
    },
    {
        name: 'Save as...'
    },
    {
        //name: '',
        seperator: true
    },
    {
        name: 'Page setup...'
    },
    {
        name: 'Print...'
    },
    {
        seperator: true
    },
    {
        name: 'Close'
    }
];
let notepad_toolbar_menu__edit = [
    {
        name: 'Undo'
    },
    {
        seperator: true
    },
    {
        name: 'Cut'
    },
    {
        name: 'Copy'
    },
    {
        name: 'Paste'
    },
    {
        name: 'Delete'
    },
    {
        //name: '',
        seperator: true
    },
    {
        name: 'Find...'
    },
    {
        name: 'Find next'
    },
    {
        name: 'Replace...'
    },
    {
        name: 'Goto...'
    },
    {
        seperator: true
    },
    {
        name: 'Select all'
    }
];

$('button.toolbar-button')[0].contextMenu(notepad_toolbar_menu__files, {
    position: 'bottom',
    displayAround: 'trigger'
});