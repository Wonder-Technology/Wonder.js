module wd {
    @singleton()
    export class CustomHardwareInstanceDrawer extends HardwareInstanceDrawer{
        public static getInstance():any {}

        //todo optimize:add cache?
        protected getOffsetLocationArray(program:Program):Array<number> {
            return this.geometry.instanceAttributeData.map((attributeData: InstanceAttributeData) => {
                return program.getAttribLocation(attributeData.attributeName);
            }).toArray();
        }

        protected setCapacity(instanceList:wdCb.Collection<GameObject>, instanceBuffer:InstanceBuffer):void{
            instanceBuffer.setCapacity(instanceList.getCount() * this.geometry.instanceCount * this._getStride());
        }

        //todo optimize:add cache?
        protected sendGLSLData(instanceList:wdCb.Collection<GameObject>, instanceBuffer:InstanceBuffer, offsetLocationArr: Array<number>):void{
            var attributeArrayForInstance = new Float32Array(instanceBuffer.float32InstanceArraySize),
                offset = 0,
                attributeData = this.geometry.attributeData,
                instanceAttributeData = this.geometry.instanceAttributeData,
                gl = DeviceManager.getInstance().gl,
                extension = GPUDetector.getInstance().extensionInstancedArrays;

            instanceList.forEach((instance:GameObject) => {
                //var mMatrix:Matrix4 = instance.transform.localToWorldMatrix;
                //
                //mMatrix.cloneToArray(attributeArrayForInstance, offset);
                //offset += 16;

                //todo optimize: attributeArrayForInstance add cache?
                attributeData.forEach((instanceAttributeDataList:wdCb.Collection<InstanceAttributeData>) => {
                    instanceAttributeDataList.forEach((data:InstanceAttributeData) => {
                        attributeArrayForInstance.set(data.data, offset);

                        offset += data.data.length;
                    });
                });
            });

            //todo optimize: if instanceBuffer not dirty, not reset data again
            instanceBuffer.resetData(attributeArrayForInstance);

            let stride = this._getStride();

            offset = 0;

            instanceAttributeData.forEach((attributeData:InstanceAttributeData, index:number) => {
                let offsetLocation = offsetLocationArr[index];

                gl.enableVertexAttribArray(offsetLocation);

                gl.vertexAttribPointer(offsetLocation, attributeData.size, gl.FLOAT, false, stride, offset);
                //todo test
                extension.vertexAttribDivisorANGLE(offsetLocation, attributeData.meshPerAttribute);

                offset += 4 * attributeData.data.length;
            });
        }

        //todo optimize:add cache?
        private _getStride(){
            var stride = 0;

            this.geometry.instanceAttributeData.forEach((attributeData:InstanceAttributeData) => {
                stride += 4 * attributeData.data.length;
            });

            return stride;
        }
    }
}

