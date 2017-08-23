import { ProgramMap } from "../../../../../../type/dataType";

export abstract class WebGL2ProgramDataCommon {
    public static programMap: ProgramMap = null;

    public static lastUsedProgram: WebGLProgram = null;

    public static lastBindedVao: WebGLBuffer = null;
}
