import { Entity } from "./Entity";
import { Transform } from "../component/transform/Transform";
import { EntityObject } from "./entityObject/EntityObject";
import { virtual } from "../definition/typescript/decorator/virtual";
import { CloneUtils } from "../definition/typescript/decorator/clone";

export abstract class Component extends Entity {
    get transform(): Transform {
        if (!this.entityObject) {
            return null;
        }

        return this.entityObject.transform;
    }

    public entityObject: EntityObject = null;

    @virtual
    public init() {
    }

    @virtual
    public dispose() {
    }

    @virtual
    public clone(): any {
        return CloneUtils.clone(this);
    }

    @virtual
    public addToObject(entityObject: EntityObject, isShareComponent: boolean = false) {
        if (isShareComponent) {
            return;
        }

        if (this.entityObject) {
            this.entityObject.removeComponent(this);
        }
        this.entityObject = entityObject;

        this.addToComponentContainer();
    }

    @virtual
    public addToComponentContainer() {
    }

    @virtual
    public removeFromObject(entityObject: EntityObject) {
        this.removeFromComponentContainer();
    }

    @virtual
    public removeFromComponentContainer() {
    }
}