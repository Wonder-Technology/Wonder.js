module wd{
    export abstract class Buffer extends Entity{
        public buffer:any = null;
        public type:EBufferType = null;
        public count:number = null;
        public usage:EBufferUsage = null;

        public abstract resetData(data:any, ...args):void;

        public dispose(){
            DeviceManager.getInstance().gl.deleteBuffer(this.buffer);
            delete this.buffer;
        }

        protected resetBufferData(glBufferTargetStr:string, typedData:any, offset:number = 0){
            var gl = DeviceManager.getInstance().gl;

            if(this.usage === EBufferUsage.STATIC_DRAW && offset === 0){
                /*!
                change to DYNAMIC_DRAW
                 */
                gl.bufferData(gl[glBufferTargetStr], typedData, gl.DYNAMIC_DRAW);

                return;
            }

            gl.bufferSubData(gl[glBufferTargetStr], offset, typedData);
        }
    }
}

