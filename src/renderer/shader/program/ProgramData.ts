export class ProgramData{
    public static programMap: ProgramMap = null;

    public static lastUsedProgram: WebGLProgram = null;

    public static lastBindedArrayBuffer: WebGLBuffer = null;
    public static lastBindedIndexBuffer: WebGLBuffer = null;
}

export type ProgramMap = {
    [index: number]: WebGLProgram
}
