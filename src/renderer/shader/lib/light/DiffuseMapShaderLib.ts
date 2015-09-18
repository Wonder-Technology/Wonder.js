/// <reference path="../../../../definitions.d.ts"/>
module dy{
    export abstract class DiffuseMapShaderLib extends LightMapShaderLib{
        protected setShaderDefinition(){
            super.setShaderDefinition();

            this.addUniformVariable([
                VariableNameTable.getVariableName("diffuseMap")
]);

            //this.setSourceContent();
        }
        //
        //protected abstract setSourceContent();
    }
}

