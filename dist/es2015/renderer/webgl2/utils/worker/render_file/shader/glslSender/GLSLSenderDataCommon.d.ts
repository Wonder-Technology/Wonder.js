import { SendUniformConfigMap, SendUniformFuncConfigMap, UniformCacheMap, VaoConfigMap } from "../../../../../../type/dataType";
import { UboBindingPointMap, UboMultiBufferDataList, UboSingleBufferDataList } from "../../../../../type/dataType";
export declare class WebGL2GLSLSenderDataCommon {
    static vaoConfigMap: VaoConfigMap;
    static uniformCacheMap: UniformCacheMap;
    static sendUniformConfigMap: SendUniformConfigMap;
    static sendUniformFuncConfigMap: SendUniformFuncConfigMap;
    static vertexAttribHistory: Array<boolean>;
    static uboBindingPoint: number;
    static uboBindingPointMap: UboBindingPointMap;
    static oneUboDataList: UboSingleBufferDataList;
    static frameUboDataList: UboSingleBufferDataList;
    static ambientLightUboDataList: UboMultiBufferDataList;
    static directionLightUboDataList: UboMultiBufferDataList;
    static pointLightUboDataList: UboMultiBufferDataList;
}
