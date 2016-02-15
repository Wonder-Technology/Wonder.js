module wd{
    export class GLTFArticulatedAnimationParser{
        public static create() {
            var obj = new this();

            return obj;
        }

        private _arrayBufferMap:wdCb.Hash<any> = null;
        private _json:IGLTFJsonData = null;
        private _translationArrayOffset:number = null;
        private _rotationArrayOffset:number = null;
        private _scaleArrayOffset:number = null;

        public parse(json:IGLTFJsonData, objects:wdCb.Collection<IGLTFObjectData>, arrayBufferMap:wdCb.Hash<any>):void{
            var nodeWithAnimationMap:wdCb.Hash<any> = wdCb.Hash.create<any>(),
                self = this;

            this._json = json;
            this._arrayBufferMap = arrayBufferMap;

            for(let animId in json.animations){
                if(json.animations.hasOwnProperty(animId)){
                    let animation:IGLTFAnimation = json.animations[animId],
                        nodeWithChannelMap = wdCb.Hash.create<IGLTFAnimationChannel>();


                    for(let i = 0, len = animation.channels.length; i < len; i++) {
                        let channel:IGLTFAnimationChannel = animation.channels[i],
                            targetId:string = channel.target.id;

                        nodeWithChannelMap.appendChild(targetId, channel);
                    }

                    nodeWithChannelMap.forEach((channelList:wdCb.Collection<IGLTFAnimationChannel>, targetId:string) => {
                        var keyFrameDataList = wdCb.Collection.create<IGLTFKeyFrameData>(),
                            targetNode = self._findNode(objects, targetId),
                            inputData = null,
                            bufferInput = null;

                        if (targetNode === null) {
                            Log.warn(`can't find node whose id is ${targetId} to attach to animation named ${animId}`);
                            return;
                        }

                        self._addAnimationToNode(nodeWithAnimationMap, targetId, targetNode, self._getAnimName(animation, animId), keyFrameDataList);

                        inputData = self._getInputData(animation, channelList);
                        bufferInput = GLTFUtils.getBufferArrFromAccessor(json, json.accessors[inputData], arrayBufferMap);

                        this._translationArrayOffset = 0;
                        this._rotationArrayOffset = 0;
                        this._scaleArrayOffset = 0;

                        for (let j = 0; j < bufferInput.length; j++) {
                            let keyFrameData:IGLTFKeyFrameData = <any>{};

                            keyFrameData.time = this._convertSecondToMillisecond(bufferInput[j]);

                            keyFrameData.targets = this._getKeyFrameDataTargets(animation, channelList);

                            keyFrameDataList.addChild(keyFrameData);
                        }
                    });
                }
            }

            this._addAnimationComponent(nodeWithAnimationMap);
        }

        private _getAnimName(animation:IGLTFAnimation, animId:string){
            return animation.name ? animation.name : animId;
        }

        @require(function(animation:IGLTFAnimation, channelList:wdCb.Collection<IGLTFAnimationChannel>){
            var inputSamplerList = wdCb.Collection.create<string>();

            for(let samplerId in animation.samplers) {
                if (animation.samplers.hasOwnProperty(samplerId)) {
                    let sampelr = animation.samplers[samplerId];

                    inputSamplerList.addChild(sampelr.input);
                }
            }

            assert(inputSamplerList.removeRepeatItems().getCount() === 1, Log.info.FUNC_SHOULD("all sampler->input", "be the same"));
        })
        private _getInputData(animation:IGLTFAnimation, channelList:wdCb.Collection<IGLTFAnimationChannel>){
            var result = null;

            channelList.forEach((channel:IGLTFAnimationChannel) => {
                var sampler:IGLTFAnimationSampler = animation.samplers[channel.sampler];

                if (sampler) {
                    result = animation.parameters[sampler.input];
                    return wdCb.$BREAK;
                }
            });

            return result;
        }

        private _addAnimationToNode(nodeWithAnimationMap:wdCb.Hash<any>, targetId:string, targetNode:IGLTFObjectData, animName:string, keyFrameDataList:wdCb.Collection<IGLTFKeyFrameData>){
            if(!nodeWithAnimationMap.hasChild(targetId)){
                nodeWithAnimationMap.addChild(targetId, {
                    node:targetNode,
                    animationData:{}
                });
            }

            nodeWithAnimationMap.getChild(targetId).animationData[animName] = keyFrameDataList;
        }

        private _getKeyFrameDataTargets(animation:IGLTFAnimation, channelList:wdCb.Collection<IGLTFAnimationChannel>){
            var targets = wdCb.Collection.create<IGLTFKeyFrameTargetData>();


            channelList.forEach((channel:IGLTFAnimationChannel) => {
                var sampler:IGLTFAnimationSampler = animation.samplers[channel.sampler],
                    outputData:any = null,
                    bufferOutput:any = null,
                    targetPath:string = null,
                    targetData:IGLTFKeyFrameTargetData = <any>{};

                if (!sampler) {
                    return;
                }

                targetPath = channel.target.path;

                outputData = animation.parameters[sampler.output];
                bufferOutput = GLTFUtils.getBufferArrFromAccessor(this._json, this._json.accessors[outputData], this._arrayBufferMap);


                targetData.interpolationMethod = this._convertTointerpolationMethod(sampler.interpolation);

                switch (targetPath){
                    case "translation":
                        targetData.target = EArticulatedAnimationTarget.TRANSLATION;
                        targetData.data = Vector3.create(bufferOutput[this._translationArrayOffset], bufferOutput[this._translationArrayOffset + 1], bufferOutput[this._translationArrayOffset + 2]);

                        this._translationArrayOffset += 3;
                        break;
                    case "rotation":
                        targetData.target = EArticulatedAnimationTarget.ROTATION;
                        targetData.data = Quaternion.create(bufferOutput[this._rotationArrayOffset], bufferOutput[this._rotationArrayOffset + 1], bufferOutput[this._rotationArrayOffset + 2], bufferOutput[this._rotationArrayOffset + 3]);

                        this._rotationArrayOffset += 4;
                        break;
                    case "scale":
                        targetData.target = EArticulatedAnimationTarget.SCALE;
                        targetData.data = Vector3.create(bufferOutput[this._scaleArrayOffset], bufferOutput[this._scaleArrayOffset + 1], bufferOutput[this._scaleArrayOffset + 2]);

                        this._scaleArrayOffset += 3;
                        break;
                    default:
                        Log.error(true, Log.info.FUNC_NOT_SUPPORT(`path:${targetPath}`));
                        break;
                }


                targets.addChild(targetData);
            });

            return targets;
        }

        private _findNode(objects:wdCb.Collection<IGLTFObjectData>, targetId:string){
            var find = (objects:wdCb.Collection<IGLTFObjectData>) => {
                var result = objects.findOne((object:IGLTFObjectData) => {
                    return object.id === targetId;
                });

                if(result){
                    return result;
                }

                objects.forEach((object:IGLTFObjectData) => {
                    result = find(object.children);
                    if (result) {
                        return wdCb.$BREAK;
                    }
                });

                return result;
            }

            return find(objects);
        }

        @ensure(function(returnVal, nodeWithAnimationMap:wdCb.Hash<any>){
            nodeWithAnimationMap.forEach(({node, animationData}) => {
                assert(node.components.filter((component:IGLTFComponent) => {
                        return GLTFUtils.isIGLTFArticulatedAnimation(component);
                    }).getCount() <= 1, Log.info.FUNC_SHOULD("node", "only has 1 IGLTFArticulatedAnimation component"));
            })
        })
        private _addAnimationComponent(nodeWithAnimationMap:wdCb.Hash<any>){
            nodeWithAnimationMap.forEach(({node, animationData}) => {
                node.components.addChild(animationData);
            });
        }

        private _convertSecondToMillisecond(time:number){
            return 1000 * time;
        }

        private _convertTointerpolationMethod(jsonInterpolation:string){
            switch(jsonInterpolation){
                case "LINEAR":
                    return EKeyFrameInterpolation.LINEAR;
                default:
                    Log.error(true, Log.info.FUNC_NOT_SUPPORT(`interpolation:${jsonInterpolation}`));
                    break;
            }
        }
    }
}
