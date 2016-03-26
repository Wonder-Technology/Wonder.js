module wd{
    export class EnvMapController extends MapController{
        public static create(material:Material) {
            var obj = new this(material);

            return obj;
        }

        private _map:CubemapTexture = null;

        public setEnvMap(envMap:CubemapTexture){
            if(!envMap){
                this._map = null;
                return;
            }

            this.setMapMaterial(envMap);

            this._map = envMap;
        }

        public getEnvMap(){
            return this._map;
        }

        public getAllMapArr(){
            return this._map !== null ? [this._map] : [];
        }

        public removeAllChildren(){
            this._map = null;
        }
    }
}

