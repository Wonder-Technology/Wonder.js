import { isValidMapValue } from "./objectUtils";
import { GameObject } from "../core/entityObject/gameObject/GameObject";
import { clearCacheMap } from "../component/transform/cacheSystem";

export var isDisposeTooManyComponents = (disposeCount:number) => {
    return disposeCount > 1000;
}

export var setMapVal = (map:object, uid:number, val:any) => {
    if(isValidMapValue(val)){
        map[uid] = val;
    }
}

export var reAllocateThreeDTransformMap = (forEachMap:Map<number, GameObject>, ThreeDTransformData:any) => {
    var val:any = null,
        newParentMap = {},
        newChildrenMap = {},
        newIsTranslateMap = {},
        newTempMap = {},
        parentMap = ThreeDTransformData.parentMap,
        childrenMap = ThreeDTransformData.childrenMap,
        isTranslateMap = ThreeDTransformData.isTranslateMap,
        tempMap = ThreeDTransformData.tempMap;

    clearCacheMap(ThreeDTransformData);

    forEachMap.forEach(function(value, uid) {
        val = parentMap[uid];
        setMapVal(newParentMap, uid, val);

        val = childrenMap[uid];
        setMapVal(newChildrenMap, uid, val);

        val = isTranslateMap[uid];
        setMapVal(newIsTranslateMap, uid, val);

        val = tempMap[uid];
        setMapVal(newTempMap, uid, val);
    })

    ThreeDTransformData.parentMap = newParentMap;
    ThreeDTransformData.childrenMap = newChildrenMap;
    ThreeDTransformData.isTranslateMap = newIsTranslateMap;
    ThreeDTransformData.tempMap = newTempMap;
}

export var reAllocateGameObjectMap = (forEachMap:Map<number, boolean>, GameObjectData:any) => {
    let val: any = null,
        newParentMap = {},
        newChildrenMap = {},
        newComponentMap = {},
        parentMap = GameObjectData.parentMap,
        childrenMap = GameObjectData.childrenMap,
        componentMap = GameObjectData.componentMap;

    GameObjectData.isAliveMap.forEach(function (value, uid) {
        val = parentMap[uid];
        setMapVal(newParentMap, uid, val);

        val = childrenMap[uid];
        setMapVal(newChildrenMap, uid, val);

        val = componentMap[uid];
        setMapVal(newComponentMap, uid, val);
    })

    GameObjectData.parentMap = newParentMap;
    GameObjectData.childrenMap = newChildrenMap;
    GameObjectData.componentMap = newComponentMap;
};
