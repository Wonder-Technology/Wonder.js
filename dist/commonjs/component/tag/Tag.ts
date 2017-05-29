import { registerClass } from "../../definition/typescript/decorator/registerClass";
import { Component } from "../Component";
import {
    addTag as addTagSystemTag, removeTag as removeTagSystemTag, create,
    findGameObjectsByTag as findTagSystemTagGameObjectsByTag, getGameObject, checkShouldAlive
} from "./TagSystem";
import { TagData } from "./TagData";
import { GameObject } from "../../core/entityObject/gameObject/GameObject";
import { requireCheckFunc } from "../../definition/typescript/decorator/contract";

@registerClass("Tag")
export class Tag extends Component {
}

export var createTag = (slotCount: number = 4) => {
    return create(slotCount, TagData);
}

export var addTag = requireCheckFunc((component: Tag, tag: string) => {
    checkShouldAlive(component, TagData);
}, (component: Tag, tag: string) => {
    addTagSystemTag(component, tag, TagData);
})

export var removeTag = requireCheckFunc((component: Tag, tag: string) => {
    checkShouldAlive(component, TagData);
}, (component: Tag, tag: string) => {
    removeTagSystemTag(component, tag, TagData);
})

export var findGameObjectsByTag = (tag: string) => {
    return findTagSystemTagGameObjectsByTag(tag, TagData);
}

export var getTagGameObject = requireCheckFunc((component: Tag) => {
    checkShouldAlive(component, TagData);
}, (component: Tag) => {
    return getGameObject(component.index, TagData);
})
