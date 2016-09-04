module wd{
    export class GrassMaterial extends StandardLightMaterial{
        public static create() {
            var obj = new this();

            obj.initWhenCreate();

            return obj;
        }

        @cloneAttributeAsCloneable()
        public grassMap:ImageTexture|ProceduralTexture = null;
        //todo assert
        //todo change to getter/setter
        //todo clone
        public mapData:Array<GrassMapData> = [];
        @cloneAttributeAsBasicType()
        public alphaTest:number = 0.0001;


        public initWhenCreate(){
            super.initWhenCreate();

            this.side = ESide.BOTH;
            this.blend = true;
        }

        public init(){
            if(this.grassMap !== null){
                this.grassMap.wrapS = ETextureWrapMode.REPEAT;
                this.grassMap.wrapT = ETextureWrapMode.REPEAT;

                this.mapManager.addMap(this.grassMap, {
                    samplerVariableName: VariableNameTable.getVariableName("grassMap")
                });
            }

            super.init();
        }

        public getTextureForRenderSort():Texture{
            if(this.grassMap !== null){
                return this.grassMap;
            }
        }

        protected addExtendShaderLib(){
            if(this.grassMap !== null){
                this.shader.addLib(GrassMapShaderLib.create());
            }
        }
    }

    export type GrassMapData = {
        sourceRegion:RectRegion;
        repeatRegion?:RectRegion;
    }
}

