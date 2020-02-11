export class saveload {
    //let address = function () {
    static write_file_auto(data) {
        /* Automatically generates memory address and returns it */
        let new_address = saveload.address.generate();
        saveload.address.write(new_address, data);
        return new_address;
    }
}
saveload.supported = typeof (Storage) !== "undefined"; // false
saveload.address = class {
    static exists(addr) {
        if (saveload.supported) {
            return localStorage.getItem("f" + addr) !== null;
        }
        return false;
    }
    static generate() {
        let new_addr;
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
    }
    /* Public - Returns compressed byte-size or -1 */
    static write(addr, data) {
        if (saveload.supported) {
            // @ts-ignore
            let compressed = LZString.compress(data);
            localStorage.setItem("f" + addr, compressed);
            return compressed.length;
        }
        return -1;
    }
    /* Public - Returns string at address or -1 */
    static read(addr) {
        if (saveload.supported) {
            let data = localStorage.getItem("f" + addr);
            if (data === null) {
                return -1;
            }
            // @ts-ignore
            return LZString.decompress(data);
        }
        return -1;
    }
    static reset(addr) {
        if (saveload.supported) {
            localStorage.removeItem("f" + addr);
        }
    }
};
//saveload.supported = typeof(Storage) !== "undefined";
