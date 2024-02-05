export class SaveLoad {
    static supported: boolean = typeof (Storage) !== "undefined";  // false

    static writeFileAuto(data): string {
        /* Automatically generates memory address and returns it */
        let new_address = this.Address.generate();
        this.Address.write(new_address, data);
        return new_address;
    }

    // Addresses are strictly used in context of files
    static Address = class {
        private static exists(addr: string): boolean {
            if (SaveLoad.supported) {
                return localStorage.getItem("f" + addr) !== null
            }

            return false;
        }

        /* Public, for use by the auto function */
        static generate(): string {
            let new_addr: string;
            do {
                new_addr = Math.floor(Math.random() * 10).toString();
                new_addr += Math.floor(Math.random() * 10).toString();
                new_addr += String.fromCharCode(Math.floor(Math.random() * 7) + 97);
                new_addr += String.fromCharCode(Math.floor(Math.random() * 7) + 97);
                new_addr += String.fromCharCode(Math.floor(Math.random() * 7) + 97);
                new_addr += String.fromCharCode(Math.floor(Math.random() * 7) + 97);
            }
            while (this.exists(new_addr)); // Will result in page freeze if more than 129600 addresses exist

            SaveLoad.Address.write(new_addr, ""); //Opens address
            return new_addr;
        }

        /* Public - Returns compressed byte-size or undefined */
        static write(addr: string, data: string): number | undefined {
            if (SaveLoad.supported) {
                let compressed = data;//LZString.compress(data);
                localStorage.setItem("f" + addr, compressed);
                return compressed.length;
            }

            return undefined;
        }

        /* Public - Returns string at address or -1 */
        static read(addr: string): string | undefined {
            if (SaveLoad.supported) {
                let data = localStorage.getItem("f" + addr);
                return data;//LZString.decompress(data);
            }

            return undefined;
        }

        static reset(addr: string): boolean {
            if (SaveLoad.supported) {
                localStorage.removeItem("f" + addr);
                return true;
            }

            return false;
        }
    }
}

//saveload.supported = typeof(Storage) !== "undefined";
