import {DataRecord, SourceJsonData} from "./TypeDefinition";

import chai = require("chai");

import contract = require("../../../ts/definition/typescript/decorator/contract");

import BufferWriter = require("../../common/BufferWriter");
import JudgeUtils = require("../../../ts/JudgeUtils")
import {Utils} from "./Utils";

var it = contract.it,
    ensure = contract.ensure;

var expect = chai.expect;


export abstract class Compressor {
    public recordedArr:Array<DataRecord> = null;

    protected abstract get dataByteSize():number;

    protected bufferViewId:string = null;

    public abstract recordData(sourceJson: SourceJsonData):void;
    public abstract buildBuffersArr(bufferWriter:any):void;
    public abstract buildBufferViewsJson(json:any, bufferId: string, bufferViewId:number, length:number, offset:number):void;
    public abstract buildAccessorData(json:{
        [id: string]: Object
    }, mappingTable:Object, id:number):number;

    public removeRepeatData() {
        var recordedArr = this.recordedArr;

        for (let i = 0, len = recordedArr.length; i < len; i++) {
            let sourceItem: DataRecord = recordedArr[i];

            for (let j = i + 1; j < len; j++) {
                let targetItem: DataRecord = recordedArr[j];

                if (this._isRepeat(sourceItem.data, targetItem.data)) {
                    targetItem.data = sourceItem.where;
                }
            }
        }
    }

    public getBufferByteLength() {
        var length = 0,
            size = this.dataByteSize;

        this.recordedArr
            .filter((item: DataRecord) => {
                return JudgeUtils.isArrayExactly(item.data);
            })
            .forEach((item: DataRecord) => {
                length += size * item.data.length;
            });

        return length;
    }

    protected buildBufferViewsJsonHelper(json:any, bufferId: string, bufferViewId:number, length:number, offset:number, target?:number) {
        var actualBufferViewId = `bufferView_${String(bufferViewId)}`;

        if(!!target){
            json[actualBufferViewId] = {
                buffer: bufferId,
                byteLength: length,
                byteOffset: offset,
                target: target
            };
        }
        else{
            json[actualBufferViewId] = {
                buffer: bufferId,
                byteLength: length,
                byteOffset: offset
            };
        }

        this.bufferViewId = actualBufferViewId;
    }

    @ensure(function (returnVal, json: {
        [id: string]: Object
    }, mappingTable: Object, id:number, prefix?:string) {
        it("mappingTable should be valid", () => {
            for (let where in mappingTable) {
                if (mappingTable.hasOwnProperty(where)) {
                    expect(mappingTable[where]).be.a("string");
                }
            }
        });
    })
    protected buildAccessorDataHelper(json: {
        [id: string]: Object
    }, mappingTable: Object, id:number, prefix?:string) {
        var offset = 0,
            accessorCount = 0,
            recordedArr = this.recordedArr;

        for (let item of recordedArr) {
            if (JudgeUtils.isString(item.data)) {
                mappingTable[item.where] = mappingTable[<string>item.data];

                continue;
            }

            let count: number = item.data.length,
                accessorId: string = null;

            if (count === 0) {
                continue;
            }

            if(prefix){
                accessorId = `${prefix}Accessor_${String(id + accessorCount)}`;
            }
            else{
                accessorId = `accessor_${String(id + accessorCount)}`;
            }

            accessorCount++;

            json[accessorId] = {
                bufferView: this.bufferViewId,
                byteOffset: offset,
                count: this._computeAccessorCount(count, item.type),
                componentType: item.componentType,
                type: item.type
            };

            if(item.where){
                mappingTable[item.where] = accessorId;
            }

            offset += this.dataByteSize * count;
        }

        return accessorCount;
    }

    protected isArrayEmpty(data:string|Array<any>){
        return Utils.isArrayEmpty(data);
    }

    @ensure(function(count:number){
        it("accessor count should be int", () => {
            expect(count % 1).equal(0);
        });
    })
    private _computeAccessorCount(total: number, type: string) {
        var componentCount: number = null;

        switch (type) {
            case "VEC2":
                componentCount = 2;
                break;
            case "VEC3":
                componentCount = 3;
                break;
            case "VEC4":
                componentCount = 4;
                break;
            case "MAT2":
                componentCount = 4;
                break;
            case "MAT3":
                componentCount = 9;
                break;
            case "MAT4":
                componentCount = 16;
                break;
            default:
                componentCount = 1;
                break;
        }

        return total / componentCount;
    }

    private _isRepeat(arr1: Array<number>|string, arr2: Array<number>|string) {
        if (JudgeUtils.isString(arr1)
            || JudgeUtils.isString(arr2)) {
            return false;
        }

        if (arr1.length !== arr2.length
            || arr1.length === 0
        ) {
            return false;
        }

        for (let i = 0, len = arr1.length; i < len; i++) {
            if (arr1[i] !== arr2[i]) {
                return false;
            }
        }

        return true;
    }
}
