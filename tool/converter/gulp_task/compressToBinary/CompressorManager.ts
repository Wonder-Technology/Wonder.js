import {DataRecord, SourceJsonData, SourceMorphTarget, TargetJsonData} from "./TypeDefinition";

import path = require("path");
import fs = require("fs");


import ExtendUtils = require("../../../ts/ExtendUtils")

import {Utils} from "./Utils";


import BufferWriter = require("../../common/BufferWriter");
import Base64Utils = require("../../common/Base64Utils");

import Compressor = require("./Compressor");
import AnimationCompressor = require("./AnimationCompressor");
import AttributeCompressor = require("./AttributeCompressor");
import MorphTargetCompressor = require("./MorphTargetCompressor");
import SkinCompressor = require("./SkinCompressor");
import IndiceCompressor = require("./IndiceCompressor");

import {it, ensure} from "../../../ts/definition/typescript/decorator/contract"
import {expect} from "chai"

var base64Arraybuffer = require("base64-arraybuffer");
var bufferFrom = require("buffer-from");

export class CompressorManager {
    public static create() {
        var obj = new this();

        return obj;
    }

    private _animationCompressor:any = AnimationCompressor.create();
    private _attributeCompressor:any = AttributeCompressor.create();
    private _morphTargetCompressor:any = MorphTargetCompressor.create();
    private _skinCompressor:any = SkinCompressor.create();
    private _indiceCompressor:any = IndiceCompressor.create();

    public compress(fileName: string, binFileRelatedDir: string, sourceJson: SourceJsonData, absoluteSourceFileDir?:string, isEmbedded:boolean = false) {
        var targetJson: TargetJsonData = ExtendUtils.extendDeep(sourceJson);

        this._execAll("recordData", sourceJson);

        this._execAll("removeRepeatData");

        let buffersData = this._buildBuffersArr(fileName, isEmbedded, binFileRelatedDir);
        let bufferViewsJson = this._buildBufferViewsJson(buffersData.id);
        let accessorsData = this._buildAccessorsJson();

        this._buildJson(targetJson, buffersData.json, bufferViewsJson, accessorsData);

        if(isEmbedded){
            this._convertImageToBase64(targetJson, absoluteSourceFileDir);
        }

        return {
            buffer: buffersData.buffer,
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
            this._skinCompressor,
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

    private _buildBuffersArr(fileName: string, isEmbedded:boolean, binFileRelatedDir: string) {
        var json = {},
            uri: string = null,
            byteLength = this._getAllCompressors()
                .map((compressor:any) => {
                    return compressor.getBufferByteLength();
                })
                .reduce((previous, current) => {
                    return previous + current;
                }),
            bufferWriter = BufferWriter.create(byteLength),
            returnData:any = {};

        this._execAll("buildBuffersArr", bufferWriter);

        if(isEmbedded){
            uri = this._convertArrayBufferToBase64(bufferWriter.arraybuffer);

            returnData["buffer"] = null;
        }
        else{
            uri = path.join(binFileRelatedDir, `${fileName}.bin`);

            returnData["buffer"] = this._toBuffer(bufferWriter.arraybuffer);
        }

        json[fileName] = {
            byteLength: byteLength,
            type: "arraybuffer",
            uri: uri
        };

        returnData["id"] = fileName;
        returnData["uri"] = uri;
        returnData["json"] = json;

        return returnData;
    }

    private _convertArrayBufferToBase64(buffer:any) {
        return base64Arraybuffer.encode(buffer);
    }

    private _buildAccessorsJson() {
        var json = {},
            mappingTable = {},
            id = 0,
            accessorCount: number = null;

        this._animationCompressor.buildAccessorData(json, mappingTable, id);

        accessorCount = this._skinCompressor.buildAccessorData(json, mappingTable, id);

        id += accessorCount;

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
        return bufferFrom(arraybuffer);
    }

    private _parseWhere(where: string) {
        return where.split('%%');
    }

    private _convertImageToBase64(targetJson:TargetJsonData, absoluteSourceFileDir:string){
        if(!targetJson.images){
            return;
        }

        for(let id in targetJson.images) {
            if (targetJson.images.hasOwnProperty(id)) {
                let image = targetJson.images[id];

                if(!!image.uri){
                    let url = path.join(absoluteSourceFileDir,  image.uri);

                    if(!fs.existsSync(url)){
                        continue;
                    }

                    image.uri = Base64Utils.encode(url, `data:image/${path.extname(image.uri).slice(1)};base64, `);
                }
            }
        }
    }
}

