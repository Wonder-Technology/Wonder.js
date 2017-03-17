import { Entity } from "../core/Entity";
import {virtual} from "../definition/typescript/decorator/virtual";
import {EntityObject} from "../core/entityObject/EntityObject";

export abstract class DataOrientedComponent extends Entity {
    public indexInArrayBuffer:number = null;
    public entityObject: EntityObject = null;

    @virtual
    public init() {
    }

    @virtual
    public dispose() {
    }

    @virtual
    public addToObject(entityObject: EntityObject) {
        if(this.entityObject !== null){
            this.entityObject.removeDataOrientedComponent(this);
        }

        this.entityObject = entityObject;

        this.addToSystem()
    }

    @virtual
    public removeFromObject(entityObject: EntityObject) {
        this.removeFromSystem();
    }

    @virtual
    public addToSystem(){
    }

    @virtual
    public removeFromSystem(){
    }
}