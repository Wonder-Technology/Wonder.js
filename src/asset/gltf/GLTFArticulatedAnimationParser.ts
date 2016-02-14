module wd{
    export class GLTFArticulatedAnimationParser{
        public static create() {
        	var obj = new this();

        	return obj;
        }

        private _arrayBufferMap:wdCb.Hash<any> = null;
        private _json:IGLTFJsonData = null;
        private _arrayOffset:number = null;

        public parse(json:IGLTFJsonData, objects:wdCb.Collection<IGLTFObjectData>, arrayBufferMap:wdCb.Hash<any>):void{
            var nodeWithAnimationMap:wdCb.Hash<any> = wdCb.Hash.create<any>();

            this._json = json;
            this._arrayBufferMap = arrayBufferMap;

            for(let animName in json.animations){
                if(json.animations.hasOwnProperty(animName)){
                    let animation:IGLTFAnimation = json.animations[animName],
                        keyFrameDataList = wdCb.Collection.create<IGLTFKeyFrameData>();

                    for(let i = 0, len = animation.channels.length; i < len; i++){
                        let channel:IGLTFAnimationChannel = animation.channels[i],
                            sampler:IGLTFAnimationSampler = animation.samplers[channel.sampler],
                            targetId:string = null,
                            targetNode:IGLTFObjectData = null;

                        if (!sampler) {
                            continue;
                        }

                        targetId = channel.target.id;

                        targetNode = this._findNode(objects, targetId);

                        if (targetNode === null) {
                            Log.warn(`can't find node whose id is ${targetId} to attach to animation named ${animName}`);
                            continue;
                        }

                        this._addAnimationToNode(nodeWithAnimationMap, targetId, targetNode, animName, keyFrameDataList);
                        this._addKeyFrameDatas(keyFrameDataList, channel, animation, sampler);
                    }
                }
            }

            this._addAnimationComponent(nodeWithAnimationMap);
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

        private _addKeyFrameDatas(keyFrameDataList:wdCb.Collection<IGLTFKeyFrameData>, channel:IGLTFAnimationChannel, animation:IGLTFAnimation, sampler:IGLTFAnimationSampler){
            var targetPath = channel.target.path,
                json = this._json,
                arrayBufferMap = this._arrayBufferMap,
                inputData = animation.parameters[sampler.input],
                bufferInput = GLTFUtils.getBufferArrFromAccessor(json, json.accessors[inputData], arrayBufferMap);

            this._arrayOffset = 0;

            for (let j = 0; j < bufferInput.length; j++) {

                let keyFrameData:IGLTFKeyFrameData = <any>{};

                keyFrameData.time = this._convertSecondToMillisecond(bufferInput[j]);
                keyFrameData.interpolationMethod = this._convertTointerpolationMethod(sampler.interpolation);
                keyFrameData.targets = this._getKeyFrameDataTargets(targetPath, animation, sampler);


                keyFrameDataList.addChild(keyFrameData);
            }
        }

        private _getKeyFrameDataTargets(targetPath:string, animation:IGLTFAnimation, sampler:IGLTFAnimationSampler){
            var targets = wdCb.Collection.create<IGLTFKeyFrameTargetData>(),
                outputData = animation.parameters[sampler.output],
                bufferOutput = GLTFUtils.getBufferArrFromAccessor(this._json, this._json.accessors[outputData], this._arrayBufferMap);

            switch (targetPath){
                case "translation":
                    targets.addChild({
                        target: EArticulatedAnimationTarget.TRANSLATION,
                        data: Vector3.create(bufferOutput[this._arrayOffset], bufferOutput[this._arrayOffset + 1], bufferOutput[this._arrayOffset + 2])
                    });
                    this._arrayOffset += 3;
                    break;
                case "rotation":
                    targets.addChild({
                        target: EArticulatedAnimationTarget.ROTATION,
                        data: Quaternion.create(bufferOutput[this._arrayOffset], bufferOutput[this._arrayOffset + 1], bufferOutput[this._arrayOffset + 2], bufferOutput[this._arrayOffset + 3])
                    });

                    this._arrayOffset += 4;
                    break;
                case "scale":
                    targets.addChild({
                        target: EArticulatedAnimationTarget.SCALE,
                        data: Vector3.create(bufferOutput[this._arrayOffset], bufferOutput[this._arrayOffset + 1], bufferOutput[this._arrayOffset + 2])
                    });
                    this._arrayOffset += 3;
                    break;
                default:
                    Log.error(true, Log.info.FUNC_NOT_SUPPORT(`path:${targetPath}`));
                    break;
            }

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
