import { ComponentGameObjectMap } from "../ComponentData";
import { Tag } from "./Tag";
export declare class TagData {
    static tagArray: Array<string>;
    static slotCountMap: Array<number>;
    static usedSlotCountMap: Array<number>;
    static indexMap: Array<number>;
    static indexInTagArrayMap: Array<number>;
    static lastIndexInTagArray: number;
    static tagMap: TagMap;
    static gameObjectMap: ComponentGameObjectMap;
    static index: number;
    static count: number;
    static disposeCount: number;
}
export declare type TagMap = {
    [index: number]: Tag;
};
