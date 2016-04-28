module wd{
    export abstract class BatchInstanceDrawer extends InstanceDrawer{
        @require(function(){
            assert(!InstanceUtils.isHardwareSupport(), Log.info.FUNC_SHOULD("hardware", "not support instance"));
        })
        public draw(instanceList:wdCb.Collection<GameObject>, program:Program, buffers:BufferContainer, drawMode:EDrawMode):void{
            var indexBuffer:ElementBuffer = null,
                offsetLocationArr:Array<number> = null,
            gl = DeviceManager.getInstance().gl;
                //vertexBuffer:ArrayBuffer =  null;
                offsetLocationArr = this.getOffsetLocationArray(program);

            //this.setCapacity(instanceList, instanceBuffer);

            indexBuffer = <ElementBuffer>buffers.getChild(EBufferDataType.INDICE);

            if(indexBuffer){
                //todo optimize:if elementBuffer not change, not bind again
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer.buffer);

                instanceList.forEach((instance:GameObject) => {
                    var startOffset:number = 0;

                    this.sendGLSLData(program, instance, offsetLocationArr);


                    GlUtils.drawElements(gl[drawMode], indexBuffer.count, indexBuffer.type, indexBuffer.typeSize * startOffset);
                }, this);
            }
            else{
                let vertexBuffer = buffers.getChild(EBufferDataType.VERTICE);

                instanceList.forEach((instance:GameObject) => {
                    var startOffset:number = 0;

                    this.sendGLSLData(program, instance, offsetLocationArr);

                    GlUtils.drawArrays(gl[drawMode], startOffset, vertexBuffer.count);
                }, this);
            }
        }

        protected abstract getOffsetLocationArray(program:Program):Array<number>;

        protected abstract sendGLSLData(program:Program, instance:GameObject, offsetLocationArray:Array<number>):void;
    }
}

