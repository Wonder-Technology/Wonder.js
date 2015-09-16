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
                default:
                    dyCb.Log.error(true, dyCb.Log.info.FUNC_INVALID("blendType"));
                    break;
            }

            this._blendType = blendType;
        }

        get envMap(){
            return this.textureManager.getEnvMap();
        }
        set envMap(envMap:CubemapTexture){
            this.textureManager.setEnvMap(envMap);
        }

        public shader:Shader = Shader.create();
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
        public addMap(asset:TextureAsset, option:MapVariableData);
        public addMap(map:CommonTexture|CompressedTexture);
        public addMap(map:CommonTexture|CompressedTexture, option:MapVariableData);

        public addMap(arg){
            this.textureManager.addMap.apply(this.textureManager, Array.prototype.slice.call(arguments, 0));
        }

        public updateTexture(){
            this.textureManager.update();
        }

        public updateShader(quadCmd:QuadCommand){
            this.shader.update(quadCmd, this);
        }
    }

    export type MapVariableData = {
        samplerVariablePrefix?:string;
        samplerVariableName?: string;
    }
}
