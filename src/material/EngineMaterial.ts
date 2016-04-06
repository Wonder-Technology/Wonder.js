module wd {
    export abstract class EngineMaterial extends Material{
        public refractionRatio:number = 0;
        public reflectivity:number = null;
        public mapCombineMode:ETextureCombineMode = ETextureCombineMode.MIX;
        public mapMixRatio:number = 0.5;

        @require(function(){
            assert(!(this.mirrorMap && this.envMap), Log.info.FUNC_SHOULD_NOT("mirrorMap and envMap", "be set both"));
        })
        public init(){
            this._addTopShaderLib();
            this.addShaderLib();

            super.init();
        }

        @virtual
        protected addShaderLib(){
        }

        protected addNormalShaderLib(){
            if(this._hasAnimation() && !this.shader.hasLib(NormalMorphShaderLib)){
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
            return CommonShader.create(this);
        }

        private _addTopShaderLib(){
            this.shader.addLib(CommonShaderLib.create());
            if(InstanceUtils.isHardwareSupport() && InstanceUtils.isSourceInstance(this.geometry.entityObject)){
                this.shader.addLib(ModelMatrixInstanceShaderLib.create());
            }
            else{
                this.shader.addLib(ModelMatrixNoInstanceShaderLib.create());
            }

            if(this._hasAnimation()){
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

        private _hasAnimation(){
            if(this.geometry instanceof ModelGeometry){
                let geo = <any>(this.geometry);

                return geo.hasAnimation();
            }

            return false;
        }
    }
}
