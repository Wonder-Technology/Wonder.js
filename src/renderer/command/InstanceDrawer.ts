module wd {
    export abstract class InstanceDrawer implements IInstanceDrawer{
        @require(function(){
            assert(GPUDetector.getInstance().extensionInstancedArrays !== null, Log.info.FUNC_SHOULD("hardware", "support instance"));
        })
        public draw(instanceList:wdCb.Collection<GameObject>, instanceBuffer:InstanceBuffer, program:Program, buffers:BufferContainer, drawMode:EDrawMode):void{
            var indexBuffer:ElementBuffer = null,
                offsetLocationArr = this.getOffsetLocationArray(program);

            this.setCapacity(instanceList, instanceBuffer);

            this.sendGLSLData(instanceList, instanceBuffer, offsetLocationArr);

            indexBuffer = <ElementBuffer>buffers.getChild(EBufferDataType.INDICE);

            if(indexBuffer){
                this._drawElementsInstancedANGLE(indexBuffer, instanceList.getCount(), drawMode);
            }
            else{
                let vertexBuffer = buffers.getChild(EBufferDataType.VERTICE);

                this._drawArraysInstancedANGLE(vertexBuffer, instanceList.getCount(), drawMode);

            }

            this._unBind(instanceBuffer, offsetLocationArr);
        }

        protected abstract getOffsetLocationArray(program:Program):Array<number>;
        protected abstract setCapacity(instanceList:wdCb.Collection<GameObject>, instanceBuffer:InstanceBuffer):void;
        protected abstract sendGLSLData(instanceList:wdCb.Collection<GameObject>, instanceBuffer:InstanceBuffer, offsetLocationArr: Array<number>):void;

        private _unBind(instanceBuffer:InstanceBuffer, offsetLocationArr: Array<number>): void {
            var gl = DeviceManager.getInstance().gl;
            var extension = GPUDetector.getInstance().extensionInstancedArrays;

            gl.bindBuffer(gl.ARRAY_BUFFER, instanceBuffer.buffer);

            for(let offsetLocation of offsetLocationArr){
                gl.disableVertexAttribArray(offsetLocation);
                extension.vertexAttribDivisorANGLE(offsetLocation, 0);
            }
        }

        private _drawElementsInstancedANGLE(indexBuffer:ElementBuffer, instancesCount:number, drawMode:EDrawMode){
            var startOffset:number = 0,
                gl = DeviceManager.getInstance().gl;

            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer.buffer);
            GlUtils.drawElementsInstancedANGLE(gl[drawMode], indexBuffer.count, indexBuffer.type, indexBuffer.typeSize * startOffset, instancesCount);
        }

        private _drawArraysInstancedANGLE(vertexBuffer:ArrayBuffer, instancesCount:number, drawMode:EDrawMode){
            var startOffset:number = 0,
                gl = DeviceManager.getInstance().gl;

            GlUtils.drawArraysInstancedANGLE(gl[drawMode], startOffset, vertexBuffer.count, instancesCount);
        }
    }
}

