export var deleteMapVal = (key:number, map:Map<number, any>) => map.delete(key);
// export var deleteMapVal = (map:Map<number, any>, key:number) => map.set(key, void 0);

export var deleteBySwap = (sourceIndex:number, targetIndex:number, map:Map<number, any>) => {
    map.set(sourceIndex, map.get(targetIndex));

    deleteMapVal(targetIndex, map);
}
