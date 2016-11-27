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

                components:wdCb.Collection.create<IWDComponentAssembler>(),
                children: wdCb.Collection.create<IWDObjectDataAssembler>()
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

        public static getBufferReaderFromAccessor(json:IWDJsonData, accessor: IWDAccessor, arrayBufferMap:wdCb.Hash<any>){
            var bufferView: IWDBufferView = json.bufferViews[accessor.bufferView],
                arrayBuffer: any = arrayBufferMap.getChild(bufferView.buffer),
                byteOffset = accessor.byteOffset + bufferView.byteOffset,
                count = accessor.count * this.getAccessorTypeSize(accessor),
                byteSize:number = null;

            switch (accessor.componentType) {
                case 5120:
                    byteSize = 1;
                    break;
                case 5121:
                    byteSize = 1;
                    break;
                case 5122:
                    byteSize = 2;
                    break;
                case 5123:
                    byteSize = 2;
                    break;
                case 5126:
                    byteSize = 4;
                    break;
                default:
                    Log.error(true, Log.info.FUNC_UNEXPECT(`componentType:${accessor.componentType}`));
                    break;
            }

            return {
                bufferReader:BufferReader.create(arrayBuffer, byteOffset, count * byteSize),
                count: count
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

        public static isIWDArticulatedAnimationAssembler(component:IWDComponentAssembler){
            if(!JudgeUtils.isDirectObject(component)){
                return false;
            }

            for(let animName in <IWDArticulatedAnimationAssembler>component){
                return component[animName] instanceof wdCb.Collection && component[animName].getCount() > 0 && component[animName].getChild(0).time !== void 0;
            }
        }
    }
}
