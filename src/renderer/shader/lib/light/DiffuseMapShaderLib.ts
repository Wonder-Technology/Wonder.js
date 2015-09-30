/// <reference path="../../../../definitions.d.ts"/>
module dy{
    export class DiffuseMapShaderLib extends LightMapShaderLib{
        private static _instance = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
                this._instance.initWhenCreate();
            }
            return this._instance;
        }

        public type:string = "diffuseMap";

        protected setShaderDefinition(){
            super.setShaderDefinition();

            this.addUniformVariable([
                VariableNameTable.getVariableName("diffuseMap"),
                "u_sourceRegion", "u_repeatRegion"
            ]);
        }
    }
}

