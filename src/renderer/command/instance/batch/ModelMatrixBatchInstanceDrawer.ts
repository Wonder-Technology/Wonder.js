module wd {
    @singleton()
    export class ModelMatrixBatchInstanceDrawer extends OneToOneBatchInstanceDrawer{
        public static getInstance():any {}

		private constructor(){super();}

        protected getUniformDataNameArray(program:Program):Array<string>{
            return ["u_mMatrix"];
        }

        protected sendGLSLData(program:Program, instance:GameObject, [modelMatrixUniformDataName]):void{
            program.sendUniformData(modelMatrixUniformDataName, EVariableType.FLOAT_MAT4, instance.transform.localToWorldMatrix);
        }
    }
}

