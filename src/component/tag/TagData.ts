import { GameObject } from "../../core/entityObject/gameObject/GameObject";

export class TagData{
    public static tagArray:Array<string> = null;

    // public static slotCountMap:TagSlotCountMap = {};
    // public static usedSlotCountMap:TagUsedSlotCountMap = {};
    public static slotCountMap:Array<number> = null;
    public static usedSlotCountMap:Array<number> = null;

    // public static indexMap:TagIndexMap = {};
    // public static indexInArrayBufferMap:TagIndexInArrayBufferMap = {};
    public static indexMap:Array<number> = null;
    public static indexInArrayBufferMap:Array<number> = null;

    public static lastIndexInArrayBuffer:number = null;


    public static gameObjectMap:TagGameObjectMap = null;

    public static index:number = null;
    public static size:number = null;
}

// export type TagIndexMap = {
//     [indexInArrayBuffer:number]: number;
// }
//
// export type TagIndexInArrayBufferMap = {
//     [index:number]: number;
// }

// export type TagSlotCountMap = {
//     [index:string]: number;
// }
//
// export type TagUsedSlotCountMap = {
//     [index:string]: number;
// }

export type TagGameObjectMap = {
    [index:number]: GameObject;
}
