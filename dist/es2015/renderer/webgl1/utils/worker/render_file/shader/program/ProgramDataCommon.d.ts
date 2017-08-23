import { ProgramMap } from "../../../../../../type/dataType";
export declare abstract class WebGL1ProgramDataCommon {
    static programMap: ProgramMap;
    static lastUsedProgram: WebGLProgram;
    static lastBindedArrayBuffer: WebGLBuffer;
    static lastBindedIndexBuffer: WebGLBuffer;
}
