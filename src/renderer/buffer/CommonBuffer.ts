module wd{
    export abstract class CommonBuffer extends Buffer{
        public type:EBufferType = null;
        public count:number = null;
        public usage:EBufferUsage = null;

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


