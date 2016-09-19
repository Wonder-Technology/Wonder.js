module wd {
    @singleton()
    export class NormalMatrixModelMatrixHardwareInstanceDrawer extends OneToOneHardwareInstanceDrawer{
        public static getInstance():any {}

        //todo add cache
        protected getOffsetLocationArray(program:Program):Array<number>{
            return [
                program.getAttribLocation("a_mVec4_0"), program.getAttribLocation("a_mVec4_1"), program.getAttribLocation("a_mVec4_2"), program.getAttribLocation("a_mVec4_3"),
                //todo rename to Vec3?
                program.getAttribLocation("a_normalVec4_0"), program.getAttribLocation("a_normalVec4_1"), program.getAttribLocation("a_normalVec4_2")
            ];
        }

        protected setCapacity(instanceList:wdCb.Collection<GameObject>, instanceBuffer:InstanceBuffer):void{
            /*! instanceCount * (modelMatrixSize:4(float size) * 4(vec count) * 4(component count) + normalMatrixSize: 4 * 3 * 3) */
            //todo not 112 but 100?
            instanceBuffer.setCapacity(instanceList.getCount() * 112);
        }

        protected sendGLSLData(instanceList:wdCb.Collection<GameObject>, instanceBuffer:InstanceBuffer, offsetLocationArr: Array<number>):void{
            var matricesArrayForInstance = new Float32Array(instanceBuffer.float32InstanceArraySize),
                offset = 0,
                gl = DeviceManager.getInstance().gl,
                extension = GPUDetector.getInstance().extensionInstancedArrays;

            //todo if all instanceList not transform, not reset data

            instanceList.forEach((instance:GameObject) => {
                var mMatrix:Matrix4 = instance.transform.localToWorldMatrix,
                    normalMatrix:Matrix3 = instance.transform.normalMatrix;

                mMatrix.cloneToArray(matricesArrayForInstance, offset);
                offset += 16;

                normalMatrix.cloneToArray(matricesArrayForInstance, offset);
                offset += 9;
            });


            instanceBuffer.resetData(matricesArrayForInstance);

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

