module wd {
    export class NormalMatrixModelMatrixBatchInstanceDrawer extends BatchInstanceDrawer{
        public static create(){
            var obj = new this();

            return obj;
        }

        protected getOffsetLocationArray(program:Program):Array<number>{
            return [program.getUniformLocation("u_mMatrix"), program.getUniformLocation("u_normalMatrix")];
        }

        protected sendGLSLData(program:Program, instance:GameObject, [modelMatrixLocation, normalMatrixLocation]):void{
            program.sendUniformData(modelMatrixLocation, EVariableType.FLOAT_MAT4, instance.transform.localToWorldMatrix);
            //todo transform add normalMatrix cache
            program.sendUniformData(normalMatrixLocation, EVariableType.FLOAT_MAT4, instance.transform.localToWorldMatrix.invertTo3x3().transpose());
        }
    }
}

