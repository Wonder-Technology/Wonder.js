import { ThreeDTransform } from "./ThreeDTransform";
export declare var getParent: Function;
export declare var setParent: Function;
export declare var getChildren: (uid: number, ThreeDTransformData: any) => any;
export declare var isParentExist: (parent: ThreeDTransform) => boolean;
export declare var isChildrenExist: (children: ThreeDTransform[]) => boolean;
export declare var isNotChangeParent: (currentParentIndexInArrayBuffer: number, newParentIndexInArrayBuffer: number) => boolean;
export declare var removeHierarchyData: (uid: number, ThreeDTransformData: any) => void;
export declare var setChildren: (uid: number, children: ThreeDTransform[], ThreeDTransformData: any) => void;
