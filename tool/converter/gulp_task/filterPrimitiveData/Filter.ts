import wdCb = require("wdcb");

// import Utils = require("./Utils")

// import chai = require("chai");

// import Vector3 = require("../../../ts/Vector3");

// import contract = require("../../../ts/definition/typescript/decorator/contract");

import ExtendUtils = require("../../../ts/ExtendUtils")

import JudgeUtils = require("../../../ts/JudgeUtils")

// var it = contract.it,
//     requireInNodejs = contract.requireInNodejs;
//
// var expect = chai.expect;

export class Filter {
    public static create() {
        var obj = new this();

        return obj;
    }

    public filter(sourceJson:JsonData):JsonData {
        var targetJson:JsonData = ExtendUtils.extendDeep(sourceJson);

        targetJson.meshes = {};

        for(let key in sourceJson.meshes){
            if(sourceJson.meshes.hasOwnProperty(key)){
                let mesh = sourceJson.meshes[key],
                    newPrimitives:Array<Primitive> = [];

                for(let primitiveData of mesh.primitives){
                    newPrimitives.push(this._filterByIndices(primitiveData));
                }

                targetJson.meshes[key] = {
                    primitives: newPrimitives
                };
            }
        }

        return targetJson;
    }

    private _filterByIndices(primitiveData:Primitive):Primitive{
        var indices = primitiveData.indices,
            attributes = primitiveData.attributes,
            newPosition = [],
            newNormal = [],
            newTexCoord = [],
            newColor = [],
            newIndices = [],
            newPrimitive = null,
            index = 0,
            // map = wdCb.Hash.create<Array<number>>();
            map = wdCb.Hash.create<number>();

        for(let indice of indices){
            if(!map.hasChild(String(indice))){
                this._addAttributeData(newPosition, attributes.POSITION, indice, 3);

                if(!!attributes.NORMAL){
                    this._addAttributeData(newNormal, attributes.NORMAL, indice, 3);
                }

                if(!!attributes.TEXCOORD){
                    this._addAttributeData(newTexCoord, attributes.TEXCOORD, indice, 2);
                }

                if(!!attributes.COLOR){
                    this._addAttributeData(newColor, attributes.COLOR, indice, 3);
                }

                map.addChild(String(indice), index);

                index++;
            }
        }

        for(let indice of indices){
            newIndices.push(
                map.getChild(String(indice))
            )
        }

        newPrimitive = {
            attributes:{
            },
            indices:newIndices
        };

        this._addData(newPrimitive.attributes, "POSITION", newPosition);
        this._addData(newPrimitive.attributes, "NORMAL", newNormal);
        this._addData(newPrimitive.attributes, "TEXCOORD", newTexCoord);
        this._addData(newPrimitive.attributes, "COLOR", newColor);

        this._addData(newPrimitive, "material", primitiveData.material);
        this._addData(newPrimitive, "mode", primitiveData.mode);
        this._addData(newPrimitive, "name", primitiveData.name);

        return newPrimitive;
    }

    private _addAttributeData(targetArr:Array<number>, sourvceArr:Array<number>, indice:number, size:number){
        var start = indice * size;

        while(size > 0){
            targetArr.push(
                sourvceArr[start]
            );
            start++;
            size--;
        }
    }

    private _addData(target:any, key:string, data:any){
        if(!data){
            return;
        }

        if(JudgeUtils.isArrayExactly(data)){
            if(data.length > 0){
                target[key] = data;
            }
        }
        else{
            target[key] = data;
        }
    }
}

type JsonData = {
    meshes: {
        [id:string]: {
            primitives: Array<Primitive>
        }
    };
}

type Primitive = {
    attributes: Attribute;
    indices:Array<number>;
    material:string;
    mode:number;
    name:string;
}


type Attribute = {
    POSITION:Array<number>;
    NORMAL?:Array<number>;
    TEXCOORD?:Array<number>;
    COLOR?:Array<number>;
}

