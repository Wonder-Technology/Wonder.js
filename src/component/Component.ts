import { registerClass } from "../definition/typescript/decorator/registerClass";

@registerClass("Component")
export class Component implements IComponent{
    public uid:number = null;
    public index:number = null;
}

export interface IComponent{
    uid:number;
    index:number;
}
