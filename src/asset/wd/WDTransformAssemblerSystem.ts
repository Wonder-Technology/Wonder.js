import {
    IWDSourceAcccessor,
    IWDSourceBufferView, IWDSourceComponentType, IWDSourceData,
    IWDSourceThreeDTransformData
} from "./IWDSourceData";
import { GameObject } from "../../core/entityObject/gameObject/GameObject";
import { compose, map } from "../../utils/functionalUtils";
import curry from "wonder-lodash/curry";
import range from "wonder-lodash/range";
import { getTypeArrayFromAccessor } from "./WDBufferSystem";
import { create } from "../../component/transform/ThreeDTransformSystem";
import { ThreeDTransform } from "../../component/transform/ThreeDTransform";
import { createBatch, setBatchDataByTypeArrayData } from "../../component/transform/batchSystem";
import { Maybe } from "wonder-fantasy-land/dist/es2015/types/Maybe";
// import { setBatchDatas } from "../../component/transform/batchSystem";

export const createComponent = curry(({count, gameObjectIndices:AccessorIndex, data:IWDSourceThreeDTransformData}, arrayBuffer:ArrayBuffer, {bufferViews, accessors}, gameObjects:Array<GameObject>, {
    GlobalTempData,
    ThreeDTransformData
}) => {
    // return compose(
    //     getTypeArrayFromAccessor
    // )(bufferViews, accessors[co], arrayBuffer)

    // return compose(
    //
    //     _createComponents(ThreeDTransformData)
    // )

    return compose(
        _setBatchData(data, accessors, bufferViews, arrayBuffer, GlobalTempData, ThreeDTransformData),
        createBatch
    )(count, ThreeDTransformData);


})

// const _createComponents = (ThreeDTransformData:any) => {
//     // return compose(
//     //     map(() => {
//     //         return create(ThreeDTransformData);
//     //     }),
//     //     range
//     // )(count)
//
//     // _mapCount(create(ThreeDTransformData))
//     return _mapCount(() => create(ThreeDTransformData));
// }
//
//
// //todo fix
// const _mapCount = curry((func:Function, count:number) => {
//     return compose(
//         map(func),
//         range
//     )
// })

const _convertToBatchDatas = curry(({localPositions?}, accessors: Array<IWDSourceAcccessor>, bufferViews: Array<IWDSourceBufferView>, arrayBuffer: ArrayBuffer, transforms: Array<ThreeDTransform>) => {
    return compose(
        (localPositions:Maybe<Float32Array>) => {
            return {
                transforms,
                localPositions
            }
        },
        map(getTypeArrayFromAccessor(bufferViews, accessors, arrayBuffer))
    )(Maybe.of(localPositions))
    // (bufferViews, accessors[localPositions], arrayBuffer)
})

// const _setBatchData = ({localPositions}, accessors: Array<IWDSourceAcccessor>, bufferViews: Array<IWDSourceBufferView>, arrayBuffer: ArrayBuffer, GlobalTempData:any, ThreeDTransformData:any, transforms: Array<ThreeDTransform>) => {
//     return compose(
//         setBatchDataByTypeArrayData(GlobalTempData, ThreeDTransformData),
//         _convertToBatchDatas
//     )
// }
const _setBatchData = (data:IWDSourceThreeDTransformData, accessors: Array<IWDSourceAcccessor>, bufferViews: Array<IWDSourceBufferView>, arrayBuffer: ArrayBuffer, GlobalTempData:any, ThreeDTransformData:any, transforms: Array<ThreeDTransform>) => {
    return compose(
        setBatchDataByTypeArrayData(GlobalTempData, ThreeDTransformData),
        _convertToBatchDatas
    )(data, accessors, bufferViews, arrayBuffer, transforms);
}
