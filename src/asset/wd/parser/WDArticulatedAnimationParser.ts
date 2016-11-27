module wd{
    export class WDArticulatedAnimationParser extends WDComponentParser{
        public static create() {
            var obj = new this();

            return obj;
        }

        private _arrayBufferMap:wdCb.Hash<any> = null;
        private _json:IWDJsonData = null;

        public parse(json:IWDJsonData, objects:wdCb.Collection<IWDObjectDataAssembler>, arrayBufferMap:wdCb.Hash<any>):void{
            var nodeWithAnimationMap:wdCb.Hash<any> = wdCb.Hash.create<any>(),
                self = this;

            this._json = json;
            this._arrayBufferMap = arrayBufferMap;

            for(let animId in json.animations){
                if(json.animations.hasOwnProperty(animId)){
                    let animation:IWDAnimation = json.animations[animId],
                        nodeWithChannelMap = wdCb.Hash.create<IWDAnimationChannel>();

                    for(let i = 0, len = animation.channels.length; i < len; i++) {
                        let channel:IWDAnimationChannel = animation.channels[i],
                            targetId:string = channel.target.id;

                        nodeWithChannelMap.appendChild(targetId, channel);
                    }

                    nodeWithChannelMap.forEach((channelList:wdCb.Collection<IWDAnimationChannel>, targetId:string) => {
                        var keyFrameDataList = wdCb.Collection.create<IWDKeyFrameDataAssembler>(),
                            targetNode = self._findNode(objects, targetId),
                            inputData = null;

                        if (targetNode === null) {
                            Log.warn(`can't find node whose id is ${targetId} to attach to animation named ${animId}`);
                            return;
                        }

                        self._addAnimationToNode(nodeWithAnimationMap, targetId, targetNode, self._getAnimName(animation, animId), keyFrameDataList);

                        inputData = self._getInputData(animation, channelList);

                        let {bufferReader, count} = WDUtils.getBufferReaderFromAccessor(json, json.accessors[inputData], arrayBufferMap),
                            channelBufferReaderArr:Array<BufferReader> = this._getChannelBufferReaderArr(animation, channelList);

                        for(let i = 0; i < count; i++){
                            let data = bufferReader.readFloat();
                            let keyFrameData:IWDKeyFrameDataAssembler = <any>{};

                            keyFrameData.time = this._convertSecondToMillisecond(data);

                            keyFrameData.targets = this._getKeyFrameDataTargets(animation, channelList, channelBufferReaderArr);

                            keyFrameDataList.addChild(keyFrameData);
                        }
                    });
                }
            }

            this._addAnimationComponent(nodeWithAnimationMap);
        }

        private _getChannelBufferReaderArr(animation:IWDAnimation, channelList:wdCb.Collection<IWDAnimationChannel>){
            var bufferReaderArr:Array<BufferReader> = [];

            channelList.forEach((channel:IWDAnimationChannel) => {
                var sampler: IWDAnimationSampler = animation.samplers[channel.sampler],
                    outputData: any = null,
                    targetPath: EWDArticulatedAnimationPath = null;

                if (!sampler) {
                    return;
                }

                targetPath = <any>channel.target.path;

                outputData = animation.parameters[sampler.output];

                let {bufferReader, count} = WDUtils.getBufferReaderFromAccessor(this._json, this._json.accessors[outputData], this._arrayBufferMap);

                bufferReaderArr.push(bufferReader);
            });

            return bufferReaderArr;
        }

        private _getAnimName(animation:IWDAnimation, animId:string){
            return animation.name ? animation.name : animId;
        }

        @require(function(animation:IWDAnimation, channelList:wdCb.Collection<IWDAnimationChannel>){
            var inputSamplerList = wdCb.Collection.create<string>();

            for(let samplerId in animation.samplers) {
                if (animation.samplers.hasOwnProperty(samplerId)) {
                    let sampelr = animation.samplers[samplerId];

                    inputSamplerList.addChild(sampelr.input);
                }
            }

            assert(inputSamplerList.removeRepeatItems().getCount() === 1, Log.info.FUNC_SHOULD("all sampler->input", "be the same"));
        })
        private _getInputData(animation:IWDAnimation, channelList:wdCb.Collection<IWDAnimationChannel>){
            var result = null;

            channelList.forEach((channel:IWDAnimationChannel) => {
                var sampler:IWDAnimationSampler = animation.samplers[channel.sampler];

                if (sampler) {
                    result = animation.parameters[sampler.input];
                    return wdCb.$BREAK;
                }
            });

            return result;
        }

        private _addAnimationToNode(nodeWithAnimationMap:wdCb.Hash<any>, targetId:string, targetNode:IWDObjectDataAssembler, animName:string, keyFrameDataList:wdCb.Collection<IWDKeyFrameDataAssembler>){
            if(!nodeWithAnimationMap.hasChild(targetId)){
                nodeWithAnimationMap.addChild(targetId, {
                    node:targetNode,
                    animationData:{}
                });
            }

            nodeWithAnimationMap.getChild(targetId).animationData[animName] = keyFrameDataList;
        }

        private _getKeyFrameDataTargets(animation:IWDAnimation, channelList:wdCb.Collection<IWDAnimationChannel>, channelBufferReaderArr:Array<BufferReader>){
            var targets = wdCb.Collection.create<IWDKeyFrameTargetDataAssembler>();

            channelList.forEach((channel:IWDAnimationChannel, index:number) => {
                var sampler:IWDAnimationSampler = animation.samplers[channel.sampler],
                    outputData:any = null,
                    targetPath:EWDArticulatedAnimationPath = null,
                    targetData:IWDKeyFrameTargetDataAssembler = <any>{},
                    bufferReader = null;

                if (!sampler) {
                    return;
                }

                targetPath = <any>channel.target.path;

                outputData = animation.parameters[sampler.output];

                bufferReader = channelBufferReaderArr[index];

                targetData.interpolationMethod = this._convertTointerpolationMethod(<any>sampler.interpolation);

                switch (targetPath){
                    case EWDArticulatedAnimationPath.TRANSLATION:
                        targetData.target = EArticulatedAnimationTarget.TRANSLATION;
                        targetData.data = Vector3.create(bufferReader.readFloat(), bufferReader.readFloat(), bufferReader.readFloat());
                        break;
                    case EWDArticulatedAnimationPath.ROTATION:
                        targetData.target = EArticulatedAnimationTarget.ROTATION;
                        targetData.data = Quaternion.create(bufferReader.readFloat(), bufferReader.readFloat(), bufferReader.readFloat(), bufferReader.readFloat());
                        break;
                    case EWDArticulatedAnimationPath.SCALE:
                        targetData.target = EArticulatedAnimationTarget.SCALE;
                        targetData.data = Vector3.create(bufferReader.readFloat(), bufferReader.readFloat(), bufferReader.readFloat());
                        break;
                    default:
                        Log.error(true, Log.info.FUNC_NOT_SUPPORT(`path:${targetPath}`));
                        break;
                }

                targets.addChild(targetData);
            }, this);

            return targets;
        }

        private _findNode(objects:wdCb.Collection<IWDObjectDataAssembler>, targetId:string){
            var find = (objects:wdCb.Collection<IWDObjectDataAssembler>) => {
                var result = objects.findOne((object:IWDObjectDataAssembler) => {
                    return object.id === targetId;
                });

                if(result){
                    return result;
                }

                objects.forEach((object:IWDObjectDataAssembler) => {
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
            it("node should only has 1 IWDArticulatedAnimation component", () => {
                nodeWithAnimationMap.forEach(({node, animationData}) => {
                    expect(node.components.filter((component:IWDComponentAssembler) => {
                        return WDUtils.isIWDArticulatedAnimationAssembler(component);
                    }).getCount()).most(1);
                })
            });
        })
        private _addAnimationComponent(nodeWithAnimationMap:wdCb.Hash<any>){
            nodeWithAnimationMap.forEach((data) => {
                var node = data.node,
                    animationData = data.animationData;

                node.components.addChild(animationData);

                delete data.animationData;
            });
        }

        private _convertSecondToMillisecond(time:number){
            return 1000 * time;
        }

        private _convertTointerpolationMethod(jsonInterpolation:EKeyFrameInterpolation){
            switch(jsonInterpolation){
                case EKeyFrameInterpolation.LINEAR:
                    return EKeyFrameInterpolation.LINEAR;
                default:
                    Log.error(true, Log.info.FUNC_NOT_SUPPORT(`interpolation:${jsonInterpolation}`));
                    break;
            }
        }
    }
}
