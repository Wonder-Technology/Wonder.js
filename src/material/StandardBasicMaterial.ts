module wd{
    export abstract class StandardBasicMaterial extends EngineMaterial{
        @ensureGetter(function(mapList:wdCb.Collection<Texture>){
            assert(mapList.getCount() <= 2, wdCb.Log.info.FUNC_SUPPORT("only", "map.count <= 2"));
        })
        get mapList(){
            return this.mapManager.getMapList();
        }

        @requireSetter(function(map:any){
            if(map instanceof Texture || map instanceof TextureAsset){
            }
            else{
                let mapArr:Array<any> = arguments[0];

                wdCb.Log.error(mapArr.length > 2, wdCb.Log.info.FUNC_SUPPORT("only", "map.count <= 2"));
            }
        })
        set map(map:any){
            if(map instanceof Texture || map instanceof TextureAsset){
                this.mapManager.addMap(map);
            }
            else{
                let mapArr:Array<any> = arguments[0];

                for(let m of mapArr){
                    this.mapManager.addMap(m);
                }
            }
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

            this.shader.addLib(EndBasicShaderLib.create());
        }

        private _setMapShaderLib(){
            var mapManager = this.mapManager,
                mapCount = mapManager.getMapCount();

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
                case EEnvMapMode.BASIC:
                    this.shader.addLib(BasicForBasicEnvMapShaderLib.create());
                    break;
                case EEnvMapMode.REFLECTION:
                    this.shader.addLib(ReflectionForBasicEnvMapShaderLib.create());
                    break;
                case EEnvMapMode.REFRACTION:
                    this.shader.addLib(RefractionForBasicEnvMapShaderLib.create());
                    break;
                case EEnvMapMode.FRESNEL:
                    this.shader.addLib(FresnelForBasicEnvMapShaderLib.create());
                    break;
                default:
                    Log.error(true, Log.info.FUNC_INVALID("EEnvMapMode"));
                    break;
            }
        }
    }
}

