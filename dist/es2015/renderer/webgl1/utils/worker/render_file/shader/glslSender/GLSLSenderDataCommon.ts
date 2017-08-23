import {
    AttributeLocationMap,
    SendAttributeConfigMap, SendUniformConfigMap, SendUniformFuncConfigMap,
    UniformCacheMap
} from "../../../../../../type/dataType";
import { VaoConfigMap } from "../../../../../../type/dataType";

export class WebGL1GLSLSenderDataCommon {
    public static vaoConfigMap: VaoConfigMap = null;

    public static uniformCacheMap: UniformCacheMap = null;
    public static attributeLocationMap: AttributeLocationMap = null;

    public static sendAttributeConfigMap: SendAttributeConfigMap = null;
    public static sendUniformConfigMap: SendUniformConfigMap = null;
    public static sendUniformFuncConfigMap: SendUniformFuncConfigMap = null;

    public static vertexAttribHistory: Array<boolean> = null;
}
