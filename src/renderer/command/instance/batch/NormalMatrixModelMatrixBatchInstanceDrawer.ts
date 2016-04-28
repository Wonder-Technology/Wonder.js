module wd {
    export class NormalMatrixModelMatrixBatchInstanceDrawer extends BatchInstanceDrawer{
        private static _instance = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
            }

            return this._instance;
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

