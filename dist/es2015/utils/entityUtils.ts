import { IUIdEntity } from "../core/entityObject/gameObject/IUIdEntity";

export const removeChildEntity = (children: Array<IUIdEntity>, targetUId: number) => {
    for (let i = 0, len = children.length; i < len; ++i) {
        if (children[i].uid === targetUId) {
            children.splice(i, 1);
            break;
        }
    }
}
