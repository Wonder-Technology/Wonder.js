module wd {
    export class NormalMatrixModelMatrixHardwareInstanceDrawer extends HardwareInstanceDrawer{
        private static _instance = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
            }

            return this._instance;
        }

        protected getOffsetLocationArray(program:Program):Array<number>{
            return [
                program.getAttribLocation("a_mVec4_0"), program.getAttribLocation("a_mVec4_1"), program.getAttribLocation("a_mVec4_2"), program.getAttribLocation("a_mVec4_3"),
                program.getAttribLocation("a_normalVec4_0"), program.getAttribLocation("a_normalVec4_1"), program.getAttribLocation("a_normalVec4_2")
            ];
        }

        protected setCapacity(instanceList:wdCb.Collection<GameObject>, instanceBuffer:InstanceBuffer):void{
            /*! instanceCount * (modelMatrixSize:4(float size) * 4(vec count) * 4(component count) + normalMatrixSize: 4 * 3 * 3) */
            instanceBuffer.setCapacity(instanceList.getCount() * 112);
        }

        protected sendGLSLData(instanceList:wdCb.Collection<GameObject>, instanceBuffer:InstanceBuffer, offsetLocationArr: Array<number>):void{
            var matricesArrayForInstance = new Float32Array(instanceBuffer.float32InstanceArraySize),
                offset = 0,
                gl = DeviceManager.getInstance().gl,
                extension = GPUDetector.getInstance().extensionInstancedArrays;

            instanceList.forEach((instance:GameObject) => {
                var mMatrix:Matrix4 = instance.transform.localToWorldMatrix,
                    //todo transform add normalMatrix cache
                    normalMatrix:Matrix3 = mMatrix.invertTo3x3().transpose();

                mMatrix.cloneToArray(matricesArrayForInstance, offset);
                offset += 16;

                normalMatrix.cloneToArray(matricesArrayForInstance, offset);
                offset += 9;
            });


            instanceBuffer.resetData(matricesArrayForInstance, offsetLocationArr);

            for (let index = 0; index < 4; index++) {
                let offsetLocation = offsetLocationArr[index];
                gl.enableVertexAttribArray(offsetLocation);
                /*! stride: 4 * 4 * 4 + 4 * 3 * 3, offset: index * 4 * 4 */
                gl.vertexAttribPointer(offsetLocation, 4, gl.FLOAT, false, 100, index * 16);
                extension.vertexAttribDivisorANGLE(offsetLocation, 1);
            }
            for (let index = 4; index < 7; index++) {
                let offsetLocation = offsetLocationArr[index];
                gl.enableVertexAttribArray(offsetLocation);
                /*! stride: 4 * 4 * 4 + 4 * 3 * 3, offset: (index - 4) * 4 * 3 + 4 * 16 */
                gl.vertexAttribPointer(offsetLocation, 3, gl.FLOAT, false, 100, (index - 4) * 12 + 64);
                extension.vertexAttribDivisorANGLE(offsetLocation, 1);
            }
        }
    }
}

