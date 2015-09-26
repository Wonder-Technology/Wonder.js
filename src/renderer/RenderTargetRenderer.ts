/// <reference path="../definitions.d.ts"/>
module dy {
    //todo remove
    declare var window:any,
        Math:any;

    //todo default render direction is up?
    export class RenderTargetRenderer{
        //todo change element to be RenderTargetTexture
        public static create(mirrorTexture:MirrorTexture) {
            var obj = new this(mirrorTexture);

            return obj;
        }

        constructor(mirrorTexture:MirrorTexture){
            this._texture = mirrorTexture;
        }

        private _texture:MirrorTexture = null;

        public init(){
            if(this._isTextureSizeExceedCanvasSize()){
                dyCb.Log.warn("frameBuffer->viewport's size shouldn't exceed canvas's size");
            }

            this._frameBufferManager = FrameBufferManager.create(this._texture.width, this._texture.height);
            this._frameBufferManager.init();

            return this;
        }

        private _isTextureSizeExceedCanvasSize(){
            var view = Director.getInstance().getView();

            return this._texture.width > view.width || this._texture.height > view.height;
        }

        public textureMatrix:Matrix = null;

        private _frameBufferManager:FrameBufferManager = null;

        //todo extract RenderTargetTexture
        public render(renderer:Renderer, camera:GameObject){
            this._texture.setTexture(this._frameBufferManager.texture);
            var cameraComponent = camera.getComponent<Camera>(Camera);




            var plane =this._texture.getPlane();



            //todo not copy
            var mirrorCameraViewMatrix =
               plane.getReflectionMatrix().applyMatrix(cameraComponent.worldToCameraMatrix);



            var projectionMatrix = this._setClipPlane(mirrorCameraViewMatrix, cameraComponent.pMatrix, plane);






            //todo optimize in glsl

            this.textureMatrix =
                mirrorCameraViewMatrix.copy().applyMatrix(projectionMatrix.copy())
                    .applyMatrix(
                    Matrix.create(new Float32Array([
                        0.5, 0.0, 0.0, 0.0,
                        0.0, 0.5, 0.0, 0.0,
                        0.0, 0.0, 0.5, 0.0,
                        0.5, 0.5, 0.5, 1.0
                    ])));







            this._frameBufferManager.bind();



            var mirrorCameraComponent = Camera.create();

            mirrorCameraComponent.worldToCameraMatrix = mirrorCameraViewMatrix.copy();
            mirrorCameraComponent.pMatrix = projectionMatrix.copy();


            var mirrorCamera = GameObject.create();
            mirrorCamera.addComponent(mirrorCameraComponent);



            //todo not render reflector!
            //todo if null, draw all


            //todo optimize:if renderObject is behind plane, not render it!
            //todo refactor
            window.isRenderTarget = true;
            this._texture.renderList.forEach((child:GameObject) => {
                child.render(renderer, mirrorCamera);
            });


            renderer.render();


            this._frameBufferManager.unBind();
        }

        private _setClipPlane(vMatrix:Matrix, pMatrix:Matrix, plane:Plane):Matrix{
            var clipPlane = Vector4.create();
            //var clipBias = 0;
            var projectMatrix = pMatrix.copy();


            var q = Vector4.create();
            var projectionMatrix = projectMatrix;





            //todo get mirror model matrix
            var model = Matrix.create();
            //model.values[13] = -10;
            //model.values[13] = 10;
            model.values[13] = 0;
            var modelview =
                model.applyMatrix(vMatrix);

            //todo get mirror position as the point in mirrorPlane
            var p = modelview.multiplyVector3(Vector3.create(0, -0, 0));

            var n = modelview.invert().transpose().multiplyVector3(plane.normal).normalize();




            clipPlane.set(n.x, n.y, n.z, -p.dot(n));








            q.x = ( Math.sign( clipPlane.x ) + projectionMatrix.values[ 8 ] ) / projectionMatrix.values[ 0 ];
            q.y = ( Math.sign( clipPlane.y ) + projectionMatrix.values[ 9 ] ) / projectionMatrix.values[ 5 ];
            q.z = - 1.0;
            q.w = ( 1.0 + projectionMatrix.values[ 10 ] ) / projectionMatrix.values[ 14 ];

            // Calculate the scaled plane vector
            var c = Vector4.create();
            c = clipPlane.multiplyScalar( 2.0 / clipPlane.dot( q ) );

            // Replacing the third row of the projection matrix
            projectionMatrix.values[ 2 ] = c.x;
            projectionMatrix.values[ 6 ] = c.y;
            //projectionMatrix.values[ 10 ] = c.z + 1.0 - clipBias;
            projectionMatrix.values[ 10 ] = c.z + 1.0;
            projectionMatrix.values[ 14 ] = c.w;

            return projectionMatrix;
        }
    }
}

