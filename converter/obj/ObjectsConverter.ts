/// <reference path="../../node_modules/wdcb/dist/wdCb.node.d.ts"/>
import wdCb = require("wdcb");
import Log = require("../common/Log");
import Vector2 = require("../common/Vector2");
import Vector3 = require("../common/Vector3");
import ModelLoaderUtils = require("../common/ModelLoaderUtils");

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


export = class ObjectsConverter {
    public static create() {
        var obj = new this();

        return obj;
    }

    public objects:wdCb.Collection<ObjectModel> = wdCb.Collection.create<ObjectModel>();
    public mtlFilePath:string = null;
    public materialName:string = null;
    public name:string = null;

    private _vertices:Array<number> = [];
    private _normals:Array<number> = [];
    private _texCoords:Array<number> = [];
    private _currentObject:ObjectModel = null;
    private _currentObjectName:string = null;

    public convert(fileContent:string, filePath:string) {
        var lines = fileContent.split('\n'),
            topObject:any = {children:[]},
            result = [];

        this._convertFromObj(lines);

        this.objects.forEach((objectModel:ObjectModel) => {
            var object:any = {};

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

                this._vertices.push(
                        parseFloat(result[1]),
                        parseFloat(result[2]),
                        parseFloat(result[3])
                );
            }
            else if (( result = NORMAL_PATTERN.exec(line) ) !== null) {
                // ["vn 1.0 2.0 3.0", "1.0", "2.0", "3.0"]

                this._normals.push(
                        parseFloat(result[1]),
                        parseFloat(result[2]),
                        parseFloat(result[3])
                );
            }
            else if (( result = UV_PATTERN.exec(line) ) !== null) {
                // ["vt 0.1 0.2", "0.1", "0.2"]

                this._texCoords.push(
                        parseFloat(result[1]),
                        parseFloat(result[2])
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
            }
            else if (SMOOTH_PATTERN.test(line)) {
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
            verticeIndices = null,
            normalIndices = null,
            uvIndices = null;

        if (!this._currentObject || face.length < 3) {
            return;
        }


        verticeIndices = this._currentObject.verticeIndices;
        normalIndices = this._currentObject.normalIndices;
        uvIndices = this._currentObject.uvIndices;

        this._getTriangles(face, triangles);

        if (( result = FACE_PATTERN1.exec(line) ) !== null) {
            for (k of triangles) {
                verticeIndices.push(parseInt(k) - 1);
            }
        }
        else if (( result = FACE_PATTERN2.exec(line) ) !== null) {
            for (k of triangles) {
                let point = k.split("/");

                verticeIndices.push(parseInt(point[0]) - 1);
                uvIndices.push(parseInt(point[1]) - 1);
            }
        }
        else if (( result = FACE_PATTERN3.exec(line) ) !== null) {
            for (k of triangles) {
                let point = k.split("/");

                verticeIndices.push(parseInt(point[0]) - 1);
                uvIndices.push(parseInt(point[1]) - 1);
                normalIndices.push(parseInt(point[2]) - 1);
            }
        }
        else if (( result = FACE_PATTERN4.exec(line) ) !== null) {
            for (k of triangles) {
                let point = k.split("//");

                verticeIndices.push(parseInt(point[0]) - 1);
                normalIndices.push(parseInt(point[1]) - 1);
            }
        }
        else {
            Log.error(true, Log.info.FUNC_UNKNOW(lineResult));
        }
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
            if (v + 1 < face.length) {
                triangles.push(face[0], face[v], face[v + 1]);
                v++;

                getTriangles(v);
            }
        };

        getTriangles(1);
    }
}

class ObjectModel {
    public static create() {
        var obj = new this();

        return obj;
    }

    //todo add colors data?

    public vertices:Array<number> = [];
    public normals:Array<number> = [];
    public texCoords:Array<number> = [];
    public verticeIndices:Array<number> = [];
    public normalIndices:Array<number> = [];
    public uvIndices:Array<number> = [];
    public materialName:string = null;
    public name:string = null;
    public indicesCount:number = 0;
}
