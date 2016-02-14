module wd{
    export class GLTFGeometryParser{
        public static create() {
            var obj = new this();

            return obj;
        }

        private _arrayBufferMap:wdCb.Hash<any> = null;
        private _imageMap:wdCb.Hash<HTMLImageElement> = null;
        private _json:IGLTFJsonData = null;
        private _materialParser = GLTFMaterialParser.create();

        public parse(json:IGLTFJsonData, object:IGLTFObjectData, mesh:IGLTFMesh, arrayBufferMap:wdCb.Hash<any>, imageMap:wdCb.Hash<HTMLImageElement>):void{
            this._json = json;
            this._arrayBufferMap = arrayBufferMap;
            this._imageMap = imageMap;

            /*!
            if mesh->primitives has multi ones, they should as the children of the node(one primitive as one child)
             */

            if(mesh.primitives.length > 1){
                for(let primitive of mesh.primitives){
                    let childObject:IGLTFObjectData = GLTFUtils.createObjectData();

                    this._setChildObjectNameWithMultiPrimitives(childObject, primitive);

                    childObject.components.addChild(this._parseGeometry(primitive));

                    object.children.addChild(childObject);
                }

                object.isContainer = true;
            }
            else if(mesh.primitives.length === 1){
                object.components.addChild(this._parseGeometry(mesh.primitives[0]));
            }
            else{
            }
        }

        private _setChildObjectNameWithMultiPrimitives(object:IGLTFObjectData, primitive:IGLTFMeshPrimitive){
            object.name = primitive.material;
        }

        private _parseGeometry( primitive:IGLTFMeshPrimitive):IGLTFGeometry{
            var json:IGLTFJsonData = this._json,
                arrayBufferMap = this._arrayBufferMap,
                accessor:IGLTFAccessor = null,
                bufferArr:any = null,
                geometry:IGLTFGeometry = <any>{},
                vertices:Array<number> = null,
                texCoords:Array<number> = null,
                colors:Array<number> = null,
                normals:Array<number> = null,
                faces:Array<Face3> = null;


            //todo read accessor->byteStride for batch draw calls

            for(let semantic in primitive.attributes){
                if(primitive.attributes.hasOwnProperty(semantic)){
                    let attribute = primitive.attributes[semantic];

                    accessor = json.accessors[attribute];
                    bufferArr = GLTFUtils.getBufferArrFromAccessor(json, accessor, arrayBufferMap);

                    if(semantic === "POSITION"){
                        vertices = [];

                        this._addGeometryData(vertices, bufferArr);
                    }
                    else if(semantic.indexOf("TEXCOORD_") > -1){
                        texCoords = [];

                        this._addGeometryData(texCoords, bufferArr);

                        this._normalizeTexCoords(texCoords);
                    }
                    else if(semantic === "NORMAL"){
                        normals = [];

                        for(let data of bufferArr){
                            normals.push(data);
                        }
                    }
                    else if(semantic === "COLOR"){
                        colors = [];

                        this._addGeometryData(colors, bufferArr);
                    }
                    //todo support JOINT, WEIGHT
                }
            }


            faces = this._getFaces(json, primitive.indices, normals);


            GLTFUtils.addData(geometry, "vertices", vertices);
            GLTFUtils.addData(geometry, "colors", colors);
            GLTFUtils.addData(geometry, "texCoords", texCoords);
            GLTFUtils.addData(geometry, "faces", faces);

            GLTFUtils.addData(geometry, "drawMode", this._parseDrawMode(primitive.mode));

            geometry.material = this._materialParser.parse(json, primitive.material, this._imageMap);

            return geometry;
        }

        private _addGeometryData(geometryData:Array<number>, sourceData:Array<number>){
            for(let i = 0, len = sourceData.length; i < len; i++){
                geometryData.push(sourceData[i]);
            }
        }

        @require(function(json:IGLTFJsonData, indices:string, normals:Array<number>){
            var accessor:IGLTFAccessor = null,
                bufferArr:any = null;

            if(!indices){
                return [];
            }

            accessor = json.accessors[indices];

            bufferArr = GLTFUtils.getBufferArrFromAccessor(json, accessor, this._arrayBufferMap);

            assert(bufferArr.length % 3 === 0, Log.info.FUNC_SHOULD("indices' count", "3 times"));
        })
        private _getFaces(json:IGLTFJsonData, indices:string, normals:Array<number>){
            var accessor:IGLTFAccessor = null,
                bufferArr:any = null,
                face:Face3 = null,
                faces:Array<Face3> = [];

            if(!indices){
                return [];
            }

            accessor = json.accessors[indices];

            bufferArr = GLTFUtils.getBufferArrFromAccessor(json, accessor, this._arrayBufferMap);

            for (let i = 0, len = bufferArr.length; i < len; i += 3) {
                let aIndex = bufferArr[i],
                    bIndex = bufferArr[i + 1],
                    cIndex = bufferArr[i + 2],
                    verticeIndiceArr = [aIndex, bIndex, cIndex];

                face = Face3.create(aIndex, bIndex, cIndex);

                if (GeometryUtils.hasData(normals)) {
                    this._addNormalData(face.vertexNormals, normals, verticeIndiceArr);
                }

                faces.push(face);
            }

            return faces;
        }

        private _addNormalData(targetNormals:wdCb.Collection<Vector3>, sourceNormals:Array<number>, normalIndiceArr:Array<number>) {
            let [aIndex, bIndex, cIndex] = normalIndiceArr;

            targetNormals.addChildren(
                [
                    this._getThreeComponentData(sourceNormals, aIndex),
                    this._getThreeComponentData(sourceNormals, bIndex),
                    this._getThreeComponentData(sourceNormals, cIndex)
                ]
            );
        }

        private _getThreeComponentData(sourceData:Array<number>, index:number) {
            var startIndex = 3 * index;

            return Vector3.create(
                sourceData[startIndex],
                sourceData[startIndex + 1],
                sourceData[startIndex + 2]
            );
        }

        private _parseDrawMode(mode:number){
            var drawMode:DrawMode = null;

            if(!mode){
                return null;
            }

            switch(mode){
                case 0:
                    drawMode = DrawMode.POINTS;
                    break;
                case 1:
                    drawMode = DrawMode.LINES;
                    break;
                case 2:
                    drawMode = DrawMode.LINE_LOOP;
                    break;
                case 3:
                    drawMode = DrawMode.LINE_STRIP;
                    break;
                case 4:
                    drawMode = DrawMode.TRIANGLES;
                    break;
                case 5:
                    drawMode = DrawMode.TRIANGLE_STRIP;
                    break;
                case 6:
                    drawMode = DrawMode.TRANGLE_FAN;
                    break;
                default:
                    Log.error(true, Log.info.FUNC_UNEXPECT(`mode:${mode}`));
                    break;
            }

            return drawMode;
        }

        private _normalizeTexCoords(texCoords:Array<number>){
            if (!texCoords) {
                return;
            }

            for (let i = 0, len = texCoords.length / 2; i < len; i++) {
                texCoords[i * 2 + 1] = 1.0 - texCoords[i * 2 + 1];
            }
        }
    }
}

