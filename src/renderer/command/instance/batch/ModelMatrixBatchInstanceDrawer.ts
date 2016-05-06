module wd {
    export class ModelMatrixBatchInstanceDrawer extends BatchInstanceDrawer{
        private static _instance = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
            }

            return this._instance;
        }

        protected getUniformDataNameArray(program:Program):Array<string>{
            return ["u_mMatrix"];
        }

        protected sendGLSLData(program:Program, instance:GameObject, [modelMatrixUniformDataName]):void{
            program.sendUniformData(modelMatrixUniformDataName, EVariableType.FLOAT_MAT4, instance.transform.localToWorldMatrix);
        }
    }
}

