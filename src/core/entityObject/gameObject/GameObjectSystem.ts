import { GameObject, IUIDEntity } from "./GameObject";
import { DataOrientedComponent } from "../../../component/DataOrientedComponent";
import { getTypeIdFromClass, getTypeIdFromComponent } from "../../../component/DataOrientedComponentTypeIdManager";
import { deleteVal, isValidMapValue } from "../../../utils/objectUtils";
import { create as createThreeDTransform, setParent } from "../../../component/transform/ThreeDTransformSystem";
import { GameObjectData, GameObjectParentMap } from "./GameObjectData";
import { it, requireCheckFunc } from "../../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { ThreeDTransform } from "../../../component/transform/ThreeDTransform";
import filter from "wonder-lodash/filter";
import forEach from "wonder-lodash/forEach";
import { isNotUndefined } from "../../../utils/JudgeUtils";
import { execHandle } from "../../../component/DataOrientedComponentSystem";

const MINIMUM_FREE_INDICES = 1024,
    ENTITY_INDEX_BITS = 22,
    ENTITY_INDEX_MASK = (1 << ENTITY_INDEX_BITS) - 1,
    ENTITY_GENERATION_BITS = 8,
    ENTITY_GENERATION_MASK = (1 << ENTITY_GENERATION_BITS) - 1;

export var getIndex = (uid:number) => uid & ENTITY_INDEX_MASK;

export var getGeneration = (uid:number) => (uid >> ENTITY_INDEX_BITS) & ENTITY_GENERATION_MASK;

export var create = (transform:ThreeDTransform, GameObjectData:any) => {
    var gameObject:GameObject = new GameObject(),
        freeIndiceQueue:Array<number> = GameObjectData.freeIndiceQueue,
        generationArr:Array<number> = GameObjectData.generationArr;

    gameObject.uid = _buildUID(freeIndiceQueue, generationArr);

    if(!!transform){
        addComponent(gameObject, transform, GameObjectData);
    }

    return gameObject;
}

var _buildUID = (freeIndiceQueue:Array<number>, generationArr:Array<number>) => {
    var index: number = null,
        generation: number = null;

    if (freeIndiceQueue.length > MINIMUM_FREE_INDICES) {
        index = freeIndiceQueue.shift();

        generation = generationArr[index];
    }
    else {
        generation = 0;
        generationArr.push(generation);

        index = generationArr.length - 1;
    }

    return _buildUIDFromIndexAndGeneration(index, generation);
}

var _buildUIDFromIndexAndGeneration = (index: number, generation: number) => (generation << ENTITY_INDEX_BITS) + index;

export var isAlive = (entity:IUIDEntity, GameObjectData:any) => {
    var uid = entity.uid,
        generationArr:Array<number> = GameObjectData.generationArr;

    return generationArr[getIndex(uid)] === getGeneration(uid);
}

export var dispose = requireCheckFunc((entity:IUIDEntity, GameObjectData:any) => {
}, (entity:IUIDEntity, ThreeDTransformData:any, GameObjectData:any) => {
    var uid = entity.uid,
        index = getIndex(uid),
        freeIndiceQueue:Array<number> = GameObjectData.freeIndiceQueue,
        generationArr:Array<number> = GameObjectData.generationArr;

    generationArr[index] += 1;
    freeIndiceQueue.push(index);

    let parent = _getParent(uid, GameObjectData);

    if(_isParentExist(parent)){
        _removeFromChildrenMap(parent.uid, uid, GameObjectData);
    }

    _diposeAllDatas(entity, GameObjectData);
})

var _removeFromChildrenMap = (parentUID:number, childUID:number, GameObjectData:any) => {
    _setChildren(parentUID, filter(_getChildren(parentUID, GameObjectData), (gameObject:GameObject) => {
        return gameObject.uid !== childUID;
    }), GameObjectData);
}

var _diposeAllDatas = (gameObject:GameObject, GameObjectData:any) => {
    let uid = gameObject.uid,
        children = _getChildren(uid, GameObjectData);

    _disposeAllComponents(gameObject, GameObjectData);
    _disposeMapDatas(uid, GameObjectData);

    forEach(children, (child:GameObject) => {
        _diposeAllDatas(child, GameObjectData);
    })
}

var _disposeMapDatas = (uid:number, GameObjectData:any) => {
    deleteVal(uid, GameObjectData.childrenMap);
    deleteVal(uid, GameObjectData.parentMap);
    deleteVal(uid, GameObjectData.componentMap);
}

var _disposeAllComponents = (gameObject:GameObject, GameObjectData:any) => {
    var components = GameObjectData.componentMap[gameObject.uid];

    //todo optimize?
    for(let typeID in components){
        if(components.hasOwnProperty(typeID)){
            let component = components[typeID];

            execHandle(component, "disposeHandleMap");
        }
    }
}

export var addComponent = requireCheckFunc((gameObject:GameObject, component: DataOrientedComponent, GameObjectData:any) => {
    it("should not has this type of component, please dispose it", () => {
        expect(hasComponent(gameObject, getTypeIdFromComponent(component), GameObjectData)).false;
    });
}, (gameObject:GameObject, component: DataOrientedComponent, GameObjectData:any) => {
    var uid = gameObject.uid,
        typeID = getTypeIdFromComponent(component),
        data = GameObjectData.componentMap[uid];

    execHandle(component, "addComponentHandleMap", [component, gameObject]);

    if(!data){
        let d = {};

        d[typeID] = component;
        GameObjectData.componentMap[uid] = d;

        return;
    }

    data[typeID] = component;
})

var _removeComponent = (typeID:string, gameObject:GameObject, component: DataOrientedComponent, GameObjectData:any) => {
    var uid = gameObject.uid,
        data = GameObjectData.componentMap[uid];

    if(isValidMapValue(data)){
        deleteVal(typeID, data);
    }
}

// export var removeComponent = (gameObject:GameObject, component: DataOrientedComponent, GameObjectData:any) => {
//     _removeComponent(getTypeIdFromComponent(component), gameObject, component, GameObjectData);
// }

export var disposeComponent = (gameObject:GameObject, component: DataOrientedComponent, GameObjectData:any) => {
    var typeID = getTypeIdFromComponent(component);

    _removeComponent(typeID, gameObject, component, GameObjectData);

    execHandle(component, "disposeHandleMap");
}

export var getComponent = (gameObject:GameObject, componentTypeID:string, GameObjectData:any) => {
    var uid = gameObject.uid,
        data = GameObjectData.componentMap[uid];

    if(isValidMapValue(data)){
        let component = data[componentTypeID];

        return isValidMapValue(component) ? component : null;
    }

    return null;
}

export var hasComponent = (gameObject:GameObject, componentTypeID:string, GameObjectData:any) => {
    return getComponent(gameObject, componentTypeID, GameObjectData) !== null;
}

export var getTransform = (gameObject:GameObject, GameObjectData:any) => {
    return getComponent(gameObject, getTypeIdFromClass(ThreeDTransform), GameObjectData);
}

var _isParentExist = (parent:GameObject) => isNotUndefined(parent);

var _isChildrenExist = (children:Array<GameObject>) => isNotUndefined(children);

var _isComponentExist = (component:DataOrientedComponent) => component !== null;

var _isGameObjectEqual = (gameObject1:GameObject, gameObject2:GameObject) => gameObject1.uid === gameObject2.uid;

var _getParent = (uid:number, GameObjectData:any) => GameObjectData.parentMap[uid];

var _setParent = (uid:number, parent:GameObject, GameObjectData:any) => {
    GameObjectData.parentMap[uid] = parent;
}

var _getChildren = (uid:number, GameObjectData:any) => {
    return GameObjectData.childrenMap[uid];
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

var _setChildren = (uid:number, children:Array<GameObject>, GameObject:any) => {
    GameObjectData.childrenMap[uid] = children;
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
