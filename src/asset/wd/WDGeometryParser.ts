module wd{
    export class WDGeometryParser{
        public static create() {
            var obj = new this();

            return obj;
        }

        private _arrayBufferMap:wdCb.Hash<any> = null;
        private _imageMap:wdCb.Hash<HTMLImageElement> = null;
        private _json:IWDJsonData = null;
        // private _materialParser = WDMaterialParser.create();

        public parse(json:IWDJsonData, object:IWDObjectData, mesh:IWDMesh, arrayBufferMap:wdCb.Hash<any>, imageMap:wdCb.Hash<HTMLImageElement>):void{
            this._json = json;
            this._arrayBufferMap = arrayBufferMap;
            this._imageMap = imageMap;

            /*!
            if mesh->primitives has multi ones, they should as the children of the node(one primitive as one child)
             */

            if(mesh.primitives.length > 1){
                // todo support
                for(let primitive of mesh.primitives){
                    let childObject:IWDObjectData = WDUtils.createObjectData();

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

        private _setChildObjectNameWithMultiPrimitives(object:IWDObjectData, primitive:IWDMeshPrimitive){
            object.name = primitive.material;
        }

        private _parseGeometry( primitive:IWDMeshPrimitive):IWDGeometry{
            var json:IWDJsonData = this._json,
                arrayBufferMap = this._arrayBufferMap,
                accessor:IWDAccessor = null,
                bufferArr:any = null,
                geometry:IWDGeometry = <any>{},
                vertices:Array<number> = null,
                texCoords:Array<number> = null,
                colors:Array<number> = null,
                normals:Array<number> = null,
                faces:Array<Face3> = null;


            for(let semantic in primitive.attributes){
                if(primitive.attributes.hasOwnProperty(semantic)){
                    let attribute = primitive.attributes[semantic];

                    //todo support binary
                    // accessor = json.accessors[attribute];
                    // bufferArr = WDUtils.getBufferArrFromAccessor(json, accessor, arrayBufferMap);
                    bufferArr = attribute;

                    if(semantic === "POSITION"){
                        vertices = [];

                        this._addGeometryData(vertices, bufferArr);
                    }
                    //todo support multi texCoords
                    // else if(semantic.indexOf("TEXCOORD_") > -1){
                    else if(semantic === "TEXCOORD"){
                        texCoords = [];

                        this._addGeometryData(texCoords, bufferArr);

                        // this._normalizeTexCoords(texCoords);
                    }
                    else if(semantic === "NORMAL"){
                        normals = [];

                        // for(let data of bufferArr){
                        //     normals.push(data);
                        // }
                        this._addGeometryData(normals, bufferArr);
                    }
                    else if(semantic === "COLOR"){
                        colors = [];

                        this._addGeometryData(colors, bufferArr);
                    }
                    //todo support JOINT, WEIGHT
                }
            }

            faces = this._getFaces(json, primitive.indices, normals);

            WDUtils.addData(geometry, "vertices", vertices);
            WDUtils.addData(geometry, "colors", colors);
            WDUtils.addData(geometry, "texCoords", texCoords);
            WDUtils.addData(geometry, "faces", faces);

            // WDUtils.addData(geometry, "drawMode", this._parseDrawMode(primitive.mode));

            // geometry.material = this._materialParser.parse(json, primitive.material, this._imageMap);

            return geometry;
        }

        private _addGeometryData(geometryData:Array<number>, sourceData:Array<number>){
            for(let i = 0, len = sourceData.length; i < len; i++){
                geometryData.push(sourceData[i]);
            }
        }

        @require(function(json:IWDJsonData, indices:string, normals:Array<number>){
            //todo support
            // var accessor:IWDAccessor = null,
            //     bufferArr:any = null;
            //
            // if(!indices){
            //     return [];
            // }
            //
            // accessor = json.accessors[indices];
            //
            // bufferArr = WDUtils.getBufferArrFromAccessor(json, accessor, this._arrayBufferMap);
            //
            // assert(bufferArr.length % 3 === 0, Log.info.FUNC_SHOULD("indices' count", "3 times"));
        })
        // private _getFaces(json:IWDJsonData, indices:string, normals:Array<number>){
        //todo fix
        private _getFaces(json:IWDJsonData, indices:Array<number>, normals:Array<number>){
            var accessor:IWDAccessor = null,
                bufferArr:any = null,
                face:Face3 = null,
                faces:Array<Face3> = [];

            if(!indices){
                return [];
            }

            // accessor = json.accessors[indices];

            //todo fix
            // bufferArr = WDUtils.getBufferArrFromAccessor(json, accessor, this._arrayBufferMap);
            bufferArr = indices;

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
            var drawMode:EDrawMode = null;

            if(!mode){
                return null;
            }

            switch(mode){
                case 0:
                    drawMode = EDrawMode.POINTS;
                    break;
                case 1:
                    drawMode = EDrawMode.LINES;
                    break;
                case 2:
                    drawMode = EDrawMode.LINE_LOOP;
                    break;
                case 3:
                    drawMode = EDrawMode.LINE_STRIP;
                    break;
                case 4:
                    drawMode = EDrawMode.TRIANGLES;
                    break;
                case 5:
                    drawMode = EDrawMode.TRIANGLE_STRIP;
                    break;
                case 6:
                    drawMode = EDrawMode.TRANGLE_FAN;
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

