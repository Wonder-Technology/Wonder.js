import {DataRecord, SourceJsonData, SourceMorphTarget, TargetJsonData} from "./TypeDefinition";

import {it, ensure} from "../../../ts/definition/typescript/decorator/contract"
import {expect} from "chai"


import JudgeUtils = require("../../../ts/JudgeUtils")

import Compressor = require("./Compressor");

export = class SkinCompressor extends Compressor.Compressor{
    public static create() {
        var obj = new this();

        return obj;
    }

    protected get dataByteSize():number{
        return 4;
    }

    public recordData(sourceJson: SourceJsonData):void{
        var recordedArr:Array<DataRecord> = [];

        for (let id in sourceJson.skins) {
            if (sourceJson.skins.hasOwnProperty(id)) {
                let skin = sourceJson.skins[id];

                if(!!skin.inverseBindMatrices){
                    var inverseBindMatrices = skin.inverseBindMatrices;

                    this._record(inverseBindMatrices, recordedArr, id, "MAT4");
                }
            }
        }

        this.recordedArr = recordedArr;
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
        this.buildBufferViewsJsonHelper(json, bufferId, bufferViewId, length, offset);
    }

    private _record(data: Array<number>, arr: Array<DataRecord>, id:string, type: string) {
        arr.push({
            data: data,
            where: this._buildSkinWhere(id),
            componentType: 5126,
            type: type
        });
    }

    private _buildSkinWhere(id:string) {
        return `skins%%${id}%%inverseBindMatrices`;
    }
}

