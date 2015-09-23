/// <reference path="../definitions.d.ts"/>
module dy{
    //todo refactor?
    export class MirrorMaterial extends Material{
        public static create() {
            var obj = new this();

            return obj;
        }

        public init(){
            this.shader.addLib(dy.MirrorShaderLib.getInstance());

            super.init();
        }
    }
}

