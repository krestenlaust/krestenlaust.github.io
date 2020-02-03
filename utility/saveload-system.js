"use strict";
exports.__esModule = true;
//let saveload = function () {
var saveload = /** @class */ (function () {
    function saveload() {
    }
    saveload.supported = typeof (Storage) !== "undefined"; // false
    saveload.address = /** @class */ (function () {
        function class_1() {
        }
        class_1.exists = function (addr) {
            if (saveload.supported) {
                return localStorage.getItem("f" + addr) !== null;
            }
            return false;
        };
        class_1.generate = function () {
            var new_addr;
            do {
                new_addr = Math.floor(Math.random() * 10).toString();
                new_addr += Math.floor(Math.random() * 10).toString();
                new_addr += String.fromCharCode(Math.floor(Math.random() * 7) + 97);
                new_addr += String.fromCharCode(Math.floor(Math.random() * 7) + 97);
                new_addr += String.fromCharCode(Math.floor(Math.random() * 7) + 97);
                new_addr += String.fromCharCode(Math.floor(Math.random() * 7) + 97);
            } while (saveload.address.exists(new_addr)); //Will result in page freeze if more than 129600 addresses exist
            saveload.address.write(new_addr, ""); //Opens address
            return new_addr;
        };
        /* Public - Returns compressed byte-size or -1 */
        class_1.write = function (addr, data) {
            if (saveload.supported) {
                // @ts-ignore
                var compressed = LZString.compress(data);
                localStorage.setItem("f" + addr, compressed);
                return compressed.length;
            }
            return -1;
        };
        /* Public - Returns string at address or -1 */
        class_1.read = function (addr) {
            if (saveload.supported) {
                var data = localStorage.getItem("f" + addr);
                if (data === null) {
                    return -1;
                }
                // @ts-ignore
                return LZString.decompress(data);
            }
            return -1;
        };
        class_1.reset = function (addr) {
            if (saveload.supported) {
                localStorage.removeItem("f" + addr);
            }
        };
        /*
                return {
                write: write,
                read: read,
                reset: reset,
                exists: exists,
                generate: generate
            };*/
        //let address = function () { //Addresses are strictly used in context of files
        /*
        static function save_filesystem() {
            
        }
        
        function load_filesystem() {
    
        }*/
        class_1.write_file_auto = function (data) {
            /* Automatically generates memory address and returns it */
            var new_address = saveload.address.generate();
            saveload.address.write(new_address, data);
            return new_address;
        };
        return class_1;
    }());
    return saveload;
}()); //();
exports.saveload = saveload;
//}();
//saveload.supported = typeof(Storage) !== "undefined";
