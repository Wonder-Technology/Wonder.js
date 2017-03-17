import {ThreeDTransformData} from "./ThreeDTransformData";
import {GlobalTempData} from "../../definition/GlobalTempData";
import {DataUtils} from "../../utils/DataUtils";
import {singleton} from "../../definition/typescript/decorator/singleton";
import {requireCheck, it, ensure} from "../../definition/typescript/decorator/contract";
import expect from "wonder-expect.js";
import {ThreeDTransform} from "./ThreeDTransform";
import {Matrix4} from "../../math/Matrix4";
import {Vector3} from "../../math/Vector3";

@singleton(true)
export class ThreeDTransformSystem {
    public static getInstance(): any { };

    public static create() {
        var obj = new this();

        obj.initWhenCreate();

        return obj;
    }

    private _data = ThreeDTransformData.create();
    private _firstDirtyIndex: number = null;
    private _indexInArrayBuffer:number = 0;
    private _notUsedIndexArray:Array<number> = [];

    public initWhenCreate(){
        this._firstDirtyIndex = this._data.count;
    }

    public addComponent(transform:ThreeDTransform){
        var indexInArrayBuffer = this._generateIndexInArrayBuffer();

        transform.indexInArrayBuffer = indexInArrayBuffer;
        this._data.transforms[indexInArrayBuffer] = transform;
    }

    public getParent(indexInArrayBuffer:number){
        return this._data.transforms[this._data.parents[indexInArrayBuffer]];
    }

    public setParent(indexInArrayBuffer:number, parentIndexInArrayBuffer: number){
        var data = this._data,
            parents = data.parents,
            currentParentIndexInArrayBuffer = parents[indexInArrayBuffer];

        if(this._isValidIndex(currentParentIndexInArrayBuffer)){
            if(this._isNotChangeParent(currentParentIndexInArrayBuffer, parentIndexInArrayBuffer)){
                return;
            }

            this._removeFromParent(indexInArrayBuffer, currentParentIndexInArrayBuffer);
        }

        this._addToParent(indexInArrayBuffer, parentIndexInArrayBuffer);

        parents[indexInArrayBuffer] = parentIndexInArrayBuffer;

        this._addItAndItsChildrenToDirtyList(indexInArrayBuffer);
    }

    //todo add cache
    public getLocalToWorldMatrix(indexInArrayBuffer:number, mat:Matrix4 = Matrix4.create()){
        return DataUtils.createMatrix4ByIndex(mat, this._data.localToWorldMatrices, indexInArrayBuffer);
    }

    public getPosition(indexInArrayBuffer:number){
        return this.getLocalToWorldMatrix(indexInArrayBuffer, GlobalTempData.matrix4_1).getTranslation();
    }

    public setPosition(indexInArrayBuffer:number, position:Vector3){
        var parentIndex = this._data.parents[indexInArrayBuffer];

        if(this._isValidIndex(parentIndex)){
            DataUtils.setVectors(this._data.localPositions, position, indexInArrayBuffer);
        }
        else{
            DataUtils.setVectors(this._data.localPositions, this.getLocalToWorldMatrix(parentIndex, GlobalTempData.matrix4_1).invert().multiplyPoint(position), indexInArrayBuffer);
        }

        this._addItAndItsChildrenToDirtyList(indexInArrayBuffer);
    }

    public getLocalPosition(indexInArrayBuffer:number){
        return DataUtils.createVector3ByIndex(Vector3.create(), this._data.localPositions, indexInArrayBuffer);
    }

    public setLocalPosition(indexInArrayBuffer:number, position:Vector3){
        DataUtils.setVectors(this._data.localPositions, position, indexInArrayBuffer);

        this._addItAndItsChildrenToDirtyList(indexInArrayBuffer);
    }

    public update(elapsed: number) {
        this._updateDirtyList();
        this._cleanDirtyList();
    }

    private _isNotChangeParent(currentParentIndexInArrayBuffer:number, newParentIndexInArrayBuffer: number){
        return currentParentIndexInArrayBuffer === newParentIndexInArrayBuffer;
    }

    @requireCheck(function (indexInArrayBuffer:number) {
        it("firstDirtyIndex should <= count", () => {
            expect(this._firstDirtyIndex).lte(this._data.count);
        }, this);
    })
    private _addToDirtyList(indexInArrayBuffer:number){
        this._firstDirtyIndex += 1;
        this._notUsedIndexArray.push(indexInArrayBuffer);
        this._swap(indexInArrayBuffer, this._firstDirtyIndex);
    }

    private _isNotDirty(indexInArrayBuffer:number){
        return indexInArrayBuffer < this._firstDirtyIndex;
    }

    private _updateDirtyList() {
        //todo test:ensure parent before child
        this._sortParentBeforeChildInDirtyList();

        let count = this._data.count;

        for (let i = this._firstDirtyIndex; i < count; i++) {
            this._transform(i);
        }
    }

    private _sortParentBeforeChildInDirtyList(){
        var data = this._data,
            parents = data.parents,
            count = data.count;

        for (let i = this._firstDirtyIndex; i < count; i++) {
            let parentIndex = parents[i];

            if(parentIndex > i){
                this._swap(parentIndex, i);
            }
        }
    }

    private _swap(index1:number, index2:number){
        var data = this._data;

        data.transforms[index1].indexInArrayBuffer = index2;
        data.transforms[index2].indexInArrayBuffer = index1;

        DataUtils.swap(data.parents, index1, index2, 1);
        DataUtils.swap(data.firstChildren, index1, index2, 1);
        DataUtils.swap(data.nextSiblings, index1, index2, 1);
        DataUtils.swap(data.localToWorldMatrices, index1, index2, 16);
        DataUtils.swap(data.localPositions, index1, index2, 3);
        DataUtils.swap(data.localRotations, index1, index2, 4);
        DataUtils.swap(data.localScales, index1, index2, 3);
    }

    private _transform(index: number) {
        var data = this._data;

        DataUtils.setMatrices(
            data.localToWorldMatrices,
            DataUtils.setMatrix4ByIndex(GlobalTempData.matrix4_1, data.localToWorldMatrices, data.parents[index])
                .multiply(
                    GlobalTempData.matrix4_2.setTRS(
                        DataUtils.createVector3ByIndex(GlobalTempData.vector3_1, data.localPositions, index),
                        DataUtils.createQuaternionByIndex(GlobalTempData.quaternion_1, data.localRotations, index),
                        DataUtils.createVector3ByIndex(GlobalTempData.vector3_2, data.localScales, index)
                    )
                ),
            index
        );
    }

    //todo optimize: if transform not transformed in 5 frames, not move off
    private _cleanDirtyList(){
        var count = this._data.count;

        for (let i = this._firstDirtyIndex; i < count; i++) {
            if(this._needMoveOffDirtyList(i)){
                this._moveFromDirtyListToNormalList(i);
            }
        }
    }

    private _needMoveOffDirtyList(index:number){
        return true;
    }

    private _moveFromDirtyListToNormalList(index:number){
        this._swap(this._generateIndexInNormalList(), index);
    }

    @ensure(function (indexInArrayBuffer:number) {
        it("indexInArrayBuffer should < firstDirtyIndex", function () {
            expect(indexInArrayBuffer).exist;
            expect(indexInArrayBuffer).lessThan(this._firstDirtyIndex);
        }, this);
    })
    private _generateIndexInArrayBuffer(){
        var result = this._indexInArrayBuffer;

        if(result >= this._firstDirtyIndex){
            return this._notUsedIndexArray.pop();
        }

        this._indexInArrayBuffer += 1;

        return result;
    }

    @ensure(function (indexInArrayBuffer:number) {
        it("indexInArrayBuffer should < firstDirtyIndex", function () {
            expect(indexInArrayBuffer).exist;
            expect(indexInArrayBuffer).lessThan(this._firstDirtyIndex);
        }, this);
    })
    private _generateIndexInNormalList(){
        var index = this._notUsedIndexArray.pop();

        if(this._isValidIndex(index)){
            return index;
        }

        index = this._indexInArrayBuffer;

        this._indexInArrayBuffer += 1;

        return index;
    }

    private _addItAndItsChildrenToDirtyList(rootIndexInArrayBuffer:number){
        if(this._isNotDirty(rootIndexInArrayBuffer)){
            this._addToDirtyList(rootIndexInArrayBuffer);
        }

        let child = this._data.firstChildren[rootIndexInArrayBuffer];

        while(this._isValidIndex(child)){
            this._addItAndItsChildrenToDirtyList(child);
            child = this._data.nextSiblings[rootIndexInArrayBuffer];
        }
    }

    private _isValidIndex(index:number|null|undefined){
        return !!index;
    }

    private _removeFromParent(indexInArrayBuffer:number, parentIndexInArrayBuffer:number){
        var data = this._data,
            nextSiblingIndex = data.nextSiblings[indexInArrayBuffer],
            prevSiblingIndex:number|null|undefined = null;

        if(!this._isValidIndex(nextSiblingIndex)){
            nextSiblingIndex = indexInArrayBuffer;
        }

        prevSiblingIndex = this._findPrevSiblingIndex(indexInArrayBuffer, parentIndexInArrayBuffer);

        if(this._isValidIndex(prevSiblingIndex)){
            data.nextSiblings[prevSiblingIndex] = nextSiblingIndex;

            return;
        }

        data.firstChildren[data.parents[parentIndexInArrayBuffer]] = nextSiblingIndex;
    }

    private _findPrevSiblingIndex(indexInArrayBuffer:number, parentIndexInArrayBuffer:number){
        var data = this._data,
            firstChildIndex = data.firstChildren[data.parents[parentIndexInArrayBuffer]];

        if(this._isValidIndex(firstChildIndex)){
            let nextSiblingIndex = firstChildIndex,
                prevSiblingIndex:number = null;

            while(nextSiblingIndex !== indexInArrayBuffer){
                prevSiblingIndex = nextSiblingIndex;
                nextSiblingIndex = data.nextSiblings[nextSiblingIndex];
            }

            return prevSiblingIndex;
        }

        return null;
    }

    private _addToParent(indexInArrayBuffer:number, parentIndexInArrayBuffer:number){
        var data = this._data,
            child = data.firstChildren[parentIndexInArrayBuffer];

        if(!this._isValidIndex(child)){
            data.firstChildren[parentIndexInArrayBuffer] = indexInArrayBuffer;

            return;
        }

        let nextSiblings = data.nextSiblings,
            nextSibling:number = child,
            lastNextSibling:number = null;

        do{
            lastNextSibling = nextSibling;
            nextSibling = nextSiblings[nextSibling];
        }
        while(this._isValidIndex(nextSibling));

        nextSiblings[lastNextSibling] = indexInArrayBuffer;
    }
}
