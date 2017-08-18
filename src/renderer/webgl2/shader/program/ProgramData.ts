import { ProgramMap } from "../../../type/dataType";

export class WebGL2ProgramData {
    public static programMap: ProgramMap = null;

    public static lastUsedProgram: WebGLProgram = null;

    public static lastBindedVao: WebGLBuffer = null;
}
