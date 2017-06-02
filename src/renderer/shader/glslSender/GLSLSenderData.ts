import { ISendAttributeConfig, ISendUniformConfig } from "../../data/shaderLib_generator";
export class GLSLSenderData{
    public static uniformCacheMap: UniformCacheMap = null;

    public static sendAttributeConfigMap: SendAttributeConfigMap = null;
    public static sendUniformConfigMap: SendUniformConfigMap = null;

    public static vertexAttribHistory: Array<boolean> = null;

}

export type SendAttributeConfigMap = {
    [index: number]: Array<ISendAttributeConfig>
}

export type SendUniformConfigMap = {
    [index: number]: Array<ISendUniformConfig>
}

export type UniformCacheMap = {
    [index: number]: {
        [name: string]: any;
    }
}
