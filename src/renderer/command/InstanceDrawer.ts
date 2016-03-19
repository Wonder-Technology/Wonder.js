module wd {
    export class InstanceDrawer{
        public static create(){
            var obj = new this();

            return obj;
        }

        public instanceList:wdCb.Collection<GameObject> = null;
        public instanceBuffer:InstanceBuffer = null;

        private _modelMatricesArrayForInstancesray: Float32Array = null;

        @ensure(function(hasInstance:boolean){
            if(hasInstance){
                assert(GPUDetector.getInstance().extensionInstancedArrays !== null, Log.info.FUNC_SHOULD("hardware", "support instance"));

                assert(!!this.instanceBuffer, Log.info.FUNC_MUST_DEFINE("instanceBuffer"))
            }
        })
        public hasInstance(){
            return this.instanceList && this.instanceList.getCount() > 0;
        }

        @require(function(){
            assert(this.hasInstance(), Log.info.FUNC_SHOULD("has instance"));
        })
        public draw(program:Program, buffers:BufferContainer, drawMode:EDrawMode) {
            var indexBuffer:ElementBuffer = null,
                offset = 0,
                offsetLocationArr = this._getOffsetLocationArray(program);

            this.instanceBuffer.setCapacity(this.instanceList.getCount());

            this._modelMatricesArrayForInstancesray = new Float32Array(this.instanceBuffer.float32InstanceArraySize);

            this.instanceList.forEach((instance:GameObject) => {
                instance.transform.localToWorldMatrix.cloneToArray(this._modelMatricesArrayForInstancesray, offset);
                offset += 16;
            });

            this.instanceBuffer.resetData(this._modelMatricesArrayForInstancesray, offsetLocationArr);

            indexBuffer = <ElementBuffer>buffers.getChild(EBufferDataType.INDICE);

            if(indexBuffer){
                this._drawElementsInstancedANGLE(indexBuffer, this.instanceList.getCount(), drawMode);
            }
            else{
                let vertexBuffer = buffers.getChild(EBufferDataType.VERTICE);

                this._drawArraysInstancedANGLE(vertexBuffer, this.instanceList.getCount(), drawMode);

            }

            this.instanceBuffer.unBind(offsetLocationArr);

            return;
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

        private _getOffsetLocationArray(program:Program){
            return [program.getAttribLocation("a_mVec4_0"), program.getAttribLocation("a_mVec4_1"), program.getAttribLocation("a_mVec4_2"), program.getAttribLocation("a_mVec4_3")];
        }
    }
}

