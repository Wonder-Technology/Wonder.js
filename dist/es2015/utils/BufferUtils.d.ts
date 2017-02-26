import { EVariableType } from "../renderer/shader/variable/EVariableType";
import { ArrayBuffer } from "../renderer/buffer/ArrayBuffer";
export declare class BufferUtils {
    static convertArrayToArrayBuffer(type: EVariableType, value: Array<any>): ArrayBuffer;
    private static _getBufferSize(type);
}
