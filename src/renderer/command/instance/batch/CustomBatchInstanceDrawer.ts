module wd {
    @singleton()
    export class CustomBatchInstanceDrawer extends BatchInstanceDrawer{
        public static getInstance():any {}

        protected getUniformDataNameArray(program:Program):Array<string>{
            return this.geometry.instanceAttributeData.map((data:InstanceAttributeData) => {
                return data.attributeName;
            }).toArray();
        }

        protected sendGLSLData(program:Program, instance:GameObject, instanceAttributeDataList:wdCb.Collection<InstanceAttributeData>):void{
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

