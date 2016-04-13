module wd{
    export class EnvMapController extends MapController{
        public static create() {
            var obj = new this();

            return obj;
        }

        public material:Material = null;

        private _map:CubemapTexture = null;

        public setEnvMap(envMap:CubemapTexture){
            if(!envMap){
                this._map = null;
                return;
            }

            envMap.material = this.material;

            this._map = envMap;
        }

        public getEnvMap(){
            return this._map;
        }

        public getAllMapArr(){
            return this._map !== null ? [this._map] : [];
        }

        public removeChild(map:Texture){
            if(JudgeUtils.isEqual(this._map, map)){
                this._map = null;
            }
        }

        public removeAllChildren(){
            this._map = null;
        }
    }
}

