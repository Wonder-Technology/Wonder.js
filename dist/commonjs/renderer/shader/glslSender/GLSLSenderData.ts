import {
    SendAttributeConfigMap, SendUniformConfigMap, SendUniformFuncConfigMap,
    UniformCacheMap
} from "../../type/dataType";

export class GLSLSenderData {
    public static uniformCacheMap: UniformCacheMap = null;

    public static sendAttributeConfigMap: SendAttributeConfigMap = null;
    public static sendUniformConfigMap: SendUniformConfigMap = null;
    //todo fix worker
    public static sendUniformFuncConfigMap: SendUniformFuncConfigMap = null;

    public static vertexAttribHistory: Array<boolean> = null;

}
