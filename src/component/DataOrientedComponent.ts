import { Entity } from "../core/Entity";
import {virtual} from "../definition/typescript/decorator/virtual";
import {EntityObject} from "../core/entityObject/EntityObject";

//todo rename to Component?
export abstract class DataOrientedComponent extends Entity {
    public indexInArrayBuffer:number = null;
    public isAddedToEntityObject:boolean = false;
    public entityObject: EntityObject = null;

    @virtual
    public init() {
    }

    @virtual
    public dispose() {
    }

    @virtual
    public addToObject(entityObject: EntityObject) {
        this.isAddedToEntityObject = true;

        if(this.entityObject !== null){
            this.entityObject.removeDataOrientedComponent(this);
        }

        this.entityObject = entityObject;

        this.addToSystem()
    }

    @virtual
    public removeFromObject(entityObject: EntityObject) {
        this.isAddedToEntityObject = false;

        this.removeFromSystem();
    }

    @virtual
    public addToSystem(){
    }

    @virtual
    public removeFromSystem(){
    }
}