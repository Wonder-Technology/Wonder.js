module wd {
    export class ModelMatrixBatchInstanceDrawer extends BatchInstanceDrawer{
        private static _instance = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
            }

            return this._instance;
        }

        protected getOffsetLocationArray(program:Program):Array<number>{
            return [program.getUniformLocation("u_mMatrix")];
        }

        protected sendGLSLData(program:Program, instance:GameObject, [modelMatrixLocation]):void{
            program.sendUniformData(modelMatrixLocation, EVariableType.FLOAT_MAT4, instance.transform.localToWorldMatrix);
        }
    }
}

