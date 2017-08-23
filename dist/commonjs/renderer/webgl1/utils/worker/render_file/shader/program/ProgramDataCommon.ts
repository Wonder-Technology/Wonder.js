import { ProgramMap } from "../../../../../../type/dataType";

export abstract class WebGL1ProgramDataCommon {
    public static programMap: ProgramMap = null;

    public static lastUsedProgram: WebGLProgram = null;

    public static lastBindedArrayBuffer: WebGLBuffer = null;
    public static lastBindedIndexBuffer: WebGLBuffer = null;
}
