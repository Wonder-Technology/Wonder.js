export const deleteMapVal = (key: number, map: Map<number, any>) => map.delete(key);
// export const deleteMapVal = (map:Map<number, any>, key:number) => map.set(key, void 0);

export const deleteBySwap = (sourceIndex: number, targetIndex: number, map: Map<number, any>) => {
    map.set(sourceIndex, map.get(targetIndex));

    deleteMapVal(targetIndex, map);
}
