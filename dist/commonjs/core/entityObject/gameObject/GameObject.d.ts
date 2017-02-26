/// <reference types="wonder-commonlib" />
import { EntityObject } from "../EntityObject";
import { ThreeDTransform } from "../../../component/transform/ThreeDTransform";
import { Collection } from "wonder-commonlib/dist/commonjs/Collection";
export declare class GameObject extends EntityObject {
    static create(): GameObject;
    transform: ThreeDTransform;
    parent: GameObject;
    renderGroup: number;
    renderPriority: number;
    isVisible: boolean;
    protected children: Collection<GameObject>;
    initWhenCreate(): void;
    protected createTransform(): ThreeDTransform;
    protected getRenderList(): Collection<GameObject>;
}
