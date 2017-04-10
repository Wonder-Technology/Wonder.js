import {Transform} from "./Transform";
import {updateTransform} from "./TransformSystem";
import flow from "lodash-es/flow";

export class LogicWorld{
    public static of() {
    	var obj = new this();

    	return obj;
    }

    private _transforms:Array<Transform> = [];

    public add(tra:Transform){
        this._transforms.push(tra);
    }

    public getCount(){
        return this._transforms.length;
    }
}




export var world = LogicWorld.of();

var updateOther = () => {};

export var updateAll = flow(updateTransform, updateOther);









export var updateLogicWorld = (world:LogicWorld, elapsed:number) => {
    updateAll(world);
};
