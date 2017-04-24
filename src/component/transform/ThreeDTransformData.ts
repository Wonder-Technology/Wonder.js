import {DataBufferConfig} from "../../config/DataBufferConfig";
import {ThreeDTransform} from "./ThreeDTransform";

export class ThreeDTransformData{
    public static create() {
        var obj = new this();

        obj.initWhenCreate();

        return obj;
    }

    get count(){
        return DataBufferConfig.transformDataBufferCount;
    }

    //todo check:is this affect performance when with buffer data?
    public transforms:Array<ThreeDTransform> = [];
    public localToWorldMatrices:Float32Array = null;
    public localPositions:Float32Array = null;
    public localRotations:Float32Array = null;
    public localScales:Float32Array = null;
    public parents:Uint16Array = null;
    public firstChildren:Uint16Array = null;
    public nextSiblings:Uint16Array = null;
    public length:number = null;

    private _buffer:ArrayBuffer = null;

    public initWhenCreate(){
        var buffer = this._buffer,
            count = this.count;

        this.length = Uint16Array.BYTES_PER_ELEMENT * 3 + Float32Array.BYTES_PER_ELEMENT * (16 + 3 + 4 + 3);
        this._buffer = new ArrayBuffer(count * this.length);

        this.parents = new Uint16Array(buffer, 0, count);
        this.firstChildren = new Uint16Array(buffer, 0, count);
        this.nextSiblings = new Uint16Array(buffer, 0, count);

        this.localToWorldMatrices = new Float32Array(buffer, count * Uint16Array.BYTES_PER_ELEMENT * 3, count);
        this.localPositions = new Float32Array(buffer, count * (Uint16Array.BYTES_PER_ELEMENT * 3+ Float32Array.BYTES_PER_ELEMENT * 16), count);
        this.localRotations = new Float32Array(buffer, count * (Uint16Array.BYTES_PER_ELEMENT * 3+ Float32Array.BYTES_PER_ELEMENT * (16 + 3)), count);
        this.localScales = new Float32Array(buffer, count * (Uint16Array.BYTES_PER_ELEMENT * 3 + Float32Array.BYTES_PER_ELEMENT * (16 + 3 + 4)), count);
    }
}
