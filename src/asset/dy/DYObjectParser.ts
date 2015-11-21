/// <reference path="../../definitions.d.ts"/>
//todo optimize:set vertice,normal presion?(use toFixed)
module dy {
    export class DYObjectParser {
        public static create() {
            var obj = new this();

            return obj;
        }

        public parse(data:DYFileParseData, json:DYFileJsonData):void {
            var parse = null,
                self = this;

            data.objects = dyCb.Collection.create<any>(json.objects);

            parse = (object:any) => {
                if (self._isObjectContainer(object)) {
                    object.isContainer = true;
                }
                else {
                    object.isContainer = false;

                    self._parseFromIndices(object);
                }

                if (object.children) {
                    object.children = dyCb.Collection.create<any>(object.children);
                    object.children.forEach((child:any) => {
                        child.parent = object;

                        parse(child);
                    })
                }
            };


            data.objects.forEach((object:any) => {
                //top's parent is null
                object.parent = null;

                parse(object);

                self._removeObjectContainerData(object);
            });
        }

        private _isObjectContainer(object:DYFileJsonObjectData) {
            return !GeometryUtils.hasData(object.verticeIndices);
        }

        private _parseFromIndices(object:any) {
            this._duplicateVertexWithDifferentUvs(object);
            this._parseObjectFromIndices(object);
            this._removeRebundantIndiceData(object);
        }

        //todo handle "same vertex different normals" situation?
        private _duplicateVertexWithDifferentUvs(object:any) {
            var arr = [],
                container = dyCb.Hash.create<dyCb.Collection<Array<number>>>(),
                verticeIndices = object.verticeIndices,
                uvIndices = object.uvIndices;

            if (!GeometryUtils.hasData(uvIndices)) {
                return;
            }

            for (var i = 0, len = verticeIndices.length; i < len; i++) {
                var verticeIndex = verticeIndices[i];

                if (this._isSameVertexWithDifferentUvsByCompareToFirstOne(arr, uvIndices[i], verticeIndex)) {
                    if (this._isUvIndiceEqualTheOneOfAddedVertex(container, verticeIndex, uvIndices[i])) {
                        verticeIndices[i] = this._getVerticeIndexOfAddedVertexByFindContainer(container, verticeIndex, uvIndices[i]);
                    }
                    else {
                        this._addVertexData(object, container, verticeIndex, i);
                    }

                    verticeIndex = verticeIndices[i];
                }


                arr[verticeIndex] = uvIndices[i];
            }
        }

        private _isSameVertexWithDifferentUvsByCompareToFirstOne(arr, uvIndex, verticeIndex) {
            return arr[verticeIndex] !== void 0 && arr[verticeIndex] !== uvIndex;
        }

        private _addVertexData(object, container, verticeIndex, index) {
            var verticeIndices = object.verticeIndices,
                uvIndices = object.uvIndices,
                normalIndices = object.normalIndices,
                vertices = this._findData(object, "vertices"),
                normals = this._findData(object, "normals"),
                morphTargets = this._findData(object, "morphTargets"),
                verticeIndexOfAddedVertex = null;

            this._addThreeComponent(vertices, verticeIndex);

            verticeIndexOfAddedVertex = this._getVerticeIndexOfAddedVertex(vertices);

            verticeIndices[index] = verticeIndexOfAddedVertex;


            if (GeometryUtils.hasData(morphTargets)) {
                for (let frame of morphTargets) {
                    this._addThreeComponent(frame.vertices, verticeIndex);

                    if (GeometryUtils.hasData(frame.normals)) {
                        this._addDuplicateNormalOfAddedVertex(frame.normals, normalIndices, index, verticeIndex);
                    }
                }
            }

            if (GeometryUtils.hasData(normals)) {
                this._addDuplicateNormalOfAddedVertex(normals, normalIndices, index, verticeIndex);

                if (GeometryUtils.hasData(normalIndices)) {
                    normalIndices[index] = verticeIndexOfAddedVertex;
                }
            }


            container.appendChild(String(verticeIndex), [uvIndices[index], verticeIndexOfAddedVertex]);
        }

        private _addDuplicateNormalOfAddedVertex(normals, normalIndices, index, oldVerticeIndex) {
            if (!GeometryUtils.hasData(normalIndices)) {
                this._addThreeComponent(normals, normals, oldVerticeIndex);

                return;
            }


            this._addThreeComponent(normals, normals, normalIndices[index]);
        }

        private _isUvIndiceEqualTheOneOfAddedVertex(container, targetVerticeIndex, targetUvIndex) {
            var data = container.getChild(String(targetVerticeIndex));

            if (!data) {
                return false;
            }

            return data.hasChild(([uvIndex, verticeIndex]) => {
                return uvIndex === targetUvIndex;
            });
        }

        @require(function (container, targetVerticeIndex, targetUvIndex) {
            assert(this._isUvIndiceEqualTheOneOfAddedVertex(container, targetVerticeIndex, targetUvIndex), Log.info.FUNC_SHOULD("uvIndex", "equal the one of added vertex"))
        })
        private _getVerticeIndexOfAddedVertexByFindContainer(container, targetVerticeIndex, targetUvIndex) {
            var data = container.getChild(String(targetVerticeIndex));

            return data.findOne(([uvIndex, verticeIndex]) => {
                return uvIndex === targetUvIndex;
            })[1];
        }

        private _getVerticeIndexOfAddedVertex(vertices) {
            return vertices.length / 3 - 1;
        }

        private _addThreeComponent(data:Array<number>, index:number);
        private _addThreeComponent(targetData:Array<number>, sourceData:Array<number>, index:number);

        private _addThreeComponent(...args) {
            if (args.length === 2) {
                let data = args[0],
                    index = args[1];

                data.push(
                    data[index * 3],
                    data[index * 3 + 1],
                    data[index * 3 + 2]
                );
            }
            else {
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

        private _parseObjectFromIndices(object:any) {
            var vertices = [],
                uvs = [],
                faces = [],
                face:Face3 = null,
                colors = [],
                objectVertices = this._findData(object, "vertices"),
                objectUVs = this._findData(object, "uvs"),
                objectNormals = this._findData(object, "normals"),
                objectColors = this._findData(object, "colors");

            for (let i = 0, len = object.verticeIndices.length; i < len; i += 3) {
                let aIndex = object.verticeIndices[i],
                    bIndex = object.verticeIndices[i + 1],
                    cIndex = object.verticeIndices[i + 2],
                    indexArr = [i, i + 1, i + 2],
                    verticeIndiceArr = [aIndex, bIndex, cIndex];

                face = Face3.create(aIndex, bIndex, cIndex);

                if (GeometryUtils.hasData(object.uvIndices) && GeometryUtils.hasData(objectUVs)) {
                    this._setUV(uvs, objectUVs, object.uvIndices, indexArr, verticeIndiceArr);
                }

                if (GeometryUtils.hasData(objectNormals)) {
                    this._setNormal(face.vertexNormals, objectNormals, object.normalIndices, indexArr, verticeIndiceArr);
                }

                faces.push(face);
            }

            object.vertices = objectVertices;

            if (!GeometryUtils.hasData(object.uvIndices)) {
                object.uvs = objectUVs;
            }
            else {
                object.uvs = uvs;
            }

            object.colors = objectColors;
            object.faces = faces;

            this._setMorphTargets(object, object.verticeIndices, object.normalIndices);
        }


        private _getAnimName(frameName:string) {
            const PATTERN = /([a-z]+)_?(\d+)/,
                DEFAULT_ANIM_NAME = "default";
            var parts = frameName.match(PATTERN);

            return parts && parts.length > 1 ? parts[1] : DEFAULT_ANIM_NAME;
        }


        @ensure(function (returnValue, object) {
            assert(!object.verticeIndices, Log.info.FUNC_SHOULD("object.verticeIndices", "be removed"));
            assert(!object.uvIndices, Log.info.FUNC_SHOULD("object.uvIndices", "be removed"));
            assert(!object.normalIndices, Log.info.FUNC_SHOULD("object.normalIndices", "be removed"));
        })
        private _removeRebundantIndiceData(object:DYFileJsonObjectData) {
            delete object.verticeIndices;
            delete object.uvIndices;
            delete object.normalIndices;
        }

        private _removeObjectContainerData(object:DYFileParseObjectData) {
            var remove = null;

            remove = (object:DYFileParseObjectData) => {
                if (object.isContainer) {
                    delete object.vertices;
                    delete object.uvs;
                    delete object.colors;
                }

                if (object.children) {
                    object.children.forEach((child:any) => {
                        remove(child);
                    })
                }
            };

            remove(object);
        }

        private _findData(object:DYFileParseObjectData, dataName:string) {
            var data = null;

            do {
                data = object[dataName];
            }
            while (!data && (object = object.parent) !== null);

            return data;
        }


        private _setUV(targetUVs:Array<number>, sourceUVs:Array<number>, uvIndices:Array<number>, indexArr:Array<number>, verticeIndiceArr:Array<number>) {
            var uvIndice1 = null,
                uvIndice2 = null,
                uvIndice3 = null,
                [index1, index2, index3] = indexArr,
                [aIndex, bIndex, cIndex] = verticeIndiceArr;

            uvIndice1 = uvIndices[index1];
            uvIndice2 = uvIndices[index2];
            uvIndice3 = uvIndices[index3];

            this._setTwoComponentData(targetUVs, sourceUVs, aIndex, uvIndice1);
            this._setTwoComponentData(targetUVs, sourceUVs, bIndex, uvIndice2);
            this._setTwoComponentData(targetUVs, sourceUVs, cIndex, uvIndice3);
        }

        private _setTwoComponentData(targetData, sourceData, index, indice) {
            targetData[index * 2] = sourceData[indice * 2];
            targetData[index * 2 + 1] = sourceData[indice * 2 + 1];
        }

        private _setThreeComponentData(targetData, sourceData, index, indice) {
            targetData[index * 3] = sourceData[indice * 3];
            targetData[index * 3 + 1] = sourceData[indice * 3 + 1];
            targetData[index * 3 + 2] = sourceData[indice * 3 + 2];
        }

        private _getThreeComponentData(sourceData:Array<number>, index:number) {
            var startIndex = 3 * index;

            return Vector3.create(
                sourceData[startIndex],
                sourceData[startIndex + 1],
                sourceData[startIndex + 2]
            );
        }

        private _setNormal(targetNormals:dyCb.Collection<Vector3>|Array<number>, sourceNormals:Array<number>, normalIndices:Array<number>, indexArr:Array<number>, verticeIndiceArr:Array<number>) {
            var [index1, index2, index3] = indexArr;

            if (!GeometryUtils.hasData(normalIndices)) {
                this._addNormalData(targetNormals, sourceNormals, verticeIndiceArr);

                return;
            }

            this._addNormalData(targetNormals, sourceNormals, [normalIndices[index1], normalIndices[index2], normalIndices[index3]]);
        }


        private _addNormalData(targetNormals:dyCb.Collection<Vector3>|Array<number>, sourceNormals:Array<number>, normalIndiceArr:Array<number>) {
            let [aIndex, bIndex, cIndex] = normalIndiceArr;

            if (targetNormals instanceof dyCb.Collection) {
                targetNormals.addChildren(
                    [
                        this._getThreeComponentData(sourceNormals, aIndex),
                        this._getThreeComponentData(sourceNormals, bIndex),
                        this._getThreeComponentData(sourceNormals, cIndex)
                    ]
                );
            }
            else {
                let normals = <Array<number>>targetNormals;

                for (let v of [this._getThreeComponentData(sourceNormals, aIndex), this._getThreeComponentData(sourceNormals, bIndex), this._getThreeComponentData(sourceNormals, cIndex)]) {
                    normals.push(v.x, v.y, v.z);
                }
            }
        }

        private _setMorphTargets(object:DYFileParseObjectData, verticeIndices:Array<number>, normalIndices:Array<number>) {
            var objectMorphTargets = this._findData(object, "morphTargets"),
                morphTargets = null,
                morphNormals = null;


            if (GeometryUtils.hasData(objectMorphTargets)) {
                morphTargets = dyCb.Hash.create<dyCb.Hash<DYFileParseMorphTargetsData>>();
                morphNormals = dyCb.Hash.create<dyCb.Collection<Array<number>>>();

                for (let frameData of objectMorphTargets) {
                    let animName = this._getAnimName(frameData.name);

                    morphTargets.appendChild(animName, frameData.vertices);

                    if (GeometryUtils.hasData(frameData.normals)) {
                        if (GeometryUtils.hasData(normalIndices)) {
                            let normals = [];

                            for (let i = 0, len = verticeIndices.length; i < len; i++) {
                                this._setThreeComponentData(normals, frameData.normals, verticeIndices[i], normalIndices[i]);
                            }

                            morphNormals.appendChild(animName, normals);
                        }
                        else {
                            morphNormals.appendChild(animName, frameData.normals);
                        }
                    }
                }
            }

            object.morphTargets = morphTargets;
            object.morphNormals = morphNormals;
        }
    }
}

