module wd{
    export class GLTFArticulatedAnimationParser{
        public static create() {
        	var obj = new this();

        	return obj;
        }

        private _arrayBufferMap:wdCb.Hash<any> = null;
        private _json:IGLTFJsonData = null;

        public parse(json:IGLTFJsonData, objects:wdCb.Collection<IGLTFObjectData>, arrayBufferMap:wdCb.Hash<any>):void{
            var nodeWithAnimationMap:wdCb.Hash<any> = wdCb.Hash.create<any>();

            this._json = json;
            this._arrayBufferMap = arrayBufferMap;

            //var articulatedAnimationData:IGLTFArticulatedAnimation = <any>{};

            for(let animName in json.animations){
                if(json.animations.hasOwnProperty(animName)){
                    let animation:IGLTFAnimation = json.animations[animName],
                        keyFrameDataList = wdCb.Collection.create<IGLTFKeyFrameData>();


                    //articulatedAnimationData[animName] = keyFrameDataList;


                    for(let i = 0, len = animation.channels.length; i < len; i++){
                        let channel = animation.channels[i],
                            sampler:IGLTFAnimationSampler = animation.samplers[channel.sampler];

                        if (!sampler) {
                            continue;
                        }


                        var inputData = animation.parameters[sampler.input];
                        var outputData = animation.parameters[sampler.output];

                        var bufferInput = GLTFUtils.getBufferArrFromAccessor(json, json.accessors[inputData], arrayBufferMap);
                        var bufferOutput = GLTFUtils.getBufferArrFromAccessor(json, json.accessors[outputData], arrayBufferMap);

                        var targetId = channel.target.id;
                        var targetNode:IGLTFObjectData = objects.findOne((object:IGLTFObjectData) => {
                            return object.id === targetId;
                        });

                        if (targetNode === null) {
                            Log.warn(`can't find node whose id is ${targetId} to attach to animation named ${animName}`);
                            continue;
                        }
                        //
                        //targetNode.components.addChild(articulatedAnimationData);

                        if(!nodeWithAnimationMap.hasChild(targetId)){
                            nodeWithAnimationMap.addChild(targetId, {
                                node:targetNode,
                                animationData:{}
                            });
                        }

                        nodeWithAnimationMap.getChild(targetId).animationData[animName] = keyFrameDataList;

                        var keyFrameData:IGLTFKeyFrameData = <any>{};

                        keyFrameDataList.addChild(keyFrameData);

                        var targetPath = channel.target.path;

                        var arrayOffset = 0;

                        for (let j = 0; j < bufferInput.length; j++) {

                            keyFrameData.time = this._convertSecondToMillisecond(bufferInput[j]);
                            keyFrameData.interpolationMethod = this._convertTointerpolationMethod(sampler.interpolation);
                            keyFrameData.targets = wdCb.Collection.create<IGLTFKeyFrameTargetData>();


                            switch (targetPath){
                                case "translation":
                                    keyFrameData.targets.addChild({
                                        target: ArticulatedAnimationTarget.TRANSLATION,
                                        data: Vector3.create(bufferOutput[arrayOffset], bufferOutput[arrayOffset + 1], bufferOutput[arrayOffset + 2])
                                    });
                                    arrayOffset += 3;
                                    break;
                                    case "rotation":
                                        keyFrameData.targets.addChild({
                                            target: ArticulatedAnimationTarget.ROTATION,
                                            data: Quaternion.create(bufferOutput[arrayOffset], bufferOutput[arrayOffset + 1], bufferOutput[arrayOffset + 2], bufferOutput[arrayOffset + 3])
                                        });

                                        arrayOffset += 4;
                                    break;
                                case "scale":
                                    keyFrameData.targets.addChild({
                                        target: ArticulatedAnimationTarget.SCALE,
                                        data: Vector3.create(bufferOutput[arrayOffset], bufferOutput[arrayOffset + 1], bufferOutput[arrayOffset + 2])
                                    });
                                    arrayOffset += 3;
                                    break;
                                default:
                                    Log.error(true, Log.info.FUNC_NOT_SUPPORT(`path:${targetPath}`));
                                    break;
                            }
                        }
                    }
                }
            }

            this._addAnimationComponent(nodeWithAnimationMap);
        }

        @ensure(function(returnVal, nodeWithAnimationMap:wdCb.Hash<any>){
            var self = this;

            nodeWithAnimationMap.forEach(({node, animationData}) => {
                assert(node.components.filter((component:IGLTFComponent) => {
                    return self._isIGLTFArticulatedAnimation(component);
                }).getCount() <= 1, Log.info.FUNC_SHOULD("node", "only has 1 IGLTFArticulatedAnimation component"));
            })
        })
        private _addAnimationComponent(nodeWithAnimationMap:wdCb.Hash<any>){
            nodeWithAnimationMap.forEach(({node, animationData}) => {
                node.components.addChild(animationData);
            });
        }

        //todo move to utils
        private _isIGLTFArticulatedAnimation(component:IGLTFArticulatedAnimation){
            if(!JudgeUtils.isDirectObject(component)){
                return false;
            }

            for(let animName in component){
                return component[animName] instanceof wdCb.Collection && component[animName].getCount() > 0 && component[animName].getChild(0).time !== void 0;
            }
        }

        private _convertSecondToMillisecond(time:number){
            return 1000 * time;
        }

        private _convertTointerpolationMethod(jsonInterpolation:string){
            switch(jsonInterpolation){
                case "LINEAR":
                    return KeyFrameInterpolation.LINEAR;
                default:
                    Log.error(true, Log.info.FUNC_NOT_SUPPORT(`interpolation:${jsonInterpolation}`));
                    break;
            }
        }
    }
}
