/// <reference path="../../definitions.d.ts"/>
module dy {
    export class DynamicCubemapRenderTargetRenderer extends CubemapRenderTargetRenderer{
        public static create(texture:DynamicCubemapTexture) {
            var obj = new this(texture);

            obj.initWhenCreate();

            return obj;
        }

        protected texture:DynamicCubemapTexture;

        protected  getRenderList():dyCb.Hash<GameObject>{
         return this.texture.renderList;
        }

        protected  renderFace(faceRenderList:Array<GameObject>|dyCb.Collection<GameObject>, renderCamera:GameObject, renderer:Renderer){
            faceRenderList.forEach((child:GameObject) => child.render(renderer, renderCamera));
        }

        protected  beforeRenderSixFaces(){
        }

        protected  afterRenderSixFaces(){
        }

        protected setCamera(camera:PerspectiveCamera){
            camera.aspect = 1;
            camera.near = this.texture.near;
            camera.far = this.texture.far;
        }

        protected getPosition(){
            return this.texture.getPosition();
        }
    }
}

