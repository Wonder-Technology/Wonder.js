module wd{
    export abstract class BatchInstanceDrawer extends InstanceDrawer{
        @require(function(){
            assert(!InstanceUtils.isHardwareSupport(), Log.info.FUNC_SHOULD("hardware", "not support instance"));
        })
        public draw(instanceList:wdCb.Collection<GameObject>, program:Program, buffers:BufferContainer, drawMode:EDrawMode):void{
            var indexBuffer:ElementBuffer = null,
                uniformDataNameArr:Array<string> = null,
                gl = DeviceManager.getInstance().gl;
            uniformDataNameArr = this.getUniformDataNameArray(program);

            indexBuffer = <ElementBuffer>buffers.getChild(EBufferDataType.INDICE);

            if(indexBuffer){
                //todo test
                BufferTable.bindIndexBuffer(indexBuffer);

                instanceList.forEach((instance:GameObject) => {
                    var startOffset:number = 0;

                    this.sendGLSLData(program, instance, uniformDataNameArr);

                    GlUtils.drawElements(gl[drawMode], indexBuffer.count, indexBuffer.type, indexBuffer.typeSize * startOffset);
                }, this);
            }
            else{
                let vertexBuffer = buffers.getChild(EBufferDataType.VERTICE);

                instanceList.forEach((instance:GameObject) => {
                    var startOffset:number = 0;

                    this.sendGLSLData(program, instance, uniformDataNameArr);

                    GlUtils.drawArrays(gl[drawMode], startOffset, vertexBuffer.count);
                }, this);
            }
        }

        protected abstract getUniformDataNameArray(program:Program):Array<string>;

        protected abstract sendGLSLData(program:Program, instance:GameObject, uniformDataNameArray:Array<string>):void;
    }
}

