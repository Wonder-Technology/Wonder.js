declare var Buffer:any;

import path = require("path");

import chai = require("chai");

import contract = require("../../../ts/definition/typescript/decorator/contract");

import ExtendUtils = require("../../../ts/ExtendUtils")

import JudgeUtils = require("../../../ts/JudgeUtils")

import BufferWriter = require("../../common/BufferWriter");

var it = contract.it,
    ensure = contract.ensure;

var expect = chai.expect;

export class Compressor {
    public static create() {
        var obj = new this();

        return obj;
    }

    private get _animationDataByteSize() {
        return 4;
    }

    private get _attributeDataByteSize() {
        return 4;
    }

    private get _morphTargetDataByteSize() {
        return 4;
    }

    private get _indiceDataByteSize() {
        return 2;
    }

    public compress(fileName: string, binFileRelatedDir: string, sourceJson: SourceJsonData) {
        var targetJson: TargetJsonData = ExtendUtils.extendDeep(sourceJson),
            {recordedAttributeArr, recordedMorphTargetArr, recordedIndiceArr} = this._recordPrimitiveData(sourceJson),
            recoredAnimationArr:Array<AnimationDataRecord> = this._recordAnimationData(sourceJson);

        this._removeRepeatData(recoredAnimationArr);
        this._removeRepeatData(recordedAttributeArr);
        this._removeRepeatData(recordedMorphTargetArr);
        this._removeRepeatData(recordedIndiceArr);

        let buffersData = this._buildBuffersArr(fileName, binFileRelatedDir, recoredAnimationArr, recordedAttributeArr, recordedMorphTargetArr, recordedIndiceArr);

        let bufferViewsJson = this._buildBufferViewsJson(buffersData.id, recoredAnimationArr, recordedIndiceArr, recordedAttributeArr, recordedMorphTargetArr);

        let accessorsData = this._buildAccessorsJson(bufferViewsJson.animationBufferViewId, bufferViewsJson.attributeBufferViewId, bufferViewsJson.morphTargetBufferViewId, bufferViewsJson.indiceBufferViewId, recoredAnimationArr, recordedIndiceArr, recordedAttributeArr, recordedMorphTargetArr);

        this._buildJson(targetJson, buffersData.json, bufferViewsJson.json, accessorsData);

        return {
            buffer: this._toBuffer(buffersData.arraybuffer),
            uri: buffersData.uri,
            json: targetJson
        }
    }

    private _recordPrimitiveData(sourceJson: SourceJsonData){
        var recordedAttributeArr:Array<PrimitiveDataRecord> = [],
            recordedMorphTargetArr:Array<PrimitiveDataRecord> = [],
            recordedIndiceArr:Array<PrimitiveDataRecord> = [];

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
                        } = primitiveData.attributes,
                        morphTargets = primitiveData.morphTargets;

                    this._recordAttribute(POSITION, recordedAttributeArr, id, i, "POSITION", "VEC3");

                    if (this._hasData(NORMAL)) {
                        this._recordAttribute(NORMAL, recordedAttributeArr, id, i, "NORMAL", "VEC3");
                    }

                    if (this._hasData(TEXCOORD)) {
                        this._recordAttribute(TEXCOORD, recordedAttributeArr, id, i, "TEXCOORD", "VEC2");
                    }

                    if (this._hasData(COLOR)) {
                        this._recordAttribute(COLOR, recordedAttributeArr, id, i, "COLOR", "VEC3");
                    }

                    if (this._hasData(primitiveData.indices)) {
                        this._recordIndice(primitiveData.indices, recordedIndiceArr, id, i, "SCALAR");
                    }


                    if (this._hasData(morphTargets)) {
                        this._recordMorphTargets(morphTargets, recordedMorphTargetArr, id, i);
                    }
                }
            }
        }

        return {
            recordedAttributeArr: recordedAttributeArr,
            recordedMorphTargetArr: recordedMorphTargetArr,
            recordedIndiceArr: recordedIndiceArr
        }
    }

    private _recordAnimationData(sourceJson: SourceJsonData){
        var recoredAnimationArr:Array<AnimationDataRecord> = [];

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

    private _hasData(data: Array<any>) {
        return data && data.length > 0;
    }

    private _recordAnimation(data: Array<number>, arr: Array<AnimationDataRecord>, id:string, name:string, type: string) {
        arr.push({
            data: data,
            where: this._buildAnimationWhere(id, name),
            componentType: 5126,
            type: type
        });
    }

    private _recordAttribute(data: Array<number>, arr: Array<PrimitiveDataRecord>, meshId: string, primitiveIndex: number, attributeName: string, type: string) {
        arr.push({
            data: data,
            where: this._buildAttributeWhere(meshId, primitiveIndex, attributeName),
            componentType: 5126,
            type: type
        });
    }

    private _recordIndice(data: Array<number>, arr: Array<PrimitiveDataRecord>, meshId: string, primitiveIndex: number, type: string) {
        arr.push({
            data: data,
            where: this._buildIndiceWhere(meshId, primitiveIndex),
            componentType: 5123,
            type: type
        });
    }

    private _recordMorphTargets(morphTargets:Array<SourceMorphTarget>, arr: Array<PrimitiveDataRecord>, meshId: string, primitiveIndex: number){
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

    private _buildAnimationWhere(id: string, name: string) {
        return `animations%%${id}%%parameters%%${name}`;
    }

    private _buildAttributeWhere(meshId: string, primitiveIndex: number, attributeName: string) {
        return `meshes%%${meshId}%%primitives%%${String(primitiveIndex)}%%attributes%%${attributeName}`;
    }

    private _buildIndiceWhere(meshId: string, primitiveIndex: number) {
        return `meshes%%${meshId}%%primitives%%${String(primitiveIndex)}%%indices`;
    }

    private _buildMorphTargetsWhere(meshId: string, primitiveIndex: number, index:number, type:"vertices"|"normals") {
        return `meshes%%${meshId}%%primitives%%${String(primitiveIndex)}%%morphTargets%%${index}%%${type}`;
    }

    private _parseWhere(where: string) {
        return where.split('%%');
    }

    private _removeRepeatData(recordedArr: Array<DataRecord>) {
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

    private _buildBuffersArr(fileName: string, binFileRelatedDir: string, recoredAnimationArr:Array<AnimationDataRecord>, recordedAttributeArr: Array<PrimitiveDataRecord>, recordedMorphTargetArr:Array<PrimitiveDataRecord>, recordedIndiceArr: Array<PrimitiveDataRecord>) {
        var json = {},
            uri: string = null,
            byteLength = this._getBufferByteLength(recoredAnimationArr, this._animationDataByteSize) + this._getBufferByteLength(recordedIndiceArr, this._indiceDataByteSize) + this._getBufferByteLength(recordedAttributeArr, this._attributeDataByteSize) + this._getBufferByteLength(recordedMorphTargetArr, this._morphTargetDataByteSize),
            bufferWriter = BufferWriter.create(byteLength);

        recoredAnimationArr
            .filter((item: AnimationDataRecord) => {
                return JudgeUtils.isArrayExactly(item.data);
            })
            .forEach((item: AnimationDataRecord) => {
                for (let value of item.data) {
                    bufferWriter.writeFloat(<number>value);
                }
            });

        recordedIndiceArr
            .filter((item: PrimitiveDataRecord) => {
                return JudgeUtils.isArrayExactly(item.data);
            })
            .forEach((item: PrimitiveDataRecord) => {
                for (let value of item.data) {
                    bufferWriter.writeUInt16(<number>value);
                }
            });

        recordedAttributeArr
            .filter((item: PrimitiveDataRecord) => {
                return JudgeUtils.isArrayExactly(item.data);
            })
            .forEach((item: PrimitiveDataRecord) => {
                for (let value of item.data) {
                    bufferWriter.writeFloat(<number>value);
                }
            });

        recordedMorphTargetArr
            .filter((item: PrimitiveDataRecord) => {
                return JudgeUtils.isArrayExactly(item.data);
            })
            .forEach((item: PrimitiveDataRecord) => {
                for (let value of item.data) {
                    bufferWriter.writeFloat(<number>value);
                }
            });

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

    private _getBufferByteLength(recordedArr: Array<DataRecord>, size: number) {
        var length = 0;

        recordedArr
            .filter((item: DataRecord) => {
                return JudgeUtils.isArrayExactly(item.data);
            })
            .forEach((item: DataRecord) => {
                length += size * item.data.length;
            });

        return length;
    }

    private _buildBufferViewsJson(bufferId: string, recoredAnimationArr:Array<AnimationDataRecord>, recordedIndiceArr:Array<PrimitiveDataRecord>, recordedAttributeArr:Array<PrimitiveDataRecord>, recordedMorphTargetArr:Array<PrimitiveDataRecord>) {
        var json = {},
            length: number = null,
            id = 0,
            offset = 0,
            animationBufferViewId: string = null,
            indiceBufferViewId: string = null,
            attributeBufferViewId: string = null,
            morphTargetBufferViewId: string = null;

        length = this._getBufferByteLength(recoredAnimationArr, this._animationDataByteSize);

        if(length > 0){
            animationBufferViewId = `bufferView_${id}`;

            json[animationBufferViewId] = {
                buffer: bufferId,
                byteLength: length,
                byteOffset: offset
            };

            id++;
            offset += length;
        }

        length = this._getBufferByteLength(recordedIndiceArr, this._indiceDataByteSize);

        if(length > 0){
            indiceBufferViewId = `bufferView_${id}`;

            json[indiceBufferViewId] = {
                buffer: bufferId,
                byteLength: length,
                byteOffset: offset,
                target: 34963
            };

            id++;
            offset += length;
        }

        length = this._getBufferByteLength(recordedAttributeArr, this._attributeDataByteSize);


        if(length > 0) {
            attributeBufferViewId = `bufferView_${id}`;

            json[attributeBufferViewId] = {
                buffer: bufferId,
                byteLength: length,
                byteOffset: offset,
                target: 34962
            };

            id++;
            offset += length;
        }

        length = this._getBufferByteLength(recordedMorphTargetArr, this._morphTargetDataByteSize);

        if(length > 0){
            morphTargetBufferViewId = `bufferView_${id}`;

            json[morphTargetBufferViewId] = {
                buffer: bufferId,
                byteLength: length,
                byteOffset: offset,
                target: 34962
            };
        }

        return {
            animationBufferViewId: animationBufferViewId,
            attributeBufferViewId: attributeBufferViewId,
            morphTargetBufferViewId: morphTargetBufferViewId,
            indiceBufferViewId: indiceBufferViewId,
            json: json
        };
    }

    private _buildAccessorsJson(animationBufferViewId:string, attributeBufferViewId: string, morphTargetBufferViewId: string, indiceBufferViewId: string, recordedAnimationArr: Array<AnimationDataRecord>, recordedIndiceArr: Array<PrimitiveDataRecord>, recordedAttributeArr: Array<PrimitiveDataRecord>, recordedMorphTargetArr: Array<PrimitiveDataRecord>) {
        var json = {},
            mappingTable = {},
            id = 0,
            accessorCount: number = null;

        if(!this._isArrayEmpty(recordedAnimationArr)){
            accessorCount = this._buildAccessorData(json, mappingTable, id, animationBufferViewId, recordedAnimationArr, this._animationDataByteSize, "anim");
        }

        if(!this._isArrayEmpty(recordedIndiceArr)){
            accessorCount = this._buildAccessorData(json, mappingTable, id, indiceBufferViewId, recordedIndiceArr, this._indiceDataByteSize);

            id += accessorCount;
        }

        if(!this._isArrayEmpty(recordedAttributeArr)){
            accessorCount = this._buildAccessorData(json, mappingTable, id, attributeBufferViewId, recordedAttributeArr, this._attributeDataByteSize);

            id += accessorCount;
        }

        if(!this._isArrayEmpty(recordedMorphTargetArr)){
            this._buildAccessorData(json, mappingTable, id, morphTargetBufferViewId, recordedMorphTargetArr, this._morphTargetDataByteSize);
        }

        return {
            json: json,
            mappingTable: mappingTable
        }
    }

    @ensure(function (returnVal, {json, mappingTable}) {
        it("mappingTable should be valid", () => {
            for (let where in mappingTable) {
                if (mappingTable.hasOwnProperty(where)) {
                    expect(mappingTable[where]).be.a("string");
                }
            }
        });
    })
    private _buildAccessorData(json: {
        [id: string]: Object
    }, mappingTable: Object, id, bufferViewId: string, recordedArr: Array<AnimationDataRecord|PrimitiveDataRecord>, byteSize: number, prefix?:string) {
        var offset = 0,
            accessorCount = 0;

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
                bufferView: bufferViewId,
                byteOffset: offset,
                count: this._computeAccessorCount(count, item.type),
                componentType: item.componentType,
                type: item.type
            };

            if(item.where){
                mappingTable[item.where] = accessorId;
            }

            offset += byteSize * count;
        }

        return accessorCount;
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
                    if (this._isArrayEmpty(primitiveData.indices)) {
                        delete primitiveData.indices;
                    }

                    for (let key in primitiveData.attributes) {
                        if (primitiveData.attributes.hasOwnProperty(key)) {
                            if (this._isArrayEmpty(primitiveData.attributes[key])) {
                                delete primitiveData.attributes[key];
                            }
                        }
                    }

                    //todo test
                    if(this._hasData(primitiveData.morphTargets)){
                        for(let frame of primitiveData.morphTargets){
                            if (this._isArrayEmpty(frame.vertices)) {
                                delete frame.vertices;
                            }

                            if (!!frame.normals
                                && this._isArrayEmpty(frame.normals)) {
                                delete frame.normals;
                            }
                        }
                    }
                }
            }
        }
    }

    private _isArrayEmpty(data:string|Array<any>){
        return JudgeUtils.isArrayExactly(data) && data.length === 0;
    }

    private _toBuffer(arraybuffer:ArrayBuffer) {
        return Buffer.from(arraybuffer);
    }
}

type SourceJsonData = {
    animations:{
        [id:string]: SourceAnimation
    },
    meshes: {
        [id:string]: {
            primitives: Array<SourcePrimitive>
        }
    };
}

type SourceAnimation = {
    channels: Array<any>;
    parameters: any;
    samplers: any;
}

type SourcePrimitive = {
    attributes: SourceAttribute;
    morphTargets?:Array<SourceMorphTarget>;
    indices:Array<number>;
}

type SourceAttribute = {
    POSITION:Array<number>;
    NORMAL?:Array<number>;
    TEXCOORD?:Array<number>;
    COLOR?:Array<number>;
}


type DataRecord = {
    data:Array<number>|string;
    where:string;
}

type AnimationDataRecord = {
    data:Array<number>|string;
    where:string;
    componentType:number,
    type:string;
}

type PrimitiveDataRecord = {
    data:Array<number>|string;
    where:string;
    componentType:number,
    type:string;
}

type TargetJsonData = {
    animations:{
        [id:string]: Object
    },
    accessors: {
        [id:string]: Object
    },
    bufferViews:{
        [id:string]: Object
    },
    buffers:{
        [id:string]: Object
    },
    meshes: {
        [id:string]: {
            primitives: Array<TargetPrimitive>
        }
    };
}

type TargetPrimitive = {
    attributes:TargetAttribute;
    morphTargets?:Array<TargetMorphTarget>;
    indices:string;
}

type TargetAttribute = {
    POSITION:string;
    NORMAL?:string;
    TEXCOORD?:string;
    COLOR?:string;
}


type SourceMorphTarget = {
    name:string;
    vertices:Array<number>;
    normals?:Array<number>;
}

type TargetMorphTarget = {
    name:string;
    vertices:string;
    normals?:string;
}
