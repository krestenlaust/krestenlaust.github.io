
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

        /* Public - Returns compressed byte-size or -1 */
        function write(addr, data) {
            if (supported){
                var compressed = LZString.compress(data);
                localStorage.setItem("f-" + addr, compressed);
                return compressed.length;
            }
            return -1
        }

        /* Public - Returns string at address or -1 */
        function read(addr) {
            if (supported){
                var data = localStorage.getItem("f-" + addr);
                if (data === null){
                    return -1
                }
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

    function write_file_auto(data) {
        /* Automatically generates memory address and returns it */
        let new_address = address.generate();
        address.write(new_address, data);
    }


    return { /* Globalization */
        supported: supported,

        address: address,

        write_file_auto: write_file_auto
    };
}();

saveload.supported = typeof(Storage) !== "undefined";