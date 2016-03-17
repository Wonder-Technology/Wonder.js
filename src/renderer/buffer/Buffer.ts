module wd{
    export abstract class Buffer{
        public buffer:any = null;
        public type:string = null;
        public count:number = null;

        public abstract resetData(data:any, ...args):void;

        public dispose(){
            DeviceManager.getInstance().gl.deleteBuffer(this.buffer);
            delete this.buffer;
        }
    }
}

