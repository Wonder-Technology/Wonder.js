/// <reference path="../definitions.d.ts"/>
module dy{
    export class BasicMaterial extends Material{
        public static create() {
            var obj = new this();

            return obj;
        }

        public init(){
            this.shader.addLib(BasicShaderLib.getInstance());

            super.init();
        }
    }
}

