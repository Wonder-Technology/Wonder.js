import { ProgramMap } from "../../../../../../type/dataType";
export declare abstract class WebGL2ProgramDataCommon {
    static programMap: ProgramMap;
    static lastUsedProgram: WebGLProgram;
    static lastBindedVao: WebGLBuffer;
}
