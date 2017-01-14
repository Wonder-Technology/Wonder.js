module wd {
    declare var Math:any;

    export class MirrorRenderTargetRenderer extends TwoDRenderTargetRenderer{
        public static create(mirrorTexture:MirrorTexture) {
            var obj = new this(mirrorTexture);

            obj.initWhenCreate();

            return obj;
        }

        public texture:MirrorTexture;


        protected beforeRenderFrameBufferTexture(renderCamera:GameObject){
        }

        protected getRenderList():wdCb.Collection<GameObject>{
            return this.texture.renderList;
        }

        protected renderRenderer(renderer){
            this._setSceneSide(ESide.FRONT);
            renderer.webglState = BasicState.create();
            renderer.render();
            this._setSceneSide(null);
        }

        protected beforeRender(){
            if(this.isRenderListEmptyWhenRender()){
                Director.getInstance().scene.glslData.addChild(<any>EShaderGLSLData.MIRROR, {
                    isRenderListEmpty:true
                });
            }
            else{
                Director.getInstance().scene.glslData.addChild(<any>EShaderGLSLData.MIRROR, {
                    isRenderListEmpty:false
                });
            }
        }

        protected createCamera(camera:GameObject):GameObject{
            var mirrorCameraComponent:PerspectiveCamera = null,
                plane = null,
                cameraComponent:CameraController = camera.getComponent<CameraController>(CameraController),
                mirrorCameraViewMatrix = null,
                projectionMatrix = null;

            plane = this.texture.getPlane();

            mirrorCameraViewMatrix =
                plane.getReflectionMatrix().applyMatrix(cameraComponent.worldToCameraMatrix);

            //todo optimize(dirty)
            projectionMatrix = this._setClipPlane(mirrorCameraViewMatrix, cameraComponent.pMatrix, plane);
            mirrorCameraComponent = PerspectiveCamera.create();
            mirrorCameraComponent.worldToCameraMatrix = mirrorCameraViewMatrix.clone();
            mirrorCameraComponent.pMatrix = projectionMatrix;

            return GameObject.create().addComponent(RenderTargetRendererCameraController.create(mirrorCameraComponent)).init();
        }

        private _setSceneSide(side:ESide){
            var scene = Director.getInstance().scene;

            scene.side = side;
        }

        private _setClipPlane(vMatrix:Matrix4, pMatrix:Matrix4, plane:Plane):Matrix4{
            var projectionMatrix = pMatrix.clone(),
                q = Vector4.create(),
                clipPlane = this._getClipPlaneInCameraSpace(vMatrix, plane),
                c = Vector4.create();

            q.x = ( Math.sign( clipPlane.x ) + projectionMatrix.values[ 8 ] ) / projectionMatrix.values[ 0 ];
            q.y = ( Math.sign( clipPlane.y ) + projectionMatrix.values[ 9 ] ) / projectionMatrix.values[ 5 ];
            q.z = - 1.0;
            q.w = ( 1.0 + projectionMatrix.values[ 10 ] ) / projectionMatrix.values[ 14 ];

            c = clipPlane.multiplyScalar( 2.0 / clipPlane.dot( q ) );

            projectionMatrix.values[ 2 ] = c.x;
            projectionMatrix.values[ 6 ] = c.y;
            projectionMatrix.values[ 10 ] = c.z + 1.0;
            projectionMatrix.values[ 14 ] = c.w;

            return projectionMatrix;
        }

        private _getClipPlaneInCameraSpace(vMatrix:Matrix4, plane:Plane){
            var clipPlane = Vector4.create(),
                p = vMatrix.multiplyPoint(this.texture.getPosition()),
                n = vMatrix.clone().invert().transpose().multiplyPoint(plane.normal).normalize();

            clipPlane.set(n.x, n.y, n.z, -p.dot(n));

            return clipPlane;
        }
    }
}
