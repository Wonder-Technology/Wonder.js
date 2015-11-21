/// <reference path="../../definitions.d.ts"/>
//todo optimize:set vertice,normal presion?(use toFixed)
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

                    //if(!GeometryUtils.hasData(object.normals)) {
                    //    object.normals = this._computeNormal(object.vertices, object.indices);
                    //}
                    //if(GeometryUtils.hasData(object.morphTargets)){
                    //    object.morphTargets.forEach((target:{name:string,vertices:dyCb.Collection<number>,normals?:dyCb.Collection<number>}) => {
                    //        if(!GeometryUtils.hasData(target.normals)){
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
            return !GeometryUtils.hasData(object.verticeIndices);
        }

        private _parseFromIndices(object:any){
            this._duplicateVertexWithDifferentUvs(object);
            //this._addDuplicateVertexDataAndAddFaces(object);
            this._parseObjectFromIndices(object);
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
                //morphTargets = null,
                objectVertices = this._findData(object, "vertices"),
                objectUVs = this._findData(object, "uvs"),
                objectNormals = this._findData(object, "normals"),
                objectColors = this._findData(object, "colors");

            for(let i = 0,len = object.verticeIndices.length; i < len; i += 3){
                let aIndex = object.verticeIndices[i],
                    bIndex = object.verticeIndices[i + 1],
                    cIndex = object.verticeIndices[i + 2];

                face = Face3.create(i, i + 1, i + 2);

                _setThreeComponentData(vertices, objectVertices, aIndex);
                _setThreeComponentData(vertices, objectVertices, bIndex);
                _setThreeComponentData(vertices, objectVertices, cIndex);

                if(GeometryUtils.hasData(objectUVs)) {
                    this._setUV(uvs, objectUVs, object.uvIndices, i, [aIndex, bIndex, cIndex]);
                }

                if(GeometryUtils.hasData(objectNormals)) {
                    this._setNormal(face.vertexNormals, objectNormals, object.normalIndices, [i, i + 1, i + 2], [aIndex, bIndex, cIndex]);
                }


                if(GeometryUtils.hasData(objectColors)) {
                    _setThreeComponentData(colors, objectColors, aIndex);
                    _setThreeComponentData(colors, objectColors, bIndex);
                    _setThreeComponentData(colors, objectColors, cIndex);
                }


                faces.push(face);
            }

            object.vertices = vertices;
            object.uvs = uvs;
            object.colors = colors;
            object.faces = faces;

            this._setMorphTargets(object, object.verticeIndices, object.normalIndices);
        }

        //todo consider same vertex different normals?
        private _duplicateVertexWithDifferentUvs(object:any){
            var arr = [],
                container = dyCb.Hash.create<dyCb.Collection<Array<number>>>(),
                verticeIndices = object.verticeIndices,
                uvIndices = object.uvIndices,
                normalIndices = object.normalIndices,
                vertices = this._findData(object, "vertices"),
                normals = this._findData(object, "normals"),
                morphTargets = this._findData(object, "morphTargets");

            if (!GeometryUtils.hasData(uvIndices)) {
                return;
            }

            for (var i = 0, len = verticeIndices.length; i < len; i++) {
                var verticeIndex = verticeIndices[i];

                if (arr[verticeIndex] !== void 0 && arr[verticeIndex] !== uvIndices[i]) {
                    if(this._isEqualAddedVertex(container, verticeIndex, uvIndices[i])){
                        verticeIndices[i] = this._getVerticeIndexOfAddedVertex(container, verticeIndex, uvIndices[i]);
                    }
                    else{
                        this._addThreeComponent(vertices, verticeIndex);

                        verticeIndices[i] = vertices.length / 3 - 1;


                        if (GeometryUtils.hasData(morphTargets)) {
                            for (let frame of morphTargets) {
                                this._addThreeComponent(frame.vertices, verticeIndex);

                                if(GeometryUtils.hasData(frame.normals)){
                                    //this._addDuplicateNormalOfAddedVertex(frame.normals, normalIndices, verticeIndex, verticeIndices[i], i);
                                    this._addDuplicateNormalOfAddedVertex(frame.normals, normalIndices, i, verticeIndex);
                                }
                            }
                        }

                        if(GeometryUtils.hasData(normals)){
                            //this._addDuplicateNormalOfAddedVertex(normals, normalIndices, verticeIndex, verticeIndices[i], i);
                            this._addDuplicateNormalOfAddedVertex(normals, normalIndices, i, verticeIndex);
                            if(GeometryUtils.hasData(normalIndices)){
                                normalIndices[i] = verticeIndices[i];
                            }
                        }


                        container.appendChild(String(verticeIndex), [uvIndices[i], verticeIndices[i]]);
                    }

                    verticeIndex = verticeIndices[i];
                }


                arr[verticeIndex] = uvIndices[i];

            }
        }

        private _addDuplicateNormalOfAddedVertex(normals, normalIndices, index, oldVerticeIndex){
            if(!GeometryUtils.hasData(normalIndices)){
                //this._addThreeComponent(normals, verticeIndex);
                //GeometryUtils.setThreeComponent(normals, normals[oldVerticeIndex], newVerticeIndex);

                this._addThreeComponent(normals, normals, oldVerticeIndex);
                //targetData[index * 3] = sourceData[0];
                //targetData[index * 3 + 1] = sourceData[1];
                //targetData[index * 3 + 2] = sourceData[2];

                return;
            }


            this._addThreeComponent(normals, normals, normalIndices[index]);
        }


        //    if(dataArr){
        //        //verticeIndex = dataArr[1];
        //        verticeIndices[i] = dataArr[1];
        //        verticeIndex = dataArr[1];
        //    }
        //}
        private _isEqualAddedVertex(container, targetVerticeIndex, targetUvIndex)
    {
        var data = container.getChild(String(targetVerticeIndex));

        if (!data) {
            return false;
        }

        return data.hasChild(([uvIndex, verticeIndex]) => {
            return uvIndex === targetUvIndex;
        });
            //let dataArr = data.findOne(([uvIndex, index]) => {
            //    return uvIndex === uvIndices[i];
            //});
    }

        @In(function(container, targetVerticeIndex, targetUvIndex){
            assert(this._isEqualAddedVertex(container, targetVerticeIndex, targetUvIndex), Log.info.FUNC_SHOULD("uvIndex", "equal the one of added vertex"))
        })
        private _getVerticeIndexOfAddedVertex(container, targetVerticeIndex, targetUvIndex){
            var data = container.getChild(String(targetVerticeIndex));

            return data.findOne(([uvIndex, verticeIndex]) => {
                return uvIndex === targetUvIndex;
            })[1];
    }


        private _addThreeComponent(data:Array<number>, index:number);
        private _addThreeComponent(targetData:Array<number>, sourceData:Array<number>, index:number);

        private _addThreeComponent(...args){
            if(args.length === 2){
                let data = args[0],
                    index = args[1];

                data.push(
                    data[index * 3],
                    data[index * 3 + 1],
                    data[index * 3 + 2]
                );
            }
            else{
                let targetData = args[0],
                    sourceData = args[1],
                    index = args[2];

                targetData.push(
                    sourceData[index * 3],
                    sourceData[index * 3 + 1],
                    sourceData[index * 3 + 2]
                );
            }
        }

        private _parseObjectFromIndices(object:any){
            var vertices = [],
                uvs = [],
                faces = [],
                face:Face3 = null,
                colors = [],
                objectVertices = this._findData(object, "vertices"),
                objectUVs = this._findData(object, "uvs"),
                objectNormals = this._findData(object, "normals"),
                objectColors = this._findData(object, "colors");

            for(let i = 0,len = object.verticeIndices.length; i < len; i += 3){
                let aIndex = object.verticeIndices[i],
                    bIndex = object.verticeIndices[i + 1],
                    cIndex = object.verticeIndices[i + 2],
                    indexArr = [i, i + 1, i + 2],
                verticeIndiceArr = [aIndex, bIndex, cIndex];

                //face = Face3.create(i, i + 1, i + 2);
                face = Face3.create(aIndex, bIndex, cIndex);

                //_setThreeComponentData(vertices, objectVertices, aIndex);
                //_setThreeComponentData(vertices, objectVertices, bIndex);
                //_setThreeComponentData(vertices, objectVertices, cIndex);

                if(GeometryUtils.hasData(object.uvIndices) && GeometryUtils.hasData(objectUVs)) {
                    //this._setUV(uvs, objectUVs, object.uvIndices, i, [aIndex, bIndex, cIndex]);
                    //this._setUV2(uvs, objectUVs, object.uvIndices, [aIndex, bIndex, cIndex]);
                    this._setUV2(uvs, objectUVs, object.uvIndices, indexArr, verticeIndiceArr);
                }

                //if(GeometryUtils.hasData(object.normalIndices) && GeometryUtils.hasData(objectNormals)) {
                    if(GeometryUtils.hasData(objectNormals)) {
                    //this._setNormal(face.vertexNormals, objectNormals, object.normalIndices, [i, i + 1, i + 2], [aIndex, bIndex, cIndex]);
                        this._setNormal2(face.vertexNormals, objectNormals, object.normalIndices, indexArr, verticeIndiceArr);
                }


                //if(GeometryUtils.hasData(objectColors)) {
                //    _setThreeComponentData(colors, objectColors, aIndex);
                //    _setThreeComponentData(colors, objectColors, bIndex);
                //    _setThreeComponentData(colors, objectColors, cIndex);
                //}


                faces.push(face);
            }

            //object.vertices = vertices;
            object.vertices = objectVertices;
            if(!GeometryUtils.hasData(object.uvIndices)) {
                object.uvs = objectUVs;
            }
            else{
                object.uvs = uvs;
            }
            //object.colors = colors;
            object.colors = objectColors;
            object.faces = faces;

            //this._setMorphTargets(object, object.verticeIndices, object.normalIndices);
            this._setMorphTargets2(object, object.verticeIndices, object.normalIndices);
        }



        private _getAnimName(frameName:string){
            const PATTERN = /([a-z]+)_?(\d+)/,
                DEFAULT_ANIM_NAME = "default";
            var parts = frameName.match(PATTERN);

            return parts && parts.length > 1 ? parts[1] : DEFAULT_ANIM_NAME;
        }

        private _getFrameData(frameData:DYFileJsonFrameData):any{
            if(frameData.normals){
                return {
                    vertices:frameData.vertices,
                    normals:frameData.normals
                };
            }

            return {
                vertices:frameData.vertices
            };
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

        private _setUV(targetUVs:Array<number>, sourceUVs:Array<number>, uvIndices:Array<number>, index:number, indiceArr:Array<number>){
            var uvIndice1 = null,
                uvIndice2 = null,
                uvIndice3 = null,
                [aIndex, bIndex, cIndex] = indiceArr;

            if(!uvIndices || uvIndices.length === 0){
                _setTwoComponentData(targetUVs, sourceUVs, aIndex);
                _setTwoComponentData(targetUVs, sourceUVs, bIndex);
                _setTwoComponentData(targetUVs, sourceUVs, cIndex);
                return;
            }

            uvIndice1 = uvIndices[index];
            uvIndice2 = uvIndices[index + 1];
            uvIndice3 = uvIndices[index + 2];

            targetUVs.push(sourceUVs[uvIndice1 * 2], sourceUVs[uvIndice1 * 2 + 1]);
            targetUVs.push(sourceUVs[uvIndice2 * 2], sourceUVs[uvIndice2 * 2 + 1]);
            targetUVs.push(sourceUVs[uvIndice3 * 2], sourceUVs[uvIndice3 * 2 + 1]);
        }


        private _setUV2(targetUVs:Array<number>, sourceUVs:Array<number>, uvIndices:Array<number>, indexArr:Array<number>, verticeIndiceArr:Array<number>){
            var uvIndice1 = null,
                uvIndice2 = null,
                uvIndice3 = null,
                [index1, index2, index3] = indexArr,
                [aIndex, bIndex, cIndex] = verticeIndiceArr;

            //if(!uvIndices || uvIndices.length === 0){
            ////    _setTwoComponentData(targetUVs, sourceUVs, aIndex);
            ////    _setTwoComponentData(targetUVs, sourceUVs, bIndex);
            ////    _setTwoComponentData(targetUVs, sourceUVs, cIndex);
            //
            ////    return;
            //}




            uvIndice1 = uvIndices[index1];
            uvIndice2 = uvIndices[index2];
            uvIndice3 = uvIndices[index3];


            //targetUVs[aIndex * 2] = sourceUVs[uvIndice1 * 2];
            //targetUVs[aIndex * 2 + 1] = sourceUVs[uvIndice1 * 2 + 1];
            //
            //
            //targetUVs[bIndex * 2] = sourceUVs[uvIndice2 * 2];
            //targetUVs[bIndex * 2 + 1] = sourceUVs[uvIndice2 * 2 + 1];
            //
            //targetUVs[cIndex * 2] = sourceUVs[uvIndice3 * 2];
            //targetUVs[cIndex * 2 + 1] = sourceUVs[uvIndice3 * 2 + 1];


            this._setTwoComponentData(targetUVs, sourceUVs, aIndex, uvIndice1);
            this._setTwoComponentData(targetUVs, sourceUVs, bIndex, uvIndice2);
            this._setTwoComponentData(targetUVs, sourceUVs, cIndex, uvIndice3);

            //targetUVs.push(sourceUVs[uvIndice1 * 2], sourceUVs[uvIndice1 * 2 + 1]);
            //targetUVs.push(sourceUVs[uvIndice2 * 2], sourceUVs[uvIndice2 * 2 + 1]);
            //targetUVs.push(sourceUVs[uvIndice3 * 2], sourceUVs[uvIndice3 * 2 + 1]);
        }

        private _setTwoComponentData(targetData, sourceData, index, indice){
            targetData[index * 2] = sourceData[indice * 2];
            targetData[index * 2 + 1] = sourceData[indice * 2 + 1];
        }

        private _setThreeComponentData(targetData, sourceData, index, indice){
            targetData[index * 3] = sourceData[indice * 3];
            targetData[index * 3 + 1] = sourceData[indice * 3 + 1];
            targetData[index * 3 + 2] = sourceData[indice * 3 + 2];
        }


        private _setNormal(targetNormals:dyCb.Collection<Vector3>|Array<number>, sourceNormals:Array<number>, normalIndices:Array<number>, normalIndexArr:Array<number>, verticeIndiceArr:Array<number>){
            if(!GeometryUtils.hasData(normalIndices)){
                this._addNormalData(targetNormals, sourceNormals, verticeIndiceArr);

                return;
            }

            this._addNormalData(targetNormals, sourceNormals, [normalIndices[normalIndexArr[0]], normalIndices[normalIndexArr[1]], normalIndices[normalIndexArr[2]]]);
        }


        private _setNormal2(targetNormals:dyCb.Collection<Vector3>|Array<number>, sourceNormals:Array<number>, normalIndices:Array<number>, indexArr:Array<number>, verticeIndiceArr:Array<number>){
            var [index1, index2, index3] = indexArr;

            if(!GeometryUtils.hasData(normalIndices)){
                //this._addNormalData(targetNormals, sourceNormals, indexArr);
                this._addNormalData(targetNormals, sourceNormals, verticeIndiceArr);
                //this._addNormalData(targetNormals, sourceNormals, indexArr);

                return;
            }

            //this._addNormalData(targetNormals, sourceNormals, [normalIndices[normalIndexArr[0]], normalIndices[normalIndexArr[1]], normalIndices[normalIndexArr[2]]]);
            this._addNormalData(targetNormals, sourceNormals, [normalIndices[index1], normalIndices[index2], normalIndices[index3]]);
        }



        private _addNormalData(targetNormals:dyCb.Collection<Vector3>|Array<number>, sourceNormals: Array<number>, normalIndiceArr:Array<number>){
            let [aIndex, bIndex, cIndex] = normalIndiceArr;

            if(targetNormals instanceof dyCb.Collection){
                targetNormals.addChildren(
                    [
                        _getThreeComponentData(sourceNormals, aIndex),
                        _getThreeComponentData(sourceNormals, bIndex),
                        _getThreeComponentData(sourceNormals, cIndex)
                    ]
                );
            }
            else{
                let normals = <Array<number>>targetNormals;

                for (let v of [_getThreeComponentData(sourceNormals, aIndex), _getThreeComponentData(sourceNormals, bIndex), _getThreeComponentData(sourceNormals, cIndex)]){
                    normals.push(v.x, v.y, v.z);
                }
            }
        }

        private _setMorphTargets(object:DYFileParseObjectData, verticeIndices:Array<number>, normalIndices:Array<number>){
            var objectMorphTargets = this._findData(object, "morphTargets"),
                morphTargets = null,
                morphNormals = null;


            if(GeometryUtils.hasData(objectMorphTargets)){
                morphTargets = dyCb.Hash.create<dyCb.Hash<DYFileParseMorphTargetsData>>();
                morphNormals = dyCb.Hash.create<dyCb.Collection<Array<number>>>();

                for(let frameData of objectMorphTargets){
                    let animName = this._getAnimName(frameData.name),
                        i = 0,
                        vertices = [],
                        normals = [];

                    for(let face of object.faces){
                        let aIndex = face.aIndex,
                            bIndex = face.bIndex,
                            cIndex = face.cIndex;

                        _setThreeComponentData(vertices, frameData.vertices, verticeIndices[aIndex]);
                        _setThreeComponentData(vertices, frameData.vertices, verticeIndices[bIndex]);
                        _setThreeComponentData(vertices, frameData.vertices, verticeIndices[cIndex]);


                        if(GeometryUtils.hasData(frameData.normals)){
                            this._setNormal(normals, frameData.normals, normalIndices, [aIndex, bIndex, cIndex], [verticeIndices[aIndex], verticeIndices[bIndex], verticeIndices[cIndex]]);
                        }

                        i++;
                    }

                    morphTargets.appendChild(animName, vertices);

                    if(GeometryUtils.hasData(frameData.normals)){
                        morphNormals.appendChild(animName, normals);
                    }
                }
            }

            object.morphTargets = morphTargets;
            object.morphNormals = morphNormals;
        }


        private _setMorphTargets2(object:DYFileParseObjectData, verticeIndices:Array<number>, normalIndices:Array<number>){
            var objectMorphTargets = this._findData(object, "morphTargets"),
                morphTargets = null,
                morphNormals = null;


            if(GeometryUtils.hasData(objectMorphTargets)){
                morphTargets = dyCb.Hash.create<dyCb.Hash<DYFileParseMorphTargetsData>>();
                morphNormals = dyCb.Hash.create<dyCb.Collection<Array<number>>>();

                for(let frameData of objectMorphTargets){
                    let animName = this._getAnimName(frameData.name);

                    morphTargets.appendChild(animName, frameData.vertices);

                    if(GeometryUtils.hasData(frameData.normals)){
                        if(GeometryUtils.hasData(normalIndices)){
                            let normals = [];

                            for (let i = 0, len = verticeIndices.length; i < len; i++) {
                                this._setThreeComponentData(normals, frameData.normals, verticeIndices[i], normalIndices[i]);
                            }

                            morphNormals.appendChild(animName, normals);
                        }
                        else{
                            morphNormals.appendChild(animName, frameData.normals);
                        }
                    }
                }
            }

            object.morphTargets = morphTargets;
            object.morphNormals = morphNormals;
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

