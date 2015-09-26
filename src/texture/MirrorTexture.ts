/// <reference path="../definitions.d.ts"/>
module dy {
    export class MirrorTexture extends Texture {
        public static create() {
        	var obj = new this();

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

        public width:number = 256;
        public height:number = 256;
        public textureMatrix:Matrix = null;

        public init(){
            //todo support mipmap?
            this.generateMipmaps = false;
            this.minFilter = TextureFilterMode.LINEAR;
            this.magFilter = TextureFilterMode.LINEAR;

            Director.getInstance().stage.addRenderTargetRenderer(this);

            return this;
        }

        public setTexture(texture:any){
            this.glTexture = texture;
        }

        public getPlane(){
            var normalData = null,
                normal = null,
                p = null;

            dyCb.Log.error(!(this.geometry instanceof PlaneGeometry), dyCb.Log.info.FUNC_MUST_BE("geometry", "PlaneGeometry"));

            //todo add dirty
            normalData = this.geometry.normals.data;
            normal = this.geometry.gameObject.transform.localRotation.multiplyVector3(Vector3.create(normalData[0], normalData[1], normalData[2])).normalize();
            p = this.getPosition();

            return Plane.create(normal.x, normal.y, normal.z, -p.dot(normal));
        }

        public getPosition(){
            return this.geometry.gameObject.transform.position;
        }

        public createEmptyTexture(){
            var gl = Director.getInstance().gl,
                texture = gl.createTexture();

            dyCb.Log.error(!texture, "Failed to create texture object");

            gl.bindTexture(gl[this.target], texture);

            gl.texImage2D(gl[this.target], 0, gl.RGBA, this.width, this.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

            this.setTextureParameters(gl[this.target], this.isSourcePowerOfTwo());
            //todo support mipmap?
            //if (this.generateMipmaps && isSourcePowerOfTwo) {
            //    gl.generateMipmap(gl[this.target]);
            //}

            return texture;
        }

        public update(index:number){
            return this;
        }

        protected allocateSourceToTexture(isSourcePowerOfTwo:boolean) {
        }
    }
}

