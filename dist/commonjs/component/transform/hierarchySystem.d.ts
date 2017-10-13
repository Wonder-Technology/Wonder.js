import { ThreeDTransform } from "./ThreeDTransform";
export declare const getParent: Function;
export declare const setParent: Function;
export declare const getChildren: (uid: number, ThreeDTransformData: any) => any;
export declare const isParentExist: (parent: ThreeDTransform) => boolean;
export declare const isChildrenExist: (children: ThreeDTransform[]) => boolean;
export declare const isNotChangeParent: (currentParentIndexInArrayBuffer: number, newParentIndexInArrayBuffer: number) => boolean;
export declare const removeHierarchyData: (uid: number, ThreeDTransformData: any) => void;
export declare const setChildren: (uid: number, children: ThreeDTransform[], ThreeDTransformData: any) => void;
