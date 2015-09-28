/// <reference path="../definitions.d.ts"/>
module dy {
    export class MirrorTexture extends RenderTargetTexture {
        public static create() {
        	var obj = new this();

        	return obj;
        }

        private _renderList:dyCb.Collection<GameObject> = null;
        get renderList(){
            return this._renderList;
        }

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

        public width:number = 256;
        public height:number = 256;

        private _plane:Plane = null;

        public init(){
            super.init();

            Director.getInstance().stage.addRenderTargetRenderer(MirrorRenderTargetRenderer.create(this));

            return this;
        }

        public getPlane(){
            var normalData = null,
                normal = null,
                p = null;

            if(this._plane && !this.geometry.gameObject.transform.dirtyLocal){
                return this._plane;
            }

            dyCb.Log.error(!(this.geometry instanceof PlaneGeometry), dyCb.Log.info.FUNC_MUST_BE("geometry", "PlaneGeometry"));

            normalData = this.geometry.normals.data;
            normal = this.geometry.gameObject.transform.localRotation.multiplyVector3(Vector3.create(normalData[0], normalData[1], normalData[2])).normalize();
            p = this.getPosition();

            this._plane = Plane.create(normal.x, normal.y, normal.z, -p.dot(normal));

            return this._plane;
        }

        public createEmptyTexture(){
            var gl = DeviceManager.getInstance().gl,
                texture = gl.createTexture();

            this.setEmptyTexture(texture);

            gl.texImage2D(gl[this.target], 0, gl.RGBA, this.width, this.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

            return texture;
        }
    }
}

