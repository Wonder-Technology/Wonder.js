module wd {
    export abstract class ShadowMapRenderTargetRendererUtils{
        constructor(light:Light, texture:Texture){
            this.light = light;
            this.texture = texture;
        }

        public texture:Texture = null;

        protected light:Light = null;

        private _endLoopSubscription:wdFrp.IDisposable = null;
        private _shader:CommonShader = null;

        public initWhenCreate(){
            this.texture.width = this.light.shadowMapWidth;
            this.texture.height = this.light.shadowMapHeight;
        }

        public init(){
            this.texture.init();
        }


        public setShadowMapData(target:GameObject);
        public setShadowMapData(target:GameObject, shadowMapCamera:GameObject);

        public setShadowMapData(...args){
            var target:GameObject = args[0],
                material:LightMaterial = <LightMaterial>target.getComponent<Geometry>(Geometry).material,
          shadowMapCamera = null;

            if(args.length === 2){
                shadowMapCamera = args[1];
            }

            Log.error(!(material instanceof LightMaterial), Log.info.FUNC_MUST_BE("material", "LightMaterial when set shadowMap"));

            this.setMaterialShadowMapData(material, target, shadowMapCamera);
        }

        public bindEndLoop(func:Function){
            this._endLoopSubscription = EventManager.fromEvent(<any>EEngineEvent.ENDLOOP)
                .subscribe(() => {
                    func();
                })
        }

        public unBindEndLoop(){
            this._endLoopSubscription && this._endLoopSubscription.dispose();
        }

        public beforeRender(){
            var scene:SceneDispatcher = Director.getInstance().scene;

            scene.useShader(EShaderMapKey.BUILD_SHADOWMAP);
        }

        public afterRender(){
            var scene:SceneDispatcher = Director.getInstance().scene;

            scene.unUseShader();
        }

        public createShaderWithShaderLib(lib:BuildShadowMapShaderLib){
            ////todo refactor
            //this._shader = CommonShader.create(null);
            //this._shader.addLib(CommonShaderLib.create());
            //this._shader.addLib(VerticeCommonShaderLib.create());
            //this._shader.addLib(ModelMatrixForBuildShadowMapShaderLib.create());
            //this._shader.addLib(lib);
        }

        public isContainer(entityObject:GameObject){
            return !entityObject.hasComponent(Geometry);
        }

        public addAllChildren(entityObject:GameObject){
            var children = [],
                add = (entityObject:GameObject) => {
                    entityObject.forEach((child:GameObject) => {
                        children.push(child);

                        add(child);
                    });
                };

            add(entityObject);

            return children;
        }

        protected abstract setMaterialShadowMapData(material:LightMaterial, target:GameObject, shadowMapCamera:GameObject);
        protected abstract addShadowMap(material:LightMaterial, shadowMap:IShadowMapTexture);

        protected setShadowMap(target:GameObject, shadowMap:IShadowMapTexture){
            var material:LightMaterial = null;

            //change
            if(!target.hasComponent(Geometry)){
                return;
            }

            material = <LightMaterial>target.getComponent<Geometry>(Geometry).material;

            if(material.hasShadowMap(shadowMap)){
                return;
            }

            Log.error(!(material instanceof LightMaterial), Log.info.FUNC_MUST_BE("material", "LightMaterial when set shadowMap"));

            this.addShadowMap(material, shadowMap);
        }
    }
}

