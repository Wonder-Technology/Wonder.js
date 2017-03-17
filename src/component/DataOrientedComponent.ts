import { Entity } from "../core/Entity";

export abstract class DataOrientedComponent extends Entity {
    public indexInArrayBuffer:number = null;

    //todo add "addToSystem" method?
}