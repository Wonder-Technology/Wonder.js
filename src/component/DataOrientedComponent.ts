import { registerClass } from "../definition/typescript/decorator/registerClass";

@registerClass("DataOrientedComponent")
export class DataOrientedComponent implements IDataOrientedComponent{
    public uid:number = null;
    public index:number = null;
}

export interface IDataOrientedComponent{
    uid:number;
    index:number;
}
