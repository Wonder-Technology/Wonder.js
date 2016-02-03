module wd{
    declare var ArrayBuffer:any;

    export class GLTFParser{
        public static create() {
        	var obj = new this();

        	return obj;
        }

        private _data:IGLTFParseData = <any>{};
        private _arrayBufferMap:wdCb.Hash<any> = wdCb.Hash.create<any>();

        public parse(json:IGLTFJsonData):IGLTFParseData{
            if(json.asset){
                this._parseMetadata(json);
            }

            this._parseObjects(json);

            return this._data;
        }

        public createLoadAllAssetsStream(url:string, json:IGLTFJsonData):wdFrp.Stream{
            return wdFrp.fromArray([
                    this._createLoadBuffersStream(url, json)
                    //todo finish
                    //this._createLoadGLSLStream(json),
                    //this._createLoadTextureStream(json),
                    //this._createLoadImageStream(json)
                ])
                .mergeAll();
        }

        private _parseMetadata(json:IGLTFJsonData){
            var metadata = <any>{};

            for(let i in json.asset){
                if(json.asset.hasOwnProperty(i)){
                    metadata[i] = json.asset[i];
                }
            }

            this._data.metadata = metadata;
        }

        private _parseObjects(json:IGLTFJsonData){
            var self = this,
                objects = wdCb.Collection.create<IGLTFObjectData>();
            var parse = (node:IGLTFNode) => {
                var object:IGLTFObjectData = self._createObjectData();

                if(node.name){
                    object.name = node.name;
                }

                //if(node.meshes && node.meshes[node.meshes]){
                if(node.meshes && node.meshes.length > 0){
                    let mesh:IGLTFMesh = null;

                    if(node.meshes.length > 1){
                        Log.warn(Log.info.FUNC_NOT_SUPPORT("multi mesh(geometry), just use the first mesh(geometry)"));
                    }

                    mesh = json.meshes[node.meshes[0]];

                    if(mesh.name){
                        object.name = mesh.name;
                    }

                    self._parseGeometrys(object, json, mesh);
                }


                //todo more (camera,transform...)


                objects.addChild(object);

                if(node.children){
                    for(let child of node.children){
                        parse(json.nodes[child]);
                    }
                }
            }

            if(!json.scenes[json.scene]){
                this._data.objects = objects;

                return;
            }

            for(let nodeId of json.scenes[json.scene].nodes){
                parse(json.nodes[nodeId]);
            }

            this._data.objects = objects;
        }

        private _parseGeometrys(object:IGLTFObjectData, json:IGLTFJsonData, mesh:IGLTFMesh){
            //if mesh->primitives has multi ones, the primitives should be children of the node(one primitive is one child)

            //not use mesh.name

            if(mesh.primitives.length > 1){
                for(let primitive of mesh.primitives){
                    let childObject:IGLTFObjectData = this._createObjectData();

                    this._setChildObjectNameWithMultiPrimitives(childObject, primitive);

                    childObject.components.addChild(this._parseGeometry(json, primitive));

                    object.children.addChild(childObject);
                }

                //todo refactor?
                object.isContainer = true;
            }
            else{
                object.components.addChild(this._parseGeometry(json, mesh.primitives[0]));
            }
        }

        private _setChildObjectNameWithMultiPrimitives(object:IGLTFObjectData, primitive:IGLTFMeshPrimitive){
            object.name = primitive.material;
        }

        private _createObjectData(){
            return {
                isContainer: false,

                components:wdCb.Collection.create<IGLTFComponent>(),
                children: wdCb.Collection.create<IGLTFObjectData>()
            }
        }

        private _parseGeometry(json:IGLTFJsonData, primitive:IGLTFMeshPrimitive):IGLTFGeometry{
            var accessor:IGLTFAccessor = null,
                bufferArr:any = null,
                geometry:IGLTFGeometry = <any>{},
                vertices:Array<number> = null,
                texCoords:Array<number> = null,
                colors:Array<number> = null,
                normals:Array<number> = null,
                //indices:Array<number> = null,
                faces:Array<Face3> = null,
                material:IGLTFMaterial = null;


            //todo read accessor->byteStride for batch draw calls

            for(let semantic in primitive.attributes){
                if(primitive.attributes.hasOwnProperty(semantic)){
                    let attribute = primitive.attributes[semantic];

                    accessor = json.accessors[attribute];
                    bufferArr = this._getBufferArrFromAccessor(json, accessor);

                    if(semantic === "POSITION"){
                        vertices = [];

                        for(let data of bufferArr){
                            vertices.push(data);
                        }
                    }
                    else if(semantic.indexOf("TEXCOORD_") > -1){
                        texCoords = [];

                        for(let data of bufferArr){
                            texCoords.push(data);
                        }

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

                        for(let data of bufferArr){
                            colors.push(data);
                        }
                    }
                    //todo support JOINT, WEIGHT
                }
            }


            faces = this._getFaces(json, primitive.indices, normals);


            this._addData(geometry, "vertices", vertices);
            this._addData(geometry, "colors", colors);
            this._addData(geometry, "texCoords", texCoords);
            this._addData(geometry, "faces", faces);

            this._addData(geometry, "drawMode", this._parseDrawMode(primitive.mode));

            //todo get material


            return geometry;
        }

        private _addData(target:Object, sourceName:string, sourceData:any){
            if(sourceData){
                target[sourceName] = sourceData;
            }
        }

        @require(function(json:IGLTFJsonData, indices:string, normals:Array<number>){
            var accessor:IGLTFAccessor = null,
                bufferArr:any = null;

            if(!indices){
                return [];
            }

            accessor = json.accessors[indices];

            bufferArr = this._getBufferArrFromAccessor(json, accessor);

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

            bufferArr = this._getBufferArrFromAccessor(json, accessor);

            for (let i = 0, len = bufferArr.length; i < len; i += 3) {
                let aIndex = bufferArr[i],
                    bIndex = bufferArr[i + 1],
                    cIndex = bufferArr[i + 2],
                    //indexArr = [i, i + 1, i + 2],
                    verticeIndiceArr = [aIndex, bIndex, cIndex];

                face = Face3.create(aIndex, bIndex, cIndex);

                //if (GeometryUtils.hasData(object.uvIndices) && GeometryUtils.hasData(objectUVs)) {
                //    this._setUV(uvs, objectUVs, object.uvIndices, indexArr, verticeIndiceArr);
                //}

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

        private _createLoadBuffersStream(filePath:string, json:IGLTFJsonData):wdFrp.Stream{
            var streamArr = [],
                id = null,
                buffer = null,
                self = this;

            for(id in json.buffers){
                if(json.buffers.hasOwnProperty(id)){
                    buffer = json.buffers[id];

                    if(this._isBase64(buffer.uri)){
                        this._arrayBufferMap.addChild(id, this._decodeArrayBuffer(buffer.uri));
                    }
                    else{
                        let url = ModelLoaderUtils.getPath(filePath, buffer.uri);

                        streamArr.push(
                            AjaxLoader.load(url, "arraybuffer")
                                .do((data:any) => {
                                    Log.error(!(data instanceof wd.ArrayBuffer), Log.info.FUNC_SHOULD(`Buffer:${id}`, "be an array buffer"));
                                    Log.error(data.byteLength !== buffer.byteLength, Log.info.FUNC_SHOULD(`Buffer:${id}'s length is ${data.byteLength}, but it`, `be ${buffer.byteLength}`));

                                    self._arrayBufferMap.addChild(id, data);
                                })
                        );
                    }
                }
            }

            return wdFrp.fromArray(streamArr).mergeAll();
        }

        //private _createLoadGLSLStream(json:IGLTFJsonData):wdFrp.Stream{
        //
        //}
        //
        //private _createLoadTextureStream(json:IGLTFJsonData):wdFrp.Stream{
        //
        //}
        //
        //private _createLoadImageStream(json:IGLTFJsonData):wdFrp.Stream{
        //
        //}

        ////todo support multi scenes?
        //private _parseScene(json:IGLTFJsonData){
        //    this._data.currentScene = json.scenes[json.scene];
        //}
        //
        //private _parseObject(name, data:Object){
        //    this._data[name] = data;
        //}
        //
        private _isBase64(uri: string): boolean{
            return uri.length < 5 ? false : uri.substr(0, 5) === "data:";
        }

        /**
         * Decode array buffer from base64
         */
        private _decodeArrayBuffer(base64Str: string){
            var base64 = base64Str.split(',')[1],
                decodedString = atob(base64),
                bufferLength = decodedString.length,
                arraybuffer = new Uint8Array(new ArrayBuffer(bufferLength));

            for (var i = 0; i < bufferLength; i++) {
                arraybuffer[i] = decodedString.charCodeAt(i);
            }

            return arraybuffer.buffer;
        }

        private _getBufferArrFromAccessor(json:IGLTFJsonData, accessor: IGLTFAccessor): any{
            var bufferView: IGLTFBufferView = json.bufferViews[accessor.bufferView];
            var arrayBuffer: any = this._arrayBufferMap.getChild(bufferView.buffer);

            var byteOffset = accessor.byteOffset + bufferView.byteOffset;
            var count = accessor.count * this._getAccessorTypeSize(accessor);

            switch (accessor.componentType) {
                case 5120:
                    return new Int8Array(arrayBuffer, byteOffset, count);
                case 5121:
                    return new Uint8Array(arrayBuffer, byteOffset, count);
                case 5122:
                    return new Int16Array(arrayBuffer, byteOffset, count);
                case 5123:
                    return new Uint16Array(arrayBuffer, byteOffset, count);
                case 5126:
                    return new Float32Array(arrayBuffer, byteOffset, count);
                default:
                    Log.error(true, Log.info.FUNC_UNEXPECT(`componentType:${accessor.componentType}`));
                    break;
            }
        }

        private _getAccessorTypeSize(accessor: IGLTFAccessor): number{
            var type = accessor.type;

            switch (type) {
                case "VEC2":
                    return 2;
                case "VEC3":
                    return 3;
                case "VEC4":
                    return 4;
                case "MAT2":
                    return 4;
                case "MAT3":
                    return 9;
                case "MAT4":
                    return 16;
                default:
                    return 1;
            }
        }

        private _normalizeTexCoords(texCoords:Array<number>){
            if (!texCoords) {
                return;
            }

            for (let i = 0; i < texCoords.length / 2; i++) {
                texCoords[i * 2 + 1] = 1.0 - texCoords[i * 2 + 1];
            }
        }
    }
}
