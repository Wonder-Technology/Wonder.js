import {DataRecord, SourceJsonData, SourceMorphTarget, TargetJsonData} from "./TypeDefinition";

import chai = require("chai");

import contract = require("../../../ts/definition/typescript/decorator/contract");

import {Utils} from "./Utils";

import JudgeUtils = require("../../../ts/JudgeUtils")

import Compressor = require("./Compressor");

var it = contract.it,
    ensure = contract.ensure;

var expect = chai.expect;

export = class MorphTargetCompressor extends Compressor.Compressor{
    public static create() {
        var obj = new this();

        return obj;
    }

    protected get dataByteSize():number{
        return 4;
    }

    public recordData(sourceJson: SourceJsonData):void{
        var recordedMorphTargetArr:Array<DataRecord> = [];

        for (let id in sourceJson.meshes) {
            if (sourceJson.meshes.hasOwnProperty(id)) {
                let mesh = sourceJson.meshes[id];

                for (let i = 0, len = mesh.primitives.length; i < len; i++) {
                    let primitiveData = mesh.primitives[i],
                        morphTargets = primitiveData.morphTargets;

                    if (Utils.hasData(morphTargets)) {
                        this._recordMorphTargets(morphTargets, recordedMorphTargetArr, id, i);
                    }
                }
            }
        }

        this.recordedArr = recordedMorphTargetArr;
    }

    public buildBuffersArr(bufferWriter:any) {
        this.recordedArr
            .filter((item: DataRecord) => {
                return JudgeUtils.isArrayExactly(item.data);
            })
            .forEach((item: DataRecord) => {
                for (let value of item.data) {
                    bufferWriter.writeFloat(<number>value);
                }
            });
    }

    public buildBufferViewsJson(json:any, bufferId: string, bufferViewId:number, length:number, offset:number) {
        this.buildBufferViewsJsonHelper(json, bufferId, bufferViewId, length, offset, 34962);
    }

    public buildAccessorData(json:{
        [id: string]: Object
    }, mappingTable:Object, id:number) {
        if(!this.isArrayEmpty(this.recordedArr)){
            return this.buildAccessorDataHelper(json, mappingTable, id);
        }

        return 0;
    }

    private _recordMorphTargets(morphTargets:Array<SourceMorphTarget>, arr: Array<DataRecord>, meshId: string, primitiveIndex: number){
        for(let i = 0, len = morphTargets.length; i < len; i++){
            let frame = morphTargets[i];

            arr.push({
                data: frame.vertices,
                where: this._buildMorphTargetsWhere(meshId, primitiveIndex, i, "vertices"),
                componentType: 5126,
                type: "VEC3"
            });

            if(!!frame.normals){
                arr.push({
                    data: frame.normals,
                    where: this._buildMorphTargetsWhere(meshId, primitiveIndex, i, "normals"),
                    componentType: 5126,
                    type: "VEC3"
                });
            }
        }
    }

    private _buildMorphTargetsWhere(meshId: string, primitiveIndex: number, index:number, type:"vertices"|"normals") {
        return `meshes%%${meshId}%%primitives%%${String(primitiveIndex)}%%morphTargets%%${index}%%${type}`;
    }
}
