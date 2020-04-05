//export class saveload{
let saveload = function () {
    let supported = typeof (Storage) !== "undefined"; // false
    //static address = class {  // Addresses are strictly used in context of files
    let address = function () {
        function exists(addr) {
            if (supported) {
                return localStorage.getItem("f" + addr) !== null;
            }
            return false;
        }
        /* Public, for use by the auto function */
        function generate() {
            let new_addr;
            do {
                new_addr = Math.floor(Math.random() * 10).toString();
                new_addr += Math.floor(Math.random() * 10).toString();
                new_addr += String.fromCharCode(Math.floor(Math.random() * 7) + 97);
                new_addr += String.fromCharCode(Math.floor(Math.random() * 7) + 97);
                new_addr += String.fromCharCode(Math.floor(Math.random() * 7) + 97);
                new_addr += String.fromCharCode(Math.floor(Math.random() * 7) + 97);
            } while (exists(new_addr)); //Will result in page freeze if more than 129600 addresses exist
            saveload.address.write(new_addr, ""); //Opens address
            return new_addr;
        }
        /* Public - Returns compressed byte-size or -1 */
        function write(addr, data) {
            if (supported) {
                // @ts-ignore
                let compressed = LZString.compress(data);
                localStorage.setItem("f" + addr, compressed);
                return compressed.length;
            }
            return -1;
        }
        /* Public - Returns string at address or -1 */
        function read(addr) {
            if (supported) {
                let data = localStorage.getItem("f" + addr);
                if (data === null) {
                    return -1;
                }
                // @ts-ignore
                return LZString.decompress(data);
            }
            return -1;
        }
        function reset(addr) {
            if (supported) {
                localStorage.removeItem("f" + addr);
            }
        }
        return {
            write: write,
            read: read,
            reset: reset,
            generate: generate
        };
    }();
    //let address = function () {
    function write_file_auto(data) {
        /* Automatically generates memory address and returns it */
        let new_address = address.generate();
        address.write(new_address, data);
        return new_address;
    }
    return {
        write_file_auto: write_file_auto,
        address: address
    };
}();
//saveload.supported = typeof(Storage) !== "undefined";
//# sourceMappingURL=saveload-system.js.map