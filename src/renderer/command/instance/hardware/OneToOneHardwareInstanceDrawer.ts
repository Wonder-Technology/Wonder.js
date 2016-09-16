module wd {
    export abstract class OneToOneHardwareInstanceDrawer extends HardwareInstanceDrawer{
        @require(function(){
            assert(InstanceUtils.isHardwareSupport(), Log.info.FUNC_SHOULD("hardware", "support instance"));
        })
        public draw(instanceList:wdCb.Collection<GameObject>, instanceBuffer:InstanceBuffer, program:Program, buffers:BufferContainer, drawMode:EDrawMode):void{
            var indexBuffer:ElementBuffer = null,
                offsetLocationArr = this.getOffsetLocationArray(program);

            this.setCapacity(instanceList, instanceBuffer);

            this.sendGLSLData(instanceList, instanceBuffer, offsetLocationArr);

            indexBuffer = <ElementBuffer>buffers.getChild(EBufferDataType.INDICE);

            if(indexBuffer){
                this.drawElementsInstancedANGLE(indexBuffer, instanceList.getCount(), drawMode);
            }
            else{
                let vertexBuffer = buffers.getChild(EBufferDataType.VERTICE);

                this._drawArraysInstancedANGLE(vertexBuffer, instanceList.getCount(), drawMode);
            }

            this.unBind(instanceBuffer, offsetLocationArr);
        }

        private _drawArraysInstancedANGLE(vertexBuffer:ArrayBuffer, instancesCount:number, drawMode:EDrawMode){
            var startOffset:number = 0,
                gl = DeviceManager.getInstance().gl;

            GlUtils.drawArraysInstancedANGLE(gl[drawMode], startOffset, vertexBuffer.count, instancesCount);
        }
    }
}

