module wd{
    export class GrassInstanceMaterial extends Material{
        public static create() {
            var obj = new this();

            obj.initWhenCreate();

            return obj;
        }

        public geometry:GrassInstanceGeometry;

        @cloneAttributeAsCloneable()
        public map:ImageTexture|ProceduralTexture = null;
        @cloneAttributeAsBasicType()
        public size:number = 5;
        @cloneAttributeAsCloneable()
        public drawPos:Vector2 = Vector2.create(0, 0);
        @cloneAttributeAsBasicType()
        public time:number = 0;

        public init(){
            this.mapManager.addMap(this.map, {
                samplerVariableName: VariableNameTable.getVariableName("grassMap")
            });

            this._addShaderLib();

            super.init();
        }

        public getTextureForRenderSort():Texture{
            return this.map;
        }

        protected createShader():Shader{
            return CommonShader.create();
        }

        private _addShaderLib(){
            this.shader.addLib(GrassCommonInstanceShaderLib.create());

            if(InstanceUtils.isHardwareSupport()){
                this.shader.addLib(GrassHardwareInstanceShaderLib.create());
            }
            else{
                this.shader.addLib(GrassBatchInstanceShaderLib.create());
            }

            this.shader.addLib(EndShaderLib.create());
        }
    }
}

