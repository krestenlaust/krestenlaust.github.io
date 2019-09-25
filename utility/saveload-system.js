
let saveload = function () {

    let supported = false;

    let address = function () { //Addresses are strictly used for content of files

        function exists(addr) {
            if (saveload.supported){
                return localStorage.getItem("f" + addr) !== null
            }
            return false;
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
            while (exists(new_addr)); //Will result in page freeze if more than 129600 addresses exist

            write(new_addr, ""); //Opens address
            return new_addr;
        }

        /* Public - Returns compressed byte-size or -1 */
        function write(addr, data) {
            if (saveload.supported){
                var compressed = LZString.compress(data);
                localStorage.setItem("f" + addr, compressed);
                return compressed.length;
            }
            return -1;
        }

        /* Public - Returns string at address or -1 */
        function read(addr) {
            if (saveload.supported){
                var data = localStorage.getItem("f" + addr);
                if (data === null){
                    return -1
                }
                return LZString.decompress(data);
            }
            return -1;
        }

        function reset(addr){
            if (saveload.supported){
                localStorage.removeItem("f" + addr);
            }
        }

        return {
            write: write,
            read: read,
            reset: reset,
            exists: exists,
            generate: generate
        };
    }();

    
    function save_filesystem() {
        
    }
    
    function load_filesystem() {

    }

    function write_file_auto(data) {
        /* Automatically generates memory address and returns it */
        let new_address = address.generate();
        address.write(new_address, data);
        return new_address;
    }


    return { /* Globalization */
        supported: supported,
        address: address,

        write_file_auto: write_file_auto
    };
}();

saveload.supported = typeof(Storage) !== "undefined";