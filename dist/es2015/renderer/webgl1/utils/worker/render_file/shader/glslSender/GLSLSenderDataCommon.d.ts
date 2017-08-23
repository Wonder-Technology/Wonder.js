import { AttributeLocationMap, SendAttributeConfigMap, SendUniformConfigMap, SendUniformFuncConfigMap, UniformCacheMap } from "../../../../../../type/dataType";
import { VaoConfigMap } from "../../../../../../type/dataType";
export declare class WebGL1GLSLSenderDataCommon {
    static vaoConfigMap: VaoConfigMap;
    static uniformCacheMap: UniformCacheMap;
    static attributeLocationMap: AttributeLocationMap;
    static sendAttributeConfigMap: SendAttributeConfigMap;
    static sendUniformConfigMap: SendUniformConfigMap;
    static sendUniformFuncConfigMap: SendUniformFuncConfigMap;
    static vertexAttribHistory: Array<boolean>;
}
