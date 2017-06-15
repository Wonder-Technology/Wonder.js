import { ProgramMap } from "../../../../type/dataType";

export class ProgramWorkerData {
    public static programMap: ProgramMap = null;

    public static lastUsedProgram: WebGLProgram = null;

    public static lastBindedArrayBuffer: WebGLBuffer = null;
    public static lastBindedIndexBuffer: WebGLBuffer = null;
}
