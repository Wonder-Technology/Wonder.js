import wdCb = require("wdcb");

import Utils = require("./Utils")

import chai = require("chai");

import Vector3 = require("../../../ts/Vector3");

import DataUtils = require("../../common/DataUtils");

import contract = require("../../../ts/definition/typescript/decorator/contract");

import ExtendUtils = require("../../../ts/ExtendUtils")

var it = contract.it,
    requireInNodejs = contract.requireInNodejs;

var expect = chai.expect;

export class Converter {
    public static create() {
        var obj = new this();

        return obj;
    }

    /*!
     the texCoordIndices, normalIndices may not be corresponding to verticeIndices(so need duplicate vertex)
     */
    @requireInNodejs(function(sourceJson:SourceJsonData){
        it("each indice's count should be equal", () => {
            for(let key in sourceJson.meshes) {
                if (sourceJson.meshes.hasOwnProperty(key)) {
                    let mesh = sourceJson.meshes[key];

                    for (let primitiveData of mesh.primitives) {
                        let len = primitiveData.verticeIndices.length;

                        if (primitiveData.texCoordIndices && primitiveData.texCoordIndices.length > 0) {
                            expect(primitiveData.texCoordIndices.length).equal(len);
                        }

                        if (primitiveData.normalIndices && primitiveData.normalIndices.length > 0) {
                            expect(primitiveData.normalIndices.length).equal(len);
                        }

                        if (primitiveData.colorIndices && primitiveData.colorIndices.length > 0) {
                            expect(primitiveData.colorIndices.length).equal(len);
                        }
                    }
                }
            }
        });
    })
    public convert(sourceJson:SourceJsonData, isRemoveNullData:boolean):TargetJsonData {
        var targetJson:TargetJsonData = ExtendUtils.extendDeep(sourceJson);

        targetJson.meshes = {};

        for(let key in sourceJson.meshes){
            if(sourceJson.meshes.hasOwnProperty(key)){
                let mesh = sourceJson.meshes[key],
                    newPrimitives:Array<TargetPrimitive> = [];

                for(let primitiveData of mesh.primitives){
                    if(this._hasNoIndiceData(primitiveData)){
                        wdCb.Log.warn("just skip the primitive which has no indices");
                        continue;
                    }

                    this._duplicateVertex(primitiveData);
                    newPrimitives.push(this._parseObjectFromIndices(primitiveData));
                }

                targetJson.meshes[key] = {
                    primitives: newPrimitives
                };
            }
        }

        if(isRemoveNullData){
            DataUtils.removeNullData(targetJson);
        }

        return targetJson;
    }

    private _removeNullData(targetJson:TargetJsonData){
        for(let key in targetJson.meshes){
            if(targetJson.meshes.hasOwnProperty(key)){
                let mesh = targetJson.meshes[key];

                for(let primitiveData of mesh.primitives){
                    this._removeFieldWhoseDataAreAllNull(primitiveData, "indices");

                    for(let key in primitiveData.attributes) {
                        if (primitiveData.attributes.hasOwnProperty(key)) {
                            this._removeFieldWhoseDataAreAllNull(primitiveData.attributes, key);
                        }
                    }
                }
            }
        }
    }

    private _removeFieldWhoseDataAreAllNull(data:Object, fieldName:string){
        if(!data[fieldName]){
            return;
        }

        if(data[fieldName].filter((value:number) => {
                return value !== null && value !== void 0;
            }).length === 0){
            delete data[fieldName]
        }
    }

    private _hasNoIndiceData(primitiveData:SourcePrimitive)    {
        return !Utils.hasData(primitiveData.verticeIndices)
        && !Utils.hasData(primitiveData.normalIndices)
        && !Utils.hasData(primitiveData.texCoordIndices);
    }
    private _duplicateVertex(
        primitiveData:SourcePrimitive
    ){
        var vertices = primitiveData.attributes.POSITION;

        this._duplicateVertexWithDifferentAttributeData(vertices, primitiveData.morphTargets, primitiveData.verticeIndices, primitiveData.texCoordIndices);
        this._duplicateVertexWithDifferentAttributeData(vertices, primitiveData.morphTargets, primitiveData.verticeIndices, primitiveData.normalIndices);
        this._duplicateVertexWithDifferentAttributeData(vertices, primitiveData.morphTargets, primitiveData.verticeIndices, primitiveData.colorIndices);
    }


    private _duplicateVertexWithDifferentAttributeData(vertices:Array<number>, morphTargets:Array<MorphTarget>|undefined, verticeIndices:Array<number>, dataIndices:Array<number>) {
        var arr:Array<number|undefined> = [],
            container = wdCb.Hash.create<wdCb.Collection<Array<number>>>();

        if (!Utils.hasData(dataIndices)) {
            return;
        }

        for (var i = 0, len = verticeIndices.length; i < len; i++) {
            var verticeIndex = verticeIndices[i];

            if (this._isSameVertexWithDifferentDataByCompareToFirstOne(arr, dataIndices[i], verticeIndex)) {
                if (this._isDataIndiceEqualTheOneOfAddedVertex(container, verticeIndex, dataIndices[i])) {
                    verticeIndices[i] = this._getVerticeIndexOfAddedVertexByFindContainer(container, verticeIndex, dataIndices[i]);
                }
                else {
                    this._addVertexData(vertices, morphTargets, verticeIndices, dataIndices, container, verticeIndex, i);
                }

                verticeIndex = verticeIndices[i];
            }

            arr[verticeIndex] = dataIndices[i];
        }
    }

    private _isDataIndiceEqualTheOneOfAddedVertex(container, targetVerticeIndex, targetTexCoordIndex) {
        var data = container.getChild(String(targetVerticeIndex));

        if (!data) {
            return false;
        }

        return data.hasChildWithFunc(([texCoordIndex, verticeIndex]) => {
            return texCoordIndex === targetTexCoordIndex;
        });
    }

    private _getVerticeIndexOfAddedVertexByFindContainer(container, targetVerticeIndex, targetDataIndex) {
        var data = container.getChild(String(targetVerticeIndex));

        return data.findOne(([dataIndex, verticeIndex]) => {
            return dataIndex === targetDataIndex;
        })[1];
    }

    private _isSameVertexWithDifferentDataByCompareToFirstOne(arr, texCoordIndex, verticeIndex) {
        return arr[verticeIndex] !== void 0 && arr[verticeIndex] !== texCoordIndex;
    }

    private _addVertexData(vertices:Array<number>, morphTargets:Array<MorphTarget>|undefined, verticeIndices:Array<number>, dataIndices:Array<number>, container:wdCb.Hash<wdCb.Collection<Array<number>>>, verticeIndex:number, index:number) {
        var verticeIndexOfAddedVertex = null;

        this._addThreeComponent(vertices, verticeIndex);

        if(morphTargets !== void 0){
            for(let frame of morphTargets){
                this._addThreeComponent(frame.vertices, verticeIndex);
            }
        }

        verticeIndexOfAddedVertex = this._getVerticeIndexOfAddedVertex(vertices);

        verticeIndices[index] = verticeIndexOfAddedVertex;

        container.appendChild(String(verticeIndex), [dataIndices[index], verticeIndexOfAddedVertex]);
    }

    private _addThreeComponent(data:Array<number>, index:number) {
        data.push(
            data[index * 3],
            data[index * 3 + 1],
            data[index * 3 + 2]
        );
    }

    private _getVerticeIndexOfAddedVertex(vertices) {
        return vertices.length / 3 - 1;
    }

    private _parseObjectFromIndices(
        primitiveData:SourcePrimitive
    ) {
        var texCoords = [],
            normals = [],
            morphNormals:Array<Array<number>> = [],
            colors = [],
            attributes = primitiveData.attributes,
            morphTargets = primitiveData.morphTargets,
            verticeIndices = primitiveData.verticeIndices,
            normalIndices = primitiveData.normalIndices,
            texCoordIndices = primitiveData.texCoordIndices,
            colorIndices = primitiveData.colorIndices,
            sourceVertices = attributes.POSITION,
            sourceTexCoords = attributes.TEXCOORD,
            sourceNormals = attributes.NORMAL,
            sourceColors = attributes.COLOR,
            material = primitiveData.material,
            mode = primitiveData.mode,
            name = primitiveData.name,
            newIndices:Array<number> = [];

        for (let i = 0, len = verticeIndices.length; i < len; i += 3) {
            let aIndex = verticeIndices[i],
                bIndex = verticeIndices[i + 1],
                cIndex = verticeIndices[i + 2],
                indexArr = [i, i + 1, i + 2],
                verticeIndiceArr = [aIndex, bIndex, cIndex];

            newIndices = newIndices.concat(verticeIndiceArr);

            if (Utils.hasData(texCoordIndices) && Utils.hasData(sourceTexCoords)) {
                this._setTwoComponentDataWhenParse(texCoords, sourceTexCoords, texCoordIndices, indexArr, verticeIndiceArr);
            }

            if (Utils.hasData(normalIndices) && Utils.hasData(sourceNormals)) {
                this._setThreeComponentDataWhenParse(normals, sourceNormals, normalIndices, indexArr, verticeIndiceArr);

                if(morphTargets !== void 0){
                    this._setMorphNormalsFromIndices(morphTargets, morphNormals, normalIndices, indexArr, verticeIndiceArr);
                }
            }

            if (Utils.hasData(colorIndices) && Utils.hasData(sourceColors)) {
                this._setThreeComponentDataWhenParse(colors, sourceColors, colorIndices, indexArr, verticeIndiceArr);
            }
        }

        attributes.POSITION = sourceVertices;

        if (!Utils.hasData(texCoordIndices)) {
            attributes.TEXCOORD = sourceTexCoords;
        }
        else {
            attributes.TEXCOORD = texCoords;
        }

        if (!Utils.hasData(normalIndices)) {
            attributes.NORMAL = sourceNormals;
        }
        else {
            attributes.NORMAL = normals;
        }

        if (!Utils.hasData(colorIndices)) {
            attributes.COLOR = sourceColors;
        }
        else {
            attributes.COLOR = colors;
        }

        let result:TargetPrimitive = <any>{
            attributes: attributes,
            indices: newIndices
        };

        if(morphTargets !== void 0){
            this._updateMorphNormalsOfMorphTargets(morphTargets, morphNormals);

            result.morphTargets = morphTargets;
        }

        if(!!material){
            result.material = material;
        }

        if(!!mode){
            result.mode = mode;
        }

        if(!!name){
            result.name = name;
        }

        return result;
    }

    private _setMorphNormalsFromIndices(morphTargets, morphNormals, normalIndices, indexArr, verticeIndiceArr){
        for(let i = 0, len = morphTargets.length; i < len; i++){
            let frame = morphTargets[i];

            if(!!frame.normals){
                let normals = morphNormals[i] || [];

                this._setThreeComponentDataWhenParse(normals, frame.normals, normalIndices, indexArr, verticeIndiceArr);

                morphNormals[i] = normals;
            }
        }
    }

    private _updateMorphNormalsOfMorphTargets(morphTargets, morphNormals){
        for(let i = 0, len = morphTargets.length; i < len; i++) {
            let frame = morphTargets[i];

            if (!!frame.normals) {
                frame.normals = morphNormals[i];
            }
        }
    }

    private _setTwoComponentDataWhenParse(targetDatas:Array<number>, sourceDatas:Array<number>, dataIndices:Array<number>, indexArr:Array<number>, verticeIndiceArr:Array<number>) {
        var dataIndice1 = null,
            dataIndice2 = null,
            dataIndice3 = null,
            [index1, index2, index3] = indexArr,
            [aIndex, bIndex, cIndex] = verticeIndiceArr;

        dataIndice1 = dataIndices[index1];
        dataIndice2 = dataIndices[index2];
        dataIndice3 = dataIndices[index3];

        this._setTwoComponentData(targetDatas, sourceDatas, aIndex, dataIndice1);
        this._setTwoComponentData(targetDatas, sourceDatas, bIndex, dataIndice2);
        this._setTwoComponentData(targetDatas, sourceDatas, cIndex, dataIndice3);
    }

    private _setThreeComponentDataWhenParse(targetDatas:Array<number>, sourceDatas:Array<number>, dataIndices:Array<number>, indexArr:Array<number>, verticeIndiceArr:Array<number>) {
        var dataIndice1 = null,
            dataIndice2 = null,
            dataIndice3 = null,
            [index1, index2, index3] = indexArr,
            [aIndex, bIndex, cIndex] = verticeIndiceArr;

        dataIndice1 = dataIndices[index1];
        dataIndice2 = dataIndices[index2];
        dataIndice3 = dataIndices[index3];

        this._setThreeComponentData(targetDatas, sourceDatas, aIndex, dataIndice1);
        this._setThreeComponentData(targetDatas, sourceDatas, bIndex, dataIndice2);
        this._setThreeComponentData(targetDatas, sourceDatas, cIndex, dataIndice3);
    }

    private _setThreeComponentData(targetData, sourceData, index, indice) {
        targetData[index * 3] = sourceData[indice * 3];
        targetData[index * 3 + 1] = sourceData[indice * 3 + 1];
        targetData[index * 3 + 2] = sourceData[indice * 3 + 2];
    }

    private _addNormalData(targetNormals:wdCb.Collection<any>|Array<number>, sourceNormals:Array<number>, normalIndiceArr:Array<number>) {
        let [aIndex, bIndex, cIndex] = normalIndiceArr;

        if (targetNormals instanceof wdCb.Collection) {
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

    private _getThreeComponentData(sourceData:Array<number>, index:number) {
        var startIndex = 3 * index;

        return Vector3.create(
            sourceData[startIndex],
            sourceData[startIndex + 1],
            sourceData[startIndex + 2]
        );
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
    morphTargets?: Array<MorphTarget>;
    verticeIndices:Array<number>;
    normalIndices:Array<number>;
    texCoordIndices:Array<number>;
    colorIndices:Array<number>;
    material:string;
    mode:number;
    name:string;
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
    morphTargets?: Array<MorphTarget>;
    indices:Array<number>;
    material:string;
    mode:number;
    name:string;
}


type MorphTarget = {
    name:string;
    vertices:Array<number>;
    normals?:Array<number>;
}

type Attribute = {
    POSITION:Array<number>;
    NORMAL?:Array<number>;
    TEXCOORD?:Array<number>;
    COLOR?:Array<number>;
}

