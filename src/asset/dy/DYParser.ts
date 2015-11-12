/// <reference path="../../definitions.d.ts"/>
module dy {
    var _setTwoComponentData = (targetData:Array<number>, sourceData:Array<number>, index:number) => {
        var data = _getTwoComponentData(sourceData, index);
        targetData.push(data.x);
        targetData.push(data.y);
    }

    var _getTwoComponentData = (sourceData:Array<number>, index:number) => {
        var startIndex = 2 * index;

        return Vector2.create(
            sourceData[startIndex],
            sourceData[startIndex + 1]
        );
    }

    var _setThreeComponentData = (targetData:Array<number>|dyCb.Collection<number>|Vector3, sourceData:Array<number>, index:number) => {
        var data = _getThreeComponentData(sourceData, index);

        if(targetData instanceof dyCb.Collection){
            targetData.addChild(data.x);
            targetData.addChild(data.y);
            targetData.addChild(data.z);
        }
        else if(targetData instanceof Vector3){
            targetData.set(data);
        }
        else{
            let target = <Array<number>>targetData;

            target.push(data.x);
            target.push(data.y);
            target.push(data.z);
        }
    }

    var _getThreeComponentData = (sourceData:Array<number>, index:number) => {
        var startIndex = 3 * index;

        return Vector3.create(
            sourceData[startIndex],
            sourceData[startIndex + 1],
            sourceData[startIndex + 2]
        );
    }

    export class DYParser {
        public static create() {
            var obj = new this();

            return obj;
        }

        private _data:DYFileParseData = <any>{};

        public parse(json:DYFileJsonData):DYFileParseData {
            this._parseMetadata(json);
            this._parseScene(json);
            this._parseMaterial(json);
            this._parseObject(json);

            return this._data;
        }

        private _parseMetadata(json:DYFileJsonData) {
            this._data.metadata = <any>json.metadata;
        }

        private _parseObject(json:DYFileJsonData) {
            var parse = null,
                self = this;

            this._data.objects = dyCb.Collection.create<any>(json.objects);

            parse = (object:any) => {
                if(self._isObjectContainer(object)){
                    object.isContainer = true;
                }
                else{
                    object.isContainer = false;

                    self._parseFromIndices(object);

                    //if(!self._hasData(object.normals)) {
                    //    object.normals = this._computeNormal(object.vertices, object.indices);
                    //}
                    //if(self._hasData(object.morphTargets)){
                    //    object.morphTargets.forEach((target:{name:string,vertices:dyCb.Collection<number>,normals?:dyCb.Collection<number>}) => {
                    //        if(!self._hasData(target.normals)){
                    //            target.normals = this._computeNormal(target.vertices, object.indices);
                    //        }
                    //    })
                    //}
                }

                if (object.children) {
                    object.children = dyCb.Collection.create<any>(object.children);
                    object.children.forEach((child:any) => {
                        child.parent = object;

                        parse(child);
                    })
                }
            };


            this._data.objects.forEach((object:any) => {
                //top's parent is null
                object.parent = null;

                parse(object);

                self._removeObjectContainerData(object);
            });
        }

        private _isObjectContainer(object:DYFileJsonObjectData){
            return !this._hasData(object.verticeIndices);
        }

        private _parseFromIndices(object:any){
            this._addDuplicateVertexDataAndAddFaces(object);
            this._removeRebundantIndiceData(object);
        }

        @In(function(object){
            assert(object.verticeIndices.length % 3 === 0, Log.info.FUNC_SHOULD("object->verticeIndices.count", `be 3 times, but actual it is ${object.verticeIndices.length}`));
        })
        @Out(function(returnValue, object){
            assert(object.vertices && object.vertices.length > 0, Log.info.FUNC_MUST_NOT_BE("vertices", "empty"));
            assert(object.faces && object.faces.length * 3 === object.verticeIndices.length, Log.info.FUNC_SHOULD("faces.count * 3", `verticeIndices.count(${object.verticeIndices.length}), but actual is ${object.faces.length * 3}`));
        })
        private _addDuplicateVertexDataAndAddFaces(object:any){
            var vertices = [],
                uvs = [],
                faces = [],
                face:Face3 = null,
                colors = [],
                morphTargets = [],
                objectVertices = this._findData(object, "vertices"),
                objectUVs = this._findData(object, "uvs"),
                objectNormals = this._findData(object, "normals"),
                objectColors = this._findData(object, "colors"),
                objectMorphTargets = this._findData(object, "morphTargets");


            if(this._hasData(objectMorphTargets)){
                this._initMorphTargets(morphTargets, objectMorphTargets);
            }

            for(let i = 0,len = object.verticeIndices.length; i < len; i += 3){
                let aIndice = object.verticeIndices[i],
                    bIndice = object.verticeIndices[i + 1],
                    cIndice = object.verticeIndices[i + 2];

                face = Face3.create(i, i + 1, i + 2);

                _setThreeComponentData(vertices, objectVertices, aIndice);
                _setThreeComponentData(vertices, objectVertices, bIndice);
                _setThreeComponentData(vertices, objectVertices, cIndice);

                if(this._hasData(objectUVs)) {
                    this._setUV(uvs, objectUVs, object.uvIndices, i, [aIndice, bIndice, cIndice]);
                }

                if(this._hasData(objectNormals)) {
                    this._setNormal(face.vertexNormals, objectNormals, object.normalIndices, i, [aIndice, bIndice, cIndice]);
                }


                if(this._hasData(objectColors)) {
                    _setThreeComponentData(colors, objectColors, aIndice);
                    _setThreeComponentData(colors, objectColors, bIndice);
                    _setThreeComponentData(colors, objectColors, cIndice);
                }

                if(this._hasData(objectMorphTargets)){
                    face.morphVertexNormals = dyCb.Collection.create<dyCb.Collection<Vector3>>();
                    this._setMorphTargets(morphTargets, objectMorphTargets, face.morphVertexNormals, object.normalIndices, i, [aIndice, bIndice, cIndice]);
                }

                faces.push(face);
            }

            object.vertices = vertices;
            object.uvs = uvs;
            object.colors = colors;
            object.faces = faces;
            object.morphTargets = morphTargets;
        }


        @Out(function(returnValue, object){
            assert(!object.verticeIndices, Log.info.FUNC_SHOULD("object.verticeIndices", "be removed"));
            assert(!object.uvIndices, Log.info.FUNC_SHOULD("object.uvIndices", "be removed"));
            assert(!object.normalIndices, Log.info.FUNC_SHOULD("object.normalIndices", "be removed"));
        })
        private _removeRebundantIndiceData(object:DYFileJsonObjectData){
            delete object.verticeIndices;
            delete object.uvIndices;
            delete object.normalIndices;
        }

        private _removeObjectContainerData(object:DYFileParseObjectData){
            var remove = null;

            remove = (object:DYFileParseObjectData) => {
                if(object.isContainer){
                    delete object.vertices;
                    delete object.uvs;
                    delete object.colors;
                }

                if(object.children){
                    object.children.forEach((child:any) => {
                        remove(child);
                    })
                }
            };

            remove(object);
        }

        private _findData(object:DYFileParseObjectData, dataName:string){
            var data = null;

            do{
                data = object[dataName];
            }
            while(!data && (object = object.parent) !== null);

            return data;
        }


        private _initMorphTargets(targetMorphTargets:Array<any>, sourceMorphTargets:Array<any>){
            for(let frame of sourceMorphTargets){
                targetMorphTargets.push({
                    name: frame.name,
                    vertices: []
                });
            }

            return targetMorphTargets;
        }

        private _setUV(targetUVs:Array<number>, sourceUVs:Array<number>, uvIndices:Array<number>, index:number, indiceArr:Array<number>){
            var uvIndice1 = null,
                uvIndice2 = null,
                uvIndice3 = null,
                [aIndice, bIndice, cIndice] = indiceArr;

            if(!uvIndices || uvIndices.length === 0){
                _setTwoComponentData(targetUVs, sourceUVs, aIndice);
                _setTwoComponentData(targetUVs, sourceUVs, bIndice);
                _setTwoComponentData(targetUVs, sourceUVs, cIndice);
                return;
            }

            uvIndice1 = uvIndices[index];
            uvIndice2 = uvIndices[index + 1];
            uvIndice3 = uvIndices[index + 2];

            targetUVs.push(sourceUVs[uvIndice1 * 2], sourceUVs[uvIndice1 * 2 + 1]);
            targetUVs.push(sourceUVs[uvIndice2 * 2], sourceUVs[uvIndice2 * 2 + 1]);
            targetUVs.push(sourceUVs[uvIndice3 * 2], sourceUVs[uvIndice3 * 2 + 1]);
        }

        private _setNormal(vertexNormals:dyCb.Collection<Vector3>, sourceNormals:Array<number>, normalIndices:Array<number>, index:number, indiceArr:Array<number>){
            var [aIndice, bIndice, cIndice] = indiceArr;

            if(!normalIndices || normalIndices.length === 0){
                vertexNormals.addChildren(
                    [
                        _getThreeComponentData(sourceNormals, aIndice),
                        _getThreeComponentData(sourceNormals, bIndice),
                        _getThreeComponentData(sourceNormals, cIndice)
                    ]
                );
                return;
            }

            vertexNormals.addChildren(
                [
                    _getThreeComponentData(sourceNormals, normalIndices[index]),
                    _getThreeComponentData(sourceNormals, normalIndices[index + 1]),
                    _getThreeComponentData(sourceNormals, normalIndices[index + 2])
                ]
            );
        }

        private _setMorphTargets(targetMorphTargets:Array<any>, sourceMorphTargets:Array<any>, morphVertexNormals:dyCb.Collection<dyCb.Collection<Vector3>>, normalIndices:Array<number>, index:number, indiceArr:Array<number>){
            var [aIndice, bIndice, cIndice] = indiceArr;

            for (let i = 0, len = sourceMorphTargets.length; i < len; i++){
                let sourceFrame = sourceMorphTargets[i];

                _setThreeComponentData(targetMorphTargets[i].vertices, sourceFrame.vertices, aIndice);
                _setThreeComponentData(targetMorphTargets[i].vertices, sourceFrame.vertices, bIndice);
                _setThreeComponentData(targetMorphTargets[i].vertices, sourceFrame.vertices, cIndice);

                if(this._hasData(sourceFrame.normals)){
                    let vertexNormals = dyCb.Collection.create<Vector3>();

                    this._setNormal(vertexNormals, sourceFrame.normals, normalIndices, index, indiceArr);

                    morphVertexNormals.addChild(vertexNormals);
                }
            }
        }

        @In(function(data){
            if(data){
                assert(data instanceof dyCb.Collection || JudgeUtils.isArray(data), Log.info.FUNC_SHOULD("data",  "be Array or Collection"));
            }
        })
        private _hasData(data:any){
            return data && ((data.length && data.length > 0) || (data.getCount && data.getCount() > 0));
        }

        private _parseScene(json:DYFileJsonData) {
            this._data.scene = <any>json.scene;

            if (json.scene.ambientColor) {
                this._data.scene.ambientColor = this._createColor(json.scene.ambientColor);
            }
        }

        private _parseMaterial(json:DYFileJsonData) {
            this._data.materials = dyCb.Hash.create<any>(json.materials);

            this._data.materials.forEach((material:any) => {
                if (material.diffuseColor) {
                    material.diffuseColor = this._createColor(material.diffuseColor);
                }
                if (material.specularColor) {
                    material.specularColor = this._createColor(material.specularColor);
                }
            });
        }

        private _createColor(colorArr:Array<number>) {
            return Color.create(`rgb(${colorArr.join(",").replace(/^(\d+),/g, "$1.0,").replace(/,(\d+),/g, ",$1.0,").replace(/,(\d+)$/g, ",$1.0")})`);
        }
    }
}

