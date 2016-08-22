var wdCb = require("wdcb");
var Vector2 = require("../common/Vector2");
var Vector3 = require("../common/Vector3");
//todo handle x,y,z,w case?
var VERTEX_PATTERN = /v\s([\d|\.|\+|\-|e]+)( +[\d|\.|\+|\-|e]+)( +[\d|\.|\+|\-|e]+)/, 
// vn float float float
NORMAL_PATTERN = /vn\s([\d|\.|\+|\-|e]+)( +[\d|\.|\+|\-|e]+)( +[\d|\.|\+|\-|e]+)/, 
// vt float float
UV_PATTERN = /vt\s([\d|\.|\+|\-|e]+)( +[\d|\.|\+|\-|e]+)/, FACE_PATTERN = /f\s(.+)/, 
// f vertex vertex vertex ...
FACE_PATTERN1 = /f\s(([\d]{1,}[\s]+){2,}([\d]{1,}[\s]?))+/, 
// f vertex/uv vertex/uv vertex/uv ...
FACE_PATTERN2 = /f\s((([\d]{1,}\/[\d]{1,}[\s]+){2,}([\d]{1,}\/[\d]{1,}[\s]?))+)/, 
// f vertex/uv/normal vertex/uv/normal vertex/uv/normal ...
FACE_PATTERN3 = /f\s((([\d]{1,}\/[\d]{1,}\/[\d]{1,}[\s]+){2,}([\d]{1,}\/[\d]{1,}\/[\d]{1,}[\s]?))+)/, 
// f vertex//normal vertex//normal vertex//normal ...
FACE_PATTERN4 = /f\s((([\d]{1,}\/\/[\d]{1,}[\s]+){2,}([\d]{1,}\/\/[\d]{1,}[\s]?))+)/, 
//var comment_pattern = /# /;
OBJ_PATTERN = /^o /, GROUP_PATTERN = /^g /, USEMTL_PATTERN = /^usemtl /, MTLLIB_PATTERN = /^mtllib /, SMOOTH_PATTERN = /^s /;
var _setTwoComponentData = function (sourceData, targetData, index) {
    var data = _getTwoComponentData(sourceData, index);
    targetData.addChild(data.x);
    targetData.addChild(data.y);
};
var _getTwoComponentData = function (sourceData, index) {
    var startIndex = 2 * index;
    return Vector2.create(sourceData.getChild(startIndex), sourceData.getChild(startIndex + 1));
};
var _setThreeComponentData = function (sourceData, targetData, index) {
    var data = _getThreeComponentData(sourceData, index);
    targetData.addChild(data.x);
    targetData.addChild(data.y);
    targetData.addChild(data.z);
};
var _getThreeComponentData = function (sourceData, index) {
    var startIndex = 3 * index;
    return Vector3.create(sourceData.getChild(startIndex), sourceData.getChild(startIndex + 1), sourceData.getChild(startIndex + 2));
};
var ObjectModel = (function () {
    function ObjectModel() {
        //todo add colors data?
        this.vertices = wdCb.Collection.create();
        this.normals = wdCb.Collection.create();
        this.texCoords = wdCb.Collection.create();
        this.indices = wdCb.Collection.create();
        this.materialName = null;
        this.name = null;
        this.faces = wdCb.Collection.create();
        this.indicesCount = 0;
    }
    ObjectModel.create = function () {
        var obj = new this();
        return obj;
    };
    ObjectModel.prototype.addFace = function (face) {
        this.faces.addChild(face);
        this.indicesCount += face.indicesCount;
    };
    return ObjectModel;
})();
//todo use Array instead of Collection, to reduce memory size
var FaceModel = (function () {
    function FaceModel() {
        this.verticeIndices = wdCb.Collection.create();
        this.normalIndices = wdCb.Collection.create();
        this.texCoordIndices = wdCb.Collection.create();
        this.normals = wdCb.Collection.create();
    }
    FaceModel.create = function () {
        var obj = new this();
        return obj;
    };
    Object.defineProperty(FaceModel.prototype, "indicesCount", {
        get: function () {
            return this.verticeIndices.getCount();
        },
        enumerable: true,
        configurable: true
    });
    //todo add contract
    //@In(function () {
    //    assert(this.verticeIndices.getCount() >= 3, `verticesIndices.getCount() should >= 3, but actual is ${this.verticeIndices.getCount()}`);
    //})
    //todo extract Face3
    FaceModel.prototype.computeNormal = function (vertices) {
        var count = this.verticeIndices.getCount();
        var self = this;
        var compute = function (startIndex) {
            var p0 = _getThreeComponentData(vertices, self.verticeIndices.getChild(startIndex)), p1 = _getThreeComponentData(vertices, self.verticeIndices.getChild(startIndex + 1)), p2 = _getThreeComponentData(vertices, self.verticeIndices.getChild(startIndex + 2)), v0 = Vector3.create().sub2(p2, p1), v1 = Vector3.create().sub2(p0, p1), result = null;
            result = Vector3.create().cross(v0, v1).normalize();
            self.normals.addChild(result.x);
            self.normals.addChild(result.y);
            self.normals.addChild(result.z);
            if (count > startIndex + 3) {
                compute(startIndex + 3);
            }
        };
        compute(0);
    };
    return FaceModel;
})();
module.exports = (function () {
    function ObjectsConverter() {
        this.objects = wdCb.Collection.create();
        this.mtlFilePath = null;
        this._vertices = wdCb.Collection.create();
        this._normals = wdCb.Collection.create();
        this._texCoords = wdCb.Collection.create();
        this._currentObject = null;
        this._currentObjectName = null;
        this.vertices = wdCb.Collection.create();
        this.normals = wdCb.Collection.create();
        this.texCoords = wdCb.Collection.create();
        this.indices = wdCb.Collection.create();
        this.materialName = null;
        this.name = null;
        this.faces = wdCb.Collection.create();
        this.indicesCount = 0;
    }
    ObjectsConverter.create = function () {
        var obj = new this();
        return obj;
    };
    //todo remove objects?
    ObjectsConverter.prototype.convert = function (fileContent, filePath) {
        var lines = fileContent.split('\n'), topObject = { children: {} }, result = {};
        this._convertFromObj(lines);
        this._convertFromFaces();
        this.objects.forEach(function (objectModel) {
            var object = {};
            object.material = objectModel.materialName;
            object.vertices = objectModel.vertices.toArray();
            object.normals = objectModel.normals.toArray();
            object.uvs = objectModel.texCoords.toArray();
            object.indices = objectModel.indices.toArray();
            object.colors = [];
            object.morphTargets = [];
            topObject.children[objectModel.name] = object;
        });
        result[wdCb.PathUtils.basename(filePath, wdCb.PathUtils.extname(filePath))] = topObject;
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
                // ["v 1.0 2.0 3.0", "1.0", "2.0", "3.0"]
                //this._vertices.addChild(
                //    Vector3.create(
                //        parseFloat(result[1]),
                //        parseFloat(result[2]),
                //        parseFloat(result[3])
                //    )
                //);
                _this._vertices.addChildren([
                    parseFloat(result[1]),
                    parseFloat(result[2]),
                    parseFloat(result[3])
                ]);
            }
            else if ((result = NORMAL_PATTERN.exec(line)) !== null) {
                // ["vn 1.0 2.0 3.0", "1.0", "2.0", "3.0"]
                //this._normals.addChild(
                //    Vector3.create(
                //        parseFloat(result[1]),
                //        parseFloat(result[2]),
                //        parseFloat(result[3])
                //    )
                //);
                _this._normals.addChildren([
                    parseFloat(result[1]),
                    parseFloat(result[2]),
                    parseFloat(result[3])
                ]);
            }
            else if ((result = UV_PATTERN.exec(line)) !== null) {
                // ["vt 0.1 0.2", "0.1", "0.2"]
                //this._texCoords.addChild(
                //    Vector2.create(
                //        parseFloat(result[1]),
                //        parseFloat(result[2])
                //    )
                //);
                _this._texCoords.addChildren([
                    parseFloat(result[1]),
                    parseFloat(result[2])
                ]);
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
                wdCb.Log.log("Unhandled expression at line : " + i + "\nvalue:" + line);
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
        var face = lineResult[1].trim().split(" "), line = lineResult[0], triangles = [], result = null, k = null, faceModel = FaceModel.create();
        if (!this._currentObject || face.length < 3) {
            return;
        }
        this._getTriangles(face, triangles);
        if ((result = FACE_PATTERN1.exec(line)) !== null) {
            for (var _i = 0; _i < triangles.length; _i++) {
                k = triangles[_i];
                faceModel.verticeIndices.addChild(parseInt(k) - 1);
            }
        }
        else if ((result = FACE_PATTERN2.exec(line)) !== null) {
            for (var _a = 0; _a < triangles.length; _a++) {
                k = triangles[_a];
                //triangle[k] = "1/1"
                var point = k.split("/"); // ["1", "1"]
                faceModel.verticeIndices.addChild(parseInt(point[0]) - 1);
                faceModel.texCoordIndices.addChild(parseInt(point[1]) - 1);
            }
        }
        else if ((result = FACE_PATTERN3.exec(line)) !== null) {
            for (var _b = 0; _b < triangles.length; _b++) {
                k = triangles[_b];
                //triangle[k] = "1/1/1"
                var point = k.split("/"); // ["1", "1"]
                faceModel.verticeIndices.addChild(parseInt(point[0]) - 1);
                faceModel.texCoordIndices.addChild(parseInt(point[1]) - 1);
                faceModel.normalIndices.addChild(parseInt(point[2]) - 1);
            }
        }
        else if ((result = FACE_PATTERN4.exec(line)) !== null) {
            for (var _c = 0; _c < triangles.length; _c++) {
                k = triangles[_c];
                //triangle[k] = "1//1"
                var point = k.split("//"); // ["1", "1"]
                faceModel.verticeIndices.addChild(parseInt(point[0]) - 1);
                faceModel.normalIndices.addChild(parseInt(point[1]) - 1);
            }
        }
        else {
            wdCb.Log.error(true, wdCb.Log.info.FUNC_UNKNOW(lineResult));
        }
        this._currentObject.addFace(faceModel);
    };
    /**
     * Create triangles from polygons by recursion
     * The best to understand how it works is to draw it in the same time you get the recursion.
     * It is important to notice that a triangle is a polygon
     * We get 4 patterns of face defined in OBJ File :
     * facePattern1 = ["1","2","3","4","5","6"]
     * facePattern2 = ["1/1","2/2","3/3","4/4","5/5","6/6"]
     * facePattern3 = ["1/1/1","2/2/2","3/3/3","4/4/4","5/5/5","6/6/6"]
     * facePattern4 = ["1//1","2//2","3//3","4//4","5//5","6//6"]
     * Each pattern is divided by the same method
     * @param face Array[String] The indices of elements
     * @param v Integer The variable to increment
     */
    ObjectsConverter.prototype._getTriangles = function (face, triangles) {
        var getTriangles = function (v) {
            //Work for each element of the array
            if (v + 1 < face.length) {
                //Add on the triangle variable the indexes to obtain triangles
                triangles.push(face[0], face[v], face[v + 1]);
                //Incrementation for recursion
                v++;
                //Recursion
                getTriangles(v);
            }
        };
        getTriangles(1);
    };
    //todo check repeat(refer to babylon.objFileLoader.ts->setData-> judge isInArray)?
    ObjectsConverter.prototype._convertFromFaces = function () {
        var self = this;
        this.objects.forEach(function (object) {
            var indices = object.indices, vertices = object.vertices, normals = object.normals, texCoords = object.texCoords, index_indices = 0;
            object.faces.forEach(function (face) {
                //todo add setting color?
                //var color = this.findColor(face.materialName);
                face.verticeIndices.forEach(function (vIdx, k) {
                    self._setIndices(indices, index_indices);
                    self._setVertices(vertices, vIdx);
                    self._setTexCoords(texCoords, face, k);
                    self._setNormals(normals, face, k);
                    index_indices++;
                });
            });
        });
    };
    ObjectsConverter.prototype._setIndices = function (indices, index_indices) {
        indices.addChild(index_indices);
    };
    ObjectsConverter.prototype._setVertices = function (vertices, vIdx) {
        _setThreeComponentData(this._vertices, vertices, vIdx);
    };
    ObjectsConverter.prototype._setTexCoords = function (texCoords, face, k) {
        if (face.texCoordIndices.getCount() > 0) {
            var tIdx = null, data = null;
            tIdx = face.texCoordIndices.getChild(k);
            //texCoords.addChild(this._texCoords.getChild(tIdx));
            _setTwoComponentData(this._texCoords, texCoords, tIdx);
        }
    };
    ObjectsConverter.prototype._setNormals = function (normals, face, k) {
        var nIdx = face.normalIndices.getChild(k);
        if (this._hasNormalDataFromFile(nIdx)) {
            this._setNormalsFromFileData(normals, nIdx);
        }
        else {
            this._setNormalsFromFaceNormal(normals, face, k);
        }
    };
    ObjectsConverter.prototype._hasNormalDataFromFile = function (nIdx) {
        return nIdx >= 0;
    };
    ObjectsConverter.prototype._setNormalsFromFileData = function (normals, nIdx) {
        _setThreeComponentData(this._normals, normals, nIdx);
    };
    ObjectsConverter.prototype._setNormalsFromFaceNormal = function (normals, face, k) {
        var data = null;
        face.computeNormal(this._vertices);
        data = _getThreeComponentData(face.normals, Math.floor(k / 3));
        normals.addChild(data.x);
        normals.addChild(data.y);
        normals.addChild(data.z);
    };
    return ObjectsConverter;
})();
