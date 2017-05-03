import { Entity } from "../core/Entity";
import { virtual } from "../definition/typescript/decorator/virtual";
import { EntityObject } from "../core/entityObject/EntityObject";
import { Map } from "immutable";
import { error, Log } from "../utils/Log";
import { ClassUtils } from "../utils/ClassUtils";
import { registerClass } from "../definition/typescript/decorator/registerClass";

//todo rename to Component?
@registerClass("DataOrientedComponent")
export abstract class DataOrientedComponent extends Entity {
    // public indexInArrayBuffer:number = null;
    // public isAddedToEntityObject: boolean = false;
    public entityObject: EntityObject = null;

    @virtual
    public init(state: Map<any, any>) {
        return state;
    }

    @virtual
    public dispose() {
        this.disposeFromSystem();
    }

    @virtual
    public addToObject(entityObject: EntityObject) {
        // this.isAddedToEntityObject = true;

        error(this.entityObject !== null, Log.info.FUNC_SHOULD_NOT(`component: ${ClassUtils.getClassNameByInstance(this)}`, "already be added to one entityObject"));

        this.entityObject = entityObject;

        this.addToSystem()
    }

    @virtual
    public addToSystem() {
    }

    @virtual
    public disposeFromSystem() {
    }
}