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
            if(this._hasAnimation() && !this.shader.hasLib(MorphNormalShaderLib)){
                this._addShaderLibToTop(MorphNormalShaderLib.create());
            }
            else if(!this.shader.hasLib(CommonNormalShaderLib)){
                this._addShaderLibToTop(CommonNormalShaderLib.create());
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
            //todo refactor: add get entityObject(){}
            if(this.geometry.entityObject.hasComponent(SourceInstance)){
                this.shader.addLib(InstanceShaderLib.create());
            }
            else{
                this.shader.addLib(NoInstanceShaderLib.create());
            }

            if(this._hasAnimation()){
                this.shader.addLib(MorphCommonShaderLib.create());
                this.shader.addLib(MorphVerticeShaderLib.create());
            }
            else{
                this.shader.addLib(CommonVerticeShaderLib.create());
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
