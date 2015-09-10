/// <reference path="../definitions.d.ts"/>
module dy{
    export class MapMaterial extends Material{
        public static create() {
            var obj = new this();

            return obj;
        }

        public init(){
            if(this._isMultiMap()){
                this.shader.addLib(render.MultiMapShaderLib.getInstance());
            }
            else{
                this.shader.addLib(render.BasicMapShaderLib.getInstance());
            }

            super.init();
        }

        private _isMultiMap(){
            return this.textureManager.hasMultiTextures();
        }
    }
}

