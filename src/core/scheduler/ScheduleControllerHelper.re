open StateDataType;

let initData = () => {
  count: 0,
  funcRecordArray: WonderCommonlib.ArraySystem.createEmpty(),
  isFinishMap: WonderCommonlib.SparseMapSystem.createEmpty()
};