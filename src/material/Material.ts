/// <reference path="../definitions.d.ts"/>
module dy {
    //todo add more attribute refer to unity

    export class Material {
        get program(){
            return this.shader.program;
        }

        private _blendType:BlendType = null;
        get blendType(){
            if(this._blendType){
                return this._blendType;
            }

            if ( (this.blendSrc === BlendFunction.ONE)
                && (this.blendDst === BlendFunction.ZERO)
                && (this.blendEquation === BlendEquation.ADD)) {
                return BlendType.NONE;
            }
            else if ((this.blendSrc === BlendFunction.SRC_ALPHA)
                && (this.blendDst === BlendFunction.ONE_MINUS_SRC_ALPHA)
                && (this.blendEquation === BlendEquation.ADD)) {
                return BlendType.NORMAL;
            }
            else if ((this.blendSrc === BlendFunction.ONE)
                && (this.blendDst === BlendFunction.ONE)
                && (this.blendEquation === BlendEquation.ADD)) {
                return BlendType.ADDITIVE;
            }
            else if ((this.blendSrc === BlendFunction.SRC_ALPHA)
                && (this.blendDst === BlendFunction.ONE)
                && (this.blendEquation === BlendEquation.ADD)) {
                return BlendType.ADDITIVEALPHA;
            }
            else if ((this.blendSrc === BlendFunction.DST_COLOR)
                && (this.blendDst === BlendFunction.ZERO)
                && (this.blendEquation === BlendEquation.ADD)) {
                return BlendType.MULTIPLICATIVE;
            }
            else if ((this.blendSrc === BlendFunction.ONE)
                && (this.blendDst === BlendFunction.ONE_MINUS_SRC_ALPHA)
                && (this.blendEquation === BlendEquation.ADD)) {
                return BlendType.PREMULTIPLIED;
            }
            else {
                return BlendType.NORMAL;
            }
        }
        set blendType(blendType:BlendType){
            switch (blendType) {
                case BlendType.NONE:
                    this.blend = false;
                    this.blendSrc = BlendFunction.ONE;
                    this.blendDst = BlendFunction.ZERO;
                    this.blendEquation = BlendEquation.ADD;
                    break;
                case BlendType.NORMAL:
                    this.blend = true;
                    this.blendSrc = BlendFunction.SRC_ALPHA;
                    this.blendDst = BlendFunction.ONE_MINUS_SRC_ALPHA;
                    this.blendEquation = BlendEquation.ADD;
                    break;
                case BlendType.PREMULTIPLIED:
                    this.blend = true;
                    this.blendSrc = BlendFunction.ONE;
                    this.blendDst = BlendFunction.ONE_MINUS_SRC_ALPHA;
                    this.blendEquation = BlendEquation.ADD;
                    break;
                case BlendType.ADDITIVE:
                    this.blend = true;
                    this.blendSrc = BlendFunction.ONE;
                    this.blendDst = BlendFunction.ONE;
                    this.blendEquation = BlendEquation.ADD;
                    break;
                case BlendType.ADDITIVEALPHA:
                    this.blend = true;
                    this.blendSrc = BlendFunction.SRC_ALPHA;
                    this.blendDst = BlendFunction.ONE;
                    this.blendEquation = BlendEquation.ADD;
                    break;
                case BlendType.MULTIPLICATIVE:
                    this.blend = true;
                    this.blendSrc = BlendFunction.DST_COLOR;
                    this.blendDst = BlendFunction.ZERO;
                    this.blendEquation = BlendEquation.ADD;
                    break;
            }

            this._blendType = blendType;
        }

        public shader:render.Shader = render.Shader.create();
        public color:Color = Color.create("0xffffff");
        //public depthTest:boolean = true;
        //public depthWrite:boolean = true;
        public redWrite:boolean = true;
        public greenWrite:boolean = true;
        public blueWrite:boolean = true;
        public alphaWrite:boolean = true;
        public polygonOffsetMode:PolygonOffsetMode = PolygonOffsetMode.NONE;
        public cullMode:CullMode = CullMode.BACK;
        public blend:boolean = false;
        public blendSrc:BlendFunction = BlendFunction.SRC_COLOR;
        public blendDst:BlendFunction = BlendFunction.DST_COLOR;
        public blendEquation:BlendEquation = BlendEquation.ADD;
        public textureManager:TextureManager = TextureManager.create();


        public init(){
            this.textureManager.init();

            this.shader.init();
        }

        public dispose(){
            this.textureManager.dispose();
        }

        public addMap(asset:TextureAsset);
        public addMap(map:TwoDTexture);

        public addMap(arg){
            this.textureManager.addMap(arguments[0]);
        }

        public setEnvMap(envMap:CubeTexture){
            this.textureManager.setEnvMap(envMap);
        }

        public getEnvMap():CubeTexture{
            return this.textureManager.getEnvMap();
        }

        public updateTexture(){
            this.textureManager.update();
        }

        public updateShader(quadCmd:render.QuadCommand){
            this.shader.update(quadCmd, this);
        }
    }
}
