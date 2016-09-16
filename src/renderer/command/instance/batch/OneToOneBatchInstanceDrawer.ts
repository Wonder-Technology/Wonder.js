module wd {
    export abstract class OneToOneBatchInstanceDrawer extends BatchInstanceDrawer{
        @require(function(instanceList:wdCb.Collection<GameObject>, program:Program, buffers:BufferContainer, drawMode:EDrawMode){
            it("hardware shouldn't support instance", () => {
                expect(InstanceUtils.isHardwareSupport()).false;
            });
        })
        public draw(instanceList:wdCb.Collection<GameObject>, program:Program, buffers:BufferContainer, drawMode:EDrawMode):void{
            var indexBuffer:ElementBuffer = null,
                uniformDataNameArr:Array<string> = null,
                gl = DeviceManager.getInstance().gl;

            uniformDataNameArr = this.getUniformDataNameArray(program);

            indexBuffer = <ElementBuffer>buffers.getChild(EBufferDataType.INDICE);

            if(indexBuffer){
                BufferTable.bindIndexBuffer(indexBuffer);

                instanceList.forEach((instance:GameObject) => {
                    var startOffset:number = 0;

                    this.sendGLSLData(program, instance, uniformDataNameArr);

                    GlUtils.drawElements(gl[drawMode], indexBuffer.count, gl[indexBuffer.type], indexBuffer.typeSize * startOffset);
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
    }
}

