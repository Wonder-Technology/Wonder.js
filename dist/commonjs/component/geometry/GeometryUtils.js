"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var registerClass_1 = require("../../definition/typescript/decorator/registerClass");
var Face3_1 = require("../../structure/Face3");
var contract_1 = require("../../definition/typescript/decorator/contract");
var Collection_1 = require("wonder-commonlib/dist/commonjs/Collection");
var Hash_1 = require("wonder-commonlib/dist/commonjs/Hash");
var JudgeUtils_1 = require("../../utils/JudgeUtils");
var Log_1 = require("../../utils/Log");
var Vector3_1 = require("../../math/Vector3");
var GeometryUtils = (function () {
    function GeometryUtils() {
    }
    GeometryUtils.convertToFaces = function (indices, normals) {
        var hasNormals = this.hasData(normals), faces = [];
        for (var i = 0, len = indices.length; i < len; i += 3) {
            var a = indices[i], b = indices[i + 1], c = indices[i + 2], face = Face3_1.Face3.create(a, b, c);
            if (hasNormals) {
                face.vertexNormals.addChildren([
                    this.getThreeComponent(normals, a),
                    this.getThreeComponent(normals, b),
                    this.getThreeComponent(normals, c)
                ]);
                face.faceNormal = face.vertexNormals.getChild(0).clone();
            }
            faces.push(face);
        }
        return faces;
    };
    GeometryUtils.hasData = function (data) {
        return data && ((data.length && data.length > 0) || (data.getCount && data.getCount() > 0));
    };
    GeometryUtils.getThreeComponent = function (sourceData, index) {
        var startIndex = 3 * index;
        return Vector3_1.Vector3.create(sourceData[startIndex], sourceData[startIndex + 1], sourceData[startIndex + 2]);
    };
    GeometryUtils.iterateThreeComponent = function (dataArr, iterator) {
        for (var i = 0, len = dataArr.length; i < len; i += 3) {
            iterator(Vector3_1.Vector3.create(dataArr[i], dataArr[i + 1], dataArr[i + 2]));
        }
    };
    GeometryUtils.setThreeComponent = function (targetData, sourceData, index) {
        if (sourceData instanceof Vector3_1.Vector3) {
            targetData[index * 3] = sourceData.x;
            targetData[index * 3 + 1] = sourceData.y;
            targetData[index * 3 + 2] = sourceData.z;
        }
        else {
            targetData[index * 3] = sourceData[0];
            targetData[index * 3 + 1] = sourceData[1];
            targetData[index * 3 + 2] = sourceData[2];
        }
    };
    return GeometryUtils;
}());
__decorate([
    contract_1.requireCheck(function (data) {
        if (data) {
            contract_1.assert(data instanceof Collection_1.Collection || data instanceof Hash_1.Hash || JudgeUtils_1.JudgeUtils.isArrayExactly(data), Log_1.Log.info.FUNC_SHOULD("data", "be Array or Collection or Hash"));
        }
    })
], GeometryUtils, "hasData", null);
__decorate([
    contract_1.requireCheck(function (dataArr, iterator) {
        contract_1.assert(dataArr.length % 3 === 0, Log_1.Log.info.FUNC_SHOULD("dataArr.length", "times of three"));
    })
], GeometryUtils, "iterateThreeComponent", null);
GeometryUtils = __decorate([
    registerClass_1.registerClass("GeometryUtils")
], GeometryUtils);
exports.GeometryUtils = GeometryUtils;
//# sourceMappingURL=GeometryUtils.js.map