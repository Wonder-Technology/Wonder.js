/// <reference path="../../../../definitions.d.ts"/>
module dy{
    export abstract class SpecularMapShaderLib extends LightMapShaderLib{
        protected setShaderDefinition(){
            super.setShaderDefinition();

            this.addUniformVariable([
                VariableNameTable.getVariableName("specularMap")
            ]);

            this.setSourceContent();
        }

        protected abstract setSourceContent();
    }
}

