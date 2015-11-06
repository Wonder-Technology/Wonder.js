/// <reference path="../../node_modules/dycb/dist/dyCb.node.d.ts"/>
import dyCb = require("dycb");
import Log = require("../common/Log");
import Vector2 = require("../common/Vector2");
import Vector3 = require("../common/Vector3");

//todo handle x,y,z,w case?
const VERTEX_PATTERN = /v\s([\d|\.|\+|\-|e]+)( +[\d|\.|\+|\-|e]+)( +[\d|\.|\+|\-|e]+)/,
// vn float float float
    NORMAL_PATTERN = /vn\s([\d|\.|\+|\-|e]+)( +[\d|\.|\+|\-|e]+)( +[\d|\.|\+|\-|e]+)/,
// vt float float
    UV_PATTERN = /vt\s([\d|\.|\+|\-|e]+)( +[\d|\.|\+|\-|e]+)/,
    FACE_PATTERN = /f\s(.+)/,
// f vertex vertex vertex ...
    FACE_PATTERN1 = /f\s(([\d]{1,}[\s]+){2,}([\d]{1,}[\s]?))+/,
// f vertex/uv vertex/uv vertex/uv ...
    FACE_PATTERN2 = /f\s((([\d]{1,}\/[\d]{1,}[\s]+){2,}([\d]{1,}\/[\d]{1,}[\s]?))+)/,
// f vertex/uv/normal vertex/uv/normal vertex/uv/normal ...
    FACE_PATTERN3 = /f\s((([\d]{1,}\/[\d]{1,}\/[\d]{1,}[\s]+){2,}([\d]{1,}\/[\d]{1,}\/[\d]{1,}[\s]?))+)/,
// f vertex//normal vertex//normal vertex//normal ...
    FACE_PATTERN4 = /f\s((([\d]{1,}\/\/[\d]{1,}[\s]+){2,}([\d]{1,}\/\/[\d]{1,}[\s]?))+)/,
//var comment_pattern = /# /;
    OBJ_PATTERN = /^o /,
    GROUP_PATTERN = /^g /,
    USEMTL_PATTERN = /^usemtl /,
    MTLLIB_PATTERN = /^mtllib /,
    SMOOTH_PATTERN = /^s /;


var _setTwoComponentData = (sourceData:dyCb.Collection<number>, targetData:dyCb.Collection<number>, index:number) => {
    var data = _getTwoComponentData(sourceData, index);

    targetData.addChild(data.x);
    targetData.addChild(data.y);
}

var _getTwoComponentData = (sourceData:dyCb.Collection<number>, index:number) => {
    var startIndex = 2 * index;

    return Vector2.create(
        sourceData.getChild(startIndex),
        sourceData.getChild(startIndex + 1)
    );
}

var _setThreeComponentData = (sourceData:dyCb.Collection<number>, targetData:dyCb.Collection<number>, index:number) => {
    var data = _getThreeComponentData(sourceData, index);

    targetData.addChild(data.x);
    targetData.addChild(data.y);
    targetData.addChild(data.z);
}

var _getThreeComponentData = (sourceData:dyCb.Collection<number>, index:number) => {
    var startIndex = 3 * index;

    return Vector3.create(
        sourceData.getChild(startIndex),
        sourceData.getChild(startIndex + 1),
        sourceData.getChild(startIndex + 2)
    );
}

export = class ObjectsConverter {
    public static create() {
        var obj = new this();

        return obj;
    }

    public objects:dyCb.Collection<ObjectModel> = dyCb.Collection.create<ObjectModel>();
    public mtlFilePath:string = null;

    private _vertices:dyCb.Collection<number> = dyCb.Collection.create<number>();
    private _normals:dyCb.Collection<number> = dyCb.Collection.create<number>();
    private _texCoords:dyCb.Collection<number> = dyCb.Collection.create<number>();
    private _currentObject:ObjectModel = null;
    private _currentObjectName:string = null;


    public vertices:dyCb.Collection<number> = dyCb.Collection.create<number>();
    public normals:dyCb.Collection<number> = dyCb.Collection.create<number>();
    public texCoords:dyCb.Collection<number> = dyCb.Collection.create<number>();
    public indices:dyCb.Collection<number> = dyCb.Collection.create<number>();
    public materialName:string = null;
    public name:string = null;
    public faces:dyCb.Collection<FaceModel> = dyCb.Collection.create<FaceModel>();
    public indicesCount:number = 0;

    //todo remove objects?
    public convert(fileContent:string, filePath:string) {
        var lines = fileContent.split('\n'),
            topObject = {name:null, children:[]},
            result = [];

        this._convertFromObj(lines);
        this._convertFromFaces();

        this.objects.forEach((objectModel:ObjectModel) => {
            var object:any = {};

            object.name = objectModel.name;
            object.material = objectModel.materialName;

            object.vertices = objectModel.vertices.toArray();
            object.normals = objectModel.normals.toArray();
            object.uvs = objectModel.texCoords.toArray();
            object.indices = objectModel.indices.toArray();

            object.colors = [];
            object.morphTargets = [];

            //topObject.children[objectModel.name] = object;
            topObject.children.push(object);
        });

        topObject.name = dyCb.PathUtils.basename(filePath, dyCb.PathUtils.extname(filePath));

        result.push(topObject);

        return result;
    }

    private _convertFromObj(lines:Array<string>) {
        lines.forEach((line:string, i:number) => {
            var result = null;

            line = line.trim();

            if (line.length === 0 || line.charAt(0) === '#') {
                return;
            }
            else if (( result = VERTEX_PATTERN.exec(line) ) !== null) {
                // ["v 1.0 2.0 3.0", "1.0", "2.0", "3.0"]

                this._vertices.addChildren(
                    [
                        parseFloat(result[1]),
                        parseFloat(result[2]),
                        parseFloat(result[3])
                    ]
                );
            }
            else if (( result = NORMAL_PATTERN.exec(line) ) !== null) {
                // ["vn 1.0 2.0 3.0", "1.0", "2.0", "3.0"]

                this._normals.addChildren(
                    [
                        parseFloat(result[1]),
                        parseFloat(result[2]),
                        parseFloat(result[3])
                    ]
                );
            }
            else if (( result = UV_PATTERN.exec(line) ) !== null) {
                // ["vt 0.1 0.2", "0.1", "0.2"]

                this._texCoords.addChildren(
                    [
                        parseFloat(result[1]),
                        parseFloat(result[2])
                    ]
                );
            }
            else if ((result = FACE_PATTERN.exec(line)) !== null) {
                this._convertFace(result);
            }
            else if (GROUP_PATTERN.test(line) || OBJ_PATTERN.test(line)) {
                this._currentObjectName = line.substring(2).trim();
            }
            else if (USEMTL_PATTERN.test(line)) {
                this._convertUsemtl(line);
            }
            else if (MTLLIB_PATTERN.test(line)) {
                this.mtlFilePath = line.substring(7).trim();
            } else if (SMOOTH_PATTERN.test(line)) {
                //todo support
            }
            else {
                Log.log(`Unhandled expression at line : ${i}\nvalue:${line}`);
            }
        });
    }

    private _convertUsemtl(line) {
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
    }

    private _convertFace(lineResult:string) {
        var face = lineResult[1].trim().split(" "),
            line = lineResult[0],
            triangles = [],
            result = null,
            k = null,
            faceModel:FaceModel = FaceModel.create();

        if (!this._currentObject || face.length < 3) {
            return;
        }

        this._getTriangles(face, triangles);

        if (( result = FACE_PATTERN1.exec(line) ) !== null) {
            for (k of triangles) {
                faceModel.verticeIndices.addChild(parseInt(k) - 1);
            }
        }
        else if (( result = FACE_PATTERN2.exec(line) ) !== null) {
            for (k of triangles) {
                //triangle[k] = "1/1"
                let point = k.split("/"); // ["1", "1"]

                faceModel.verticeIndices.addChild(parseInt(point[0]) - 1);
                faceModel.texCoordIndices.addChild(parseInt(point[1]) - 1);
            }
        }
        else if (( result = FACE_PATTERN3.exec(line) ) !== null) {
            for (k of triangles) {
                //triangle[k] = "1/1/1"
                let point = k.split("/"); // ["1", "1"]

                faceModel.verticeIndices.addChild(parseInt(point[0]) - 1);
                faceModel.texCoordIndices.addChild(parseInt(point[1]) - 1);
                faceModel.normalIndices.addChild(parseInt(point[2]) - 1);
            }
        }
        else if (( result = FACE_PATTERN4.exec(line) ) !== null) {
            for (k of triangles) {
                //triangle[k] = "1//1"
                let point = k.split("//"); // ["1", "1"]

                faceModel.verticeIndices.addChild(parseInt(point[0]) - 1);
                faceModel.normalIndices.addChild(parseInt(point[1]) - 1);
            }
        }
        else {
            Log.error(true, Log.info.FUNC_UNKNOW(lineResult));
        }

        this._currentObject.addFace(faceModel);
    }

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
    private _getTriangles(face:Array<string>, triangles:Array<string>) {
        var getTriangles = (v:number) => {
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
    }

    //todo check repeat(refer to babylon.objFileLoader.ts->setData-> judge isInArray)?
    private _convertFromFaces() {
        var self = this;

        this.objects.forEach((object:ObjectModel) => {
            var indices = object.indices,
                vertices = object.vertices,
                normals = object.normals,
                texCoords = object.texCoords,
                index_indices = 0;

            object.faces.forEach((face:FaceModel) => {
                //todo add setting color?
                //var color = this.findColor(face.materialName);

                face.verticeIndices.forEach((vIdx:number, k:number) => {
                    self._setIndices(indices, index_indices);
                    self._setVertices(vertices, vIdx);
                    self._setTexCoords(texCoords, face, k);
                    self._setNormals(normals, face, k);

                    index_indices++;
                });
            });
        });
    }

    private _setIndices(indices, index_indices) {
        indices.addChild(index_indices);
    }

    private _setVertices(vertices, vIdx) {
        _setThreeComponentData(this._vertices, vertices, vIdx)
    }

    private _setTexCoords(texCoords, face, k) {
        if (face.texCoordIndices.getCount() > 0) {
            let tIdx = null,
                data = null;

            tIdx = face.texCoordIndices.getChild(k);
            //texCoords.addChild(this._texCoords.getChild(tIdx));

            _setTwoComponentData(this._texCoords, texCoords, tIdx);
        }
    }

    private _setNormals(normals, face, k) {
        var nIdx = face.normalIndices.getChild(k);

        if (this._hasNormalDataFromFile(nIdx)) {
            this._setNormalsFromFileData(normals, nIdx);
        }
        else {
            this._setNormalsFromFaceNormal(normals, face, k);
        }
    }

    private _hasNormalDataFromFile(nIdx) {
        return nIdx >= 0;
    }

    private _setNormalsFromFileData(normals, nIdx) {
        _setThreeComponentData(this._normals, normals, nIdx);
    }

    private _setNormalsFromFaceNormal(normals, face, k) {
        var data = null;

        face.computeNormal(this._vertices);

        data = _getThreeComponentData(face.normals, Math.floor(k / 3));

        normals.addChild(data.x);
        normals.addChild(data.y);
        normals.addChild(data.z);
    }
}

class ObjectModel {
    public static create() {
        var obj = new this();

        return obj;
    }

    //todo add colors data?

    public vertices:dyCb.Collection<number> = dyCb.Collection.create<number>();
    public normals:dyCb.Collection<number> = dyCb.Collection.create<number>();
    public texCoords:dyCb.Collection<number> = dyCb.Collection.create<number>();
    public indices:dyCb.Collection<number> = dyCb.Collection.create<number>();
    public materialName:string = null;
    public name:string = null;
    public faces:dyCb.Collection<FaceModel> = dyCb.Collection.create<FaceModel>();
    public indicesCount:number = 0;

    public addFace(face:FaceModel) {
        this.faces.addChild(face);

        this.indicesCount += face.indicesCount;
    }
}

//todo use Array instead of Collection, to reduce memory size
class FaceModel {
    public static create() {
        var obj = new this();

        return obj;
    }

    get indicesCount() {
        return this.verticeIndices.getCount();
    }

    public verticeIndices:dyCb.Collection<number> = dyCb.Collection.create<number>();
    public normalIndices:dyCb.Collection<number> = dyCb.Collection.create<number>();
    public texCoordIndices:dyCb.Collection<number> = dyCb.Collection.create<number>();
    public normals:dyCb.Collection<number> = dyCb.Collection.create<number>();

    //todo add contract
    //@In(function () {
    //    assert(this.verticeIndices.getCount() >= 3, `verticesIndices.getCount() should >= 3, but actual is ${this.verticeIndices.getCount()}`);
    //})
    //todo extract Face3
    public computeNormal(vertices:dyCb.Collection<number>) {
        var count = this.verticeIndices.getCount();
        var self = this;

        var compute = (startIndex:number) => {
            var p0 = _getThreeComponentData(vertices, self.verticeIndices.getChild(startIndex)),
                p1 = _getThreeComponentData(vertices, self.verticeIndices.getChild(startIndex + 1)),
                p2 = _getThreeComponentData(vertices, self.verticeIndices.getChild(startIndex + 2)),
                v0 = Vector3.create().sub2(p2, p1),
                v1 = Vector3.create().sub2(p0, p1),
                result = null;

            result = Vector3.create().cross(v0, v1).normalize();

            self.normals.addChild(result.x);
            self.normals.addChild(result.y);
            self.normals.addChild(result.z);

            if (count > startIndex + 3) {
                compute(startIndex + 3);
            }
        };

        compute(0);
    }
}

