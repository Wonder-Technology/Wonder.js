open InstanceType;

open SourceInstanceType;

let markModelMatrixIsStatic =
    (sourceInstance: sourceInstance, isStatic: bool, {isTransformStaticMap} as record) => {
  ...record,
  isTransformStaticMap:
    isTransformStaticMap |> WonderCommonlib.SparseMapService.set(sourceInstance, isStatic)
};