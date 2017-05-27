import { GameObject, IUIDEntity } from "./GameObject";
import { Component } from "../../../component/Component";
import { getTypeIDFromClass, getTypeIDFromComponent } from "../../../component/ComponentTypeIDManager";
import { createMap, deleteVal, isValidMapValue } from "../../../utils/objectUtils";
import { setParent } from "../../../component/transform/ThreeDTransformSystem";
import { GameObjectComponentData } from "./GameObjectData";
import { it, requireCheckFunc } from "../../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { ThreeDTransform } from "../../../component/transform/ThreeDTransform";
import { isNotUndefined } from "../../../utils/JudgeUtils";
import { execHandle, execInitHandle } from "../../../component/ComponentSystem";
import { Geometry } from "../../../component/geometry/Geometry";
import { Material } from "../../../component/material/Material";
import { filter, forEach } from "../../../utils/arrayUtils";
import { Map as MapImmutable } from "immutable";
import { deleteMapVal } from "../../../utils/mapUtils";
import { removeChildEntity } from "../../../utils/entityUtils";
import { chrome, firefox } from "bowser";
import { error, Log } from "../../../utils/Log";
import { isDisposeTooManyComponents, setMapVal } from "../../../utils/memoryUtils";

export var create = (transform:ThreeDTransform, GameObjectData:any) => {
    var gameObject:GameObject = new GameObject(),
        uid = _buildUID(GameObjectData);

    gameObject.uid = uid;

    GameObjectData.isAliveMap.set(uid, true);

    if(!!transform){
        addComponent(gameObject, transform, GameObjectData);
    }

    return gameObject;
}

var _buildUID = (GameObjectData:any) => {
    return GameObjectData.uid++;
}

export var isAlive = (entity:IUIDEntity, GameObjectData:any) => {
    // return GameObjectData.isAliveMap[entity.uid] === true;
    return GameObjectData.isAliveMap.get(entity.uid) === true;
}

export var initGameObject = (gameObject:GameObject, state:MapImmutable<any, any>, GameObjectData:any) => {
    var uid = gameObject.uid,
        componentData:GameObjectComponentData = _getComponentData(uid, GameObjectData);

    for(let typeID in componentData){
        if(componentData.hasOwnProperty(typeID)){
            execInitHandle(typeID, componentData[typeID].index, state);
        }
    }
}

export var dispose = requireCheckFunc((entity:IUIDEntity, GameObjectData:any) => {
}, (entity:IUIDEntity, ThreeDTransformData:any, GameObjectData:any) => {
    var uid = entity.uid;

    deleteMapVal(uid, GameObjectData.isAliveMap);

    let parent = _getParent(uid, GameObjectData);

    if(_isParentExist(parent)){
        _removeFromChildrenMap(parent.uid, uid, GameObjectData);
    }

    _diposeAllDatas(entity, GameObjectData);


    // GameObjectData.uidMap.delete(uid);


    if(isDisposeTooManyComponents(GameObjectData.disposeCount)){
        let val:any = null,
            newParentMap = {},
            newChildrenMap = {},
            newComponentMap = {},
            parentMap = GameObjectData.parentMap,
            childrenMap = GameObjectData.childrenMap,
            componentMap = GameObjectData.componentMap;

        GameObjectData.isAliveMap.forEach(function(value, uid) {
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

        GameObjectData.disposeCount = 0;
    }
    else{
        GameObjectData.disposeCount += 1;
    }
})

// var _getNewReallocatedMap = (mapNameArr:Array<string>, GameObjectData:any) => {
//     var map = GameObjectData[mapNameArr[0]];
//     var newMap = {},
//         val = null;
//
//     for(let index in map){
//         for(let mapName of mapNameArr){
//             val = GameObjectData[mapName][index];
//
//             if(isValidMapValue(val)){
//                 newMap[index] = val;
//             }
//         }
//     }
//
//     return newMap;
// }

// var _getNewReallocatedMap = (map:object) => {
//     var newMap = {},
//         val = null;
//
//     for(let index in map){
//         val = map[index];
//
//         if(isValidMapValue(val)){
//             newMap[index] = val;
//         }
//     }
//
//     return newMap;
// }

var _removeFromChildrenMap = null;

if(chrome){
    _removeFromChildrenMap = (parentUID:number, childUID:number, GameObjectData:any) => {
        _setChildren(parentUID, filter(_getChildren(parentUID, GameObjectData), (gameObject:GameObject) => {
            return gameObject.uid !== childUID;
        }), GameObjectData);
    }
}
else if(firefox){
    _removeFromChildrenMap = (parentUID:number, childUID:number, GameObjectData:any) => {
        removeChildEntity(_getChildren(parentUID, GameObjectData), childUID);
    }
}
else{
    error(true, Log.info.FUNC_NOT_SUPPORT("browser"));
}

var _diposeAllDatas = (gameObject:GameObject, GameObjectData:any) => {
    let uid = gameObject.uid,
        children = _getChildren(uid, GameObjectData);

    _disposeAllComponents(gameObject, GameObjectData);
    _disposeMapDatas(uid, GameObjectData);

    if(_isChildrenExist(children)){
        forEach(children, (child:GameObject) => {
            _diposeAllDatas(child, GameObjectData);
        })
    }
}

var _disposeMapDatas = (uid:number, GameObjectData:any) => {
    deleteVal(uid, GameObjectData.childrenMap);
    deleteVal(uid, GameObjectData.parentMap);
    deleteVal(uid, GameObjectData.componentMap);
}

var _disposeAllComponents = (gameObject:GameObject, GameObjectData:any) => {
    var components = _getComponentData(gameObject.uid, GameObjectData);

    //todo optimize?
    for(let typeID in components){
        if(components.hasOwnProperty(typeID)){
            let component = components[typeID];

            execHandle(component, "disposeHandleMap");
        }
    }
}

export var addComponent = requireCheckFunc((gameObject:GameObject, component: Component, GameObjectData:any) => {
    it("should not has this type of component, please dispose it", () => {
        expect(hasComponent(gameObject, getTypeIDFromComponent(component), GameObjectData)).false;
    });
}, (gameObject:GameObject, component: Component, GameObjectData:any) => {
    var uid = gameObject.uid,
        typeID = getTypeIDFromComponent(component),
        data = _getComponentData(uid, GameObjectData);

    execHandle(component, "addComponentHandleMap", [component, gameObject]);

    if(!data){
        let d = {};

        d[typeID] = component;
        _setComponentData(uid, d, GameObjectData);

        return;
    }

    data[typeID] = component;
})

var _removeComponent = (typeID:string, gameObject:GameObject, component: Component, GameObjectData:any) => {
    var uid = gameObject.uid,
        data = _getComponentData(uid, GameObjectData);

    if(isValidMapValue(data)){
        deleteVal(typeID, data);
    }
}

// export var removeComponent = (gameObject:GameObject, component: Component, GameObjectData:any) => {
//     _removeComponent(getTypeIDFromComponent(component), gameObject, component, GameObjectData);
// }

export var disposeComponent = (gameObject:GameObject, component: Component, GameObjectData:any) => {
    var typeID = getTypeIDFromComponent(component);

    _removeComponent(typeID, gameObject, component, GameObjectData);

    execHandle(component, "disposeHandleMap");
}

export var getComponent = (gameObject:GameObject, componentTypeID:string, GameObjectData:any) => {
    var uid = gameObject.uid,
        data = _getComponentData(uid, GameObjectData);

    if(isValidMapValue(data)){
        let component = data[componentTypeID];

        return isValidMapValue(component) ? component : null;
    }

    return null;
}

// var _getComponentData = (uid:number, GameObjectData:any) => GameObjectData.componentMap.get(uid);
var _getComponentData = (uid:number, GameObjectData:any) => GameObjectData.componentMap[uid];

// var _setComponentData = (uid:number, data:GameObjectComponentData, GameObjectData:any) => GameObjectData.componentMap.set(uid, data);
var _setComponentData = (uid:number, data:GameObjectComponentData, GameObjectData:any) => GameObjectData.componentMap[uid] = data;

export var hasComponent = (gameObject:GameObject, componentTypeID:string, GameObjectData:any) => {
    return getComponent(gameObject, componentTypeID, GameObjectData) !== null;
}

export var getTransform = (gameObject:GameObject, GameObjectData:any) => {
    return getComponent(gameObject, getTypeIDFromClass(ThreeDTransform), GameObjectData);
}

export var getGeometry = (gameObject:GameObject, GameObjectData:any) => {
    return getComponent(gameObject, getTypeIDFromClass(Geometry), GameObjectData);
}

export var getMaterial = (gameObject:GameObject, GameObjectData:any) => {
    return getComponent(gameObject, getTypeIDFromClass(Material), GameObjectData);
}

var _isParentExist = (parent:GameObject) => isNotUndefined(parent);

var _isChildrenExist = (children:Array<GameObject>) => isNotUndefined(children);

var _isComponentExist = (component:Component) => component !== null;

var _isGameObjectEqual = (gameObject1:GameObject, gameObject2:GameObject) => gameObject1.uid === gameObject2.uid;

// var _getParent = (uid:number, GameObjectData:any) => GameObjectData.parentMap.get(uid);
var _getParent = (uid:number, GameObjectData:any) => GameObjectData.parentMap[uid];

var _setParent = (uid:number, parent:GameObject, GameObjectData:any) => {
    // GameObjectData.parentMap.set(uid, parent);
    GameObjectData.parentMap[uid] = parent;
}

var _getChildren = (uid:number, GameObjectData:any) => {
    return GameObjectData.childrenMap[uid];
    // return GameObjectData.childrenMap.get(uid);
}

var _addChild = (uid:number, child:GameObject, GameObjectData:any) => {
    var children = _getChildren(uid, GameObjectData);

    if (isValidMapValue(children)) {
        children.push(child);
    }
    else {
        _setChildren(uid, [child], GameObjectData);
    }
}

var _setChildren = (uid:number, children:Array<GameObject>, GameObjectData:any) => {
    GameObjectData.childrenMap[uid] = children;
    // GameObjectData.childrenMap.set(uid, children);
}

export var addChild = requireCheckFunc ((gameObject:GameObject, child:GameObject, ThreeDTransformData:any, GameObjectData:any) => {
},(gameObject:GameObject, child:GameObject, ThreeDTransformData:any, GameObjectData:any) => {
    var transform = getTransform(gameObject, GameObjectData),
        uid = gameObject.uid,
        childUID = child.uid,
        parent = _getParent(childUID, GameObjectData);

    if(_isParentExist(parent)){
        removeChild(parent, child, ThreeDTransformData, GameObjectData);
    }

    _setParent(childUID, gameObject, GameObjectData);

    if(_isComponentExist(transform)) {
        setParent(getTransform(child, GameObjectData), transform, ThreeDTransformData);
    }

    _addChild(uid, child, GameObjectData);
})

export var removeChild = requireCheckFunc((gameObject:GameObject, child:GameObject, ThreeDTransformData:any, GameObjectData:any) => {
    it("child should has transform component", () => {
        expect(getTransform(child, GameObjectData)).exist;
    });
},(gameObject:GameObject, child:GameObject, ThreeDTransformData:any, GameObjectData:any) => {
    var uid = gameObject.uid,
        childUID = child.uid;

    deleteVal(childUID, GameObjectData.parentMap);

    setParent(getTransform(child, GameObjectData), null, ThreeDTransformData);

    _removeFromChildrenMap(uid, childUID, GameObjectData);
})

export var hasChild = (gameObject:GameObject, child:GameObject, GameObjectData:any) => {
    var parent = _getParent(child.uid, GameObjectData);

    if(!_isParentExist(parent)){
        return false;
    }

    return _isGameObjectEqual(parent, gameObject);
}

export var initData = (GameObjectData:any) => {
    GameObjectData.uid = 0;

    GameObjectData.isAliveMap = new Map();
    // GameObjectData.componentMap = new Map();
    // GameObjectData.componentMap = new Map();
    // GameObjectData.parentMap = new Map();
    // GameObjectData.childrenMap = new Map();
    GameObjectData.componentMap = createMap();
    GameObjectData.parentMap = createMap();
    GameObjectData.childrenMap = createMap();
}
