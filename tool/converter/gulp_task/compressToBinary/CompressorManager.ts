import {DataRecord, SourceJsonData, SourceMorphTarget, TargetJsonData} from "./TypeDefinition";

declare var Buffer:any;

import path = require("path");

import chai = require("chai");

import contract = require("../../../ts/definition/typescript/decorator/contract");

import ExtendUtils = require("../../../ts/ExtendUtils")

import {Utils} from "./Utils";


import BufferWriter = require("../../common/BufferWriter");

import Compressor = require("./Compressor");
import AnimationCompressor = require("./AnimationCompressor");
import AttributeCompressor = require("./AttributeCompressor");
import MorphTargetCompressor = require("./MorphTargetCompressor");
import IndiceCompressor = require("./IndiceCompressor");

var it = contract.it,
    ensure = contract.ensure;

var expect = chai.expect;

export class CompressorManager {
    public static create() {
        var obj = new this();

        return obj;
    }

    private _animationCompressor:any = AnimationCompressor.create();
    private _attributeCompressor:any = AttributeCompressor.create();
    private _morphTargetCompressor:any = MorphTargetCompressor.create();
    private _indiceCompressor:any = IndiceCompressor.create();

    public compress(fileName: string, binFileRelatedDir: string, sourceJson: SourceJsonData) {
        var targetJson: TargetJsonData = ExtendUtils.extendDeep(sourceJson);

        this._execAll("recordData", sourceJson);

        this._execAll("removeRepeatData");

        let buffersData = this._buildBuffersArr(fileName, binFileRelatedDir);
        let bufferViewsJson = this._buildBufferViewsJson(buffersData.id);
        let accessorsData = this._buildAccessorsJson();

        this._buildJson(targetJson, buffersData.json, bufferViewsJson, accessorsData);

        return {
            buffer: this._toBuffer(buffersData.arraybuffer),
            uri: buffersData.uri,
            json: targetJson
        }
    }

    private _execAll(func, ...args){
        for(let compressor of this._getAllCompressors()){
            compressor[func].apply(compressor, args);
        }
    }

    private _getAllCompressors(){
        return [
            this._animationCompressor,
            this._indiceCompressor,
            this._attributeCompressor,
            this._morphTargetCompressor
        ];
    }

    private _buildBufferViewsJson(bufferId: string) {
        var json = {},
            length: number = null,
            id = 0,
            offset = 0;

        this._getAllCompressors().forEach((compressor:any) => {
            length = compressor.getBufferByteLength();

            if(length > 0){
                compressor.buildBufferViewsJson(json, bufferId, id, length, offset);

                id++;
                offset += length;
            }
        });

        return json;
    }

    private _buildBuffersArr(fileName: string, binFileRelatedDir: string) {
        var json = {},
            uri: string = null,
            byteLength = this._getAllCompressors()
                .map((compressor:any) => {
                    return compressor.getBufferByteLength();
                })
                .reduce((previous, current) => {
                    return previous + current;
                }),
            bufferWriter = BufferWriter.create(byteLength);

        this._execAll("buildBuffersArr", bufferWriter);

        uri = path.join(binFileRelatedDir, `${fileName}.bin`);

        json[fileName] = {
            byteLength: byteLength,
            type: "arraybuffer",
            uri: uri
        };

        return {
            id: fileName,
            uri: uri,
            arraybuffer: bufferWriter.arraybuffer,
            json: json
        }
    }

    private _buildAccessorsJson() {
        var json = {},
            mappingTable = {},
            id = 0,
            accessorCount: number = null;

        this._animationCompressor.buildAccessorData(json, mappingTable, id);

        accessorCount = this._indiceCompressor.buildAccessorData(json, mappingTable, id);

        id += accessorCount;

        accessorCount = this._attributeCompressor.buildAccessorData(json, mappingTable, id);

        id += accessorCount;

        accessorCount = this._morphTargetCompressor.buildAccessorData(json, mappingTable, id);

        return {
            json: json,
            mappingTable: mappingTable
        }
    }

    @ensure(function(returnVal, targetJson:TargetJsonData, buffersJson:Object, bufferViewsJson:Object, {json, mappingTable}){
        it("all primitives->attributes and indices should be replaced with accessorId", () => {
            for(let where in mappingTable) {
                if (mappingTable.hasOwnProperty(where)) {
                    expect(mappingTable[where]).be.a("string");
                }
            }
        });
    })
    private _buildJson(targetJson:TargetJsonData, buffersJson:{
        [id:string]: Object
    }, bufferViewsJson:{
        [id:string]: Object
    }, {json, mappingTable}){
        targetJson.buffers = buffersJson;
        targetJson.bufferViews = bufferViewsJson;
        targetJson.accessors = json;

        for(let where in mappingTable){
            if(mappingTable.hasOwnProperty(where)){
                let accessorId = mappingTable[where],
                    whereDataArr = this._parseWhere(where),
                    data = targetJson,
                    i = 0;

                for(let len = whereDataArr.length - 1; i < len; i++){
                    data = data[whereDataArr[i]];
                }

                data[whereDataArr[i]] = accessorId;
            }
        }

        this._removeEmptyPrimitiveData(targetJson);
    }

    private _removeEmptyPrimitiveData(targetJson:TargetJsonData){
        for(let id in targetJson.meshes) {
            if (targetJson.meshes.hasOwnProperty(id)) {
                let mesh = targetJson.meshes[id];

                for (let primitiveData of mesh.primitives) {
                    if (Utils.isArrayEmpty(primitiveData.indices)) {
                        delete primitiveData.indices;
                    }

                    for (let key in primitiveData.attributes) {
                        if (primitiveData.attributes.hasOwnProperty(key)) {
                            if (Utils.isArrayEmpty(primitiveData.attributes[key])) {
                                delete primitiveData.attributes[key];
                            }
                        }
                    }

                    //todo test
                    if(Utils.hasData(primitiveData.morphTargets)){
                        for(let frame of primitiveData.morphTargets){
                            if (Utils.isArrayEmpty(frame.vertices)) {
                                delete frame.vertices;
                            }

                            if (!!frame.normals
                                && Utils.isArrayEmpty(frame.normals)) {
                                delete frame.normals;
                            }
                        }
                    }
                }
            }
        }
    }

    private _toBuffer(arraybuffer:ArrayBuffer) {
        return Buffer.from(arraybuffer);
    }

    private _parseWhere(where: string) {
        return where.split('%%');
    }
}

