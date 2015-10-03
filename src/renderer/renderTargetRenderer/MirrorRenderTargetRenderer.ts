/// <reference path="../../definitions.d.ts"/>
module dy {
    declare var Math:any;

    export class MirrorRenderTargetRenderer extends TwoDRenderTargetRenderer{
        public static create(mirrorTexture:MirrorTexture) {
            var obj = new this(mirrorTexture);

            obj.initWhenCreate();

            return obj;
        }

        protected texture:MirrorTexture;

        protected renderFrameBufferTexture(renderer:Renderer, camera:GameObject){
            var mirrorCameraComponent = null,
                plane = null,
                cameraComponent:Camera = camera.getComponent<Camera>(Camera),
                mirrorCameraViewMatrix = null,
                projectionMatrix = null,
                stage = Director.getInstance().stage;

            plane = this.texture.getPlane();

            mirrorCameraViewMatrix =
                plane.getReflectionMatrix().applyMatrix(cameraComponent.worldToCameraMatrix);

            //todo optimize(dirty)
            projectionMatrix = this._setClipPlane(mirrorCameraViewMatrix, cameraComponent.pMatrix, plane);

            this.frameBufferOperator.bindFrameBuffer(this.frameBuffer);
            this.frameBufferOperator.setViewport();

            mirrorCameraComponent = PerspectiveCamera.create();
            mirrorCameraComponent.worldToCameraMatrix = mirrorCameraViewMatrix.copy();
            mirrorCameraComponent.pMatrix = projectionMatrix;

            //todo if renderList is null, draw all
            //todo optimize:if renderObject is behind plane, not render it!
            this.texture.renderList.forEach((child:GameObject) => {
                child.render(renderer, GameObject.create().addComponent(mirrorCameraComponent));
            });
            stage.cullMode = CullMode.FRONT;
            renderer.render();
            stage.cullMode = null;

            this.frameBufferOperator.unBind();
            this.frameBufferOperator.restoreViewport();
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
                p = vMatrix.multiplyVector3(this.texture.getPosition()),
                n = vMatrix.copy().invert().transpose().multiplyVector3(plane.normal).normalize();

            clipPlane.set(n.x, n.y, n.z, -p.dot(n));

            return clipPlane;
        }
    }
}

