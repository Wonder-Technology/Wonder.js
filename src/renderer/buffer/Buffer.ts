module wd{
    export abstract class Buffer extends Entity{
        public buffer:any = null;

        public abstract resetData(data:any, ...args):void;

        public dispose(){
            DeviceManager.getInstance().gl.deleteBuffer(this.buffer);
            delete this.buffer;
        }
    }
}

