module wd {
    export class WDCameraParser extends WDComponentParser{
        public static create() {
            var obj = new this();

            return obj;
        }


        @require(function(json:IWDJsonDataParser, cameraId:string){
            it("should exist corresponding camera data", () => {
                var cameras = json.cameras;

                expect(cameras).exist;
                expect(cameras[cameraId]).exist;
            }, this);
        })
        public parse(json:IWDJsonDataParser, cameraId:string):IWDCameraAssembler{
            var cameraData = json.cameras[cameraId],
                camera:IWDCameraAssembler = <any>{};

            this._parseCameraDataByType(camera, cameraData);

            return camera;
        }

        private _parseCameraDataByType(camera:IWDCameraAssembler, cameraData:any){
            var cameraComponent:any = null,
                type = cameraData.type,
                data:any = cameraData[type];

            switch (type){
                case "perspective":
                    data = cameraData[type];
                    cameraComponent = PerspectiveCamera.create();

                    cameraComponent.near = data.znear;
                    cameraComponent.far = data.zfar;

                    if(data.aspectRatio){
                        cameraComponent.aspect = data.aspectRatio;
                    }
                    else{
                        let view = DeviceManager.getInstance().view;

                        cameraComponent.aspect = view.width / view.height;
                    }

                    cameraComponent.fovy = AngleUtils.convertRadiansToDegree(data.yfov);

                    camera.camera = cameraComponent;
                    break;
                case "orthographic":
                    cameraComponent = OrthographicCamera.create();

                    cameraComponent.near = data.znear;
                    cameraComponent.far = data.zfar;
                    cameraComponent.left = -data.xmag;
                    cameraComponent.right = data.xmag;
                    cameraComponent.top = data.ymag;
                    cameraComponent.bottom = -data.ymag;

                    camera.camera = cameraComponent;
                    break;
                default:
                    Log.error(true, Log.info.FUNC_UNEXPECT(`camera type:${type}`));
                    break;
            }
        }
    }
}

