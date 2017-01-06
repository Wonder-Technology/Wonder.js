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
        private _json:IWDJsonDataParser = null;
        private _geometryParser = WDGeometryParser.create();
        private _keyFrameAnimationParser = WDKeyFrameAnimationParser.create();
        private _skinSkeletonAnimationAnimationParser = WDSkinSkeletonAnimationParser.create();
        private _articulatedAnimationParser:WDArticulatedAnimationParser = WDArticulatedAnimationParser.create();
        private _transformParser:WDTransformParser = WDTransformParser.create();
        private _skinSkeletonAnimationParser:WDSkinSkeletonParser = WDSkinSkeletonParser.create();
        private _cameraParser:WDCameraParser = WDCameraParser.create();
        private _lightParser:WDLightParser = WDLightParser.create();
        private _skinSkeletonAnimationMap:wdCb.Hash<IWDSkinSkeletonAnimationAssembler> = wdCb.Hash.create<IWDSkinSkeletonAnimationAssembler>();

        public parse(json:IWDJsonDataParser, arrayBufferMap:wdCb.Hash<ArrayBuffer>, imageMap:wdCb.Hash<HTMLImageElement>):IWDParseDataAssembler{
            this._json = json;

            this._arrayBufferMap = arrayBufferMap;
            this._imageMap = imageMap;

            if(json.asset){
                this._parseMetadata();
            }

            this._parseObjects();

            if(json.animations){
                let {nodeWithAnimationMap, objectWithAnimationMap} = this._keyFrameAnimationParser.parse(json, this._data.objects, this._arrayBufferMap);

                this._skinSkeletonAnimationMap.forEach((skinSkeletonAnimation:IWDSkinSkeletonAnimationAssembler) => {
                    skinSkeletonAnimation.jointTransformData = this._skinSkeletonAnimationAnimationParser.parse(json, nodeWithAnimationMap, skinSkeletonAnimation.jointNames);
                });

                // this._skinSkeletonAnimationAnimationParser.removeJointAnimationData(nodeWithAnimationMap);

                this._articulatedAnimationParser.parse(objectWithAnimationMap);
            }

            return this._data;
        }

        private _parseMetadata(){
            var metadata = <IWDAssetParser>{},
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
                objects = wdCb.Collection.create<IWDObjectDataAssembler>();
            var parse = (nodeId:string, node:IWDNodeParser) => {
                var object:IWDObjectDataAssembler = null;

                if(this._isJointNode(json, node)){
                    return null;
                }

                object = WDUtils.createObjectData();

                object.id = nodeId;

                if(node.name){
                    object.name = node.name;
                }

                /*!
                not support multi mesh
                 */
                if(node.mesh){
                    let mesh:IWDMeshParser = null;

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
                        object.components.addChild(self._lightParser.parse(json, node.light));
                }

                if(node.camera){
                    object.components.addChild((self._cameraParser.parse(json, node.camera)));
                }

                if(node.matrix){
                    object.components.addChild(self._transformParser.parse(node.matrix));
                }
                else if(node.rotation && node.scale && node.translation){
                    object.components.addChild(self._transformParser.parse(node.translation, node.rotation, node.scale));
                }

                if(node.skin && node.skeletons){
                    let skinSkeletonAnimation:IWDSkinSkeletonAnimationAssembler = self._skinSkeletonAnimationParser.parse(json, node.skin, node.skeletons, object.name, self._arrayBufferMap);

                    self._skinSkeletonAnimationMap.addChild(nodeId, skinSkeletonAnimation);

                    object.components.addChild(skinSkeletonAnimation);
                }

                if(node.children){
                    for(let childId of node.children){
                        let child = parse(childId, json.nodes[childId]);

                        if(child !== null){
                            object.children.addChild(child);
                        }
                    }
                }

                return object;
            };

            if(!json.scenes[json.scene]){
                this._data.objects = objects;

                return;
            }

            for(let nodeId of json.scenes[json.scene].nodes){
                let child = parse(nodeId, json.nodes[nodeId]);

                if(child !== null){
                    objects.addChild(child);
                }
            }

            this._data.objects = objects;
        }

        private _isJointNode(json:IWDJsonDataParser, node:IWDNodeParser){
            return !!node.jointName
                || (!!node.children && node.children.length > 0 && !!json.nodes[node.children[0]].jointName);
        }
    }
}

