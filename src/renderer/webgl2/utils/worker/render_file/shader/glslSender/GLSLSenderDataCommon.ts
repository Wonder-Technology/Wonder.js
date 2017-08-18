import {
    SendAttributeConfigMap, SendUniformConfigMap, SendUniformFuncConfigMap,
    UniformCacheMap
} from "../../../../../../type/dataType";
import {
    UboBindingPointMap, UboMultiBufferDataList, UboSingleBufferDataList,
    VaoConfigMap
} from "../../../../../type/dataType";

export class WebGL2GLSLSenderDataCommon {
    public static vaoConfigMap: VaoConfigMap = null;

    public static uniformCacheMap: UniformCacheMap = null;

    public static sendUniformConfigMap: SendUniformConfigMap = null;
    public static sendUniformFuncConfigMap: SendUniformFuncConfigMap = null;

    public static vertexAttribHistory: Array<boolean> = null;

    public static uboBindingPoint:number = null;
    public static uboBindingPointMap:UboBindingPointMap = null;
    public static oneUboDataList:UboSingleBufferDataList = null;
    public static frameUboDataList:UboSingleBufferDataList = null;
    public static gameObjectUboDataList:UboSingleBufferDataList = null;
    public static lightUboDataList:UboMultiBufferDataList = null;
}
