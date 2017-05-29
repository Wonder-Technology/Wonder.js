import { GameObject } from "../../core/entityObject/gameObject/GameObject";
import { ComponentGameObjectMap } from "../ComponentData";
import { Tag } from "./Tag";

export class TagData{
    public static tagArray:Array<string> = null;

    public static slotCountMap:Array<number> = null;
    public static usedSlotCountMap:Array<number> = null;

    public static indexMap:Array<number> = null;
    public static indexInTagArrayMap:Array<number> = null;

    public static lastIndexInTagArray:number = null;

    public static tagMap:TagMap = null;

    public static gameObjectMap:ComponentGameObjectMap = null;

    public static index:number = null;
    public static count:number = null;
    public static disposeCount:number = null;
}

export type TagMap = {
    [index:number]: Tag
}
