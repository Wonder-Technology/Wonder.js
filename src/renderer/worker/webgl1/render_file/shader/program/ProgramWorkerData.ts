import { ProgramMap } from "../../../../../type/dataType";

//todo refactor:common
export class WebGL1ProgramWorkerData {
    public static programMap: ProgramMap = null;

    public static lastUsedProgram: WebGLProgram = null;

    public static lastBindedArrayBuffer: WebGLBuffer = null;
    public static lastBindedIndexBuffer: WebGLBuffer = null;
}
