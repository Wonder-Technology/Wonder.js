module wd {
    @singleton()
    export class OneToManyBatchInstanceDrawer extends BatchInstanceDrawer{
        public static getInstance():any {}

        private _geometry:InstanceGeometry = null;

        @require(function(geometry:InstanceGeometry, program:Program, buffers:BufferContainer, drawMode:EDrawMode){
            it("hardware shouldn't support instance", () => {
                expect(InstanceUtils.isHardwareSupport()).false;
            });
            it("indexBuffer should exist", () => {
                expect(buffers.getChild(EBufferDataType.INDICE)).exist;
            });
        })
        public draw(geometry:InstanceGeometry, program:Program, buffers:BufferContainer, drawMode:EDrawMode):void{
            var indexBuffer:ElementBuffer = null,
                startOffset:number = null,
                gl = DeviceManager.getInstance().gl;

            this._geometry = geometry;

            indexBuffer = <ElementBuffer>buffers.getChild(EBufferDataType.INDICE);

            BufferTable.bindIndexBuffer(indexBuffer);

            this._geometry.attributeData.forEach((instanceAttributeDataList:wdCb.Collection<InstanceAttributeData>) => {
                this.sendGLSLData(program, instanceAttributeDataList);

                startOffset = 0;

                GlUtils.drawElements(gl[drawMode], indexBuffer.count, gl[indexBuffer.type], indexBuffer.typeSize * startOffset);
            }, this);
        }

        protected sendGLSLData(program:Program, instanceAttributeDataList:wdCb.Collection<InstanceAttributeData>):void{
            instanceAttributeDataList.forEach((data:InstanceAttributeData) => {
                program.sendUniformData(data.attributeName, this._getVariableType(data.size), data.data);
            });
        }

        private _getVariableType(size:number){
            switch (size){
                case 1:
                    return EVariableType.FLOAT_1;
                case 2:
                    return EVariableType.FLOAT_2;
                case 3:
                    return EVariableType.FLOAT_3;
                case 4:
                    return EVariableType.FLOAT_4;
                default:
                    Log.error(true, Log.info.FUNC_INVALID(`size:${size}`));
                    break;
            }
        }
    }
}

