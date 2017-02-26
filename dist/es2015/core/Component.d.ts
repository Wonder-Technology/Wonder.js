import { Entity } from "./Entity";
import { Transform } from "../component/transform/Transform";
import { EntityObject } from "./entityObject/EntityObject";
export declare abstract class Component extends Entity {
    readonly transform: Transform;
    entityObject: EntityObject;
    init(): void;
    dispose(): void;
    clone(): any;
    addToObject(entityObject: EntityObject, isShareComponent?: boolean): void;
    addToComponentContainer(): void;
    removeFromObject(entityObject: EntityObject): void;
    removeFromComponentContainer(): void;
}
