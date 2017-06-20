import { IUIDEntity } from "../core/entityObject/gameObject/GameObject";
import { GameObjectUIDMap } from "../core/entityObject/gameObject/GameObjectData";

export var removeChildEntity = (children: Array<IUIDEntity>, targetUID: number) => {
    for (let i = 0, len = children.length; i < len; ++i) {
        if (children[i].uid === targetUID) {
            children.splice(i, 1);
            break;
        }
    }
}
