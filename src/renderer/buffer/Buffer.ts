/// <reference path="../../filePath.d.ts"/>
module wd{
    export class Buffer{
        public buffer:any = null;
        public type:string = null;
        public count:number = null;

        public dispose(){
            DeviceManager.getInstance().gl.deleteBuffer(this.buffer);
            delete this.buffer;
        }
    }
}

