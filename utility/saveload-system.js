
let saveload = function () {

    let supported = false;

    let address = function () { //Addresses are strictly used for content of files

        function exists(addr) {
            if (supported){
                return localStorage.getItem("f-" + addr) !== null
            }
        }

        function generate() {
            let new_addr;
            do {
                new_addr = Math.floor(Math.random() * 10).toString();
                new_addr += Math.floor(Math.random() * 10).toString();
                new_addr += String.fromCharCode(Math.floor(Math.random() * 7) + 97);
                new_addr += String.fromCharCode(Math.floor(Math.random() * 7) + 97);
                new_addr += String.fromCharCode(Math.floor(Math.random() * 7) + 97);
                new_addr += String.fromCharCode(Math.floor(Math.random() * 7) + 97);
            }
            while (exists(new_addr)){ //Will result in page freeze if more than 129600 addresses exist
                new_addr = Math.floor(Math.random() * 10).toString();
                new_addr += Math.floor(Math.random() * 10).toString();
                new_addr += String.fromCharCode(Math.floor(Math.random() * 7) + 97);
                new_addr += String.fromCharCode(Math.floor(Math.random() * 7) + 97);
                new_addr += String.fromCharCode(Math.floor(Math.random() * 7) + 97);
                new_addr += String.fromCharCode(Math.floor(Math.random() * 7) + 97);
            }
            if (supported){
                write(new_addr, ""); //Opens address
            }
            return new_addr;
        }

        function write(addr, data) {
            if (supported){
                var compressed = LZString.compress(data);
                localStorage.setItem("f-" + addr, compressed);
                return compressed.length;
            }
            return -1
        }

        function read(addr) {
            if (supported){
                var data = localStorage.getItem("f-" + addr);
                return LZString.decompress(data);
            }
            return -1
        }

        return {
            write: write,
            read: read,
            exists: exists,
            generate: generate
        };
    }();

    
    function save_filesystem() {
        
    }
    
    function load_filesystem() {

    }


    return { /* Globalization */
        supported: supported,

        address: address
    };
}();

saveload.supported = typeof(Storage) !== "undefined";