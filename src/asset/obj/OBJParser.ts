/// <reference path="../../definitions.d.ts"/>
module dy {
    export class OBJParser {
        public static create() {
            var obj = new this();

            return obj;
        }

        public objects:dyCb.Collection<ObjectModel> = dyCb.Collection.create<ObjectModel>();
        public mtlFilePath:string = null;

        private _vertices:dyCb.Collection<Vector3> = dyCb.Collection.create<Vector3>();
        private _normals:dyCb.Collection<Vector3> = dyCb.Collection.create<Vector3>();
        private _texCoords:dyCb.Collection<Vector2> = dyCb.Collection.create<Vector2>();
        private _currentObject:ObjectModel = null;
        private _isFirstMaterial:boolean = false;


        public parse(fileContent:string) {
            var lines = fileContent.split('\n');  // Break up into lines and store them as array

            this._parseFromObj(lines)._parseFromFaces();

        }

        private _parseFromObj(lines:Array<string>) {
            // v float float float

            //todo upper case
            //todo handle x,y,z,w case?
            var vertex_pattern = /v( +[\d|\.|\+|\-|e]+)( +[\d|\.|\+|\-|e]+)( +[\d|\.|\+|\-|e]+)/;

            // vn float float float

            var normal_pattern = /vn( +[\d|\.|\+|\-|e]+)( +[\d|\.|\+|\-|e]+)( +[\d|\.|\+|\-|e]+)/;

            // vt float float

            var uv_pattern = /vt( +[\d|\.|\+|\-|e]+)( +[\d|\.|\+|\-|e]+)/;

            // f vertex vertex vertex ...

            var face_pattern1 = /f( +\d+)( +\d+)( +\d+)( +\d+)?/;

            // f vertex/uv vertex/uv vertex/uv ...

            var face_pattern2 = /f( +(\d+)\/(\d+))( +(\d+)\/(\d+))( +(\d+)\/(\d+))( +(\d+)\/(\d+))?/;

            // f vertex/uv/normal vertex/uv/normal vertex/uv/normal ...

            var face_pattern3 = /f( +(\d+)\/(\d+)\/(\d+))( +(\d+)\/(\d+)\/(\d+))( +(\d+)\/(\d+)\/(\d+))( +(\d+)\/(\d+)\/(\d+))?/;

            // f vertex//normal vertex//normal vertex//normal ...

            var face_pattern4 = /f( +(\d+)\/\/(\d+))( +(\d+)\/\/(\d+))( +(\d+)\/\/(\d+))( +(\d+)\/\/(\d+))?/;

            //var comment_pattern = /# /;

            var obj_pattern = /^o /;
            var group_pattern = /^g /;

            var usemtl_pattern = /^usemtl /;
            var mtllib_pattern = /^mtllib /;
            var smooth_pattern = /^s /;


            var result = null;

            //for (var [line, i] of lines) {
                lines.forEach((line, i) => {
                line = line.trim();

                if (line.length === 0 || line.charAt(0) === '#') {

                    //continue;
                    return;

                } else if (( result = vertex_pattern.exec(line) ) !== null) {

                    // ["v 1.0 2.0 3.0", "1.0", "2.0", "3.0"]

                    this._vertices.addChild(
                        Vector3.create(
                            parseFloat(result[1]),
                            parseFloat(result[2]),
                            parseFloat(result[3])
                        )
                    );

                } else if (( result = normal_pattern.exec(line) ) !== null) {

                    // ["vn 1.0 2.0 3.0", "1.0", "2.0", "3.0"]

                    this._normals.addChild(
                        Vector3.create(
                            parseFloat(result[1]),
                            parseFloat(result[2]),
                            parseFloat(result[3])
                        )
                    );

                } else if (( result = uv_pattern.exec(line) ) !== null) {

                    // ["vt 0.1 0.2", "0.1", "0.2"]

                    this._texCoords.addChild(
                        Vector2.create(
                            parseFloat(result[1]),
                            parseFloat(result[2])
                        )
                    );

                } else if (( result = face_pattern1.exec(line) ) !== null) {

                    // ["f 1 2 3", "1", "2", "3", undefined]

                    result = result[1].trim();
                    var face = result.split(" "); // ["1", "2", "3"]

                    //Set the data for this face
                    this._setDataForCurrentFaceWithPattern1(face, 1);

                    //Define a mesh or an object
                    //Each time this keyword is analysed, create a new Object with all data for creating a babylonMesh

                } else if (( result = face_pattern2.exec(line) ) !== null) {

                    // ["f 1/1 2/2 3/3", " 1/1", "1", "1", " 2/2", "2", "2", " 3/3", "3", "3", undefined, undefined, undefined]

                    result = result[1].trim();
                    var face = result.split(" "); // ["1", "2", "3"]

                    //Set the data for this face
                    this._setDataForCurrentFaceWithPattern2(face, 1);

                } else if (( result = face_pattern3.exec(line) ) !== null) {

                    // ["f 1/1/1 2/2/2 3/3/3", " 1/1/1", "1", "1", "1", " 2/2/2", "2", "2", "2", " 3/3/3", "3", "3", "3", undefined, undefined, undefined, undefined]

                    result = result[1].trim();
                    var face = result.split(" "); // ["1", "2", "3"]

                    //Set the data for this face
                    this._setDataForCurrentFaceWithPattern3(face, 1);

                } else if (( result = face_pattern4.exec(line) ) !== null) {

                    // ["f 1//1 2//2 3//3", " 1//1", "1", "1", " 2//2", "2", "2", " 3//3", "3", "3", undefined, undefined, undefined]

                    result = result[1].trim();
                    var face = result.split(" "); // ["1", "2", "3"]

                    //Set the data for this face
                    this._setDataForCurrentFaceWithPattern4(face, 1);

                } else if (group_pattern.test(line) || obj_pattern.test(line)) {
                    this._currentObject = ObjectModel.create();
                    this._currentObject.name = line.substring(2).trim();

                    this.objects.addChild(this._currentObject);

                    this._isFirstMaterial = true;


                } else if (usemtl_pattern.test(line)) {
                    var materialName = line.substring(7).trim();
                    if(this._isFirstMaterial){
                        this._currentObject.materialName = materialName;

                        this._isFirstMaterial = false;
                    }
                    else{
                        this._currentObject = ObjectModel.create();
                        this._currentObject.materialName = materialName;
                        this.objects.addChild(this._currentObject);
                    }

                } else if (mtllib_pattern.test(line)) {
                    this.mtlFilePath = line.substring(7).trim();

                } else if (smooth_pattern.test(line)) {
                    //todo implement it

                } else {
                    Log.log(`Unhandled expression at line : ${i}\nvalue:${line}`);
                }
            });

            return this;
        }

        private _parseFromFaces() {
            //todo check repeat(refer to babylon.objFileLoader.ts->setData-> judge isInArray)?

            var index_indices = 0,
                self = this;

            this.objects.forEach((object:ObjectModel) => {
                var indices = object.indices,
                    vertices = object.vertices,
                    normals = object.normals,
                    texCoords = object.texCoords;

                object.faces.forEach((face:FaceModel) => {
                    //todo add setting color?
                    //var color = this.findColor(face.materialName);

                    var faceNormal = face.normal;

                    face.verticeIndices.forEach((vIdx:number, k:number) => {
                            // Set index
                            indices[index_indices] = index_indices;
                            // Copy vertex
                            var vertex = self._vertices.getChild(vIdx);
                            //vertices[index_indices * 3 + 0] = vertex.x;
                            //vertices[index_indices * 3 + 1] = vertex.y;
                            //vertices[index_indices * 3 + 2] = vertex.z;
                        vertices.addChild(vertex);
                            //// Copy color
                            //colors[index_indices * 4 + 0] = color.r;
                            //colors[index_indices * 4 + 1] = color.g;
                            //colors[index_indices * 4 + 2] = color.b;
                            //colors[index_indices * 4 + 3] = color.a;

                        //copy texCoords
                        var tIdx = face.texCoordIndices.getChild(k);

                        texCoords.addChild(self._texCoords.getChild(tIdx));

                            // Copy normal
                            var nIdx = face.normalIndices.getChild(k);
                            if (nIdx && nIdx >= 0) {
                                var normal = self._normals.getChild(nIdx);
                                //normals[index_indices * 3 + 0] = normal.x;
                                //normals[index_indices * 3 + 1] = normal.y;
                                //normals[index_indices * 3 + 2] = normal.z;
                                normals.addChild(normal);
                            }
                            else {
                                //normals[index_indices * 3 + 0] = faceNormal.x;
                                //normals[index_indices * 3 + 1] = faceNormal.y;
                                //normals[index_indices * 3 + 2] = faceNormal.z;
                                normals.addChild(faceNormal);
                            }

                            index_indices++;
                        });
                });
            });

            return this;
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
        private _getTriangles(face:Array<string>, v:number, triangles:Array<string>) {
            //Work for each element of the array
            if (v + 1 < face.length) {
                //Add on the triangle variable the indexes to obtain triangles
                triangles.push(face[0], face[v], face[v + 1]);
                //Incrementation for recursion
                v++;
                //Recursion
                this._getTriangles(face, v, triangles);
            }

            //Result obtained after 2 iterations:
            //Pattern1 => triangle = ["1","2","3","1","3","4"];
            //Pattern2 => triangle = ["1/1","2/2","3/3","1/1","3/3","4/4"];
            //Pattern3 => triangle = ["1/1/1","2/2/2","3/3/3","1/1/1","3/3/3","4/4/4"];
            //Pattern4 => triangle = ["1//1","2//2","3//3","1//1","3//3","4//4"];
        }

        /**
         * Create triangles and push the data for each polygon for the pattern 1
         * In this pattern we get vertice positions
         * @param face
         * @param v
         */
        private _setDataForCurrentFaceWithPattern1(face:Array<string>, v:number) {
            var triangles = [],
                faceModel:FaceModel = FaceModel.create();

            //Get the indices of triangles for each polygon
            this._getTriangles(face, v, triangles);
            //For each element in the triangles array.
            //This var could contains 1 to an infinity of triangles
            for (var k of triangles) {
                faceModel.verticeIndices.addChild(parseInt(k) - 1);

                faceModel.computeNormal(this._vertices);
            }

            this._currentObject.addFace(faceModel);
            //Reset variable for the next line
            //triangles = [];
        }

        /**
         * Create triangles and push the data for each polygon for the pattern 1
         * In this pattern we get vertice positions
         * @param face
         * @param v
         */
        private _setDataForCurrentFaceWithPattern2(face:Array<string>, v:number) {
            var triangles = [],
                faceModel:FaceModel = FaceModel.create();

            //Get the indices of triangles for each polygon
            this._getTriangles(face, v, triangles);
            //For each element in the triangles array.
            //This var could contains 1 to an infinity of triangles
            for (var k of triangles) {
                //triangle[k] = "1/1"
                //Split the data for getting position and uv
                var point = k.split("/"); // ["1", "1"]


                faceModel.verticeIndices.addChild(parseInt(point[0]) - 1);
                faceModel.texCoordIndices.addChild(parseInt(point[1]) - 1);

                faceModel.computeNormal(this._vertices);
            }

            this._currentObject.addFace(faceModel);
        }

        private _setDataForCurrentFaceWithPattern3(face:Array<string>, v:number) {
            var triangles = [],
                faceModel:FaceModel = FaceModel.create();

            //Get the indices of triangles for each polygon
            this._getTriangles(face, v, triangles);
            //For each element in the triangles array.
            //This var could contains 1 to an infinity of triangles
            for (var k of triangles) {
                //triangle[k] = "1/1/1"
                //Split the data for getting position and uv
                var point = k.split("/"); // ["1", "1"]


                faceModel.verticeIndices.addChild(parseInt(point[0]) - 1);
                faceModel.texCoordIndices.addChild(parseInt(point[1]) - 1);
                faceModel.normalIndices.addChild(parseInt(point[2]) - 1);

                //faceModel.computeNormal(this._vertices);
            }

            this._currentObject.addFace(faceModel);
        }


        //todo refactor other ones
        @In(function () {
            assert(this._currentObject, Log.info.FUNC_SHOULD("currentObject", "exist"));
        })
        private _setDataForCurrentFaceWithPattern4(face:Array<string>, v:number) {
            var triangles = [],
                faceModel:FaceModel = FaceModel.create();

            //Get the indices of triangles for each polygon
            this._getTriangles(face, v, triangles);
            //For each element in the triangles array.
            //This var could contains 1 to an infinity of triangles
            for (var k of triangles) {
                //triangle[k] = "1//1"
                //Split the data for getting position and uv
                var point = k.split("/"); // ["1", "1"]


                faceModel.verticeIndices.addChild(parseInt(point[0]) - 1);
                faceModel.normalIndices.addChild(parseInt(point[1]) - 1);

                //faceModel.computeNormal(this._vertices);
            }

            this._currentObject.addFace(faceModel);
        }
    }

    export class ObjectModel {
        public static create() {
            var obj = new this();

            return obj;
        }

        //todo add colors data?

        public vertices:dyCb.Collection<Vector3> = dyCb.Collection.create<Vector3>();
        public normals:dyCb.Collection<Vector3> = dyCb.Collection.create<Vector3>();
        public texCoords:dyCb.Collection<Vector2> = dyCb.Collection.create<Vector2>();
        public indices:dyCb.Collection<Vector3> = dyCb.Collection.create<Vector3>();
        public materialName:string = null;
        public name:string = null;
        public faces:dyCb.Collection<FaceModel> = dyCb.Collection.create<FaceModel>();
        public indicesCount:number = 0;

        public addFace(face:FaceModel) {
            this.faces.addChild(face);

            this.indicesCount += face.indicesCount;
        }
    }

    //export type FaceModel = {
    //    verticeIndices:dyCb.Collection<number>;
    //    normalIndices:dyCb.Collection<number>;
    //    texCoordIndices:dyCb.Collection<number>;
    //}

    //todo use Array instead of Collection, to reduce memory size
    export class FaceModel {
        public static create() {
            var obj = new this();

            return obj;
        }


        //private _normalIndices:dyCb.Collection<number> = dyCb.Collection.create<number>();
        //get normalIndices(){
        //    if(this._normalIndices.getCount() === 0){
        //        return
        //    }
        //
        //    return this._normalIndices;
        //}
        //set normalIndices(normalIndices:dyCb.Collection<number>){
        //    this._normalIndices = normalIndices;
        //}

        get indicesCount() {
            return this.verticeIndices.getCount();
        }

        public verticeIndices:dyCb.Collection<number> = dyCb.Collection.create<number>();
        public normalIndices:dyCb.Collection<number> = dyCb.Collection.create<number>();
        public texCoordIndices:dyCb.Collection<number> = dyCb.Collection.create<number>();
        public normal:Vector3 = null;

        @In(function () {
            assert(this.verticeIndices.getCount() >= 3);
        })
        public computeNormal(vertices:dyCb.Collection<Vector3>) {
            var count = this.verticeIndices.getCount();

            var compute = (startIndex:number) => {
                var p0 = vertices.getChild(this.verticeIndices.getChild(startIndex));
                var p1 = vertices.getChild(this.verticeIndices.getChild(startIndex + 1));
                var p2 = vertices.getChild(this.verticeIndices.getChild(startIndex + 2));

                var v0 = Vector3.create().sub2(p0, p1),
                    v1 = Vector3.create().sub2(p2, p1),
                    result = null;

                result = Vector3.create().cross(v0, v1).normalize();

                if (result.isZero()) {
                    if (count <= startIndex + 6) {
                        return Vector3.create(0, 1, 0);
                    }

                    return compute(startIndex + 3);
                }

                return result;
            };

            this.normal = compute(0);
        }
    }
}

