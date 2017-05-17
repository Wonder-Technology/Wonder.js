import { GameObject } from "../../core/entityObject/gameObject/GameObject";

export class TagData{
    public static tagArray:Array<string> = null;

    public static slotCountMap:Array<number> = null;
    public static usedSlotCountMap:Array<number> = null;

    public static indexMap:Array<number> = null;
    public static indexInArrayBufferMap:Array<number> = null;

    public static lastIndexInArrayBuffer:number = null;

    public static gameObjectMap:TagGameObjectMap = null;

    public static index:number = null;
    public static count:number = null;
}

export type TagGameObjectMap = {
    [index:number]: GameObject;
}
