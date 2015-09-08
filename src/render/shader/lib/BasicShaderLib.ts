/// <reference path="../../../definitions.d.ts"/>
module dy.render{
    export class BasicShaderLib extends ShaderLib{
        private static _instance:BasicShaderLib = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
            }
            return this._instance;
        }

        //todo typescript define options' type
        protected setShaderDefinition(options:any){
            this.addAttributeVariable(["a_color"]);

            this.vsSource = ShaderChunk.basic_vertex;
            this.fsSource = ShaderChunk.basic_fragment;
        }
    }
}

