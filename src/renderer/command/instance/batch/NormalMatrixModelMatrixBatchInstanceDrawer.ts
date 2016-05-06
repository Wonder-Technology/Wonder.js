module wd {
    export class NormalMatrixModelMatrixBatchInstanceDrawer extends BatchInstanceDrawer{
        private static _instance = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
            }

            return this._instance;
        }

        protected getUniformDataNameArray(program:Program):Array<string>{
            return ["u_mMatrix", "u_normalMatrix"];
        }

        protected sendGLSLData(program:Program, instance:GameObject, [modelMatrixUniformDataName, normalMatrixUniformDataName]):void{
            program.sendUniformData(modelMatrixUniformDataName, EVariableType.FLOAT_MAT4, instance.transform.localToWorldMatrix);
            //todo transform add normalMatrix cache
            program.sendUniformData(normalMatrixUniformDataName, EVariableType.FLOAT_MAT3, instance.transform.localToWorldMatrix.invertTo3x3().transpose());
        }
    }
}

