import { registerClass } from "../../definition/typescript/decorator/registerClass";
import { CommonBuffer } from "./CommonBuffer";
import { EBufferType } from "./EBufferType";
import { EBufferUsage } from "./EBufferUsage";
import { DeviceManager } from "../../device/DeviceManager";
import { Log } from "../../utils/Log";
import { BufferTable } from "../../core/entityObject/scene/cache/BufferTable";
import { requireCheck, assert } from "../../definition/typescript/decorator/contract";

@registerClass("ArrayBuffer")
export class ArrayBuffer extends CommonBuffer {
    public static create(data: Array<number>, size: number, type: EBufferType = EBufferType.FLOAT, usage: EBufferUsage = EBufferUsage.STATIC_DRAW): ArrayBuffer {
        var obj = new this();

        obj.initWhenCreate(data, size, type, usage);

        return obj;
    }

    public size: number = null;
    public data: Float32Array = null;


    public initWhenCreate(data: Array<number>, size: number, type: EBufferType, usage: EBufferUsage) {
        var gl = DeviceManager.getInstance().gl,
            typedData: Float32Array = null;

        this.buffer = gl.createBuffer();

        if (!this.buffer) {
            Log.warn('Failed to create the this.buffer object');
            return null;
        }

        if (!data) {
            return null;
        }

        typedData = this._convertToTypedArray(data, type);


        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);

        gl.bufferData(gl.ARRAY_BUFFER, typedData, gl[usage]);

        BufferTable.resetBindedArrayBuffer();

        this._saveData(typedData, size, type, usage);

        return this.buffer;
    }

    @requireCheck(function(data: Array<number>, size: number = this.size, type: EBufferType = this.type, offset: number = 0) {
        assert(this.buffer, Log.info.FUNC_MUST("create gl buffer"));
    })
    public resetData(data: Array<number>, size: number = this.size, type: EBufferType = this.type, offset: number = 0) {
        var gl = DeviceManager.getInstance().gl,
            typedData: Float32Array = this._convertToTypedArray(data, type);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);

        this.resetBufferData("ARRAY_BUFFER", typedData, offset);

        //BufferTable.resetBindedArrayBuffer();

        this._saveData(typedData, size, type, EBufferUsage.DYNAMIC_DRAW);

        return this;
    }

    private _convertToTypedArray(data: Array<number>, type: EBufferType) {
        return new Float32Array(data);
    }

    private _saveData(data: Float32Array, size: number, type: EBufferType, usage: EBufferUsage) {
        this.size = size;
        this.type = type;
        this.count = data.length / size;
        this.usage = usage;

        this.data = data;
    }
}