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
        public shadowCameraLeft:number = -1000;
        public shadowCameraRight:number = 1000;
        public shadowCameraTop:number = 1000;
        public shadowCameraBottom:number = -1000;
        public shadowMap:TwoDShadowMapTexture;

        public init(){
            if(this.castShadow){
                this.shadowMap = TwoDShadowMapTexture.create();
                Director.getInstance().stage.addRenderTargetRenderer(TwoDShadowMapRenderTargetRenderer.create(this));
            }
        }

        public getDirection(){
            //todo change?
            //return this.gameObject.transform.position.sub(Vector3.create(0, 0, 0));
            return Vector3.create(0, 0, 0).sub(this.gameObject.transform.position);
        }
    }
}

