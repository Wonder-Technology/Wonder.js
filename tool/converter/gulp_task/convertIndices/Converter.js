"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var wdCb = require("wdcb");
var Utils = require("./Utils");
var Vector3 = require("../../../ts/Vector3");
var DataUtils = require("../../common/DataUtils");
var contract_1 = require("../../../ts/definition/typescript/decorator/contract");
var chai_1 = require("chai");
var ExtendUtils = require("../../../ts/ExtendUtils");
var Log = wdCb.Log;
var Converter = (function () {
    function Converter() {
    }
    Converter.create = function () {
        var obj = new this();
        return obj;
    };
    Converter.prototype.convert = function (sourceJson, isRemoveNullData) {
        var targetJson = ExtendUtils.extendDeep(sourceJson);
        targetJson.meshes = {};
        for (var key in sourceJson.meshes) {
            if (sourceJson.meshes.hasOwnProperty(key)) {
                var mesh = sourceJson.meshes[key], newPrimitives = [];
                for (var _i = 0, _a = mesh.primitives; _i < _a.length; _i++) {
                    var primitiveData = _a[_i];
                    if (this._hasNoIndiceData(primitiveData)) {
                        wdCb.Log.warn("just skip the primitive which has no indices");
                        continue;
                    }
                    this._duplicateVertex(primitiveData);
                    newPrimitives.push(this._parseObjectFromIndices(primitiveData));
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
    Converter.prototype._removeNullData = function (targetJson) {
        for (var key in targetJson.meshes) {
            if (targetJson.meshes.hasOwnProperty(key)) {
                var mesh = targetJson.meshes[key];
                for (var _i = 0, _a = mesh.primitives; _i < _a.length; _i++) {
                    var primitiveData = _a[_i];
                    this._removeFieldWhoseDataAreAllNull(primitiveData, "indices");
                    for (var key_1 in primitiveData.attributes) {
                        if (primitiveData.attributes.hasOwnProperty(key_1)) {
                            this._removeFieldWhoseDataAreAllNull(primitiveData.attributes, key_1);
                        }
                    }
                }
            }
        }
    };
    Converter.prototype._removeFieldWhoseDataAreAllNull = function (data, fieldName) {
        if (!data[fieldName]) {
            return;
        }
        if (data[fieldName].filter(function (value) {
            return value !== null && value !== void 0;
        }).length === 0) {
            delete data[fieldName];
        }
    };
    Converter.prototype._hasNoIndiceData = function (primitiveData) {
        return !Utils.hasData(primitiveData.verticeIndices)
            && !Utils.hasData(primitiveData.normalIndices)
            && !Utils.hasData(primitiveData.texCoordIndices);
    };
    Converter.prototype._duplicateVertex = function (primitiveData) {
        var vertices = primitiveData.attributes.POSITION, morphTargets = primitiveData.morphTargets, joints = primitiveData.attributes.JOINT, weights = primitiveData.attributes.WEIGHT;
        this._duplicateVertexWithDifferentAttributeData(vertices, morphTargets, joints, weights, primitiveData.verticeIndices, primitiveData.texCoordIndices);
        this._duplicateVertexWithDifferentAttributeData(vertices, morphTargets, joints, weights, primitiveData.verticeIndices, primitiveData.normalIndices);
        this._duplicateVertexWithDifferentAttributeData(vertices, morphTargets, joints, weights, primitiveData.verticeIndices, primitiveData.colorIndices);
    };
    Converter.prototype._duplicateVertexWithDifferentAttributeData = function (vertices, morphTargets, joints, weights, verticeIndices, dataIndices) {
        var arr = [], container = wdCb.Hash.create();
        if (!Utils.hasData(dataIndices)) {
            return;
        }
        for (var i = 0, len = verticeIndices.length; i < len; i++) {
            var verticeIndex = verticeIndices[i];
            if (this._isSameVertexWithDifferentDataByCompareToFirstOne(arr, dataIndices[i], verticeIndex)) {
                if (this._isDataIndiceEqualTheOneOfAddedVertex(container, verticeIndex, dataIndices[i])) {
                    verticeIndices[i] = this._getVerticeIndexOfAddedVertexByFindContainer(container, verticeIndex, dataIndices[i]);
                }
                else {
                    this._addVertexData(vertices, morphTargets, joints, weights, verticeIndices, dataIndices, container, verticeIndex, i);
                }
                verticeIndex = verticeIndices[i];
            }
            arr[verticeIndex] = dataIndices[i];
        }
    };
    Converter.prototype._isDataIndiceEqualTheOneOfAddedVertex = function (container, targetVerticeIndex, targetTexCoordIndex) {
        var data = container.getChild(String(targetVerticeIndex));
        if (!data) {
            return false;
        }
        return data.hasChildWithFunc(function (_a) {
            var texCoordIndex = _a[0], verticeIndex = _a[1];
            return texCoordIndex === targetTexCoordIndex;
        });
    };
    Converter.prototype._getVerticeIndexOfAddedVertexByFindContainer = function (container, targetVerticeIndex, targetDataIndex) {
        var data = container.getChild(String(targetVerticeIndex));
        return data.findOne(function (_a) {
            var dataIndex = _a[0], verticeIndex = _a[1];
            return dataIndex === targetDataIndex;
        })[1];
    };
    Converter.prototype._isSameVertexWithDifferentDataByCompareToFirstOne = function (arr, texCoordIndex, verticeIndex) {
        return arr[verticeIndex] !== void 0 && arr[verticeIndex] !== texCoordIndex;
    };
    Converter.prototype._addVertexData = function (vertices, morphTargets, joints, weights, verticeIndices, dataIndices, container, verticeIndex, index) {
        var verticeIndexOfAddedVertex = null;
        this._addThreeComponent(vertices, verticeIndex);
        if (morphTargets !== void 0) {
            for (var _i = 0, morphTargets_1 = morphTargets; _i < morphTargets_1.length; _i++) {
                var frame = morphTargets_1[_i];
                this._addThreeComponent(frame.vertices, verticeIndex);
            }
        }
        if (joints !== void 0) {
            this._addFourComponent(joints, verticeIndex);
        }
        if (weights !== void 0) {
            this._addFourComponent(weights, verticeIndex);
        }
        verticeIndexOfAddedVertex = this._getVerticeIndexOfAddedVertex(vertices);
        verticeIndices[index] = verticeIndexOfAddedVertex;
        container.appendChild(String(verticeIndex), [dataIndices[index], verticeIndexOfAddedVertex]);
    };
    Converter.prototype._addThreeComponent = function (data, index) {
        data.push(data[index * 3], data[index * 3 + 1], data[index * 3 + 2]);
    };
    Converter.prototype._addFourComponent = function (data, index) {
        data.push(data[index * 4], data[index * 4 + 1], data[index * 4 + 2], data[index * 4 + 3]);
    };
    Converter.prototype._getVerticeIndexOfAddedVertex = function (vertices) {
        return vertices.length / 3 - 1;
    };
    Converter.prototype._parseObjectFromIndices = function (primitiveData) {
        var texCoords = [], normals = [], morphNormals = [], colors = [], attributes = primitiveData.attributes, morphTargets = primitiveData.morphTargets, verticeIndices = primitiveData.verticeIndices, normalIndices = primitiveData.normalIndices, texCoordIndices = primitiveData.texCoordIndices, colorIndices = primitiveData.colorIndices, sourceVertices = attributes.POSITION, sourceTexCoords = attributes.TEXCOORD, sourceNormals = attributes.NORMAL, sourceColors = attributes.COLOR, sourceJoints = attributes.JOINT, sourceWeights = attributes.WEIGHT, material = primitiveData.material, mode = primitiveData.mode, name = primitiveData.name, newIndices = [];
        for (var i = 0, len = verticeIndices.length; i < len; i += 3) {
            var aIndex = verticeIndices[i], bIndex = verticeIndices[i + 1], cIndex = verticeIndices[i + 2], indexArr = [i, i + 1, i + 2], verticeIndiceArr = [aIndex, bIndex, cIndex];
            newIndices = newIndices.concat(verticeIndiceArr);
            if (Utils.hasData(texCoordIndices) && Utils.hasData(sourceTexCoords)) {
                this._setTwoComponentDataWhenParse(texCoords, sourceTexCoords, texCoordIndices, indexArr, verticeIndiceArr);
            }
            if (Utils.hasData(normalIndices) && Utils.hasData(sourceNormals)) {
                this._setThreeComponentDataWhenParse(normals, sourceNormals, normalIndices, indexArr, verticeIndiceArr);
                if (morphTargets !== void 0) {
                    this._setMorphNormalsFromIndices(morphTargets, morphNormals, normalIndices, indexArr, verticeIndiceArr);
                }
            }
            if (Utils.hasData(colorIndices) && Utils.hasData(sourceColors)) {
                this._setThreeComponentDataWhenParse(colors, sourceColors, colorIndices, indexArr, verticeIndiceArr);
            }
        }
        attributes.POSITION = sourceVertices;
        if (Utils.hasData(sourceJoints)) {
            attributes.JOINT = sourceJoints;
        }
        if (Utils.hasData(sourceWeights)) {
            attributes.WEIGHT = sourceWeights;
        }
        if (!Utils.hasData(texCoordIndices)) {
            attributes.TEXCOORD = sourceTexCoords;
        }
        else {
            attributes.TEXCOORD = texCoords;
        }
        if (!Utils.hasData(normalIndices)) {
            attributes.NORMAL = sourceNormals;
        }
        else {
            attributes.NORMAL = normals;
        }
        if (!Utils.hasData(colorIndices)) {
            attributes.COLOR = sourceColors;
        }
        else {
            attributes.COLOR = colors;
        }
        var result = {
            attributes: attributes,
            indices: newIndices
        };
        if (morphTargets !== void 0) {
            this._updateMorphNormalsOfMorphTargets(morphTargets, morphNormals);
            result.morphTargets = morphTargets;
        }
        if (!!material) {
            result.material = material;
        }
        if (!!mode) {
            result.mode = mode;
        }
        if (!!name) {
            result.name = name;
        }
        return result;
    };
    Converter.prototype._setMorphNormalsFromIndices = function (morphTargets, morphNormals, normalIndices, indexArr, verticeIndiceArr) {
        for (var i = 0, len = morphTargets.length; i < len; i++) {
            var frame = morphTargets[i];
            if (!!frame.normals) {
                var normals = morphNormals[i] || [];
                this._setThreeComponentDataWhenParse(normals, frame.normals, normalIndices, indexArr, verticeIndiceArr);
                morphNormals[i] = normals;
            }
        }
    };
    Converter.prototype._updateMorphNormalsOfMorphTargets = function (morphTargets, morphNormals) {
        for (var i = 0, len = morphTargets.length; i < len; i++) {
            var frame = morphTargets[i];
            if (!!frame.normals) {
                frame.normals = morphNormals[i];
            }
        }
    };
    Converter.prototype._setTwoComponentDataWhenParse = function (targetDatas, sourceDatas, dataIndices, indexArr, verticeIndiceArr) {
        var dataIndice1 = null, dataIndice2 = null, dataIndice3 = null, index1 = indexArr[0], index2 = indexArr[1], index3 = indexArr[2], aIndex = verticeIndiceArr[0], bIndex = verticeIndiceArr[1], cIndex = verticeIndiceArr[2];
        dataIndice1 = dataIndices[index1];
        dataIndice2 = dataIndices[index2];
        dataIndice3 = dataIndices[index3];
        this._setTwoComponentData(targetDatas, sourceDatas, aIndex, dataIndice1);
        this._setTwoComponentData(targetDatas, sourceDatas, bIndex, dataIndice2);
        this._setTwoComponentData(targetDatas, sourceDatas, cIndex, dataIndice3);
    };
    Converter.prototype._setThreeComponentDataWhenParse = function (targetDatas, sourceDatas, dataIndices, indexArr, verticeIndiceArr) {
        var dataIndice1 = null, dataIndice2 = null, dataIndice3 = null, index1 = indexArr[0], index2 = indexArr[1], index3 = indexArr[2], aIndex = verticeIndiceArr[0], bIndex = verticeIndiceArr[1], cIndex = verticeIndiceArr[2];
        dataIndice1 = dataIndices[index1];
        dataIndice2 = dataIndices[index2];
        dataIndice3 = dataIndices[index3];
        this._setThreeComponentData(targetDatas, sourceDatas, aIndex, dataIndice1);
        this._setThreeComponentData(targetDatas, sourceDatas, bIndex, dataIndice2);
        this._setThreeComponentData(targetDatas, sourceDatas, cIndex, dataIndice3);
    };
    Converter.prototype._setThreeComponentData = function (targetData, sourceData, index, indice) {
        targetData[index * 3] = sourceData[indice * 3];
        targetData[index * 3 + 1] = sourceData[indice * 3 + 1];
        targetData[index * 3 + 2] = sourceData[indice * 3 + 2];
    };
    Converter.prototype._addNormalData = function (targetNormals, sourceNormals, normalIndiceArr) {
        var aIndex = normalIndiceArr[0], bIndex = normalIndiceArr[1], cIndex = normalIndiceArr[2];
        if (targetNormals instanceof wdCb.Collection) {
            targetNormals.addChildren([
                this._getThreeComponentData(sourceNormals, aIndex),
                this._getThreeComponentData(sourceNormals, bIndex),
                this._getThreeComponentData(sourceNormals, cIndex)
            ]);
        }
        else {
            var normals = targetNormals;
            for (var _i = 0, _a = [this._getThreeComponentData(sourceNormals, aIndex), this._getThreeComponentData(sourceNormals, bIndex), this._getThreeComponentData(sourceNormals, cIndex)]; _i < _a.length; _i++) {
                var v = _a[_i];
                normals.push(v.x, v.y, v.z);
            }
        }
    };
    Converter.prototype._getThreeComponentData = function (sourceData, index) {
        var startIndex = 3 * index;
        return Vector3.create(sourceData[startIndex], sourceData[startIndex + 1], sourceData[startIndex + 2]);
    };
    Converter.prototype._setTwoComponentData = function (targetData, sourceData, index, indice) {
        targetData[index * 2] = sourceData[indice * 2];
        targetData[index * 2 + 1] = sourceData[indice * 2 + 1];
    };
    Converter.prototype._iteratePrimitivesFunc = function (sourceJson, func) {
        for (var key in sourceJson.meshes) {
            if (sourceJson.meshes.hasOwnProperty(key)) {
                var mesh = sourceJson.meshes[key];
                for (var _i = 0, _a = mesh.primitives; _i < _a.length; _i++) {
                    var primitiveData = _a[_i];
                    func(primitiveData);
                }
            }
        }
    };
    return Converter;
}());
exports.Converter = Converter;
__decorate([
    contract_1.requireInNodejs(function (sourceJson) {
        var _this = this;
        contract_1.it("if each indice's count don't equal, warn", function () {
            _this._iteratePrimitivesFunc(sourceJson, function (primitiveData) {
                var len = primitiveData.verticeIndices.length;
                if (primitiveData.texCoordIndices && primitiveData.texCoordIndices.length > 0) {
                    if (primitiveData.texCoordIndices.length !== len) {
                        Log.warn("primitiveData.texCoordIndices.length:" + primitiveData.texCoordIndices.length + " !== primitiveData.verticeIndices.length:" + len);
                    }
                }
                if (primitiveData.normalIndices && primitiveData.normalIndices.length > 0) {
                    if (primitiveData.normalIndices.length !== len) {
                        Log.warn("primitiveData.normalIndices.length:" + primitiveData.normalIndices.length + " !== primitiveData.verticeIndices.length:" + len);
                    }
                }
                if (primitiveData.colorIndices && primitiveData.colorIndices.length > 0) {
                    if (primitiveData.colorIndices.length !== len) {
                        Log.warn("primitiveData.colorIndices.length:" + primitiveData.colorIndices.length + " !== primitiveData.verticeIndices.length:" + len);
                    }
                }
            });
        }, this);
        contract_1.it("primitive->attribute->JOINT's length should === WEIGHT's length", function () {
            _this._iteratePrimitivesFunc(sourceJson, function (primitiveData) {
                if (Utils.hasData(primitiveData.attributes.JOINT)) {
                    chai_1.expect(primitiveData.attributes.JOINT.length).equals(primitiveData.attributes.WEIGHT.length);
                }
            });
        }, this);
    }),
    contract_1.ensure(function (targetJson, sourceJson, isRemoveNullData) {
        var _this = this;
        contract_1.it("joint data should has weight data", function () {
            _this._iteratePrimitivesFunc(targetJson, function (primitiveData) {
                var joints = primitiveData.attributes.JOINT, weights = primitiveData.attributes.WEIGHT;
                if (Utils.hasData(joints)) {
                    for (var i = 0, len = joints.length; i < len; i++) {
                        chai_1.expect((joints[i] >= 0 && weights[i] > 0)
                            || (joints[i] < 0 && weights[i] == 0)).true;
                    }
                }
            });
        }, this);
    })
], Converter.prototype, "convert", null);
