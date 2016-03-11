module wd{
    export class WaterMaterial extends LightMaterial{
        public static create() {
            var obj = new this();

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

            //todo bumpMap?
            this.mapManager.addMap(bumpMap, {
                samplerVariableName: VariableNameTable.getVariableName("bumpMap")
            });

            this._bumpMap = bumpMap;
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


        public bindAndUpdateTexture(){
            super.bindAndUpdateTexture();

            this._computeTime();
        }

        protected addExtendShaderLib(){
            this.shader.addLib(WaterShaderLib.create());
        }

        //todo refactor? add WaterReflectionMapShaderLib?
        protected setReflectionMapShaderLib(){
            //if(this.reflectionMap){
            //    this.shader.addLib(wd.WaterReflectionMapShaderLib.create());
            //}
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

        /**
         * @param {number}: Represents the wind force
         */
        //public force:number = 6;
        public direction:Vector2 = Vector2.create(0, 1);
    }

    export class WaterWaveModel{
        public static create() {
        	var obj = new this();

        	return obj;
        }


        public height:number = 0.15;
        /**
         * @param {number}: Represents the maximum length of a wave
         */
        public length:number = 0.1;
        //public speed:number = 1.0;
    }
}

