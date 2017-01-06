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
        public time:number = 0;
        @cloneAttributeAsBasicType()
        public speed:number = 0.01;
        @cloneAttributeAsBasicType()
        public terrainGeometry:TerrainGeometry = null;

        public init(){
            this.mapManager.addMap(this.map, {
                samplerVariableName: VariableNameTable.getVariableName("grassMap")
            });

            //todo if terrainGeometry->heightMapAsset change, should refresh here
            if(this.terrainGeometry && this.terrainGeometry.heightMapAsset){
                this.mapManager.addMap(this.terrainGeometry.heightMapAsset.toTexture(), {
                    samplerVariableName: VariableNameTable.getVariableName("heightMap")
                });
            }

            this._addShaderLib();

            super.init();
        }

        public getTextureForRenderSort():Texture{
            return this.map;
        }

        public updateShader(cmd:InstanceCommand){
            this._computeTime();

            super.updateShader(cmd);
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

        private _computeTime(){
            this.time += this.speed;
        }
    }
}

