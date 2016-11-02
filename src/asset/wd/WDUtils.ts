module wd{
    declare var ArrayBuffer:any;

    export class WDUtils{
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
                id:null,
                isContainer: false,

                components:wdCb.Collection.create<IWDComponent>(),
                children: wdCb.Collection.create<IWDObjectData>()
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

        public static getBufferArrFromAccessor(json:IWDJsonData, accessor: IWDAccessor, arrayBufferMap:wdCb.Hash<any>): any{
            var bufferView: IWDBufferView = json.bufferViews[accessor.bufferView],
                arrayBuffer: any = arrayBufferMap.getChild(bufferView.buffer),
                byteOffset = accessor.byteOffset + bufferView.byteOffset,
                count = accessor.count * this.getAccessorTypeSize(accessor);

            switch (accessor.componentType) {
                case 5120:
                    return new Int8Array(arrayBuffer, byteOffset, count);
                case 5121:
                    return new Uint8Array(arrayBuffer, byteOffset, count);
                case 5122:
                    return new Int16Array(arrayBuffer, byteOffset, count);
                case 5123:
                    return new Uint16Array(arrayBuffer, byteOffset, count);
                case 5126:
                    return new Float32Array(arrayBuffer, byteOffset, count);
                default:
                    Log.error(true, Log.info.FUNC_UNEXPECT(`componentType:${accessor.componentType}`));
                    break;
            }
        }

        public static getAccessorTypeSize(accessor: IWDAccessor): number{
            var type = accessor.type;

            switch (type) {
                case "VEC2":
                    return 2;
                case "VEC3":
                    return 3;
                case "VEC4":
                    return 4;
                case "MAT2":
                    return 4;
                case "MAT3":
                    return 9;
                case "MAT4":
                    return 16;
                default:
                    return 1;
            }
        }

        public static isIWDArticulatedAnimation(component:IWDComponent){
            if(!JudgeUtils.isDirectObject(component)){
                return false;
            }

            for(let animName in component){
                return component[animName] instanceof wdCb.Collection && component[animName].getCount() > 0 && component[animName].getChild(0).time !== void 0;
            }
        }
    }
}
