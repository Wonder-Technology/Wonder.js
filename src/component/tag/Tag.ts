import { registerClass } from "../../definition/typescript/decorator/registerClass";
import { Component } from "../Component";
import {
    addTag as addTagSystemTag, removeTag as removeTagSystemTag, create,
    findGameObjectsByTag as findTagSystemTagGameObjectsByTag, getGameObject
} from "./TagSystem";
import { TagData } from "./TagData";
import { GameObject } from "../../core/entityObject/gameObject/GameObject";

@registerClass("Tag")
export class Tag extends Component{
    public index:number = null;
}

export var createTag = (slotCount:number = 4) => {
    return create(slotCount, TagData);
}

export var addTag = (tagComponent:Tag, tag:string) => {
    addTagSystemTag(tagComponent, tag, TagData);
}

export var removeTag = (tagComponent:Tag, tag:string) => {
    removeTagSystemTag(tagComponent, tag, TagData);
}

export var findGameObjectsByTag = (tag:string) => {
    return findTagSystemTagGameObjectsByTag(tag, TagData);
}

export var getTagGameObject = (component:Tag) => {
    return getGameObject(component.index, TagData);
}
