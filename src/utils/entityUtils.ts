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

// export var removeBatchChildEntities = (children: Array<IUIDEntity>, targetUIDMap: GameObjectUIDMap) => {
//     var newChildren:Array<IUIDEntity> = [];
//
//     for (let i = 0, len = children.length; i < len; ++i) {
//         let child = children[i];
//
//         if(targetUIDMap[child.uid] !== true){
//             newChildren.push(child);
//         }
//     }
//
//     return newChildren;
// }

// export var cleanChildrenMap = (children: Array<IUIDEntity>, targetUIDMap: GameObjectUIDMap) => {
//     var newChildren:Array<IUIDEntity> = [];
//
//     for (let i = 0, len = children.length; i < len; ++i) {
//         let child = children[i];
//
//         if(targetUIDMap[child.uid] !== true){
//             newChildren.push(child);
//         }
//     }
//
//     return newChildren;
// }
