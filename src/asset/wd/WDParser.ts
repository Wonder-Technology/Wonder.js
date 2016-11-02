module wd{
    declare var ArrayBuffer:any;

    export class WDParser{
        public static create() {
            var obj = new this();

            return obj;
        }

        private _data:IWDParseData = <any>{};
        private _arrayBufferMap:wdCb.Hash<any> = null;
        private _imageMap:wdCb.Hash<HTMLImageElement> = null;
        private _json:IWDJsonData = null;
        private _geometryParser = WDGeometryParser.create();
        // private _articulatedAnimationParser = WDArticulatedAnimationParser.create();

        public parse(json:IWDJsonData, arrayBufferMap:wdCb.Hash<any>, imageMap:wdCb.Hash<HTMLImageElement>):IWDParseData{
            this._json = json;

            this._arrayBufferMap = arrayBufferMap;
            this._imageMap = imageMap;

            // if(json.asset){
            //     this._parseMetadata();
            // }

            this._parseObjects();

            // if(json.animations){
            //     this._articulatedAnimationParser.parse(json, this._data.objects, this._arrayBufferMap)
            // }

            return this._data;
        }

        private _parseMetadata(){
            var metadata = <any>{},
                json = this._json;

            for(let i in json.asset){
                if(json.asset.hasOwnProperty(i)){
                    metadata[i] = json.asset[i];
                }
            }

            this._data.metadata = metadata;
        }

        private _parseObjects(){
            var self = this,
                json = this._json,
                objects = wdCb.Collection.create<IWDObjectData>();
            var parse = (nodeId:string, node:IWDNode) => {
                var object:IWDObjectData = WDUtils.createObjectData();

                object.id = nodeId;

                if(node.name){
                    object.name = node.name;
                }

                /*!
                not support multi mesh
                 */
                if(node.mesh){
                    let mesh:IWDMesh = null;

                    // if(node.meshes.length > 1){
                    //     Log.warn(Log.info.FUNC_NOT_SUPPORT("multi mesh(geometry), just use the first mesh(geometry)"));
                    // }

                    mesh = json.meshes[node.mesh];

                    if(!node.name && mesh.name){
                        object.name = mesh.name;
                    }

                    self._geometryParser.parse(json, object, mesh, self._arrayBufferMap, self._imageMap)
                }

                //todo support

                // if(node.extensions){
                //     if(node.extensions["KHR_materials_common"] && node.extensions["KHR_materials_common"].light){
                //         object.components.addChild(self._parseLight(node.extensions["KHR_materials_common"].light));
                //     }
                // }

                // if(node.camera){
                //     object.components.addChild(self._parseCamera(node.camera));
                // }
                //
                // if(node.matrix){
                //     object.components.addChild(self._parseTransform(node.matrix));
                // }
                // else if(node.rotation && node.scale && node.translation){
                //     object.components.addChild(self._parseTransform(node.translation, node.rotation, node.scale));
                // }

                if(node.children){
                    for(let childId of node.children){
                        object.children.addChild(parse(childId, json.nodes[childId]));
                    }
                }

                return object;
            };

            if(!json.scenes[json.scene]){
                this._data.objects = objects;

                return;
            }

            for(let nodeId of json.scenes[json.scene].nodes){
                objects.addChild(parse(nodeId, json.nodes[nodeId]));
            }

            this._data.objects = objects;
        }

        // @require(function(lightId:string){
        //     var lights = this._json.extensions["KHR_materials_common"].lights;
        //     assert(lights && lights[lightId], Log.info.FUNC_NOT_EXIST(`lightId:${lightId}`));
        // })
        // private _parseLight(lightId:string):IWDLight{
        //     var lightData = this._json.extensions["KHR_materials_common"].lights[lightId],
        //         light:IWDLight = <any>{};
        //
        //     //todo intensity data?
        //
        //     WDUtils.addData(light, "type", lightData.type);
        //
        //     this._parseLightDataByType(light, lightData, light.type);
        //
        //     return light;
        // }

        // private _parseLightDataByType(light:IWDLight, lightData:any, type:string){
        //     var data = lightData[type];
        //
        //     switch (type){
        //         case "ambient":
        //         case "directional":
        //             light.lightColor = WDUtils.getColor(data.color);
        //             break;
        //         case "point":
        //             light.lightColor = WDUtils.getColor(data.color);
        //             WDUtils.addData(light, "distance", data.distance);
        //             WDUtils.addData(light, "constantAttenuation", data.constantAttenuation);
        //             WDUtils.addData(light, "linearAttenuation", data.linearAttenuation);
        //             WDUtils.addData(light, "quadraticAttenuation", data.quadraticAttenuation);
        //             break;
        //         default:
        //             //todo support spot
        //             break;
        //     }
        // }
        //
        // @require(function(cameraId:string){
        //     var cameras = this._json.cameras;
        //     assert(cameras && cameras[cameraId], Log.info.FUNC_NOT_EXIST(`cameraId:${cameraId}`));
        // })
        // private _parseCamera(cameraId:string):IWDCamera{
        //     var cameraData = this._json.cameras[cameraId],
        //         camera:IWDCamera = <any>{};
        //
        //     //todo intensity data?
        //
        //     this._parseCameraDataByType(camera, cameraData);
        //
        //     return camera;
        // }
        //
        // private _parseCameraDataByType(camera:IWDCamera, cameraData:any){
        //     var cameraComponent:any = null,
        //         type = cameraData.type,
        //         data:any = cameraData[type];
        //
        //     switch (type){
        //         case "perspective":
        //             data = cameraData[type];
        //             cameraComponent = PerspectiveCamera.create();
        //
        //             cameraComponent.near = data.znear;
        //             cameraComponent.far = data.zfar;
        //
        //             if(data.aspectRatio){
        //                 cameraComponent.aspect = data.aspectRatio;
        //             }
        //             else{
        //                 let view = DeviceManager.getInstance().view;
        //
        //                 cameraComponent.aspect = view.width / view.height;
        //             }
        //
        //             cameraComponent.fovy = data.yfov;
        //
        //             camera.camera = cameraComponent;
        //             break;
        //         case "orthographic":
        //             cameraComponent = OrthographicCamera.create();
        //
        //             cameraComponent.near = data.znear;
        //             cameraComponent.far = data.zfar;
        //             cameraComponent.left = -data.xmag;
        //             cameraComponent.right = data.xmag;
        //             cameraComponent.top = data.ymag;
        //             cameraComponent.bottom = -data.ymag;
        //
        //             camera.camera = cameraComponent;
        //             break;
        //         default:
        //             Log.error(true, Log.info.FUNC_UNEXPECT(`camera type:${type}`));
        //             break;
        //     }
        // }
        //
        // private _parseTransform(matrix:Array<number>);
        // private _parseTransform(translation:Array<number>, rotation:Array<number>, scale:Array<number>);
        //
        // private _parseTransform(...args){
        //     var transform:IWDTransform = <any>{};
        //
        //     if(args.length === 1){
        //         let matrix:Array<number> = args[0];
        //
        //         transform.matrix = Matrix4.create(new Float32Array(matrix));
        //     }
        //     else if(args.length === 3){
        //         let translation:Array<number> = args[0],
        //             rotation:Array<number> = args[1],
        //             scale:Array<number> = args[2];
        //
        //         transform.position = Vector3.create(translation[0], translation[1], translation[2]);
        //         transform.rotation = Quaternion.create(rotation[0], rotation[1], rotation[2], rotation[3]);
        //         transform.scale = Vector3.create(scale[0], scale[1], scale[2]);
        //     }
        //
        //     return transform;
        // }
    }
}

