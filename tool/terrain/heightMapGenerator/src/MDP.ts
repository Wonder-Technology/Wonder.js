import {IHeightComputer} from "./IHeightComputer";

import Vector2 = require("../../../ts/Vector2");
import contract = require("../../../ts/definition/typescript/decorator/contract");
import chai = require("chai");

var describe = contract.describe,
    it = contract.it,
    requireInNodejs = contract.requireInNodejs,
    requireGetter = contract.requireGetter,
    requireSetter = contract.requireSetter,
    requireGetterAndSetter = contract.requireGetterAndSetter,
    ensure = contract.ensure,
    ensureGetter = contract.ensureGetter,
    ensureSetter = contract.ensureSetter,
    ensureGetterAndSetter = contract.ensureGetterAndSetter,
    invariant = contract.invariant;

var expect = chai.expect;

//todo why width,height must be a power of two?(now i don't limit it!)
export class MDP implements IHeightComputer{
    public static create() {
    	var obj = new this();

    	return obj;
    }

    private _heightDataArr:Array<number> = [];
    private _displacement:number = null;
    private _width:number = null;
    private _height:number = null;

    /*!
    refer to http://www.lighthouse3d.com/opengl/terrain/index.php?mpd2:
    1. not consider wrap case
    2. when compute mid points' height, only consider the center of its grid, not consider the center of its right grid!
     */
    public generateHeightData(width:number, height:number,displacement:number = 5, roughness:number = 1):Array<number>{
        var inital_height:number = null,
            heightDataArr = this._heightDataArr;

        inital_height = 0;

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
                continue;
            }

            heightDataArr[this._buildHeightDataIndex(centerPoint.y, centerPoint.x)] = this._computeCenterPointHeight(cornerPointData);

            midPointData = this._findMidPoints(cornerPointData, centerPoint);

            this._computeAndSetNoWrapMidPointsHeight(cornerPointData, centerPoint, midPointData);

            cornerPointDataArr = cornerPointDataArr.concat(this._buildCornerPointData(cornerPointData, centerPoint, midPointData));

            this._displacement *= 2 ** -roughness;
        }

        return heightDataArr;
    }

    private _buildHeightDataIndex(row:number, col:number){
        return row * this._width + col;
    }

    @requireInNodejs(function(){
        it("width should >= 1", () => {
            expect(this._width).greaterThan(0);
        });
        it("height should >= 1", () => {
            expect(this._height).greaterThan(0);
        });
    })
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

    @requireInNodejs(function({
        leftUpPoint,
        rightUpPoint,
        rightBottomPoint,
        leftBottomPoint
        }){
        it("should find center point in rect grid", () => {
            expect(leftUpPoint.y).equal(rightUpPoint.y);
            expect(leftBottomPoint.y).equal(rightBottomPoint.y);

            expect(leftUpPoint.x).equal(leftBottomPoint.x);
            expect(rightUpPoint.x).equal(rightBottomPoint.x);
        });
    })
    private _findCenterPoint({
        leftUpPoint,
        rightUpPoint,
        rightBottomPoint,
        leftBottomPoint
        }):Vector2{
        var x:number = null,
            y:number = null;

        x = Math.floor((rightUpPoint.x - leftUpPoint.x) / 2) + leftUpPoint.x;
        y = Math.floor((leftUpPoint.y - leftBottomPoint.y) / 2) + leftBottomPoint.y;

        if(x === leftUpPoint.x && y === leftBottomPoint.y){
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
        return (
                this._getHeight(leftUpPoint)
                + this._getHeight(rightUpPoint)
                + this._getHeight(leftBottomPoint)
                + this._getHeight(rightBottomPoint)
            ) / 4 + this._buildRandomDisplacement();
    }

    @requireInNodejs(function({
        leftUpPoint,
        rightUpPoint,
        rightBottomPoint,
        leftBottomPoint
        }, centerPoint:Vector2){
        it("should find mid points in rect grid", () => {
            expect(leftUpPoint.y).equal(rightUpPoint.y);
            expect(leftBottomPoint.y).equal(rightBottomPoint.y);

            expect(leftUpPoint.x).equal(leftBottomPoint.x);
            expect(rightUpPoint.x).equal(rightBottomPoint.x);
        });
    })
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

    @ensure(function(height:number, point:Vector2){
        it("height should be number", () => {
            expect(height).be.a("number");
        });
    })
    private _getHeight(point:Vector2){
        return this._heightDataArr[this._buildHeightDataIndex(point.y, point.x)];
    }

    private _setHeight(point:Vector2, height:number){
        this._heightDataArr[this._buildHeightDataIndex(point.y, point.x)] = height;
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
