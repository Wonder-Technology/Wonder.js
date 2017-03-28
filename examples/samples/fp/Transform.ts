import {setPosition} from "./TransformSystem";

export class Transform{
    public static of() {
    	return new this();
    }

    public indexInArrayBuffer:number = generateIndex();

    private _children:Array<Transform> = [];
    // public _data:TransformData = TransformData.of();

    //todo refactor:remove
    public setPosition(position:number){
        // this._data[this.indexInArrayBuffer] = position;
        setPosition(this.indexInArrayBuffer, position);
    }

    public add(tra:Transform){
        this._children.push(tra);
    }
}

var seed = 0;

var generateIndex = () => {
    var result = seed;

    seed += 1;

    return result;
}
