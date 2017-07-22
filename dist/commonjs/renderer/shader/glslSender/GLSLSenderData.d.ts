import { SendAttributeConfigMap, SendUniformConfigMap, SendUniformFuncConfigMap, UniformCacheMap } from "../../type/dataType";
export declare class GLSLSenderData {
    static uniformCacheMap: UniformCacheMap;
    static sendAttributeConfigMap: SendAttributeConfigMap;
    static sendUniformConfigMap: SendUniformConfigMap;
    static sendUniformFuncConfigMap: SendUniformFuncConfigMap;
    static vertexAttribHistory: Array<boolean>;
}
