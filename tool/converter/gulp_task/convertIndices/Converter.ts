import wdCb = require("wdcb");

import Utils = require("./Utils")

export = class Converter {
    public static create() {
    	var obj = new this();

    	return obj;
    }


    public convert(sourceJson:SourceJsonData):TargetJsonData {
        var targetJson:TargetJsonData = <TargetJsonData>{
            meshes: {
            }
        };

        for(let key in sourceJson.meshes){
            if(sourceJson.meshes.hasOwnProperty(key)){
                let mesh = sourceJson.meshes[key],
                    newPrimitives:Array<TargetPrimitive> = [];

                for(let primitiveData of mesh.primitives){
                    this._duplicateVertexWithDifferentTexCoords(primitiveData);
                    newPrimitives.push(this._parseObjectFromIndices(primitiveData));
                    // this._removeRebundantIndiceData(primitiveData);
                }

                targetJson.meshes[key] = {
                    primitives: newPrimitives
                };
                // mesh.primitives = <any>newPrimitives;
            }
        }

        return targetJson;
    }

    //todo handle "same vertex different normals" situation?
    private _duplicateVertexWithDifferentTexCoords({
        attributes,
        verticeIndices,
        normalIndices,
        texCoordIndices,
        colorIndices
    }) {
        var arr = [],
            container = wdCb.Hash.create<wdCb.Collection<Array<number>>>();
            // verticeIndices = primitiveData.verticeIndices,
            // texCoordIndices = primitiveData.texCoordIndices;

        if (!Utils.hasData(texCoordIndices)) {
            return;
        }

        for (var i = 0, len = verticeIndices.length; i < len; i++) {
            var verticeIndex = verticeIndices[i];

            if (this._isSameVertexWithDifferentTexCoordsByCompareToFirstOne(arr, texCoordIndices[i], verticeIndex)) {
                // console.log("a")

                //todo resume!
                if (this._isTexCoordIndiceEqualTheOneOfAddedVertex(container, verticeIndex, texCoordIndices[i])) {
                    verticeIndices[i] = this._getVerticeIndexOfAddedVertexByFindContainer(container, verticeIndex, texCoordIndices[i]);
                }
                else {
                    this._addVertexData(attributes, verticeIndices, normalIndices, texCoordIndices, colorIndices, container, verticeIndex, i);
                }

                verticeIndex = verticeIndices[i];
            }


            arr[verticeIndex] = texCoordIndices[i];
        }
    }

    private _isTexCoordIndiceEqualTheOneOfAddedVertex(container, targetVerticeIndex, targetTexCoordIndex) {
        var data = container.getChild(String(targetVerticeIndex));

        if (!data) {
            return false;
        }

        return data.hasChildWithFunc(([texCoordIndex, verticeIndex]) => {
            return texCoordIndex === targetTexCoordIndex;
        });
    }

    // @require(function (container, targetVerticeIndex, targetTexCoordIndex) {
    //     assert(this._isTexCoordIndiceEqualTheOneOfAddedVertex(container, targetVerticeIndex, targetTexCoordIndex), Log.info.FUNC_SHOULD("texCoordIndex", "equal the one of added vertex"))
    // })
    private _getVerticeIndexOfAddedVertexByFindContainer(container, targetVerticeIndex, targetTexCoordIndex) {
        var data = container.getChild(String(targetVerticeIndex));

        return data.findOne(([texCoordIndex, verticeIndex]) => {
            return texCoordIndex === targetTexCoordIndex;
        })[1];
    }

    private _isSameVertexWithDifferentTexCoordsByCompareToFirstOne(arr, texCoordIndex, verticeIndex) {
        return arr[verticeIndex] !== void 0 && arr[verticeIndex] !== texCoordIndex;
    }

    private _addVertexData(attributes, verticeIndices, normalIndices, texCoordIndices, colorIndices, container, verticeIndex, index) {
        // var verticeIndices = primitiveData.verticeIndices,
        //     texCoordIndices = primitiveData.texCoordIndices,
        //     normalIndices = primitiveData.normalIndices,
            var vertices = attributes.POSITION,
            normals = attributes.NORMAL,
            // morphTargets = this._findData(object, "morphTargets"),
            verticeIndexOfAddedVertex = null;

        this._addThreeComponent(vertices, verticeIndex);

        verticeIndexOfAddedVertex = this._getVerticeIndexOfAddedVertex(vertices);

        verticeIndices[index] = verticeIndexOfAddedVertex;


        // if (GeometryUtils.hasData(morphTargets)) {
        //     for (let frame of morphTargets) {
        //         this._addThreeComponent(frame.vertices, verticeIndex);
        //
        //         if (GeometryUtils.hasData(frame.normals)) {
        //             this._addDuplicateNormalOfAddedVertex(frame.normals, normalIndices, index, verticeIndex);
        //         }
        //     }
        // }

        // if (GeometryUtils.hasData(normals)) {
        //     this._addDuplicateNormalOfAddedVertex(normals, normalIndices, index, verticeIndex);
        //
        //     if (GeometryUtils.hasData(normalIndices)) {
        //         normalIndices[index] = verticeIndexOfAddedVertex;
        //     }
        // }

        //todo add duplicated colors

        container.appendChild(String(verticeIndex), [texCoordIndices[index], verticeIndexOfAddedVertex]);
    }

    private _addThreeComponent(data:Array<number>, index:number);
    // private _addThreeComponent(targetData:Array<number>, sourceData:Array<number>, index:number);

    private _addThreeComponent(...args) {
        // if (args.length === 2) {
            let data = args[0],
                index = args[1];

            data.push(
                data[index * 3],
                data[index * 3 + 1],
                data[index * 3 + 2]
            );
        // }
        // else {
        //     let targetData = args[0],
        //         sourceData = args[1],
        //         index = args[2];
        //
        //     targetData.push(
        //         sourceData[index * 3],
        //         sourceData[index * 3 + 1],
        //         sourceData[index * 3 + 2]
        //     );
        // }
    }

    private _getVerticeIndexOfAddedVertex(vertices) {
        return vertices.length / 3 - 1;
    }

    // private _addDuplicateNormalOfAddedVertex(normals, normalIndices, index, oldVerticeIndex) {
    //     if (!GeometryUtils.hasData(normalIndices)) {
    //         this._addThreeComponent(normals, normals, oldVerticeIndex);
    //
    //         return;
    //     }
    //
    //
    //     this._addThreeComponent(normals, normals, normalIndices[index]);
    // }

    private _parseObjectFromIndices({
        attributes,
        verticeIndices,
        normalIndices,
        texCoordIndices,
        colorIndices
    }) {
        var vertices = [],
            texCoords = [],
            faces = [],
            // face:Face3 = null,
            colors = [],
            sourceVertices = attributes.POSITION,
            sourceTexCoords = attributes.TEXCOORD,
            sourceNormals = attributes.NORMAL,
            sourceColors = attributes.COLOR,
            newIndices:Array<number> = [];

        for (let i = 0, len = verticeIndices.length; i < len; i += 3) {
            let aIndex = verticeIndices[i],
                bIndex = verticeIndices[i + 1],
                cIndex = verticeIndices[i + 2],
                indexArr = [i, i + 1, i + 2],
                verticeIndiceArr = [aIndex, bIndex, cIndex];

            newIndices = newIndices.concat(verticeIndiceArr);

            // face = Face3.create(aIndex, bIndex, cIndex);

            if (Utils.hasData(texCoordIndices) && Utils.hasData(sourceTexCoords)) {
                this._setTexCoord(texCoords, sourceTexCoords, texCoordIndices, indexArr, verticeIndiceArr);
            }

            // if (GeometryUtils.hasData(sourceNormals)) {
            //     this._setNormal(face.vertexNormals, sourceNormals, source.normalIndices, indexArr, verticeIndiceArr);
            // }

            // faces.push(face);
        }

        attributes.POSITION = sourceVertices;

        if (!Utils.hasData(texCoordIndices)) {
            attributes.TEXCOORD = sourceTexCoords;
        }
        else {
            attributes.TEXCOORD = texCoords;
        }

        attributes.COLOR = sourceColors;
        // source.faces = faces;

        // this._setMorphTargets(source, source.verticeIndices, source.normalIndices);

        return {
            attributes: attributes,
            indices: newIndices
        }
    }

    private _setTexCoord(targetTexCoords:Array<number>, sourceTexCoords:Array<number>, texCoordIndices:Array<number>, indexArr:Array<number>, verticeIndiceArr:Array<number>) {
        var texCoordIndice1 = null,
            texCoordIndice2 = null,
            texCoordIndice3 = null,
            [index1, index2, index3] = indexArr,
            [aIndex, bIndex, cIndex] = verticeIndiceArr;

        texCoordIndice1 = texCoordIndices[index1];
        texCoordIndice2 = texCoordIndices[index2];
        texCoordIndice3 = texCoordIndices[index3];

        this._setTwoComponentData(targetTexCoords, sourceTexCoords, aIndex, texCoordIndice1);
        this._setTwoComponentData(targetTexCoords, sourceTexCoords, bIndex, texCoordIndice2);
        this._setTwoComponentData(targetTexCoords, sourceTexCoords, cIndex, texCoordIndice3);
    }

    private _setTwoComponentData(targetData, sourceData, index, indice) {
        targetData[index * 2] = sourceData[indice * 2];
        targetData[index * 2 + 1] = sourceData[indice * 2 + 1];
    }
}

type SourceJsonData = {
    meshes: {
        [id:string]: {
            primitives: Array<SourcePrimitive>
        }
    };
}

type SourcePrimitive = {
    attributes: Attribute;
    verticeIndices:Array<number>;
    normalIndices:Array<number>;
    texCoordIndices:Array<number>;
    colorIndices:Array<number>;
}

type TargetJsonData = {
    meshes: {
        [id:string]: {
            primitives: Array<TargetPrimitive>
        }
    };
}

type TargetPrimitive = {
    attributes: Attribute;
    indices:Array<number>;
}

type Attribute = {
    POSITION:Array<number>;
    NORMAL?:Array<number>;
    TEXCOORD?:Array<number>;
    COLOR?:Array<number>;
}
