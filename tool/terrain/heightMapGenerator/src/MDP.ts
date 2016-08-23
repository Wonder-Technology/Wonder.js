import {IHeightComputer} from "./IHeightComputer";

import Vector2 = require("../../../ts/Vector2");

export class MDP implements IHeightComputer{
    public static create() {
    	var obj = new this();

    	return obj;
    }

    private _heightDataArr:Array<number> = [];
    private _displacement:number = null;
    private _width:number = null;
    private _height:number = null;

    public generateHeightData(width:number, height:number,displacement:number, roughness:number, isWrap:boolean):Array<number>{
        var inital_height:number = null,
            heightDataArr = this._heightDataArr;

        if(isWrap){
            inital_height = 0;
        }
        else{
            //todo set different value in different point when not wrap?

            inital_height = 0;
        }

        this._displacement = displacement;
        this._width = width;
        this._height = height;

        for(let row = 0; row < height; row++){
            for(let col = 0; col < width; col++){
                heightDataArr[this._buildHeightDataIndex(row, col)] = inital_height;
            }
        }

        let cornerPointDataArr:Array<CornerPointData> = [];

        let cornerPointData = this._findInitalCornerPoints();

        cornerPointDataArr.push(cornerPointData);

        let centerPoint:Vector2 = null;

        let midPointData:MidPointData = null;

        while(cornerPointDataArr.length > 0){
            cornerPointData = cornerPointDataArr.shift();

            centerPoint = this._findCenterPoint(cornerPointData);

            if(centerPoint === null){
                break;
            }

            heightDataArr[this._buildHeightDataIndex(centerPoint.y, centerPoint.x)] = this._computeCenterPointHeight(cornerPointData);

            midPointData = this._findMidPoints(cornerPointData, centerPoint);

            if(isWrap){
                this._computeAndSetWrapMidPointsHeight(cornerPointData, centerPoint, midPointData);
            }
            else{
                this._computeAndSetNoWrapMidPointsHeight(cornerPointData, centerPoint, midPointData);
            }

            cornerPointDataArr = cornerPointDataArr.concat(this._buildCornerPointData(cornerPointData, centerPoint, midPointData));
        }

        return heightDataArr;
    }

    private _buildHeightDataIndex(row:number, col:number){
        return row * this._width + col;
    }

    //todo assert width,height >= 1
    private _findInitalCornerPoints(){
        var maxX = this._width - 1,
            maxY = this._height - 1;

        return {
            leftUpPoint:Vector2.create(0, maxY),
            rightUpPoint:Vector2.create(maxX, maxY),
            rightBottomPoint:Vector2.create(maxX, 0),
            leftBottomPoint:Vector2.create(0, 0)
        }
    }

    private _findCornerPoints(){

    }

    //todo assert CornerPointData
    private _findCenterPoint({
        leftUpPoint,
        rightUpPoint,
        rightBottomPoint,
        leftBottomPoint
        }):Vector2{
        var x = (rightUpPoint.x - leftUpPoint.x) / 2 + leftUpPoint.x,
            y = (leftUpPoint.y - leftBottomPoint.y) / 2 + leftBottomPoint.y;

        if(x <= leftUpPoint.x || y <= leftBottomPoint.y){
            return null;
        }

        return Vector2.create(x, y);
    }

    private _computeCenterPointHeight({
        leftUpPoint,
        rightUpPoint,
        rightBottomPoint,
        leftBottomPoint
        }){
        var heightDataArr = this._heightDataArr;

        //return (
        //heightDataArr[this._buildHeightDataIndex(
        //    leftUpPoint.y, leftUpPoint.x
        //)]
        //+ heightDataArr[this._buildHeightDataIndex(
        //    rightUpPoint.y, rightUpPoint.x
        //)]
        //+ heightDataArr[this._buildHeightDataIndex(
        //    leftBottomPoint.y, leftBottomPoint.x
        //)]
        //+ heightDataArr[this._buildHeightDataIndex(
        //    rightBottomPoint.y, rightBottomPoint.x
        //)]
        //) / 4 + this._buildRandomDisplacement();
        return (
                this._getHeight(leftUpPoint)
                + this._getHeight(rightUpPoint)
                + this._getHeight(leftBottomPoint)
                + this._getHeight(rightBottomPoint)
            ) / 4 + this._buildRandomDisplacement();
    }

    //todo assert leftUpPoint.y === rightUpPoint.y, ...
    private _findMidPoints({
        leftUpPoint,
        rightUpPoint,
        rightBottomPoint,
        leftBottomPoint
        }, centerPoint:Vector2){
        return {
            upPoint:Vector2.create(centerPoint.x, leftUpPoint.y),
            bottomPoint:Vector2.create(centerPoint.x, leftBottomPoint.y),
            leftPoint:Vector2.create(leftUpPoint.x, centerPoint.y),
            rightPoint:Vector2.create(rightUpPoint.x, centerPoint.y)
        }
    }

    private _getHeight(point:Vector2){
        return this._heightDataArr[this._buildHeightDataIndex(point.y, point.x)];
    }

    private _setHeight(point:Vector2, height:number){
        this._heightDataArr[this._buildHeightDataIndex(point.y, point.x)] = height;
    }

    private _computeAndSetWrapMidPointsHeight({
        leftUpPoint,
        rightUpPoint,
        rightBottomPoint,
        leftBottomPoint
        }, centerPoint:Vector2, {
        upPoint,
        bottomPoint,
        leftPoint,
        rightPoint
        }){
        var upHeight:number = null,
            bottomHeight:number = null,
            leftHeight:number = null,
            rightHeight:number = null;

        upHeight = (
                this._getHeight(leftUpPoint)
                + this._getHeight(rightUpPoint)
                + this._getHeight(centerPoint)
                + this._getHeight(centerPoint)
            ) / 4 + this._buildRandomDisplacement();

        leftHeight  = (
                this._getHeight(leftUpPoint)
                + this._getHeight(leftBottomPoint)
                + this._getHeight(centerPoint)
                + this._getHeight(centerPoint)
            ) / 4 + this._buildRandomDisplacement();

        bottomHeight = upHeight;
        rightHeight = leftBottomPoint;

        this._setHeight(upPoint, upHeight);
        this._setHeight(bottomPoint, bottomHeight);
        this._setHeight(leftPoint, leftHeight);
        this._setHeight(rightPoint, rightHeight);
    }

    private _computeAndSetNoWrapMidPointsHeight({
        leftUpPoint,
        rightUpPoint,
        rightBottomPoint,
        leftBottomPoint
        }, centerPoint:Vector2, {
        upPoint,
        bottomPoint,
        leftPoint,
        rightPoint
        }){
        var upHeight:number = null,
            bottomHeight:number = null,
            leftHeight:number = null,
            rightHeight:number = null;

        upHeight = (
                this._getHeight(leftUpPoint)
                + this._getHeight(rightUpPoint)
                + this._getHeight(centerPoint)
            ) / 3 + this._buildRandomDisplacement();

        bottomHeight = (
                this._getHeight(leftBottomPoint)
                + this._getHeight(rightBottomPoint)
                + this._getHeight(centerPoint)
            ) / 3 + this._buildRandomDisplacement();

        leftHeight  = (
                this._getHeight(leftUpPoint)
                + this._getHeight(leftBottomPoint)
                + this._getHeight(centerPoint)
            ) / 3 + this._buildRandomDisplacement();

        rightHeight  = (
                this._getHeight(rightUpPoint)
                + this._getHeight(rightBottomPoint)
                + this._getHeight(centerPoint)
            ) / 3 + this._buildRandomDisplacement();

        this._setHeight(upPoint, upHeight);
        this._setHeight(bottomPoint, bottomHeight);
        this._setHeight(leftPoint, leftHeight);
        this._setHeight(rightPoint, rightHeight);
    }

    private _buildCornerPointData({
        leftUpPoint,
        rightUpPoint,
        rightBottomPoint,
        leftBottomPoint
        }, centerPoint:Vector2, {
        upPoint,
        bottomPoint,
        leftPoint,
        rightPoint
        }){
        return [
            {
                leftUpPoint:leftUpPoint.clone(),
                rightUpPoint:upPoint.clone(),
                rightBottomPoint:centerPoint.clone(),
                leftBottomPoint:leftPoint.clone()
            },
            {
                leftUpPoint:upPoint.clone(),
                rightUpPoint:rightUpPoint.clone(),
                rightBottomPoint:rightPoint.clone(),
                leftBottomPoint:centerPoint.clone()
            },
            {
                leftUpPoint:leftPoint.clone(),
                rightUpPoint:centerPoint.clone(),
                rightBottomPoint:bottomPoint.clone(),
                leftBottomPoint:leftBottomPoint.clone()
            },
            {
                leftUpPoint:centerPoint.clone(),
                rightUpPoint:rightPoint.clone(),
                rightBottomPoint:rightBottomPoint.clone(),
                leftBottomPoint:bottomPoint.clone()
            }
        ]
    }

    private _buildRandomDisplacement(){
        return Math.random() * this._displacement * 2 - this._displacement;
    }
}

type CornerPointData = {
    leftUpPoint:Vector2,
    rightUpPoint:Vector2,
    rightBottomPoint:Vector2,
    leftBottomPoint:Vector2
}

type MidPointData = {
    upPoint:Vector2,
    bottomPoint:Vector2,
    leftPoint:Vector2,
    rightPoint:Vector2
}
