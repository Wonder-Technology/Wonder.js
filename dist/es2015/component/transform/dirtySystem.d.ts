import { LinkList } from "./LinkList";
export declare var addFirstDirtyIndex: Function;
export declare var minusFirstDirtyIndex: Function;
export declare var generateNotUsedIndexInArrayBuffer: Function;
export declare var generateNotUsedIndexInNormalList: Function;
export declare var addToDirtyList: Function;
export declare var addNotUsedIndex: (index: number, notUsedIndexLinkList: LinkList<number>) => void;
export declare var isNotDirty: (indexInArrayBuffer: number, firstDirtyIndex: number) => boolean;
export declare var addItAndItsChildrenToDirtyList: (rootIndexInArrayBuffer: number, uid: number, ThreeDTransformData: any) => any;
