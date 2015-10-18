/// <reference path="../../../../../definitions.d.ts"/>
module dy{
    export class SpecularMapShaderLib extends LightMapShaderLib{
        private static _instance = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
                this._instance.initWhenCreate();
            }
            return this._instance;
        }

        public type:string = "specularMap";

        protected setShaderDefinition(){
            super.setShaderDefinition();

            this.addUniformVariable([
                VariableNameTable.getVariableName("specularMap")
            ]);
        }
    }
}

