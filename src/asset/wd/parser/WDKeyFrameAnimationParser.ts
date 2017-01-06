module wd{
    export class WDKeyFrameAnimationParser extends WDComponentParser{
        public static create() {
            var obj = new this();

            return obj;
        }

        private _arrayBufferMap:wdCb.Hash<any> = null;
        private _json:IWDJsonDataParser = null;

        public parse(json:IWDJsonDataParser, objects: wdCb.Collection<IWDObjectDataAssembler>, arrayBufferMap:wdCb.Hash<any>){
            var objectWithAnimationMap:wdCb.Hash<KeyFrameObjectAnimationData> = wdCb.Hash.create<KeyFrameObjectAnimationData>(),
                nodeWithAnimationMap:wdCb.Hash<KeyFrameNodeAnimationData> = wdCb.Hash.create<KeyFrameNodeAnimationData>(),
                nodes = json.nodes,
                self = this;

            this._json = json;
            this._arrayBufferMap = arrayBufferMap;

            for(let animId in json.animations){
                if(json.animations.hasOwnProperty(animId)){
                    let animation:IWDAnimationParser = json.animations[animId],
                        nodeWithChannelMap = wdCb.Hash.create<IWDAnimationChannelParser>();

                    for(let i = 0, len = animation.channels.length; i < len; i++) {
                        let channel:IWDAnimationChannelParser = animation.channels[i],
                            targetId:string = channel.target.id;

                        nodeWithChannelMap.appendChild(targetId, channel);
                    }

                    nodeWithChannelMap.forEach((channelList:wdCb.Collection<IWDAnimationChannelParser>, targetId:string) => {
                        var keyFrameDataList = wdCb.Collection.create<IWDKeyFrameDataAssembler>(),

                            targetNode:IWDNodeParser = null,
                            targetObject:IWDObjectDataAssembler = null,
                            inputData = null;

                        targetObject = this._findObject(objects, targetId);

                        if (targetObject === null) {
                            targetNode = self._findNode(nodes, targetId);
                        }

                        if (targetNode === null && targetObject === null) {
                            Log.warn(`can't find node or object whose id is ${targetId} to attach to animation named ${animId}`);
                            return;
                        }

                        let animName = self._getAnimName(animation, animId);

                        if(targetObject !== null){

                            self._addAnimationToNode(objectWithAnimationMap, targetId, targetObject, animName, keyFrameDataList);
                        }
                        else{
                            self._addAnimationToNode(nodeWithAnimationMap, targetId, targetNode, animName, keyFrameDataList);
                        }

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

            return {
                nodeWithAnimationMap: nodeWithAnimationMap,
                objectWithAnimationMap: objectWithAnimationMap
            };
        }

        private _getChannelBufferReaderArr(animation:IWDAnimationParser, channelList:wdCb.Collection<IWDAnimationChannelParser>){
            var bufferReaderArr:Array<BufferReader> = [];

            channelList.forEach((channel:IWDAnimationChannelParser) => {
                var sampler: IWDAnimationSamplerParser = animation.samplers[channel.sampler],
                    outputData: any = null,
                    targetPath: EWDKeyFrameAnimationPath = null;

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

        private _getAnimName(animation:IWDAnimationParser, animId:string){
            return animation.name ? animation.name : animId;
        }

        private _getInputData(animation:IWDAnimationParser, channelList:wdCb.Collection<IWDAnimationChannelParser>){
            var result = null;

            channelList.forEach((channel:IWDAnimationChannelParser) => {
                var sampler:IWDAnimationSamplerParser = animation.samplers[channel.sampler];

                if (sampler) {
                    result = animation.parameters[sampler.input];
                    return wdCb.$BREAK;
                }
            });

            return result;
        }

        private _addAnimationToNode(entityWithAnimationMap:wdCb.Hash<KeyFrameObjectAnimationData>|wdCb.Hash<KeyFrameNodeAnimationData>, targetId:string, targetEntity:IWDObjectDataAssembler|IWDNodeParser, animName:string, keyFrameDataList:wdCb.Collection<IWDKeyFrameDataAssembler>){
            if(!entityWithAnimationMap.hasChild(targetId)){
                entityWithAnimationMap.addChild(targetId, {
                    entity:targetEntity,
                    animationData:<any>{}
                });
            }

            entityWithAnimationMap.getChild(targetId).animationData[animName] = keyFrameDataList;
        }

        private _getKeyFrameDataTargets(animation:IWDAnimationParser, channelList:wdCb.Collection<IWDAnimationChannelParser>, channelBufferReaderArr:Array<BufferReader>){
            var targets = wdCb.Collection.create<IWDKeyFrameTargetDataAssembler>();

            channelList.forEach((channel:IWDAnimationChannelParser, index:number) => {
                var sampler:IWDAnimationSamplerParser = animation.samplers[channel.sampler],
                    outputData:any = null,
                    targetPath:EWDKeyFrameAnimationPath = null,
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
                    case EWDKeyFrameAnimationPath.TRANSLATION:
                        targetData.target = EKeyFrameAnimationTarget.TRANSLATION;
                        targetData.data = Vector3.create(bufferReader.readFloat(), bufferReader.readFloat(), bufferReader.readFloat());
                        break;
                    case EWDKeyFrameAnimationPath.ROTATION:
                        targetData.target = EKeyFrameAnimationTarget.ROTATION;
                        targetData.data = Quaternion.create(bufferReader.readFloat(), bufferReader.readFloat(), bufferReader.readFloat(), bufferReader.readFloat());
                        break;
                    case EWDKeyFrameAnimationPath.SCALE:
                        targetData.target = EKeyFrameAnimationTarget.SCALE;
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

        private _findNode(nodes:{
            [id:string]: IWDNodeParser
        }, targetId:string){
            return nodes[targetId];
        }

        private _findObject(objects:wdCb.Collection<IWDObjectDataAssembler>, targetId:string){
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
