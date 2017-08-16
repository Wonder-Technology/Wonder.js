//todo pass this data!
//todo refactor with GLSLSenderData(Common Data?)
import {
    SendAttributeConfigMap, SendUniformConfigMap, SendUniformFuncConfigMap,
    UniformCacheMap
} from "../../../type/dataType";
import { UboBindingPointMap, UboMultiBufferDataList, UboSingleBufferDataList } from "../../type/dataType";

export class WebGL2GLSLSenderData {
    public static uniformCacheMap: UniformCacheMap = null;

    public static sendAttributeConfigMap: SendAttributeConfigMap = null;
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
