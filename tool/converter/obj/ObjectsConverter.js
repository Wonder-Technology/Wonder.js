"use strict";
var wdCb = require("wdcb");
var Log = require("../../ts/Log");
var VERTEX_PATTERN = /v\s([\d|\.|\+|\-|e]+)( +[\d|\.|\+|\-|e]+)( +[\d|\.|\+|\-|e]+)/, NORMAL_PATTERN = /vn\s([\d|\.|\+|\-|e]+)( +[\d|\.|\+|\-|e]+)( +[\d|\.|\+|\-|e]+)/, TEXCOORD_PATTERN = /vt\s([\d|\.|\+|\-|e]+)( +[\d|\.|\+|\-|e]+)/, FACE_PATTERN = /f\s(.+)/, FACE_PATTERN1 = /f\s(([\d]{1,}[\s]+){2,}([\d]{1,}[\s]?))+/, FACE_PATTERN2 = /f\s((([\d]{1,}\/[\d]{1,}[\s]+){2,}([\d]{1,}\/[\d]{1,}[\s]?))+)/, FACE_PATTERN3 = /f\s((([\d]{1,}\/[\d]{1,}\/[\d]{1,}[\s]+){2,}([\d]{1,}\/[\d]{1,}\/[\d]{1,}[\s]?))+)/, FACE_PATTERN4 = /f\s((([\d]{1,}\/\/[\d]{1,}[\s]+){2,}([\d]{1,}\/\/[\d]{1,}[\s]?))+)/, OBJ_PATTERN = /^o /, GROUP_PATTERN = /^g /, USEMTL_PATTERN = /^usemtl /, MTLLIB_PATTERN = /^mtllib /, SMOOTH_PATTERN = /^s /;
var ObjectModel = (function () {
    function ObjectModel() {
        this.vertices = [];
        this.normals = [];
        this.texCoords = [];
        this.verticeIndices = [];
        this.normalIndices = [];
        this.texCoordIndices = [];
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
    ObjectsConverter.prototype.convert = function (json, fileContent, nodeName) {
        var lines = fileContent.split('\n'), topObject = { children: [] }, result = [];
        this._convertFromObj(lines);
        var nodes = {}, meshId = nodeName + "_mesh";
        json.nodes = nodes;
        nodes[nodeName] = {
            children: [],
            matrix: [
                1,
                0,
                0,
                0,
                0,
                1,
                0,
                0,
                0,
                0,
                1,
                0,
                0,
                0,
                0,
                1
            ],
            mesh: meshId,
            name: nodeName
        };
        var meshes = {};
        json.meshes = meshes;
        meshes[meshId] = {
            name: meshId,
            primitives: this._buildPrimitiveArr()
        };
        return json;
    };
    ObjectsConverter.prototype._buildPrimitiveArr = function () {
        var self = this, arr = [];
        this.objects.forEach(function (objectModel) {
            arr.push({
                name: objectModel.name,
                attributes: {
                    POSITION: self._vertices,
                    TEXCOORD: self._texCoords,
                    NORMAL: self._normals
                },
                verticeIndices: objectModel.verticeIndices,
                normalIndices: objectModel.normalIndices,
                texCoordIndices: objectModel.texCoordIndices,
                material: objectModel.materialName,
                mode: 4
            });
        });
        return arr;
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
            else if ((result = TEXCOORD_PATTERN.exec(line)) !== null) {
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
        var face = lineResult[1].trim().split(" "), line = lineResult[0], triangles = [], result = null, k = null, verticeIndices = null, normalIndices = null, texCoordIndices = null;
        if (!this._currentObject) {
            this._currentObject = ObjectModel.create();
            this.objects.addChild(this._currentObject);
        }
        if (face.length < 3) {
            return;
        }
        verticeIndices = this._currentObject.verticeIndices;
        normalIndices = this._currentObject.normalIndices;
        texCoordIndices = this._currentObject.texCoordIndices;
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
                texCoordIndices.push(parseInt(point[1]) - 1);
            }
        }
        else if ((result = FACE_PATTERN3.exec(line)) !== null) {
            for (var _b = 0, triangles_3 = triangles; _b < triangles_3.length; _b++) {
                k = triangles_3[_b];
                var point = k.split("/");
                verticeIndices.push(parseInt(point[0]) - 1);
                texCoordIndices.push(parseInt(point[1]) - 1);
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
