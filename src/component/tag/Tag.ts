import { registerClass } from "../../definition/typescript/decorator/registerClass";
import { Component } from "../Component";
import {
    addTag as addTagSystemTag, removeTag as removeTagSystemTag, create,
    findGameObjectsByTag as findTagSystemTagGameObjectsByTag, getGameObject
} from "./TagSystem";
import { TagData } from "./TagData";
import { requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { checkComponentShouldAlive } from "../ComponentSystem";
import { isValidMapValue } from "../../utils/objectUtils";
import { GameObject } from "../../core/entityObject/gameObject/GameObject";

@registerClass("Tag")
export class Tag extends Component {
}

export const createTag = (slotCount: number = 4) => {
    return create(slotCount, TagData);
}

export const addTag = requireCheckFunc((component: Tag, tag: string) => {
    _checkShouldAlive(component, TagData);
}, (component: Tag, tag: string) => {
    addTagSystemTag(component, tag, TagData);
})

export const removeTag = requireCheckFunc((component: Tag, tag: string) => {
    _checkShouldAlive(component, TagData);
}, (component: Tag, tag: string) => {
    removeTagSystemTag(component, tag, TagData);
})

export const findGameObjectsByTag = (tag: string) => {
    return findTagSystemTagGameObjectsByTag(tag, TagData);
}

export const getTagGameObject = requireCheckFunc((component: Tag) => {
    _checkShouldAlive(component, TagData);
}, (component: Tag) => {
    return getGameObject(component.index, TagData);
})

const _checkShouldAlive = (tag: Tag, TagData: any) => {
    checkComponentShouldAlive(tag, TagData, (tag: Tag, TagData: any) => {
        return isValidMapValue(TagData.indexMap[TagData.indexInTagArrayMap[tag.index]]);
    })
}
