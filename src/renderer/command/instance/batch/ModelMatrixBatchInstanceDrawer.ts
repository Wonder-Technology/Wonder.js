module wd {
    export class ModelMatrixBatchInstanceDrawer extends BatchInstanceDrawer{
        public static create(){
            var obj = new this();

            return obj;
        }

        protected getOffsetLocationArray(program:Program):Array<number>{
            return [program.getUniformLocation("u_mMatrix")];
        }

        protected sendGLSLData(program:Program, instance:GameObject, [modelMatrixLocation]):void{
            program.sendUniformData(modelMatrixLocation, EVariableType.FLOAT_MAT4, instance.transform.localToWorldMatrix);
        }
    }
}

