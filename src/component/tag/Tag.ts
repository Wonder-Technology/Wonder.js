import { registerClass } from "../../definition/typescript/decorator/registerClass";
import { Component } from "../Component";
import {
    addAddComponentHandle, addTag as addTagSystemTag, removeTag as removeTagSystemTag, create,
    findGameObjectsByTag as findTagSystemTagGameObjectsByTag, initData
} from "./TagSystem";
import { TagData } from "./TagData";
import { GameObject } from "../../core/entityObject/gameObject/GameObject";

@registerClass("Tag")
export class Tag extends Component{
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

addAddComponentHandle(Tag, TagData);

initData(TagData);
