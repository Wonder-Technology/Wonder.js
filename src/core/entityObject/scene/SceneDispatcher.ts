import { registerClass } from "../../../definition/typescript/decorator/registerClass";
import { EntityObject } from "../EntityObject";
import { GameObject } from "../gameObject/GameObject";
import { GameObjectScene } from "./gameObjectScene/GameObjectScene";
import { Collection } from "wonder-commonlib/dist/es2015/Collection";
import { JudgeUtils } from "../../../utils/JudgeUtils";

@registerClass("SceneDispatcher")
export class SceneDispatcher extends EntityObject {
    public static create() {
        var obj = new this();

        obj.initWhenCreate();

        return obj;
    }

    // get currentCamera(): GameObject {
    //     return this.gameObjectScene.currentCamera;
    // }
    // set currentCamera(arg: GameObject) {
    //     this.gameObjectScene.currentCamera = arg;
    // }

    public name: string = `scene${String(this.uid)}`;

    public gameObjectScene: GameObjectScene = GameObjectScene.create();

    public addChild(child: EntityObject): EntityObject {
        if (child instanceof GameObject) {
            this.gameObjectScene.addChild(child);
        }
        child.parent = this;

        return this;
    }

    public dispose() {
        this.gameObjectScene.dispose();
    }

    public hasChild(child: EntityObject): boolean {
        if (child instanceof GameObject) {
            return this.gameObjectScene.hasChild(child);
        }
    }

    public addChildren(children: EntityObject);
    public addChildren(children: Array<EntityObject>);
    public addChildren(children: Collection<EntityObject>);

    public addChildren(...args) {
        if (args[0] instanceof EntityObject) {
            let child: EntityObject = <EntityObject>args[0];

            this.addChild(child);
        }
        if (args[0] instanceof Collection) {
            let children: Collection<EntityObject> = <Collection<EntityObject>>args[0],
                self = this;

            children.forEach((child: EntityObject) => {
                self.addChild(child);
            });
        }
        else if (JudgeUtils.isArrayExactly(args[0])) {
            let children: Array<EntityObject> = <Array<EntityObject>>args[0];

            for (let child of children) {
                this.addChild(child);
            }
        }

        return this;
    }

    public getChildren() {
        return this.gameObjectScene.getChildren();
    }

    protected createTransform() {
        return null;
    }
}