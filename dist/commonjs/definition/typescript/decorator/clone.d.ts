import { EntityObject } from "../../../core/entityObject/EntityObject";
export declare function cloneAttributeAsBasicType(configData?: CloneAttributeAsBasicTypeConfigData): (target: any, memberName: string | symbol) => void;
export declare function cloneAttributeAsCloneable(configData?: CloneAttributeAsCloneableConfigData): (target: any, memberName: string | symbol) => void;
export declare function cloneAttributeAsCustomType(cloneFunc: (source: any, target: any, memberName: string, cloneData: any) => void, configData?: CloneAttributeAsCustomTypeConfigData): (target: any, memberName: string | symbol) => void;
export declare class CloneUtils {
    static clone<T>(sourceInstance: T, cloneData?: any, createDataArr?: Array<any>, target?: any): T;
    static cloneArray(arr: Array<any> | null, isDeep?: boolean): any;
    static markNotClone(entityObject: EntityObject): void;
    static isNotClone(entityObject: EntityObject): boolean;
}
export declare type CloneAttributeAsBasicTypeConfigData = {
    order?: number;
};
export declare type CloneAttributeAsCloneableConfigData = {
    order?: number;
};
export declare type CloneAttributeAsCustomTypeConfigData = {
    order?: number;
};
export declare enum CloneType {
    CLONEABLE = 0,
    BASIC = 1,
    CUSTOM = 2,
}
