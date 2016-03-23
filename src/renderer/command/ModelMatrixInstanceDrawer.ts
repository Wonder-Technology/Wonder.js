module wd {
    export class ModelMatrixInstanceDrawer extends InstanceDrawer{
        public static create(){
            var obj = new this();

            return obj;
        }

        protected getOffsetLocationArray(program:Program):Array<number>{
            return [program.getAttribLocation("a_mVec4_0"), program.getAttribLocation("a_mVec4_1"), program.getAttribLocation("a_mVec4_2"), program.getAttribLocation("a_mVec4_3")];
        }

        protected setCapacity(instanceList:wdCb.Collection<GameObject>, instanceBuffer:InstanceBuffer):void{
            /*! instanceCount * 4(float size) * 4(vec count) * 4(component count) */
            instanceBuffer.setCapacity(instanceList.getCount() * 64);
        }

        protected sendGLSLData(instanceList:wdCb.Collection<GameObject>, instanceBuffer:InstanceBuffer, offsetLocationArr: Array<number>):void{
            var matricesArrayForInstance = new Float32Array(instanceBuffer.float32InstanceArraySize),
            offset = 0,
            gl = DeviceManager.getInstance().gl,
            extension = GPUDetector.getInstance().extensionInstancedArrays;

            instanceList.forEach((instance:GameObject) => {
                var mMatrix:Matrix4 = instance.transform.localToWorldMatrix;

                mMatrix.cloneToArray(matricesArrayForInstance, offset);
                offset += 16;
            });

            instanceBuffer.resetData(matricesArrayForInstance, offsetLocationArr);

            for (let index = 0; index < 4; index++) {
                let offsetLocation = offsetLocationArr[index];
                gl.enableVertexAttribArray(offsetLocation);
                gl.vertexAttribPointer(offsetLocation, 4, gl.FLOAT, false, 4 * 4 * 4, index * 16);
                extension.vertexAttribDivisorANGLE(offsetLocation, 1);
            }
        }
    }
}

