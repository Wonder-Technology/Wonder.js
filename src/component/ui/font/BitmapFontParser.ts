module wd{
    export class BitmapFontParser{
        public static getKerning(fntObj:FntData, left:string, right:string) {
            if (!fntObj.kerningArray || fntObj.kerningArray.length === 0){
                return 0
            }

            let table = fntObj.kerningArray;

            for (let i = 0; i < table.length; i++) {
                let kern = table[i];

                if (kern.first === left && kern.second === right){
                    return kern.amount;
                }
            }

            return 0
        }
    }
}
