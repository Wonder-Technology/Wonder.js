module wd{
    export class WDGeometryParser{
        public static create() {
            var obj = new this();

            return obj;
        }

        private _arrayBufferMap:wdCb.Hash<ArrayBuffer> = null;
        private _imageMap:wdCb.Hash<HTMLImageElement> = null;
        private _json:IWDJsonData = null;
        private _materialParser = WDMaterialParser.create();

        public parse(json:IWDJsonData, object:IWDObjectData, mesh:IWDMesh, arrayBufferMap:wdCb.Hash<ArrayBuffer>, imageMap:wdCb.Hash<HTMLImageElement>):void{
            this._json = json;
            this._arrayBufferMap = arrayBufferMap;
            this._imageMap = imageMap;

            /*!
            if mesh->primitives has multi ones, they should as the children of the node(one primitive as one child)
             */

            if(mesh.primitives.length > 1){
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
                bufferReader:BufferReader = null,
                geometry:IWDGeometry = <IWDGeometry>{},
                vertices:Array<number> = null,
                texCoords:Array<number> = null,
                colors:Array<number> = null,
                normals:Array<number> = null,
                faces:Array<Face3> = null,
                morphTargets:wdCb.Hash<MorphTargetsData> = null,
                morphNormals:wdCb.Hash<MorphTargetsData>|null = null;

            for(let semantic in primitive.attributes){
                if(primitive.attributes.hasOwnProperty(semantic)){
                    let attribute = primitive.attributes[semantic],
                        accessor:IWDAccessor = json.accessors[attribute],
                        {bufferReader, count} = WDUtils.getBufferReaderFromAccessor(json, accessor, arrayBufferMap);

                    if(semantic === "POSITION"){
                        vertices = [];

                        this._addAttributeData(vertices, bufferReader, count);
                    }
                    //todo support multi texCoords
                    // else if(semantic.indexOf("TEXCOORD_") > -1){
                    else if(semantic === "TEXCOORD"){
                        texCoords = [];

                        this._addAttributeData(texCoords, bufferReader, count);

                        // this._normalizeTexCoords(texCoords);
                    }
                    else if(semantic === "NORMAL"){
                        normals = [];

                        // for(let data of bufferReader){
                        //     normals.push(data);
                        // }
                        this._addAttributeData(normals, bufferReader, count);
                    }
                    else if(semantic === "COLOR"){
                        colors = [];

                        this._addAttributeData(colors, bufferReader, count);
                    }
                    //todo support JOINT, WEIGHT
                }
            }

            faces = this._getFaces(json, primitive.indices, normals);

            if(primitive.morphTargets !== void 0){
                let data = this._parseMorphData(json, primitive.morphTargets);

                morphTargets = data.morphTargets;
                morphNormals = data.morphNormals;
            }

            WDUtils.addData(geometry, "vertices", vertices);
            WDUtils.addData(geometry, "colors", colors);
            WDUtils.addData(geometry, "texCoords", texCoords);
            WDUtils.addData(geometry, "faces", faces);
            WDUtils.addData(geometry, "morphTargets", morphTargets);
            WDUtils.addData(geometry, "morphNormals", morphNormals);

            WDUtils.addData(geometry, "drawMode", this._parseDrawMode(primitive.mode));

            geometry.material = this._materialParser.parse(json, primitive.material, this._imageMap);

            return geometry;
        }

        private _parseMorphData(json:IWDJsonData, sourceMorphTargets:Array<IWDMorphTarget>){
            var morphTargets:wdCb.Hash<MorphTargetsData> = wdCb.Hash.create<MorphTargetsData>(),
                morphNormals:wdCb.Hash<MorphTargetsData> = wdCb.Hash.create<MorphTargetsData>(),
                accessor:IWDAccessor = null;

            for(let frame of sourceMorphTargets) {
                let animName = this._getAnimName(frame.name);

                morphTargets.appendChild(animName, this._getMorphDatas(json, frame.vertices));

                if(!!frame.normals){
                    morphNormals.appendChild(animName, this._getMorphDatas(json, frame.normals));
                }
            }

            if(morphNormals.getCount() === 0){
                morphNormals = null;
            }

            return {
                morphTargets:morphTargets,
                morphNormals:morphNormals
            };
        }

        private _getMorphDatas(json:IWDJsonData, frameDataAccessorId:string){
            var accessor = json.accessors[frameDataAccessorId],
                {bufferReader, count} = WDUtils.getBufferReaderFromAccessor(json, accessor, this._arrayBufferMap),
                dataArr: Array<number> = [];

            for (let i = 0; i < count; i++) {
                dataArr.push(bufferReader.readFloat());
            }

            return dataArr;
        }

        private _getAnimName(frameName:string):string {
            const PATTERN = /([a-z]+)_?(\d+)/,
                DEFAULT_ANIM_NAME = "defaultMorphAnimation";
            var parts = frameName.match(PATTERN);

            return parts && parts.length > 1 ? parts[1] : DEFAULT_ANIM_NAME;
        }

        private _addAttributeData(geometryData:Array<number>, bufferReader:BufferReader, count:number){
            for(let i = 0; i < count; i++){
                geometryData.push(bufferReader.readFloat());
            }
        }

        @require(function(json:IWDJsonData, indices:string, normals:Array<number>){
            if(indices){
                it("indices' count should be 3 times", () => {
                    var accessor:IWDAccessor = json.accessors[indices],
                        {bufferReader, count} = WDUtils.getBufferReaderFromAccessor(json, accessor, this._arrayBufferMap);

                    expect(count % 3).equal(0);
                }, this);
            }
        })
        private _getFaces(json:IWDJsonData, indices:string, normals:Array<number>){
            var accessor:IWDAccessor = null,
                face:Face3 = null,
                faces:Array<Face3> = [];

            if(!indices){
                return [];
            }

            accessor = json.accessors[indices];

            let {bufferReader, count} = WDUtils.getBufferReaderFromAccessor(json, accessor, this._arrayBufferMap);

            for (let i = 0, len = count; i < len; i += 3) {
                let aIndex = bufferReader.readUInt16(),
                    bIndex = bufferReader.readUInt16(),
                    cIndex = bufferReader.readUInt16(),
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

