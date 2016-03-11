module wd {
    declare var Math:any;

    export class RefractionRenderTargetRenderer extends TwoDRenderTargetRenderer{
        public static create(refractionTexture:RefractionTexture) {
            var obj = new this(refractionTexture);

            obj.initWhenCreate();

            return obj;
        }

        protected texture:RefractionTexture;


        protected beforeRenderFrameBufferTexture(renderCamera:GameObject){
        }

        protected getRenderList():wdCb.Collection<GameObject>{
            return this.texture.renderList;
        }
        protected renderRenderer(renderer){
            renderer.render();
        }

        protected createCamera(camera:GameObject):GameObject{
            //todo just return camera/ or not dispose
            var refractionCameraComponent = null,
                plane = null,
                cameraComponent:CameraController = camera.getComponent<CameraController>(CameraController),
                refractionCameraViewMatrix = null,
                projectionMatrix = null;

            plane = this.texture.getPlane();

            refractionCameraViewMatrix =
            cameraComponent.worldToCameraMatrix;

            projectionMatrix = cameraComponent.pMatrix;

            refractionCameraComponent = PerspectiveCamera.create();
            refractionCameraComponent.worldToCameraMatrix = refractionCameraViewMatrix.copy();
            refractionCameraComponent.pMatrix = projectionMatrix;

            return GameObject.create().addComponent(wd.BasicCameraController.create(refractionCameraComponent)).init();

            //return camera;
        }

        private _setClipPlane(vMatrix:Matrix4, pMatrix:Matrix4, plane:Plane):Matrix4{
            var projectionMatrix = pMatrix.copy(),
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
                n = vMatrix.copy().invert().transpose().multiplyPoint(plane.normal).normalize();

            clipPlane.set(n.x, n.y, n.z, -p.dot(n));

            return clipPlane;
        }
    }
}

