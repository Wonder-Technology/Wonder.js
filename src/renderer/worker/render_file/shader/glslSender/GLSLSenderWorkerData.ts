import { SendAttributeConfigMap, SendUniformConfigMap, UniformCacheMap } from "../../../../type/dataType";

export class GLSLSenderWorkerData {
    public static uniformCacheMap: UniformCacheMap = null;

    public static sendAttributeConfigMap: SendAttributeConfigMap = null;
    public static sendUniformConfigMap: SendUniformConfigMap = null;

    public static vertexAttribHistory: Array<boolean> = null;

}
