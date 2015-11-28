/// <reference path="../filePath.d.ts"/>
module dy{
    export class BasicMaterial extends Material{
        public static create() {
            var obj = new this();

            return obj;
        }
        
        set map(map:any){
            if(map instanceof Texture || map instanceof TextureAsset){
                this.addMap(map);
            }
            else{
                let mapArr:Array<any> = (arguments[0]);

                dyCb.Log.error(mapArr.length > 2, dyCb.Log.info.FUNC_SUPPORT("only", "map.count <= 2"));

                for(let m of mapArr){
                    this.addMap(m);
                }
            }
        }

        get mirrorMap(){
            return this.mapManager.getMirrorMap();
        }
        set mirrorMap(mirrorMap:MirrorTexture){
            this.mapManager.setMirrorMap(mirrorMap);
        }

        private _opacity:number = 1.0;
        get opacity(){
            return this._opacity;
        }
        set opacity(opacity:number){
            this.setBlendByOpacity(opacity);

            this._opacity = opacity;
        }

        protected addShaderLib(){
            var envMap = null;

            this.shader.addLib(BasicShaderLib.create());

            this._setMapShaderLib();

            envMap = this.envMap;
            if(envMap){
                this._setEnvMapShaderLib(envMap);
            }

            this._setMirrorMapShaderLib();

            this.shader.addLib(BasicEndShaderLib.create());
        }

        private _setMapShaderLib(){
            var mapManager = this.mapManager,
                mapCount = mapManager.getMapCount((map:Texture) => {
                return !mapManager.isMirrorMap(map);
            });

            if(mapCount > 0){
                if(mapCount > 1){
                    this.shader.addLib(MultiMapShaderLib.create());
                }
                else{
                    this.shader.addLib(BasicMapShaderLib.create());
                }
            }
        }

        private _setEnvMapShaderLib(envMap:CubemapTexture){
            this.addNormalShaderLib();

            switch (envMap.mode){
                case EnvMapMode.BASIC:
                    this.shader.addLib(BasicEnvMapForBasicShaderLib.create());
                    break;
                case EnvMapMode.REFLECTION:
                    this.shader.addLib(ReflectionForBasicShaderLib.create());
                    break;
                case EnvMapMode.REFRACTION:
                    this.shader.addLib(RefractionForBasicShaderLib.create());
                    break;
                case EnvMapMode.FRESNEL:
                    this.shader.addLib(FresnelForBasicShaderLib.create());
                    break;
                default:
                    Log.error(true, Log.info.FUNC_INVALID("EnvMapMode"));
                    break;
            }
        }

        private _setMirrorMapShaderLib(){
            if(this.mirrorMap){
                this.shader.addLib(dy.MirrorForBasicShaderLib.create());
            }
        }
    }
}

