module wd{
    export class WaterMaterial extends StandardLightMaterial{
        public static create() {
            var obj = new this();

            obj.initWhenCreate();

            return obj;
        }


        private _bumpMap:Texture = null;
        get bumpMap(){
            return this._bumpMap;
        }
        @requireSetter(function(bumpMap:Texture){
            assert(bumpMap instanceof ImageTexture);
        })
        set bumpMap(bumpMap:Texture){
            bumpMap.wrapS = wd.ETextureWrapMode.REPEAT;
            bumpMap.wrapT = wd.ETextureWrapMode.REPEAT;

            this.mapManager.addMap(bumpMap, {
                samplerVariableName: VariableNameTable.getVariableName("bumpMap")
            });

            this._bumpMap = bumpMap;
        }

        private _reflectionMap:Texture = null;
        get reflectionMap(){
            return this._reflectionMap;
        }
        set reflectionMap(reflectionMap:Texture){
            this.mapManager.addMap(reflectionMap, {
                samplerVariableName: VariableNameTable.getVariableName("reflectionMap")
            });

            this._reflectionMap = reflectionMap;
        }

        private _refractionMap:Texture = null;
        get refractionMap(){
            return this._refractionMap;
        }
        set refractionMap(refractionMap:Texture){
            this.mapManager.addMap(refractionMap, {
                samplerVariableName: VariableNameTable.getVariableName("refractionMap")
            });

            this._refractionMap = refractionMap;
        }


        public wind:WaterWindModel = WaterWindModel.create();
        public wave:WaterWaveModel = WaterWaveModel.create();
        public fresnelLevel:number = 1.0;
        public reflectionLevel:number = 0.6;
        public refractionLevel:number = 0.8;


        public updateShader(quadCmd:QuadCommand){
            super.updateShader(quadCmd);

            this._computeTime();
        }

        protected addExtendShaderLib(){
            if(this.bumpMap){
                this.shader.addLib(WaterBumpMapShaderLib.create());
            }
            else{
                this.shader.addLib(WaterNoBumpMapShaderLib.create());
            }

            this.shader.addLib(WaterShaderLib.create());

            if(this.reflectionMap && this.reflectionMap){
                this.shader.addLib(WaterFresnelShaderLib.create());
            }
            else if(this.reflectionMap){
                this.shader.addLib(WaterReflectionMapShaderLib.create());
            }
            else if(this.refractionMap){
                this.shader.addLib(WaterRefractionMapShaderLib.create());
            }
            else{
                this.shader.addLib(WaterNoLightEffectShaderLib.create());
            }
        }

        private _computeTime(){
            this.wind.time += 0.0001;
        }
    }

    export class WaterWindModel{
        public static create() {
            var obj = new this();

            return obj;
        }


        get matrix():Matrix4 {
            return Matrix4.create().translate(this.direction.x * this.time, this.direction.y * this.time, 0);
        }


        public time:number = 0;
        public direction:Vector2 = Vector2.create(0, 1);
    }

    export class WaterWaveModel{
        public static create() {
            var obj = new this();

            return obj;
        }

        public height:number = 0.15;
        public length:number = 0.1;
    }
}


