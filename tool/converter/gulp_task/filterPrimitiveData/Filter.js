"use strict";
var wdCb = require("wdcb");
var DataUtils = require("../../common/DataUtils");
var ExtendUtils = require("../../../ts/ExtendUtils");
var JudgeUtils = require("../../../ts/JudgeUtils");
var Filter = (function () {
    function Filter() {
    }
    Filter.create = function () {
        var obj = new this();
        return obj;
    };
    Filter.prototype.filter = function (sourceJson, isRemoveNullData) {
        var targetJson = ExtendUtils.extendDeep(sourceJson);
        targetJson.meshes = {};
        for (var key in sourceJson.meshes) {
            if (sourceJson.meshes.hasOwnProperty(key)) {
                var mesh = sourceJson.meshes[key], newPrimitives = [];
                for (var _i = 0, _a = mesh.primitives; _i < _a.length; _i++) {
                    var primitiveData = _a[_i];
                    newPrimitives.push(this._filterByIndices(primitiveData));
                }
                targetJson.meshes[key] = {
                    primitives: newPrimitives
                };
            }
        }
        if (isRemoveNullData) {
            DataUtils.removeNullData(targetJson);
        }
        return targetJson;
    };
    Filter.prototype._filterByIndices = function (primitiveData) {
        var indices = primitiveData.indices, attributes = primitiveData.attributes, newPosition = [], newNormal = [], newTexCoord = [], newColor = [], newJoint = [], newWeight = [], newIndices = [], newMorphTargets = [], newPrimitive = null, index = 0, map = wdCb.Hash.create();
        if (!!indices) {
            for (var _i = 0, indices_1 = indices; _i < indices_1.length; _i++) {
                var indice = indices_1[_i];
                if (!map.hasChild(String(indice))) {
                    this._addAttributeData(newPosition, attributes.POSITION, indice, 3);
                    if (!!attributes.NORMAL) {
                        this._addAttributeData(newNormal, attributes.NORMAL, indice, 3);
                    }
                    if (!!attributes.TEXCOORD) {
                        this._addAttributeData(newTexCoord, attributes.TEXCOORD, indice, 2);
                    }
                    if (!!attributes.COLOR) {
                        this._addAttributeData(newColor, attributes.COLOR, indice, 3);
                    }
                    if (!!attributes.JOINT) {
                        this._addAttributeData(newJoint, attributes.JOINT, indice, 4);
                    }
                    if (!!attributes.WEIGHT) {
                        this._addAttributeData(newWeight, attributes.WEIGHT, indice, 4);
                    }
                    map.addChild(String(indice), index);
                    index++;
                }
            }
            for (var _a = 0, indices_2 = indices; _a < indices_2.length; _a++) {
                var indice = indices_2[_a];
                newIndices.push(map.getChild(String(indice)));
            }
            if (!!primitiveData.morphTargets) {
                this._addMorphData(newMorphTargets, primitiveData.morphTargets, indices);
            }
        }
        newPrimitive = {
            attributes: {},
            indices: newIndices
        };
        this._addData(newPrimitive.attributes, "POSITION", newPosition);
        this._addData(newPrimitive.attributes, "NORMAL", newNormal);
        this._addData(newPrimitive.attributes, "TEXCOORD", newTexCoord);
        this._addData(newPrimitive.attributes, "COLOR", newColor);
        this._addData(newPrimitive.attributes, "JOINT", newJoint);
        this._addData(newPrimitive.attributes, "WEIGHT", newWeight);
        this._addData(newPrimitive, "morphTargets", newMorphTargets);
        this._addData(newPrimitive, "material", primitiveData.material);
        this._addData(newPrimitive, "mode", primitiveData.mode);
        this._addData(newPrimitive, "name", primitiveData.name);
        return newPrimitive;
    };
    Filter.prototype._addAttributeData = function (targetArr, sourvceArr, indice, size) {
        var start = indice * size;
        while (size > 0) {
            targetArr.push(sourvceArr[start]);
            start++;
            size--;
        }
    };
    Filter.prototype._addMorphData = function (newMorphTargets, morphTargets, indices) {
        var map = wdCb.Hash.create(), index = 0;
        for (var _i = 0, morphTargets_1 = morphTargets; _i < morphTargets_1.length; _i++) {
            var frame = morphTargets_1[_i];
            var newFrame = {}, newVertices = [], newNormals = [];
            map.removeAllChildren();
            index = 0;
            newFrame.name = frame.name;
            for (var _a = 0, indices_3 = indices; _a < indices_3.length; _a++) {
                var indice = indices_3[_a];
                if (!map.hasChild(String(indice))) {
                    this._addAttributeData(newVertices, frame.vertices, indice, 3);
                    newFrame.vertices = newVertices;
                    if (!!frame.normals) {
                        this._addAttributeData(newNormals, frame.normals, indice, 3);
                        newFrame.normals = newNormals;
                    }
                    map.addChild(String(indice), index);
                    index++;
                }
            }
            newMorphTargets.push(newFrame);
        }
    };
    Filter.prototype._addData = function (target, key, data) {
        if (!data) {
            return;
        }
        if (JudgeUtils.isArrayExactly(data)) {
            if (data.length > 0) {
                target[key] = data;
            }
        }
        else {
            target[key] = data;
        }
    };
    return Filter;
}());
exports.Filter = Filter;
