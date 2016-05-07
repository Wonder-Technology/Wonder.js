module wd {
    export abstract class EngineMaterial extends Material{
        @cloneAttributeAsBasicType()
        public refractionRatio:number = 0;
        @cloneAttributeAsBasicType()
        public reflectivity:number = null;
        @cloneAttributeAsBasicType()
        public mapCombineMode:ETextureCombineMode = ETextureCombineMode.MIX;
        @cloneAttributeAsBasicType()
        public mapMixRatio:number = 0.5;

        public init(){
            this._addTopShaderLib();
            this.addShaderLib();
            this._addEndShaderLib();

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

            InstanceUtils.addModelMatrixShaderLib(this.shader, this.geometry.entityObject);

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

        private _addEndShaderLib(){
            this.shader.addLib(EndShaderLib.create());
        }
    }
}
