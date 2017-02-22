import { registerClass } from "../../definition/typescript/decorator/registerClass";
import { CommonBuffer } from "./CommonBuffer";
import { EBufferType } from "./EBufferType";
import { EBufferUsage } from "./EBufferUsage";
import { ensureGetter, assert, require } from "../../definition/typescript/decorator/contract";
import { Log } from "../../utils/Log";
import { DeviceManager } from "../../device/DeviceManager";
import { BufferTable } from "../../core/entityObject/scene/cache/BufferTable";
import { GPUDetector } from "../../device/GPUDetector";

@registerClass("ElementBuffer")
export class ElementBuffer extends CommonBuffer {
    public static create(data: Array<number>, type: EBufferType = null, usage: EBufferUsage = EBufferUsage.STATIC_DRAW): ElementBuffer {
        var obj = new this();

        obj.initWhenCreate(data, type, usage);

        return obj;
    }

    @ensureGetter(function(typeSize: number) {
        assert(typeSize > 0, Log.info.FUNC_SHOULD("typeSize", `> 0, but actual is ${typeSize}`));
    })
    get typeSize() {
        return this.data.BYTES_PER_ELEMENT;
    }

    public data: Uint16Array | Uint32Array = null;


    public initWhenCreate(data: Array<number>, type: EBufferType, usage: EBufferUsage) {
        var gl = DeviceManager.getInstance().gl,
            isNeed32Bits: boolean = null,
            typedData: Uint16Array | Uint32Array = null;

        this.buffer = gl.createBuffer();

        if (!this.buffer) {
            Log.warn('Failed to create the this.buffer object');
            return null;
        }

        if (!data) {
            return null;
        }

        isNeed32Bits = this._checkIsNeed32Bits(data, type);
        typedData = this._convertToTypedArray(isNeed32Bits, data);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffer);

        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, typedData, gl[usage]);

        BufferTable.resetBindedElementBuffer();

        this._saveData(typedData, this._getType(isNeed32Bits, type), usage);

        return this.buffer;
    }

    @require(function(data: Array<number>, type: EBufferType = null, offset: number = 0) {
        assert(this.buffer, Log.info.FUNC_MUST("create gl buffer"));
    })
    public resetData(data: Array<number>, type: EBufferType = null, offset: number = 0) {
        var gl = DeviceManager.getInstance().gl,
            isNeed32Bits = this._checkIsNeed32Bits(data, type),
            typedData: Uint16Array | Uint32Array = this._convertToTypedArray(isNeed32Bits, data);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffer);

        this.resetBufferData("ELEMENT_ARRAY_BUFFER", typedData, offset);

        //BufferTable.resetBindedElementBuffer();

        this._saveData(typedData, this._getType(isNeed32Bits, type), EBufferUsage.DYNAMIC_DRAW);

        return this;
    }

    private _convertToTypedArray(isNeed32Bits: boolean, data: Array<number>) {
        return isNeed32Bits ? new Uint32Array(data) : new Uint16Array(data);
    }

    private _checkIsNeed32Bits(indices: Array<number>, type: EBufferType) {
        var isNeed32Bits = false;

        if (type !== null) {
            if (type === EBufferType.UNSIGNED_INT) {
                return true;
            }

            return false;
        }

        //todo optimize?
        if (GPUDetector.getInstance().extensionUintIndices) {
            for (let indice of indices) {
                if (indice > 65535) {
                    isNeed32Bits = true;
                    break;
                }
            }
        }
        else {
            isNeed32Bits = false;
        }

        return isNeed32Bits;
    }

    @require(function(isNeed32Bits: boolean, type: EBufferType) {
        if (type !== null) {
            if (isNeed32Bits) {
                assert(type === EBufferType.UNSIGNED_INT, Log.info.FUNC_MUST_BE("type", `UNSIGNED_SHORT, but actual is ${type}`));
            }
            else {
                assert(type === EBufferType.UNSIGNED_SHORT || type === EBufferType.UNSIGNED_INT, Log.info.FUNC_MUST_BE("type", `UNSIGNED_SHORT or UNSIGNED_INT, but actual is ${type}`));
            }
        }
    })
    private _getType(isNeed32Bits: boolean, type: EBufferType) {
        return type === null ? (isNeed32Bits ? EBufferType.UNSIGNED_INT : EBufferType.UNSIGNED_SHORT) : type;
    }

    private _saveData(data: Uint16Array | Uint32Array, type: EBufferType, usage: EBufferUsage) {
        this.type = type;
        this.count = data.length;
        this.data = data;
        this.usage = usage;
    }
}