import {DataRecord, SourceJsonData, SourceMorphTarget, TargetJsonData} from "./TypeDefinition";


import chai = require("chai");

import contract = require("../../../ts/definition/typescript/decorator/contract");


import JudgeUtils = require("../../../ts/JudgeUtils")

import Compressor = require("./Compressor");

var it = contract.it,
    ensure = contract.ensure;

var expect = chai.expect;

export = class AnimationCompressor extends Compressor.Compressor{
    public static create() {
        var obj = new this();

        return obj;
    }

    protected get dataByteSize():number{
        return 4;
    }

    public recordData(sourceJson: SourceJsonData):void{
        var recoredAnimationArr:Array<DataRecord> = [];

        for (let id in sourceJson.animations) {
            if (sourceJson.animations.hasOwnProperty(id)) {
                let animation = sourceJson.animations[id];

                for (let name in animation.parameters) {
                    if (animation.parameters.hasOwnProperty(name)) {
                        let data = animation.parameters[name],
                            type:string = null;

                        if(name.indexOf("TIME") > -1){
                            type = "SCALAR";
                        }
                        else if(name.indexOf("rotation") > -1){
                            type = "VEC4";
                        }
                        else if(name.indexOf("translation") > -1 || name.indexOf("scale") > -1){
                            type = "VEC3";
                        }

                        this._recordAnimation(data, recoredAnimationArr, id, name, type);
                    }
                }
            }
        }

        this.recordedArr = recoredAnimationArr;
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

    public buildAccessorData(json:{
        [id: string]: Object
    }, mappingTable:Object, id:number) {
        if(!this.isArrayEmpty(this.recordedArr)){
            return this.buildAccessorDataHelper(json, mappingTable, id, "anim");
        }

        return 0;
    }

    private _recordAnimationData(sourceJson: SourceJsonData){
        var recoredAnimationArr:Array<DataRecord> = [];

        for (let id in sourceJson.animations) {
            if (sourceJson.animations.hasOwnProperty(id)) {
                let animation = sourceJson.animations[id];

                for (let name in animation.parameters) {
                    if (animation.parameters.hasOwnProperty(name)) {
                        let data = animation.parameters[name],
                            type:string = null;

                        if(name.indexOf("TIME") > -1){
                            type = "SCALAR";
                        }
                        else if(name.indexOf("rotation") > -1){
                            type = "VEC4";
                        }
                        else if(name.indexOf("translation") > -1 || name.indexOf("scale") > -1){
                            type = "VEC3";
                        }

                        this._recordAnimation(data, recoredAnimationArr, id, name, type);
                    }
                }
            }
        }

        return recoredAnimationArr;
    }

    private _recordAnimation(data: Array<number>, arr: Array<DataRecord>, id:string, name:string, type: string) {
        arr.push({
            data: data,
            where: this._buildAnimationWhere(id, name),
            componentType: 5126,
            type: type
        });
    }

    private _buildAnimationWhere(id: string, name: string) {
        return `animations%%${id}%%parameters%%${name}`;
    }
}
