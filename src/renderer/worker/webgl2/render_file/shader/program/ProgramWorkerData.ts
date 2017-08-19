import { ProgramMap } from "../../../../../type/dataType";

//todo refactor:common
export class WebGL2ProgramWorkerData {
    public static programMap: ProgramMap = null;

    public static lastUsedProgram: WebGLProgram = null;

    public static lastBindedVao: WebGLBuffer = null;
}
