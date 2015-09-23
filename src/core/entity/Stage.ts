/// <reference path="../../definitions.d.ts"/>
module dy {
    //todo refactor
    declare var Math;

    export class Stage extends GameObject{
        public static create() {
            var obj = new this();

            return obj;
        }

        get ambientLight():GameObject {
            return this._lightManager.ambientLight;
        }

        get directionLights(): dyCb.Collection<GameObject>{
            return this._lightManager.directionLights;
        }

        get pointLights(): dyCb.Collection<GameObject>{
            return this._lightManager.pointLights;
        }

        public camera:GameObject = null;
        //public lights:dyCb.Hash<any> = dyCb.Hash.create<any>();

        private _lightManager:LightManager = LightManager.create();

        public init(){
            this.addComponent(TopCollider.create());

            //todo refactor
            //this.frameBufferManager = new Texture2DFrameBuffer(512, 512);

            //todo size should not exceed canvas's size!(viewport)
            this.frameBufferManager = new Texture2DFrameBuffer(256,256);
            this.frameBufferManager.init();

            super.init();
        }

        public addChild(child:GameObject):GameObject{
            if(this._isCamera(child)){
                this.camera = child;
            }
            else if(this._isLight(child)){
                this._lightManager.addChild(child);
            }

            return super.addChild(child);
        }

        public mirrorTexture = null;
        public mirrorPlane = null;
        public textureMatrix = null;
        public frameBufferManager =null;

        public render(renderer:Renderer) {
            dyCb.Log.error(!this.camera, "stage must add camera");






            var mirrorTexture = this.mirrorTexture;



            //todo move to DeviceManager
            //var frameBufferManager = new Texture2DFrameBuffer(mirrorTexture.size, mirrorTexture.size);
            //
            ////frameBufferManager.texture = mirrorTexture;
            //
            //
            //
            //frameBufferManager.init();

            //todo refactor
            mirrorTexture._texture = this.frameBufferManager.texture;



            var mirrorCameraComponent = Camera.create();

            //var plane = this.plane;

            var cameraComponent = this.camera.getComponent<Camera>(Camera);

            //var mirrorCameraViewMatrix = this.mirrorPlane.getReflectionMatrix().applyMatrix(cameraComponent.worldToCameraMatrix);
            //var mirrorCameraViewMatrix = cameraComponent.worldToCameraMatrix.copy().applyMatrix(this.mirrorPlane.getReflectionMatrix());

            //todo remove scale?

            //var pos = this.mirrorPlane.getReflectionMatrix().scale(1, -1, 1).multiplyVector3(this.camera.transform.position);
            //console.log(pos);

            //var mirrorCameraViewMatrix =
            //    this.camera.transform.localToWorldMatrix.copy().applyMatrix(this.mirrorPlane.getReflectionMatrix()).applyMatrix(cameraComponent.worldToCameraMatrix.copy());


            //todo not copy
            var mirrorCameraViewMatrix =
                this.mirrorPlane.getReflectionMatrix().applyMatrix(cameraComponent.worldToCameraMatrix);
                //cameracomponent.worldtocameramatrix.copy().applyMatrix(this.mirrorPlane.getReflectionMatrix());

                //this.camera.transform.localToWorldMatrix.copy().applyMatrix(this.mirrorPlane.getReflectionMatrix()).applyMatrix(cameraComponent.worldToCameraMatrix.copy());



                //cameraComponent.worldToCameraMatrix.copy().applyMatrix(this.mirrorPlane.getReflectionMatrix());



            //change clip plane

            var clipPlane = Vector4.create();
            var clipBias = 0.3;
            var projectMatrix = cameraComponent.pMatrix.copy();



            //todo get mirror model matrix
            var model = Matrix.create();
            //model.values[13] = -10;
            model.values[13] = 10;
            var modelview =
                model.applyMatrix( mirrorCameraViewMatrix.copy());

            //todo get mirror position as the point in mirrorPlane
            var p = modelview.multiplyVector3(Vector3.create(0, -10, 0));

            var n = modelview.invert().transpose().multiplyVector3(this.mirrorPlane.normal).normalize();




            clipPlane.set(n.x, n.y, n.z, -p.dot(n));






            var q = Vector4.create();
            var projectionMatrix = projectMatrix;


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
            projectionMatrix.values[ 10 ] = c.z + 1.0 - clipBias;
            projectionMatrix.values[ 14 ] = c.w;










            mirrorCameraComponent.worldToCameraMatrix = mirrorCameraViewMatrix.copy();
            mirrorCameraComponent.pMatrix = projectionMatrix.copy();




            this.textureMatrix =
                mirrorCameraViewMatrix.copy().applyMatrix(projectionMatrix.copy())
                    .applyMatrix(
            Matrix.create(new Float32Array([
                0.5, 0.0, 0.0, 0.0,
                0.0, 0.5, 0.0, 0.0,
                0.0, 0.0, 0.5, 0.0,
                0.5, 0.5, 0.5, 1.0
            ])));







            this.frameBufferManager.bind();




            //var mirrorCameraComponent = dy.Camera.create();
            //
            //
            //mirrorCameraComponent.fovy = 60;
            //mirrorCameraComponent.aspect = this.frameBufferManager.width / this.frameBufferManager.height;
            //mirrorCameraComponent.near = 0.1;
            //mirrorCameraComponent.far = 100;
            //
            //
            ////mirrorCameraComponent.fovy = 60;
            ////mirrorCameraComponent.aspect = 600/400;
            ////mirrorCameraComponent.near = 0.1;
            ////mirrorCameraComponent.far = 100;
            //
            //
            //var mirrorCamera = dy.GameObject.create();
            //mirrorCamera.addComponent(mirrorCameraComponent);
            //
            //
            //mirrorCamera.transform.translate(dy.Vector3.create(0, -10, 0));
            ////mirrorCamera.transform.translate(dy.Vector3.create(0, 0, 20));
            //
            //mirrorCamera.transform.lookAt(Vector3.create(0, 1, 0), Vector3.forward);
            //
            //
            //mirrorCameraComponent.init();




            //todo flip? set material's cullMode?

//var originCullMode = DeviceManager.getInstance().cullMode;
//            DeviceManager.getInstance().cullMode = CullMode.BACK;


            //todo only render renderlist
            //todo not render reflector!
            super.render(renderer, GameObject.create().addComponent(mirrorCameraComponent), mirrorTexture.renderList);
            //super.render(renderer, mirrorCamera, mirrorTexture.renderList);



            renderer.render();


            this.frameBufferManager.unBind();





            //DeviceManager.getInstance().cullMode = originCullMode;




            this.mirrorCameraComponent = mirrorCameraComponent;




            super.render(renderer, this.camera);
        }

        //todo refactor
        public mirrorCameraComponent = null;

        private _isCamera(child:GameObject){
            return child.hasComponent(Camera);
        }

        private _isLight(child:GameObject){
            return child.hasComponent(Light);
        }
    }
}
