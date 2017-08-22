import {
    SendUniformConfigMap, SendUniformFuncConfigMap,
    UniformCacheMap, VaoConfigMap
} from "../../../../../../type/dataType";
import {
    UboBindingPointMap, UboMultiBufferDataList, UboSingleBufferDataList} from "../../../../../type/dataType";

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
    public static ambientLightUboDataList:UboMultiBufferDataList = null;
    public static directionLightUboDataList:UboMultiBufferDataList = null;
    public static pointLightUboDataList:UboMultiBufferDataList = null;
}
