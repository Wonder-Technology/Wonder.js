/// <reference path="../definitions.d.ts"/>
module dy {
    //todo default render direction is up?
    import JudgeUtils = dyRt.JudgeUtils;
    export class MirrorTexture extends Texture {
        public static create() {
        	var obj = new this();

        	obj.initWhenCreate();

        	return obj;
        }

        //todo add it
        private _renderList:dyCb.Collection<GameObject> = null;
        get renderList(){
            return this._renderList;
        }
        //todo pass type check
        //set renderList(renderList:[GameObject]){
        set renderList(renderList:any){
            if(JudgeUtils.isArray(renderList)){
                this._renderList = dyCb.Collection.create<GameObject>(renderList);
            }
            else if(renderList instanceof dyCb.Collection){
                this._renderList = renderList;
            }
            else{
                dyCb.Log.error(true, dyCb.Log.info.FUNC_MUST_BE("renderList", "array or dyCb.Collection"));
            }
        }

        public size:number = 512;

        public initWhenCreate(){
        }

        public init(){
            //var self = this;

            super.init();

            //EventManager.on("dy_startLoop", () => {
            //    if(self._video.isStop){
            //        self.needUpdate = false;
            //    }
            //    else{
            //        self.needUpdate = true;
            //    }
            //});

            this.width = this.size;
            this.height = this.size;
            //this.source = null;

            //todo support mipmap?
            //not support mipmap now
            this.generateMipmaps = false;
            this.minFilter = TextureFilterMode.LINEAR;
            this.magFilter = TextureFilterMode.LINEAR;







            var stage = Director.getInstance().stage;

            //stage.renderTargets = this.renderList;
            //stage
            stage.mirrorTexture = this;


            //var mirrorCamera = Camera.create();

            //todo how to get real-time plane data?

            //todo -2?+2? difference?

            //todo +?-?
            //var plane = Plane.create(0, 1, 0, -5);

            //d = -pn
            var plane = Plane.create(0, 1, 0, 0);

            //var currentCamera = stage.camera;



            //var cameraComponent = currentCamera.getComponent<Camera>(Camera);
            //
            //plane.getReflectionMatrix().applyMatrix(cameraComponent.worldToCameraMatrix);
            //
            //stage.mirrorCamera = mirrorCamera;
            stage.mirrorPlane = plane;





            return this;
        }

        public update(index:number){
            return this;
        }

        protected allocateSourceToTexture(isSourcePowerOfTwo:boolean) {
                //var noMipmapCmd:DrawNoMipmapTwoDTextureCommand = null,
                //gl = Director.getInstance().gl;
                //
                //noMipmapCmd = DrawNoMipmapTwoDTextureCommand.create();
                //noMipmapCmd.source = null;
                //noMipmapCmd.format = this.format;
                //noMipmapCmd.type = this.type;
                //noMipmapCmd.sourceRegion = null;
                //noMipmapCmd.sourceRegionMethod = null;
                //noMipmapCmd.glTarget = gl.TEXTURE_2D;
                //
                //noMipmapCmd.execute();
        }
    }
}

