import {DataRecord, SourceJsonData, SourceMorphTarget, TargetJsonData} from "./TypeDefinition";

import chai = require("chai");

import contract = require("../../../ts/definition/typescript/decorator/contract");

import {Utils} from "./Utils";

import JudgeUtils = require("../../../ts/JudgeUtils")

import Compressor = require("./Compressor");

var it = contract.it,
    ensure = contract.ensure;

var expect = chai.expect;

export = class AttributeCompressor extends Compressor.Compressor{
    public static create() {
        var obj = new this();

        return obj;
    }

    protected get dataByteSize():number{
        return 4;
    }

    public recordData(sourceJson: SourceJsonData):void{
        var recordedAttributeArr:Array<DataRecord> = [];

        for (let id in sourceJson.meshes) {
            if (sourceJson.meshes.hasOwnProperty(id)) {
                let mesh = sourceJson.meshes[id];

                for (let i = 0, len = mesh.primitives.length; i < len; i++) {
                    let primitiveData = mesh.primitives[i],
                        {
                            POSITION,
                            NORMAL,
                            TEXCOORD,
                            COLOR
                        } = primitiveData.attributes;

                    if (Utils.hasData(POSITION)) {
                        this._recordAttribute(POSITION, recordedAttributeArr, id, i, "POSITION", "VEC3");
                    }

                    if (Utils.hasData(NORMAL)) {
                        this._recordAttribute(NORMAL, recordedAttributeArr, id, i, "NORMAL", "VEC3");
                    }

                    if (Utils.hasData(TEXCOORD)) {
                        this._recordAttribute(TEXCOORD, recordedAttributeArr, id, i, "TEXCOORD", "VEC2");
                    }

                    if (Utils.hasData(COLOR)) {
                        this._recordAttribute(COLOR, recordedAttributeArr, id, i, "COLOR", "VEC3");
                    }
                    //
                    // if (Utils.hasData(primitiveData.indices)) {
                    //     this._recordIndice(primitiveData.indices, recordedIndiceArr, id, i, "SCALAR");
                    // }
                }
            }
        }

        this.recordedArr = recordedAttributeArr;
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
        // var json = {},
        //     length: number = null,
        //     id = 0,
        //     offset = 0,
        //     animationBufferViewId: string = null,
        //     indiceBufferViewId: string = null,
        //     attributeBufferViewId: string = null,
        //     morphTargetBufferViewId: string = null;

        // length = this._getBufferByteLength(recordedAttributeArr, this._attributeDataByteSize);


        // // if(length > 0) {
        //     attributeBufferViewId = `bufferView_${bufferViewId}`;
        //
        //     json[attributeBufferViewId] = {
        //         buffer: bufferId,
        //         byteLength: length,
        //         byteOffset: offset,
        //         target: 34962
        //     };
        //
        //     // id++;
        //     // offset += length;
        // // }

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

    private _recordAttribute(data: Array<number>, arr: Array<DataRecord>, meshId: string, primitiveIndex: number, attributeName: string, type: string) {
        arr.push({
            data: data,
            where: this._buildAttributeWhere(meshId, primitiveIndex, attributeName),
            componentType: 5126,
            type: type
        });
    }

    private _buildAttributeWhere(meshId: string, primitiveIndex: number, attributeName: string) {
        return `meshes%%${meshId}%%primitives%%${String(primitiveIndex)}%%attributes%%${attributeName}`;
    }
}
