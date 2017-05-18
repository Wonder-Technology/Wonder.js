export class ShaderData{
    public static index:number = null;
    public static count:number = null;

    public static vsSourceMap = null;
    public static fsSourceMap = null;
    public static programMap = null;
    public static attributeLocationMap = null;
    public static uniformLocationMap = null;

    public static sendAttributeConfigMap:SendAttributeConfigMap = null;
    public static sendUniformConfigMap = null;
}

export type SendAttributeConfigMap = {
    [index:number]: Array<SendAttributeConfig>
}

export type SendAttributeConfig = {
    name:string;
    buffer:string;
}
