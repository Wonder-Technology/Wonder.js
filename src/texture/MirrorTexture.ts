/// <reference path="../definitions.d.ts"/>
module dy {
    declare var window:any;

    //todo default render direction is up?
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
        //todo if is null,then render all
        //todo pass type check
        //set renderList(renderList:[GameObject]){
        set renderList(renderList:any) {
            if (JudgeUtils.isArray(renderList)) {
                this._renderList = dyCb.Collection.create<GameObject>(renderList);
            }
            else if (renderList instanceof dyCb.Collection) {
                this._renderList = renderList;
            }
            else {
                dyCb.Log.error(true, dyCb.Log.info.FUNC_MUST_BE("renderList", "array or dyCb.Collection"));
            }
        }

        public size:number = 256;

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

            stage.addRenderTargetRenderer(this);

            return this;
        }

        public setTexture(texture:any){
            this.glTexture = texture;
        }

        //todo move to MirrorRenderTarget?
        public getPlane(){
            dyCb.Log.error(!(this.geometry instanceof PlaneGeometry), dyCb.Log.info.FUNC_MUST_BE("geometry", "PlaneGeometry"));

            //todo change
            return Plane.create(0, 1, 0, 0);
        }

        public update(index:number){
            return this;
        }

        protected allocateSourceToTexture(isSourcePowerOfTwo:boolean) {
        }
    }
}

