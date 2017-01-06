import wdCb = require("wdcb");

import ExtendUtils = require("../../ts/ExtendUtils")

export class GLTFAnimationUtils{
    public static isJointAnimationSeparate(resultJson:any){
        var jointAnimationMap = wdCb.Hash.create<string>(),
            result:boolean = true;

        if(resultJson.animations){
            for (let animName in resultJson.animations) {
                if (resultJson.animations.hasOwnProperty(animName)) {
                    let animation = resultJson.animations[animName];

                    for(let channel of animation.channels){
                        let nodeId = channel.target.id;

                        if(this._isJointNode(resultJson, nodeId)){
                            jointAnimationMap.appendChild(nodeId, animName);
                        }
                    }
                }
            }
        }

        jointAnimationMap.forEach((animNameList:wdCb.Collection<string>) => {
            var list = animNameList.removeRepeatItems();

            if(list.getCount() > 1){
                result = false;
                return wdCb.$BREAK;
            }
        });

        return result;
    }

    /*!
     now only support .gltf file with only skin skeleton animation,
     and each animation data has one joint animation data,
     and .gltf only has one animation data(though "animation" was defined for each part of the model in a glTF file)
     */
    public static combineAllJointAnimationDataToBeOneAnimation(resultJson:any){
        if(resultJson.animations){
            let index = 0,
                firstAnimationData:any = null;

            for (let animName in resultJson.animations) {
                if (resultJson.animations.hasOwnProperty(animName)) {
                    let animation = resultJson.animations[animName];

                    if(index === 0){
                        firstAnimationData = animation;
                    }
                    else{
                        let channels = animation.channels,
                            targetId = this._getTargetId(channels);

                        for(let channel of channels){
                            channel.sampler = this._buildNewSamplerId(channel.sampler, targetId);
                        }

                        let newSamplerData:any = {};

                        for (let samplerId in animation.samplers) {
                            if (animation.samplers.hasOwnProperty(samplerId)) {
                                let sampler = animation.samplers[samplerId];

                                sampler.input += String(index);
                                sampler.output += String(index);

                                newSamplerData[this._buildNewSamplerId(samplerId, targetId)] = sampler;

                                delete animation.samplers[samplerId];
                            }
                        }

                        //todo optimize: if different parameter->accessor are the same, new add new parameter id(e.g., change "TIME : 'animAccessor_0', TIME2: 'animAccessor_0'" to "TIME: 'animAccessor_0")

                        let newParameterData:any = {};

                        for (let parameterId in animation.parameters) {
                            if (animation.parameters.hasOwnProperty(parameterId)) {
                                let parameter = animation.parameters[parameterId];

                                newParameterData[`${parameterId}${index}`] = parameter;

                                delete animation.parameters[parameterId];
                            }
                        }

                        this._addToFirstAnimation(firstAnimationData, channels, newParameterData, newSamplerData);

                        this._removeOriginJointAnimationData(resultJson, animName);

                    }

                    index++;
                }
            }
        }
    }

    private static _isJointNode(resultJson:any, nodeId:string){
        if(!resultJson.nodes){
            return false;
        }

        return !!resultJson.nodes[nodeId].jointName;
    }

    private static _getTargetId(channels:any){
        return channels[0].target.id;
    }

    private static _buildNewSamplerId(oldSamplerId:string, targetId:string){
        return `${oldSamplerId}_${targetId}`;
    }

    private static _addToFirstAnimation(firstAnimationData:any, channels:Array<any>, newParameterData:any, newSamplerData:any){
        firstAnimationData.channels = firstAnimationData.channels.concat(channels);

        ExtendUtils.extend(firstAnimationData.parameters, newParameterData);
        ExtendUtils.extend(firstAnimationData.samplers, newSamplerData);
    }

    private static _removeOriginJointAnimationData(resultJson:any, animName:string){
        delete resultJson.animations[animName];
    }
}
