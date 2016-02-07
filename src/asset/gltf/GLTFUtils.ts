module wd{
    declare var ArrayBuffer:any;

    export class GLTFUtils{
        public static addData(target:Object, sourceName:string, sourceData:any){
            if(sourceData !== undefined && sourceData !== null){
                target[sourceName] = sourceData;
            }
        }

        public static isBase64(uri: string): boolean{
            return uri.length < 5 ? false : uri.substr(0, 5) === "data:";
        }

        public static decodeArrayBuffer(base64Str: string):any{
            var base64 = base64Str.split(',')[1],
                decodedString = atob(base64),
                bufferLength = decodedString.length,
                arraybuffer = new Uint8Array(new ArrayBuffer(bufferLength));

            for (var i = 0; i < bufferLength; i++) {
                arraybuffer[i] = decodedString.charCodeAt(i);
            }

            return arraybuffer.buffer;
        }

        public static createObjectData(){
            return {
                isContainer: false,

                components:wdCb.Collection.create<IGLTFComponent>(),
                children: wdCb.Collection.create<IGLTFObjectData>()
            }
        }

        public static getColor(value:Array<number>){
            var color = Color.create();

            color.r = Number(value[0]);
            color.g = Number(value[1]);
            color.b = Number(value[2]);

            if(value.length === 4){
                color.a = Number(value[3]);
            }

            return color;
        }
    }
}
