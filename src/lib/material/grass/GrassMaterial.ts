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
        //todo should only has 3 data
        //todo change to getter/setter
        //todo clone
        public mapData:Array<GrassMapData> = [];
        @cloneAttributeAsBasicType()
        public alphaTest:number = 0.0001;
        @cloneAttributeAsCloneable()
        public wind:GrassWindModel = GrassWindModel.create();


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

        public updateShader(cmd:QuadCommand){
            this._computeTime();

            super.updateShader(cmd);
        }

        protected addExtendShaderLib(){
            if(this.grassMap !== null){
                this.shader.addLib(GrassMapShaderLib.create());
            }
        }

        private _computeTime(){
            this.wind.time += this.wind.speed;
        }
    }

    export class GrassWindModel{
        public static create() {
            var obj = new this();

            return obj;
        }

        @cloneAttributeAsBasicType()
        public time:number = 0;
        @cloneAttributeAsBasicType()
        public speed:number = 0.1;
        @cloneAttributeAsBasicType()
        public direction:Vector2 = Vector2.create(1, 1);
        @cloneAttributeAsBasicType()
        public strength:number = 0.002;

        public clone(){
            return CloneUtils.clone(this);
        }
    }

    export type GrassMapData = {
        sourceRegion:RectRegion;
    }
}

