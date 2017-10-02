import {
    AccessorIndex, ComponentType, IWDSourceAcccessor, IWDSourceBufferView, IWDSourceComponentType,
    IWDSourceData
} from "./IWDSourceData";
import { IWDTargetData } from "./IWDTargetData";
// import { GameObject } from "../../core/entityObject/gameObject/GameObject";
import {
    addBatchComponents, createBatch as createBatchGameObjects,
    setBatchParents
} from "../../core/entityObject/gameObject/GameObjectSystem";
import range from "wonder-lodash/range";
import curry from "wonder-lodash/range";
import zip from "wonder-lodash/zip";
import { compose, forEachArray, map } from "../../utils/functionalUtils";
import { ThreeDTransformData } from "../../component/transform/ThreeDTransformData";
import { create as createThreeDTransform } from "../../component/transform/ThreeDTransformSystem";
import { GameObject } from "../../core/entityObject/gameObject/GameObject";
import { getTypeArrayFromAccessor } from "./WDBufferSystem";
import { it, requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { createComponent as createWDThreeDTransform } from "./WDTransformAssemblerSystem";
import { IWDAssemblerComponentDataMap } from "./interface";
import { WDComponentDataMap } from "./dataType";
import { Component } from "../../component/Component";

export const build = (sourceData: IWDSourceData, arrayBuffer: ArrayBuffer, dataMap:WDComponentDataMap): IWDTargetData => {
    // var result:IWDTargetData = {} as any,
    //     gameObjects:Array<GameObject> = null;

//     {
//     ThreeDTransformData,
//     GameObjectData
// }

    return compose(
        // _addComponents(dataMap),

        addBatchComponents(dataMap.GameObjectData),
        _createComponents(arrayBuffer, sourceData, dataMap),
        _buildGameObjects(arrayBuffer, dataMap),
        (sourceData:IWDSourceData) => {
            return {
                ...sourceData.metadata
            }
            // result.metadata = sourceData.metadata;
        }
    )(sourceData)

    // result.metadata = sourceData.metadata;
    //
    // gameObjects = _buildGameObjects(sourceData, arrayBuffer);
    // _addComponents(gameObjects, sourceData, arrayBuffer);
    //
    // result.gameObjects = gameObjects;
    //
    // return result;
}

// const _buildComponentDataMap = (ThreeDTransformData: any, GameObjectData: any) => {
//    return {
//        ThreeDTransformData,
//        GameObjectData
//    }
// }

const _buildGameObjects = curry((arrayBuffer:ArrayBuffer, {ThreeDTransformData, GameObjectData}, {gameObjectCount, parentIndices, accessors, bufferViews}) => {
    // var {gameObjectCount, parentIndices, accessors, bufferViews} = sourceData;

    return compose(
        _setParents(parentIndices, accessors, bufferViews, arrayBuffer, ThreeDTransformData, GameObjectData),
        // _createGameObjects
        createBatchGameObjects
    )(gameObjectCount, GameObjectData)
})

// const _createGameObjects = (count:number, GameObjectData:any) => {
//     return compose(
//         map(() => {
//             return createBatchGameObjects(createThreeDTransform(ThreeDTransformData), GameObjectData);
//         }),
//         range
//     )(count)
// }

const _setParents = curry((parentIndices:AccessorIndex, accessors:Array<IWDSourceAcccessor>, bufferViews:Array<IWDSourceBufferView>, arrayBuffer:ArrayBuffer, ThreeDTransformData:any, GameObjectData:any, gameObjects:Array<GameObject>) => {
    // var {bufferReader, count} = getBufferReaderFromAccessor(bufferViews, accessors[parentIndices], arrayBuffer);

    compose(
        setBatchParents(gameObjects, ThreeDTransformData, GameObjectData),
        // _getParentIndices,
        getTypeArrayFromAccessor
    )(bufferViews, accessors[parentIndices], arrayBuffer)
})

// const _getParentIndices = requireCheckFunc(({typeArray:UInt32Array, count:number}) => {
//     it("typeArray should be UInt32Array", () => {
//         expect(typeArray instanceOf UInt32Array).true;
//     });
// },({typeArray:UInt32Array, count:number}) => {
//     return compose(
//         map(() => {
//             return bufferReader.readUInt32()
//         }),
//         range
//     )(count)
// })

// const _addComponents = curry(({
//     GameObjectData
// // }, gameObjects:Array<GameObject>, components:Array<Array<Component>>) => {
// }, data:Array<any>) => {
//     return compose(
//         // map(([gameObject, ...components]) => {
//         // map((components:Array<Array<Component>>, ) => {
//             addBatchComponents(gameObjects, components, GameObjectData);
//
//             // return gameObject;
//         // })
//     )(data);
// })

const _createComponents = curry((arrayBuffer:ArrayBuffer, sourceData:IWDSourceData, dataMap:IWDAssemblerComponentDataMap, gameObjects:Array<GameObject>) => {
    var { componentTypes } = sourceData;

    compose(
        // (components:Array<Array<Component>>, gameObjects:Array<GameObject>) => {
        //     return zip([gameObjects].concat(components));
        // },
        (components:Array<Array<Component>>) => {
            return [gameObjects, components];
        },
        map((createComponentFunc:Function) => {
            return createComponentFunc(arrayBuffer, sourceData, gameObjects, dataMap);
        }),
        map(_getCreateComponentFunc)
    )(componentTypes);

    return gameObjects;
})

const _getCreateComponentFunc = (componentType:IWDSourceComponentType) => {
    // var func:Function = null;

    switch (componentType.type){
        case "ThreeDTransform":
            return createWDThreeDTransform(componentType);
        //todo
    }

    // return func;
}
