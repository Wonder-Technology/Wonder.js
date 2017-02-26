export declare class SortUtils {
    static insertSort(targetArr: Array<any>, compareFunc: (a: any, b: any) => boolean, isChangeSelf?: boolean): Array<any>;
    static quickSort(targetArr: Array<any>, compareFunc: (a: any, b: any) => boolean, isChangeSelf?: boolean): Array<any>;
    private static _swap(children, i, j);
}
