import {IHeightComputer} from "./IHeightComputer";

export class Fault implements IHeightComputer{
    public static create() {
    	var obj = new this();

    	return obj;
    }

    private _heightDataArr:Array<number> = [];

    public generateHeightData(width:number, height:number, iterationCount:number = 100, smoothLevel:number = 0):Array<number>{
        var heightDataArr = this._heightDataArr;

        for(let row = 0; row < height; row++){
            for(let col = 0; col < width; col++){
                heightDataArr[this._buildHeightDataIndex(row, col, width)] = 0;
            }
        }

        for(let i = 0; i < iterationCount; i++){
            this._iterate(width, height);
        }

        return heightDataArr;
    }

    private _iterate(width:number, height:number){
        var v = Math.PI * Math.random(),
            a = Math.sin(v),
            b = Math.cos(v),
            d = Math.sqrt(width**2 + height**2),
            c = Math.random() * d - d / 2,
            heightDataArr = this._heightDataArr;

        for(let row = 0; row < height; row++){
            for(let col = 0; col < width; col++){
                let distance = a * col + b * row - c,
                    index = this._buildHeightDataIndex(row, col, width);

                heightDataArr[index] += this._computeDisplacement(distance);
            }
        }
    }

    private _buildHeightDataIndex(row:number, col:number, width:number){
        return row * width + col;
    }

    private _computeDisplacement(distance:number){
        //todo smooth
        var displacement = 1;

        if(distance > 0){
            return displacement;
        }

        return -displacement;
    }
}
