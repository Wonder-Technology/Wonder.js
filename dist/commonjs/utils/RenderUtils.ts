import { registerClass } from "../definition/typescript/decorator/registerClass";
import { Collection } from "wonder-commonlib/dist/commonjs/Collection";
import { GameObject } from "../core/entityObject/gameObject/GameObject";

@registerClass("RenderUtils")
export class RenderUtils {
    public static getGameObjectRenderList(sourceList: Collection<GameObject>) {
        var renderList = [];
        // GameObjectLOD:any = ClassUtils.getClass("GameObjectLOD");

        sourceList.forEach((child: GameObject) => {
            var activeGameObject: GameObject = null;

            activeGameObject = child;

            // if(activeGameObject.isVisible && !InstanceUtils.isObjectInstance(activeGameObject)){
            if (activeGameObject.isVisible) {
                renderList.push(activeGameObject);
            }
        });

        //todo optimize:use temp Collection
        return Collection.create<GameObject>(renderList);
    }
}