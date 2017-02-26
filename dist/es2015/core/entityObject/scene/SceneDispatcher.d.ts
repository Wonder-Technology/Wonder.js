/// <reference types="wonder-commonlib" />
import { EntityObject } from "../EntityObject";
import { GameObject } from "../gameObject/GameObject";
import { GameObjectScene } from "./gameObjectScene/GameObjectScene";
import { Collection } from "wonder-commonlib/dist/es2015/Collection";
export declare class SceneDispatcher extends EntityObject {
    static create(): SceneDispatcher;
    currentCamera: GameObject;
    name: string;
    gameObjectScene: GameObjectScene;
    addChild(child: EntityObject): EntityObject;
    dispose(): void;
    hasChild(child: EntityObject): boolean;
    addChildren(children: EntityObject): any;
    addChildren(children: Array<EntityObject>): any;
    addChildren(children: Collection<EntityObject>): any;
    getChildren(): Collection<any>;
    protected createTransform(): any;
}
