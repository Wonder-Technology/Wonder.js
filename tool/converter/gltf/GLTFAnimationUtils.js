"use strict";
var wdCb = require("wdcb");
var ExtendUtils = require("../../ts/ExtendUtils");
var GLTFAnimationUtils = (function () {
    function GLTFAnimationUtils() {
    }
    GLTFAnimationUtils.isJointAnimationSeparate = function (resultJson) {
        var jointAnimationMap = wdCb.Hash.create(), result = true;
        if (resultJson.animations) {
            for (var animName in resultJson.animations) {
                if (resultJson.animations.hasOwnProperty(animName)) {
                    var animation = resultJson.animations[animName];
                    for (var _i = 0, _a = animation.channels; _i < _a.length; _i++) {
                        var channel = _a[_i];
                        var nodeId = channel.target.id;
                        if (this._isJointNode(resultJson, nodeId)) {
                            jointAnimationMap.appendChild(nodeId, animName);
                        }
                    }
                }
            }
        }
        jointAnimationMap.forEach(function (animNameList) {
            var list = animNameList.removeRepeatItems();
            if (list.getCount() > 1) {
                result = false;
                return wdCb.$BREAK;
            }
        });
        return result;
    };
    GLTFAnimationUtils.combineAllJointAnimationDataToBeOneAnimation = function (resultJson) {
        if (resultJson.animations) {
            var index = 0, firstAnimationData = null;
            for (var animName in resultJson.animations) {
                if (resultJson.animations.hasOwnProperty(animName)) {
                    var animation = resultJson.animations[animName];
                    if (index === 0) {
                        firstAnimationData = animation;
                    }
                    else {
                        var channels = animation.channels, targetId = this._getTargetId(channels);
                        for (var _i = 0, channels_1 = channels; _i < channels_1.length; _i++) {
                            var channel = channels_1[_i];
                            channel.sampler = this._buildNewSamplerId(channel.sampler, targetId);
                        }
                        var newSamplerData = {};
                        for (var samplerId in animation.samplers) {
                            if (animation.samplers.hasOwnProperty(samplerId)) {
                                var sampler = animation.samplers[samplerId];
                                sampler.input += String(index);
                                sampler.output += String(index);
                                newSamplerData[this._buildNewSamplerId(samplerId, targetId)] = sampler;
                                delete animation.samplers[samplerId];
                            }
                        }
                        var newParameterData = {};
                        for (var parameterId in animation.parameters) {
                            if (animation.parameters.hasOwnProperty(parameterId)) {
                                var parameter = animation.parameters[parameterId];
                                newParameterData["" + parameterId + index] = parameter;
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
    };
    GLTFAnimationUtils._isJointNode = function (resultJson, nodeId) {
        if (!resultJson.nodes) {
            return false;
        }
        return !!resultJson.nodes[nodeId].jointName;
    };
    GLTFAnimationUtils._getTargetId = function (channels) {
        return channels[0].target.id;
    };
    GLTFAnimationUtils._buildNewSamplerId = function (oldSamplerId, targetId) {
        return oldSamplerId + "_" + targetId;
    };
    GLTFAnimationUtils._addToFirstAnimation = function (firstAnimationData, channels, newParameterData, newSamplerData) {
        firstAnimationData.channels = firstAnimationData.channels.concat(channels);
        ExtendUtils.extend(firstAnimationData.parameters, newParameterData);
        ExtendUtils.extend(firstAnimationData.samplers, newSamplerData);
    };
    GLTFAnimationUtils._removeOriginJointAnimationData = function (resultJson, animName) {
        delete resultJson.animations[animName];
    };
    return GLTFAnimationUtils;
}());
exports.GLTFAnimationUtils = GLTFAnimationUtils;
