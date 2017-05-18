export class ShaderLibData{
    public static vsChunkMap = null;
    public static fsChunkMap = null;

    public static vsChunkSectionMap:ShaderLibChunkSectionMap = null;
    public static fsChunkSectionMap:ShaderLibChunkSectionMap = null;

    public static index:number = null;
    public static count:number = null;
}

export type ShaderLibChunkSectionMap = {
    top: string;
    define: string;
    varDeclare: string;
    funcDeclare: string;
    funcDefine: string;
    body: string;
}
