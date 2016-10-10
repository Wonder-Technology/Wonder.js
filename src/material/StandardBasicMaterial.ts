module wd{
    export abstract class StandardBasicMaterial extends EngineMaterial{
        @ensureGetter(function(mapList:wdCb.Collection<Texture>){
            assert(mapList.getCount() <= 2, wdCb.Log.info.FUNC_SUPPORT("only", "map.count <= 2"));
        })
        @cloneAttributeAsCustomType(function(source:StandardBasicMaterial, target:StandardBasicMaterial, memberName:string){
            source[memberName].forEach((map:BasicTexture|ProceduralTexture) => {
                target.mapManager.addMap(map.clone());
            });
        })
        get mapList(){
            return this.mapManager.getMapList();
        }

        private _map:Texture|TextureAsset|Array<Texture>|Array<TextureAsset> = null;
        @requireSetter(function(map:Texture|TextureAsset|Array<Texture>|Array<TextureAsset>){
            if(map instanceof Texture || map instanceof TextureAsset){
            }
            else{
                let mapArr:Array<any> = map;

                it("map should be array", () => {
                    expect(mapArr).be.a("array");
                });
                it("map.count should < 3", () => {
                    expect(mapArr.length).lessThan(3);
                });
            }
        })
        set map(map:Texture|TextureAsset|Array<Texture>|Array<TextureAsset>){
            this._map = map;

            this._addMap();
        }

        @cloneAttributeAsBasicType()
        public opacity:number = 1.0;

        @virtual
        protected addExtendShaderLib(){
        }

        protected addShaderLib(){
            var envMap = null;

            this.shader.addLib(BasicShaderLib.create());

            this._setMapShaderLib();

            envMap = this.envMap;
            if(envMap){
                InstanceUtils.addNormalModelMatrixShaderLib(this.shader, this.geometry.entityObject);

                this._setEnvMapShaderLib(envMap);
            }

            this.addExtendShaderLib();

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

            this.shader.addLib(CommonEnvMapShaderLib.create());

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

        private _addMap(){
            var map = this._map;

            if(map === null){
                return;
            }

            if(map instanceof Texture || map instanceof TextureAsset){
                this.mapManager.addMap(<Texture&TextureAsset>map);
            }
            else{
                for(let m of map){
                    this.mapManager.addMap(<Texture&TextureAsset>m);
                }
            }
        }
    }
}

