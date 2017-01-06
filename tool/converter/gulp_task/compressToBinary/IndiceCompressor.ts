import {DataRecord, SourceJsonData, SourceMorphTarget, TargetJsonData} from "./TypeDefinition";

import {Utils} from "./Utils";

import JudgeUtils = require("../../../ts/JudgeUtils")

import Compressor = require("./Compressor");

import {it, ensure} from "../../../ts/definition/typescript/decorator/contract"
import {expect} from "chai"

export = class IndiceCompressor extends Compressor.Compressor{
    public static create() {
        var obj = new this();

        return obj;
    }

    protected get dataByteSize():number{
        return 2;
    }

    public recordData(sourceJson: SourceJsonData):void{
        var recordedIndiceArr:Array<DataRecord> = [];

        for (let id in sourceJson.meshes) {
            if (sourceJson.meshes.hasOwnProperty(id)) {
                let mesh = sourceJson.meshes[id];

                for (let i = 0, len = mesh.primitives.length; i < len; i++) {
                    let primitiveData = mesh.primitives[i];


                    if (Utils.hasData(primitiveData.indices)) {
                        this._recordIndice(primitiveData.indices, recordedIndiceArr, id, i, "SCALAR");
                    }
                }
            }
        }

        this.recordedArr = recordedIndiceArr;
    }

    public buildBuffersArr(bufferWriter:any) {
        this.recordedArr
            .filter((item: DataRecord) => {
                return JudgeUtils.isArrayExactly(item.data);
            })
            .forEach((item: DataRecord) => {
                for (let value of item.data) {
                    bufferWriter.writeUInt16(<number>value);
                }
            });
    }

    public buildBufferViewsJson(json:any, bufferId: string, bufferViewId:number, length:number, offset:number) {
        this.buildBufferViewsJsonHelper(json, bufferId, bufferViewId, length, offset, 34963);
    }

    private _recordIndice(data: Array<number>, arr: Array<DataRecord>, meshId: string, primitiveIndex: number, type: string) {
        arr.push({
            data: data,
            where: this._buildIndiceWhere(meshId, primitiveIndex),
            componentType: 5123,
            type: type
        });
    }

    private _buildIndiceWhere(meshId: string, primitiveIndex: number) {
        return `meshes%%${meshId}%%primitives%%${String(primitiveIndex)}%%indices`;
    }
}
