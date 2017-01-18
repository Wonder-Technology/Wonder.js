import {SourceJsonData, SourcePrimitive, TargetJsonData, TargetPrimitive, MorphTarget, Attribute} from "./TypeDefinition";

import wdCb = require("wonder-commonlib");

import Utils = require("./Utils")

import Vector3 = require("../../../ts/Vector3");

export = class ParseUtils {
    public static parseObjectFromIndices(primitiveData:SourcePrimitive) {
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
            sourceJoints = attributes.JOINT,
            sourceWeights = attributes.WEIGHT,
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

        if (Utils.hasData(sourceJoints)) {
            attributes.JOINT = sourceJoints;
        }

        if (Utils.hasData(sourceWeights)) {
            attributes.WEIGHT = sourceWeights;
        }

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

    private static _setMorphNormalsFromIndices(morphTargets, morphNormals, normalIndices, indexArr, verticeIndiceArr){
        for(let i = 0, len = morphTargets.length; i < len; i++){
            let frame = morphTargets[i];

            if(!!frame.normals){
                let normals = morphNormals[i] || [];

                this._setThreeComponentDataWhenParse(normals, frame.normals, normalIndices, indexArr, verticeIndiceArr);

                morphNormals[i] = normals;
            }
        }
    }

    private static _updateMorphNormalsOfMorphTargets(morphTargets, morphNormals){
        for(let i = 0, len = morphTargets.length; i < len; i++) {
            let frame = morphTargets[i];

            if (!!frame.normals) {
                frame.normals = morphNormals[i];
            }
        }
    }

    private static _setTwoComponentDataWhenParse(targetDatas:Array<number>, sourceDatas:Array<number>, dataIndices:Array<number>, indexArr:Array<number>, verticeIndiceArr:Array<number>) {
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

    private static _setThreeComponentDataWhenParse(targetDatas:Array<number>, sourceDatas:Array<number>, dataIndices:Array<number>, indexArr:Array<number>, verticeIndiceArr:Array<number>) {
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

    private static _setThreeComponentData(targetData, sourceData, index, indice) {
        targetData[index * 3] = sourceData[indice * 3];
        targetData[index * 3 + 1] = sourceData[indice * 3 + 1];
        targetData[index * 3 + 2] = sourceData[indice * 3 + 2];
    }

    private static _addNormalData(targetNormals:wdCb.Collection<any>|Array<number>, sourceNormals:Array<number>, normalIndiceArr:Array<number>) {
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

    private static _getThreeComponentData(sourceData:Array<number>, index:number) {
        var startIndex = 3 * index;

        return Vector3.create(
            sourceData[startIndex],
            sourceData[startIndex + 1],
            sourceData[startIndex + 2]
        );
    }

    private static _setTwoComponentData(targetData, sourceData, index, indice) {
        targetData[index * 2] = sourceData[indice * 2];
        targetData[index * 2 + 1] = sourceData[indice * 2 + 1];
    }
}

