module wd {
    export abstract class EngineMaterial extends Material{
        public refractionRatio:number = 0;
        public reflectivity:number = null;
        public mapCombineMode:ETextureCombineMode = ETextureCombineMode.MIX;
        public mapMixRatio:number = 0.5;

        public init(){
            this._addTopShaderLib();
            this.addShaderLib();

            super.init();
        }

        @virtual
        protected addShaderLib(){
        }

        protected addNormalShaderLib(){
            if(GlobalGeometryUtils.hasAnimation(this.geometry) && !this.shader.hasLib(NormalMorphShaderLib)){
                this._addShaderLibToTop(NormalMorphShaderLib.create());
            }
            else if(!this.shader.hasLib(NormalCommonShaderLib)){
                this._addShaderLibToTop(NormalCommonShaderLib.create());
            }
        }

        protected setBlendByOpacity(opacity:number){
            if(opacity < 1.0 && opacity >= 0.0){
                this.blend = true;
            }
            else{
                this.blend = false;
            }
        }

        protected createShader():Shader{
            return CommonShader.create();
        }

        private _addTopShaderLib(){
            this.shader.addLib(CommonShaderLib.create());
            if(InstanceUtils.isHardwareSupport() && InstanceUtils.isSourceInstance(this.geometry.entityObject)){
                this.shader.addLib(ModelMatrixInstanceShaderLib.create());
            }
            else{
                this.shader.addLib(ModelMatrixNoInstanceShaderLib.create());
            }

            if(GlobalGeometryUtils.hasAnimation(this.geometry)){
                this.shader.addLib(CommonMorphShaderLib.create());
                this.shader.addLib(VerticeMorphShaderLib.create());
            }
            else{
                this.shader.addLib(VerticeCommonShaderLib.create());
            }
        }

        private _addShaderLibToTop(lib:ShaderLib){
            this.shader.addShaderLibToTop(lib);
        }
    }
}
