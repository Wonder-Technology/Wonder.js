import {SourceJsonData, SourcePrimitive, TargetJsonData, TargetPrimitive, MorphTarget, Attribute} from "./TypeDefinition";

import wdCb = require("wonder-commonlib");

import Utils = require("./Utils")

export = class DuplicateVertexUtils {
    public static duplicateVertex(primitiveData:SourcePrimitive) {
        var vertices = primitiveData.attributes.POSITION,
            morphTargets = primitiveData.morphTargets,
            joints = primitiveData.attributes.JOINT,
            weights = primitiveData.attributes.WEIGHT;

        this._duplicateVertexWithDifferentAttributeData(vertices, morphTargets, joints, weights, primitiveData.verticeIndices, primitiveData.texCoordIndices);
        this._duplicateVertexWithDifferentAttributeData(vertices, morphTargets, joints, weights, primitiveData.verticeIndices, primitiveData.normalIndices);
        this._duplicateVertexWithDifferentAttributeData(vertices, morphTargets, joints, weights, primitiveData.verticeIndices, primitiveData.colorIndices);
    }

    private static _duplicateVertexWithDifferentAttributeData(vertices:Array<number>, morphTargets:Array<MorphTarget>|undefined, joints:Array<number>|undefined, weights:Array<number>|undefined, verticeIndices:Array<number>, dataIndices:Array<number>) {
        var arr:Array<number|undefined> = [],
            container = wdCb.Hash.create<wdCb.Collection<Array<number>>>();

        if (!Utils.hasData(dataIndices)) {
            return;
        }

        for (let i = 0, len = verticeIndices.length; i < len; i++) {
            let verticeIndex = verticeIndices[i];

            if (this._isSameVertexWithDifferentDataByCompareToFirstOne(arr, dataIndices[i], verticeIndex)) {
                if (this._isDataIndiceEqualTheOneOfAddedVertex(container, verticeIndex, dataIndices[i])) {
                    verticeIndices[i] = this._getVerticeIndexOfAddedVertexByFindContainer(container, verticeIndex, dataIndices[i]);
                }
                else {
                    this._addVertexData(vertices, morphTargets, joints, weights, verticeIndices, dataIndices, container, verticeIndex, i);
                }

                verticeIndex = verticeIndices[i];
            }

            arr[verticeIndex] = dataIndices[i];
        }
    }

    private static _isDataIndiceEqualTheOneOfAddedVertex(container, targetVerticeIndex, targetTexCoordIndex) {
        var data = container.getChild(String(targetVerticeIndex));

        if (!data) {
            return false;
        }

        return data.hasChildWithFunc(([texCoordIndex, verticeIndex]) => {
            return texCoordIndex === targetTexCoordIndex;
        });
    }

    private static _getVerticeIndexOfAddedVertexByFindContainer(container, targetVerticeIndex, targetDataIndex) {
        var data = container.getChild(String(targetVerticeIndex));

        return data.findOne(([dataIndex, verticeIndex]) => {
            return dataIndex === targetDataIndex;
        })[1];
    }

    private static _isSameVertexWithDifferentDataByCompareToFirstOne(arr, texCoordIndex, verticeIndex) {
        return arr[verticeIndex] !== void 0 && arr[verticeIndex] !== texCoordIndex;
    }

    private static _addVertexData(vertices:Array<number>, morphTargets:Array<MorphTarget>|undefined, joints:Array<number>|undefined, weights:Array<number>|undefined, verticeIndices:Array<number>, dataIndices:Array<number>, container:wdCb.Hash<wdCb.Collection<Array<number>>>, verticeIndex:number, index:number) {
        var verticeIndexOfAddedVertex = null;

        this._addThreeComponent(vertices, verticeIndex);

        if(morphTargets !== void 0){
            for(let frame of morphTargets){
                this._addThreeComponent(frame.vertices, verticeIndex);
            }
        }

        if(joints !== void 0){
            this._addFourComponent(joints, verticeIndex);
        }

        if(weights !== void 0){
            this._addFourComponent(weights, verticeIndex);
        }

        verticeIndexOfAddedVertex = this._getVerticeIndexOfAddedVertex(vertices);

        verticeIndices[index] = verticeIndexOfAddedVertex;

        container.appendChild(String(verticeIndex), [dataIndices[index], verticeIndexOfAddedVertex]);
    }

    private static _addThreeComponent(data:Array<number>, index:number) {
        data.push(
            data[index * 3],
            data[index * 3 + 1],
            data[index * 3 + 2]
        );
    }

    private static _addFourComponent(data:Array<number>, index:number) {
        data.push(
            data[index * 4],
            data[index * 4 + 1],
            data[index * 4 + 2],
            data[index * 4 + 3]
        );
    }

    private static _getVerticeIndexOfAddedVertex(vertices:Array<number>) {
        return vertices.length / 3 - 1;
    }
}

