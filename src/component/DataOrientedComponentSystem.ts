import { DataOrientedComponentData } from "./DataOrientedComponentData";
import { DataOrientedComponent } from "./DataOrientedComponent";
import { getTypeIdFromClass, getTypeIdFromComponent } from "./DataOrientedComponentTypeIdManager";
import { GameObject } from "../core/entityObject/gameObject/GameObject";


var _addHandle = (_class:any, handleMap:object, handle:(component:DataOrientedComponent, ...args) => void) => {
    var typeID = getTypeIdFromClass(_class);

    handleMap[typeID] = handle;
}

export var addAddComponentHandle = (_class:any, handle:(component:DataOrientedComponent, gameObject:GameObject) => void) => {
    _addHandle(_class, DataOrientedComponentData.addComponentHandleMap, handle);
}

export var addDisposeHandle = (_class:any, handle:(component:DataOrientedComponent) => void) => {
    _addHandle(_class, DataOrientedComponentData.disposeHandleMap, handle);
}

export var execHandle = (component:DataOrientedComponent, handleMapName:string, args?:Array<any>) => {
    var handle = DataOrientedComponentData[handleMapName][getTypeIdFromComponent(component)];

    if(!!args){
        handle.apply(null, args);
    }
    else{
        handle(component);
    }
}