"use strict";
var wdCb = require("wdcb");
var Log = require("../common/Log");
var ModelLoaderUtils = require("../common/ModelLoaderUtils");
var VERTEX_PATTERN = /v\s([\d|\.|\+|\-|e]+)( +[\d|\.|\+|\-|e]+)( +[\d|\.|\+|\-|e]+)/, NORMAL_PATTERN = /vn\s([\d|\.|\+|\-|e]+)( +[\d|\.|\+|\-|e]+)( +[\d|\.|\+|\-|e]+)/, UV_PATTERN = /vt\s([\d|\.|\+|\-|e]+)( +[\d|\.|\+|\-|e]+)/, FACE_PATTERN = /f\s(.+)/, FACE_PATTERN1 = /f\s(([\d]{1,}[\s]+){2,}([\d]{1,}[\s]?))+/, FACE_PATTERN2 = /f\s((([\d]{1,}\/[\d]{1,}[\s]+){2,}([\d]{1,}\/[\d]{1,}[\s]?))+)/, FACE_PATTERN3 = /f\s((([\d]{1,}\/[\d]{1,}\/[\d]{1,}[\s]+){2,}([\d]{1,}\/[\d]{1,}\/[\d]{1,}[\s]?))+)/, FACE_PATTERN4 = /f\s((([\d]{1,}\/\/[\d]{1,}[\s]+){2,}([\d]{1,}\/\/[\d]{1,}[\s]?))+)/, OBJ_PATTERN = /^o /, GROUP_PATTERN = /^g /, USEMTL_PATTERN = /^usemtl /, MTLLIB_PATTERN = /^mtllib /, SMOOTH_PATTERN = /^s /;
var ObjectModel = (function () {
    function ObjectModel() {
        this.vertices = [];
        this.normals = [];
        this.texCoords = [];
        this.verticeIndices = [];
        this.normalIndices = [];
        this.uvIndices = [];
        this.materialName = null;
        this.name = null;
        this.indicesCount = 0;
    }
    ObjectModel.create = function () {
        var obj = new this();
        return obj;
    };
    return ObjectModel;
}());
module.exports = (function () {
    function ObjectsConverter() {
        this.objects = wdCb.Collection.create();
        this.mtlFilePath = null;
        this.materialName = null;
        this.name = null;
        this._vertices = [];
        this._normals = [];
        this._texCoords = [];
        this._currentObject = null;
        this._currentObjectName = null;
    }
    ObjectsConverter.create = function () {
        var obj = new this();
        return obj;
    };
    ObjectsConverter.prototype.convert = function (fileContent, filePath) {
        var lines = fileContent.split('\n'), topObject = { children: [] }, result = [];
        this._convertFromObj(lines);
        this.objects.forEach(function (objectModel) {
            var object = {};
            object.name = objectModel.name;
            object.material = objectModel.materialName;
            object.verticeIndices = objectModel.verticeIndices;
            object.normalIndices = objectModel.normalIndices;
            object.uvIndices = objectModel.uvIndices;
            object.morphTargets = [];
            topObject.children.push(object);
        });
        topObject.name = ModelLoaderUtils.getNameByPath(filePath);
        topObject.vertices = this._vertices;
        topObject.normals = this._normals;
        topObject.uvs = this._texCoords;
        topObject.colors = [];
        result.push(topObject);
        return result;
    };
    ObjectsConverter.prototype._convertFromObj = function (lines) {
        var _this = this;
        lines.forEach(function (line, i) {
            var result = null;
            line = line.trim();
            if (line.length === 0 || line.charAt(0) === '#') {
                return;
            }
            else if ((result = VERTEX_PATTERN.exec(line)) !== null) {
                _this._vertices.push(parseFloat(result[1]), parseFloat(result[2]), parseFloat(result[3]));
            }
            else if ((result = NORMAL_PATTERN.exec(line)) !== null) {
                _this._normals.push(parseFloat(result[1]), parseFloat(result[2]), parseFloat(result[3]));
            }
            else if ((result = UV_PATTERN.exec(line)) !== null) {
                _this._texCoords.push(parseFloat(result[1]), parseFloat(result[2]));
            }
            else if ((result = FACE_PATTERN.exec(line)) !== null) {
                _this._convertFace(result);
            }
            else if (GROUP_PATTERN.test(line) || OBJ_PATTERN.test(line)) {
                _this._currentObjectName = line.substring(2).trim();
            }
            else if (USEMTL_PATTERN.test(line)) {
                _this._convertUsemtl(line);
            }
            else if (MTLLIB_PATTERN.test(line)) {
                _this.mtlFilePath = line.substring(7).trim();
            }
            else if (SMOOTH_PATTERN.test(line)) {
            }
            else {
                Log.log("Unhandled expression at line : " + i + "\nvalue:" + line);
            }
        });
    };
    ObjectsConverter.prototype._convertUsemtl = function (line) {
        this._currentObject = ObjectModel.create();
        this._currentObject.materialName = line.substring(7).trim();
        if (this._currentObjectName !== null) {
            this._currentObject.name = this._currentObjectName;
            this._currentObjectName = null;
        }
        else {
            this._currentObject.name = this._currentObject.materialName;
        }
        this.objects.addChild(this._currentObject);
    };
    ObjectsConverter.prototype._convertFace = function (lineResult) {
        var face = lineResult[1].trim().split(" "), line = lineResult[0], triangles = [], result = null, k = null, verticeIndices = null, normalIndices = null, uvIndices = null;
        if (!this._currentObject || face.length < 3) {
            return;
        }
        verticeIndices = this._currentObject.verticeIndices;
        normalIndices = this._currentObject.normalIndices;
        uvIndices = this._currentObject.uvIndices;
        this._getTriangles(face, triangles);
        if ((result = FACE_PATTERN1.exec(line)) !== null) {
            for (var _i = 0, triangles_1 = triangles; _i < triangles_1.length; _i++) {
                k = triangles_1[_i];
                verticeIndices.push(parseInt(k) - 1);
            }
        }
        else if ((result = FACE_PATTERN2.exec(line)) !== null) {
            for (var _a = 0, triangles_2 = triangles; _a < triangles_2.length; _a++) {
                k = triangles_2[_a];
                var point = k.split("/");
                verticeIndices.push(parseInt(point[0]) - 1);
                uvIndices.push(parseInt(point[1]) - 1);
            }
        }
        else if ((result = FACE_PATTERN3.exec(line)) !== null) {
            for (var _b = 0, triangles_3 = triangles; _b < triangles_3.length; _b++) {
                k = triangles_3[_b];
                var point = k.split("/");
                verticeIndices.push(parseInt(point[0]) - 1);
                uvIndices.push(parseInt(point[1]) - 1);
                normalIndices.push(parseInt(point[2]) - 1);
            }
        }
        else if ((result = FACE_PATTERN4.exec(line)) !== null) {
            for (var _c = 0, triangles_4 = triangles; _c < triangles_4.length; _c++) {
                k = triangles_4[_c];
                var point = k.split("//");
                verticeIndices.push(parseInt(point[0]) - 1);
                normalIndices.push(parseInt(point[1]) - 1);
            }
        }
        else {
            Log.error(true, Log.info.FUNC_UNKNOW(lineResult));
        }
    };
    ObjectsConverter.prototype._getTriangles = function (face, triangles) {
        var getTriangles = function (v) {
            if (v + 1 < face.length) {
                triangles.push(face[0], face[v], face[v + 1]);
                v++;
                getTriangles(v);
            }
        };
        getTriangles(1);
    };
    return ObjectsConverter;
}());
