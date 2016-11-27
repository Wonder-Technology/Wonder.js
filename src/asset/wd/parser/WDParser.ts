module wd{
    declare var ArrayBuffer:any;

    export class WDParser{
        public static create() {
            var obj = new this();

            return obj;
        }

        private _data:IWDParseDataAssembler = <any>{};
        private _arrayBufferMap:wdCb.Hash<any> = null;
        private _imageMap:wdCb.Hash<HTMLImageElement> = null;
        private _json:IWDJsonData = null;
        private _geometryParser = WDGeometryParser.create();
        private _articulatedAnimationParser = WDArticulatedAnimationParser.create();
        private _transformParser:WDTransformParser = WDTransformParser.create();
        private _cameraParser:WDCameraParser = WDCameraParser.create();

        public parse(json:IWDJsonData, arrayBufferMap:wdCb.Hash<any>, imageMap:wdCb.Hash<HTMLImageElement>):IWDParseDataAssembler{
            this._json = json;

            this._arrayBufferMap = arrayBufferMap;
            this._imageMap = imageMap;

            // if(json.asset){
            //     this._parseMetadata();
            // }

            this._parseObjects();

            if(json.animations){
                this._articulatedAnimationParser.parse(json, this._data.objects, this._arrayBufferMap)
            }

            return this._data;
        }

        // private _parseMetadata(){
        //     var metadata = <any>{},
        //         json = this._json;
        //
        //     for(let i in json.asset){
        //         if(json.asset.hasOwnProperty(i)){
        //             metadata[i] = json.asset[i];
        //         }
        //     }
        //
        //     this._data.metadata = metadata;
        // }

        private _parseObjects(){
            var self = this,
                json = this._json,
                objects = wdCb.Collection.create<IWDObjectDataAssembler>();
            var parse = (nodeId:string, node:IWDNode) => {
                var object:IWDObjectDataAssembler = WDUtils.createObjectData();

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

                if(node.light){
                        object.components.addChild(self._parseLight(node.light));
                }

                if(node.camera){
                    object.components.addChild((self._cameraParser.parse(self._json, node.camera)));
                }

                if(node.matrix){
                    object.components.addChild(self._transformParser.parse(node.matrix));
                }
                else if(node.rotation && node.scale && node.translation){
                    object.components.addChild(self._transformParser.parse(node.translation, node.rotation, node.scale));
                }

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

        @require(function(lightId:string){
            it("should exist corresponding light data", () => {
                var lights = this._json.lights;

                expect(lights).exist;
                expect(lights[lightId]).exist;
            }, this);
        })
        private _parseLight(lightId:string):IWDLightAssembler{
            var lightData = this._json.lights[lightId],
                light:IWDLightAssembler = <any>{};

            WDUtils.addData(light, "type", lightData.type);

            this._parseLightDataByType(light, lightData, light.type);

            return light;
        }

        private _parseLightDataByType(light:IWDLightAssembler, lightData:any, type:string){
            var data = lightData[type];

            WDUtils.addData(light, "intensity", data.intensity);

            switch (type){
                case "ambient":
                case "directional":
                    light.color = WDUtils.getColor(data.color);
                    break;
                case "point":
                    light.color = WDUtils.getColor(data.color);
                    WDUtils.addData(light, "range", data.range);
                    WDUtils.addData(light, "constantAttenuation", data.constantAttenuation);
                    WDUtils.addData(light, "linearAttenuation", data.linearAttenuation);
                    WDUtils.addData(light, "quadraticAttenuation", data.quadraticAttenuation);
                    break;
                default:
                    //todo support spot
                    break;
            }
        }
    }
}

