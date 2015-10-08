/// <reference path="../../definitions.d.ts"/>
module dy{
    export class DirectionLight extends Light{
        public static type:string = "directionLight";
        public static defaultPosition:Vector3 = Vector3.create(0, 0, 1);

        public static create() {
            var obj = new this();

            return obj;
        }

        private _shadowRenderList:dyCb.Collection<GameObject> = null;
        get shadowRenderList(){
            return this._shadowRenderList;
        }
        set shadowRenderList(shadowRenderList:any) {
            if (JudgeUtils.isArray(shadowRenderList)) {
                this._shadowRenderList = dyCb.Collection.create<GameObject>(shadowRenderList);
            }
            else if (shadowRenderList instanceof dyCb.Collection) {
                this._shadowRenderList = shadowRenderList;
            }
            else {
                dyCb.Log.error(true, dyCb.Log.info.FUNC_MUST_BE("shadowRenderList", "array or dyCb.Collection"));
            }
        }

        public intensity:number = 1;
        //todo extract Shadow class?
        public castShadow:boolean = false;
        public shadowCameraLeft:number = -1000;
        public shadowCameraRight:number = 1000;
        public shadowCameraTop:number = 1000;
        public shadowCameraBottom:number = -1000;
        public shadowCameraNear:number = 0.1;
        public shadowCameraFar:number = 5000;
        public shadowBias:number = ShaderChunk.NULL;
        public shadowDarkness:number = 0;
        public shadowMapWidth:number = 1024;
        public shadowMapHeight:number = 1024;
        public shadowMap:ShadowMapTexture = null;

        public init(){
            if(this.castShadow){
                this.shadowMap = ShadowMapTexture.create();
                Director.getInstance().stage.addRenderTargetRenderer(ShadowMapRenderTargetRenderer.create(this));
            }
        }

        public createShadowMapCamera():GameObject{
            //var pos =Vector3.create(-20, 50, 0);





            var orthoCameraComponent = OrthographicCamera.create(),
                camera = GameObject.create();

            orthoCameraComponent.left = this.shadowCameraLeft;
            orthoCameraComponent.right = this.shadowCameraRight;
            orthoCameraComponent.top = this.shadowCameraTop;
            orthoCameraComponent.bottom = this.shadowCameraBottom;
            orthoCameraComponent.near = this.shadowCameraNear;
            orthoCameraComponent.far = this.shadowCameraFar;

            camera.addComponent(orthoCameraComponent);

            //todo optimize:dirty?
            camera.transform.translate(this.gameObject.transform.position);
            camera.transform.lookAt(0, 0, 0);

            camera.init();


            //var orthoCameraComponent = PerspectiveCamera.create(),
            //    camera = GameObject.create();
            //
            //orthoCameraComponent.fovy = 90;
            //orthoCameraComponent.aspect = 1.0;
            //orthoCameraComponent.near = this.shadowCameraNear;
            //orthoCameraComponent.far = this.shadowCameraFar;
            //
            //camera.addComponent(orthoCameraComponent);
            //
            ////todo optimize:dirty?
            ////camera.transform.lookAt(this.getDirection());
            ////camera.transform.lookAt(-1, -1, 0);
            ////camera.transform.translate(this.shadowPosition);
            //camera.transform.translate(pos);
            //camera.transform.lookAt(0, 0, 0);
            //
            //camera.init();





            return camera;
        }

        public getDirection(){
            //return this.gameObject.transform.position.sub(Vector3.create(0, 0, 0));
            return Vector3.create(0, 0, 0).sub(this.gameObject.transform.position);
        }
    }
}

