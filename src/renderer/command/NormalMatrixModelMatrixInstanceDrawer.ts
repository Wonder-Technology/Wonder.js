module wd {
    export class NormalMatrixModelMatrixInstanceDrawer extends InstanceDrawer{
        public static create(){
            var obj = new this();

            return obj;
        }

        private _matricesArrayForInstance: Float32Array = null;

        public draw(instanceList:wdCb.Collection<GameObject>, instanceBuffer:InstanceBuffer, program:Program, buffers:BufferContainer, drawMode:EDrawMode):void{
            var indexBuffer:ElementBuffer = null,
                offset = 0,
                offsetLocationArr = this._getOffsetLocationArray(program);

            instanceBuffer.setCapacity(instanceList.getCount() * 2);

            //todo size?
            this._matricesArrayForInstance = new Float32Array(instanceBuffer.float32InstanceArraySize);


            var self = this;

            instanceList.forEach((instance:GameObject) => {
                var mMatrix:Matrix4 = instance.transform.localToWorldMatrix,
                    normalMatrix:Matrix3 = mMatrix.invertTo3x3().transpose();

                //todo
                mMatrix.cloneToArray(self._matricesArrayForInstance, offset);
                offset += 16;


                normalMatrix.cloneToArray(self._matricesArrayForInstance, offset);
                offset += 9;
            });


            instanceBuffer.resetData(this._matricesArrayForInstance, offsetLocationArr);

            var gl = DeviceManager.getInstance().gl;
            var extension = GPUDetector.getInstance().extensionInstancedArrays;

            for (var index = 0; index < 4; index++) {
                var offsetLocation = offsetLocationArr[index];
                gl.enableVertexAttribArray(offsetLocation);
                gl.vertexAttribPointer(offsetLocation, 4, gl.FLOAT, false, 4 * 4 * 4 + 3 * 4 * 3, index * 16);
                extension.vertexAttribDivisorANGLE(offsetLocation, 1);
            }
            for (var index = 4; index < 7; index++) {
                var offsetLocation = offsetLocationArr[index];
                gl.enableVertexAttribArray(offsetLocation);
                gl.vertexAttribPointer(offsetLocation, 3, gl.FLOAT, false, 4 * 4 * 4 + 3 * 4 * 3, (index - 4) * 12 + 4 * 16);
                extension.vertexAttribDivisorANGLE(offsetLocation, 1);
            }

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

        @require(function(){
            assert(GPUDetector.getInstance().extensionInstancedArrays !== null, Log.info.FUNC_SHOULD("hardware", "support instance"));
        })
        private _unBind(instanceBuffer:InstanceBuffer, offsetLocations: number[]): void {
            var gl = DeviceManager.getInstance().gl;
            var extension = GPUDetector.getInstance().extensionInstancedArrays;

            gl.bindBuffer(gl.ARRAY_BUFFER, instanceBuffer.buffer);

            //todo
            //for (var index = 0; index < 4; index++) {
            for (var index = 0; index < 7; index++) {
                var offsetLocation = offsetLocations[index];
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

        private _getOffsetLocationArray(program:Program){
            return [
                program.getAttribLocation("a_mVec4_0"), program.getAttribLocation("a_mVec4_1"), program.getAttribLocation("a_mVec4_2"), program.getAttribLocation("a_mVec4_3"),
                program.getAttribLocation("a_normalVec4_0"), program.getAttribLocation("a_normalVec4_1"), program.getAttribLocation("a_normalVec4_2")
            ];
        }
    }
}

