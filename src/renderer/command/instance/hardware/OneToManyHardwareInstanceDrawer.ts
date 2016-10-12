module wd {
    @singleton()
    export class OneToManyHardwareInstanceDrawer extends HardwareInstanceDrawer{
        public static getInstance():any {}

        private _geometry:InstanceGeometry = null;

        @require(function(geometry:InstanceGeometry, instanceBuffer:InstanceBuffer, program:Program, buffers:BufferContainer, drawMode:EDrawMode){
            it("hardware should support instance", () => {
                expect(InstanceUtils.isHardwareSupport()).true;
            });
            it("indexBuffer should exist", () => {
                expect(buffers.getChild(EBufferDataType.INDICE)).exist;
            });
        })
        public draw(geometry:InstanceGeometry, instanceBuffer:InstanceBuffer, program:Program, buffers:BufferContainer, drawMode:EDrawMode):void{
            var indexBuffer:ElementBuffer = null,
                offsetLocationArr = null;

            this._geometry = geometry;

            offsetLocationArr = this.getOffsetLocationArray(program, instanceBuffer);

            this.setCapacity(instanceBuffer);

            this.sendGLSLData(instanceBuffer, offsetLocationArr);

            indexBuffer = <ElementBuffer>buffers.getChild(EBufferDataType.INDICE);

            this.drawElementsInstancedANGLE(indexBuffer, this._geometry.instanceCount, drawMode);

            this.unBind(instanceBuffer, offsetLocationArr);

            if(this._geometry.dirty) {
                this._geometry.dirty = false;
            }
        }

        @require(function(program:Program, instanceBuffer:InstanceBuffer){
            it("if cached, should geometry.dirty === false && has cache data", () => {
                if(!this._geometry.dirty){
                    expect(instanceBuffer.getCache("offsetLocationArray")).exist;
                }
            });
        })
        @cache(function(program:Program, instanceBuffer:InstanceBuffer){
            return !this._geometry.dirty;
        }, function(program:Program, instanceBuffer:InstanceBuffer){
            return instanceBuffer.getCache("offsetLocationArray");
        }, function(result, program:Program, instanceBuffer:InstanceBuffer){
            instanceBuffer.addCache("offsetLocationArray", result);
        })
        protected getOffsetLocationArray(program:Program, instanceBuffer:InstanceBuffer):Array<number> {
            return this._geometry.instanceAttributeData.map((attributeData: InstanceAttributeData) => {
                return program.getAttribLocation(attributeData.attributeName);
            }).toArray();
        }

        protected setCapacity(instanceBuffer:InstanceBuffer):void{
            instanceBuffer.setCapacity(this._geometry.instanceCount * this._getStride(instanceBuffer));
        }

        protected sendGLSLData(instanceBuffer:InstanceBuffer, offsetLocationArr: Array<number>):void{
            var attributeArrayForInstance = new Float32Array(instanceBuffer.float32InstanceArraySize),
                offset = 0,
                attributeData = this._geometry.attributeData,
                instanceAttributeData = this._geometry.instanceAttributeData,
                gl = DeviceManager.getInstance().gl,
                extension = GPUDetector.getInstance().extensionInstancedArrays;

            if(this._geometry.dirty){
                attributeData.forEach((instanceAttributeDataList:wdCb.Collection<InstanceAttributeData>) => {
                    instanceAttributeDataList.forEach((data:InstanceAttributeData) => {
                        attributeArrayForInstance.set(data.data, offset);

                        offset += data.data.length;
                    });
                });

                instanceBuffer.resetData(attributeArrayForInstance);
            }
            else{
                instanceBuffer.bindBuffer();
            }

            let stride = this._getStride(instanceBuffer);

            offset = 0;

            instanceAttributeData.forEach((attributeData:InstanceAttributeData, index:number) => {
                let offsetLocation = offsetLocationArr[index],
                    attributeDataLength = attributeData.data.length;

                gl.enableVertexAttribArray(offsetLocation);

                gl.vertexAttribPointer(offsetLocation, attributeDataLength, gl.FLOAT, false, stride, offset);
                extension.vertexAttribDivisorANGLE(offsetLocation, attributeData.meshPerAttribute);

                offset += 4 * attributeDataLength;
            });
        }

        @require(function(instanceBuffer:InstanceBuffer){
            it("if cached, should geometry.dirty === false && has cache data", () => {
                if(!this._geometry.dirty){
                    expect(instanceBuffer.getCache("stride")).exist;
                }
            });
        })
        @cache(function(instanceBuffer:InstanceBuffer){
            return !this._geometry.dirty;
        }, function(instanceBuffer:InstanceBuffer){
            return instanceBuffer.getCache("stride");
        }, function(result, instanceBuffer:InstanceBuffer){
            instanceBuffer.addCache("stride", result);
        })
        private _getStride(instanceBuffer:InstanceBuffer){
            var stride = 0;

            this._geometry.instanceAttributeData.forEach((attributeData:InstanceAttributeData) => {
                stride += 4 * attributeData.data.length;
            });

            return stride;
        }
    }
}

