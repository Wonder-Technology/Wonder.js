import {SourceJsonData, SourcePrimitive, TargetJsonData, TargetPrimitive, MorphTarget, Attribute} from "./TypeDefinition";

import wdCb = require("wonder-commonlib");

import Utils = require("./Utils")

import DuplicateVertexUtils = require("./DuplicateVertexUtils");
import ParseUtils = require("./ParseUtils");

import DataUtils = require("../../common/DataUtils");

import {it, requireInNodejs, ensure} from "../../../ts/definition/typescript/decorator/contract"
import {expect} from "chai"

import ExtendUtils = require("../../../ts/ExtendUtils")
import Log = wdCb.Log;


export class Converter {
    public static create() {
        var obj = new this();

        return obj;
    }

    @requireInNodejs(function(sourceJson:SourceJsonData){
        this._iteratePrimitivesFunc(sourceJson, (primitiveData, id) => {
            let len = primitiveData.verticeIndices.length;

            if (primitiveData.texCoordIndices && primitiveData.texCoordIndices.length > 0) {
                it(`id: ${id}, primitiveData.texCoordIndices.length:${primitiveData.texCoordIndices.length} !== primitiveData.verticeIndices.length:${len}`, () => {
                    expect(primitiveData.texCoordIndices.length).equals(len);
                });
            }

            if (primitiveData.normalIndices && primitiveData.normalIndices.length > 0) {
                it(`id: ${id}, primitiveData.normalIndices.length:${primitiveData.normalIndices.length} !== primitiveData.verticeIndices.length:${len}`, () => {
                    expect(primitiveData.normalIndices.length).equals(len);
                });
            }

            if (primitiveData.colorIndices && primitiveData.colorIndices.length > 0) {
                it(`id: ${id}, primitiveData.colorIndices.length:${primitiveData.colorIndices.length} !== primitiveData.verticeIndices.length:${len}`, () => {
                    expect(primitiveData.colorIndices.length).equals(len);
                });
            }

        });

        it("primitive->attribute->JOINT's length should === WEIGHT's length", () => {
            this._iteratePrimitivesFunc(sourceJson, (primitiveData) => {
                if(Utils.hasData(primitiveData.attributes.JOINT)){
                    expect(primitiveData.attributes.JOINT.length).equals(primitiveData.attributes.WEIGHT.length);
                }
            });
        }, this);
    })
    @ensure(function(targetJson:TargetJsonData, sourceJson:SourceJsonData, isRemoveNullData:boolean){
        it("joint data should has weight data", () => {
            this._iteratePrimitivesFunc(targetJson, (primitiveData) => {
                var joints = primitiveData.attributes.JOINT,
                    weights = primitiveData.attributes.WEIGHT;

                if(Utils.hasData(joints)){
                    for(let i = 0, len = joints.length; i < len; i++){
                        expect(
                            (joints[i] >= 0 && weights[i] > 0)
                            || (joints[i] < 0 && weights[i] == 0)
                        ).true;
                    }
                }
            });
        }, this);
    })
    /*!
     the texCoordIndices, normalIndices may not be corresponding to verticeIndices(so need duplicate vertex)
     */
    public convert(sourceJson:SourceJsonData, isRemoveNullData:boolean):TargetJsonData {
        var targetJson:TargetJsonData = ExtendUtils.extendDeep(sourceJson);

        targetJson.meshes = {};

        for(let key in sourceJson.meshes){
            if(sourceJson.meshes.hasOwnProperty(key)){
                let mesh = sourceJson.meshes[key],
                    newPrimitives:Array<TargetPrimitive> = [];

                for(let primitiveData of mesh.primitives){
                    if(this._hasNoIndiceData(primitiveData)){
                        wdCb.Log.warn("just skip the primitive which has no indices");
                        continue;
                    }

                    DuplicateVertexUtils.duplicateVertex(primitiveData);

                    newPrimitives.push(ParseUtils.parseObjectFromIndices(primitiveData));
                }

                targetJson.meshes[key] = {
                    primitives: newPrimitives
                };
            }
        }

        if(isRemoveNullData){
            DataUtils.removeNullData(targetJson);
        }

        return targetJson;
    }

    private _removeNullData(targetJson:TargetJsonData){
        for(let key in targetJson.meshes){
            if(targetJson.meshes.hasOwnProperty(key)){
                let mesh = targetJson.meshes[key];

                for(let primitiveData of mesh.primitives){
                    this._removeFieldWhoseDataAreAllNull(primitiveData, "indices");

                    for(let key in primitiveData.attributes) {
                        if (primitiveData.attributes.hasOwnProperty(key)) {
                            this._removeFieldWhoseDataAreAllNull(primitiveData.attributes, key);
                        }
                    }
                }
            }
        }
    }

    private _removeFieldWhoseDataAreAllNull(data:Object, fieldName:string){
        if(!data[fieldName]){
            return;
        }

        if(data[fieldName].filter((value:number) => {
                return value !== null && value !== void 0;
            }).length === 0){
            delete data[fieldName]
        }
    }

    private _hasNoIndiceData(primitiveData: SourcePrimitive) {
        return !Utils.hasData(primitiveData.verticeIndices)
            && !Utils.hasData(primitiveData.normalIndices)
            && !Utils.hasData(primitiveData.texCoordIndices);
    }

    private _iteratePrimitivesFunc(sourceJson:SourceJsonData, func:Function) {
        for(let key in sourceJson.meshes) {
            if (sourceJson.meshes.hasOwnProperty(key)) {
                let mesh = sourceJson.meshes[key];

                for (let primitiveData of mesh.primitives) {
                    func(primitiveData, key);
                }
            }
        }
    }
}
