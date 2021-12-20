open StateType

let getData = (.
  {
    parentMap,
    childrenMap,
    localPositions,
    localRotations,
    localScales,
    localToWorldMatrices,
  } as state,
  transform,
  dataName: DataType.dataName,
): Js.Nullable.t<'a> => {
  switch dataName {
  | dataName if dataName == WonderComponentTypeTransform.Index.dataName.parent =>
    HierachyTransformUtils.getNullableParent(parentMap, transform)->Obj.magic
  | dataName if dataName == WonderComponentTypeTransform.Index.dataName.children =>
    HierachyTransformUtils.getNullableChildren(childrenMap, transform)->Obj.magic
  | dataName if dataName == WonderComponentTypeTransform.Index.dataName.localPosition =>
    ModelMatrixTransformUtils.getLocalPosition(localPositions, transform)
    ->Obj.magic
    ->Js.Nullable.return
  | dataName if dataName == WonderComponentTypeTransform.Index.dataName.localRotation =>
    ModelMatrixTransformUtils.getLocalRotation(localRotations, transform)
    ->Obj.magic
    ->Js.Nullable.return
  | dataName if dataName == WonderComponentTypeTransform.Index.dataName.localScale =>
    ModelMatrixTransformUtils.getLocalScale(localScales, transform)->Obj.magic->Js.Nullable.return
  | dataName if dataName == WonderComponentTypeTransform.Index.dataName.position =>
    UpdateTransformUtils.updateAndGetPosition(state, transform)
    ->WonderCommonlib.Tuple2.getLast
    ->Obj.magic
    ->Js.Nullable.return
  | dataName if dataName == WonderComponentTypeTransform.Index.dataName.rotation =>
    UpdateTransformUtils.updateAndGetRotation(state, transform)
    ->WonderCommonlib.Tuple2.getLast
    ->Obj.magic
    ->Js.Nullable.return
  | dataName if dataName == WonderComponentTypeTransform.Index.dataName.scale =>
    UpdateTransformUtils.updateAndGetScale(state, transform)
    ->WonderCommonlib.Tuple2.getLast
    ->Obj.magic
    ->Js.Nullable.return
  | dataName if dataName == WonderComponentTypeTransform.Index.dataName.localEulerAngles =>
    ModelMatrixTransformUtils.getLocalEulerAngles(localRotations, transform)
    ->Obj.magic
    ->Js.Nullable.return
  | dataName if dataName == WonderComponentTypeTransform.Index.dataName.eulerAngles =>
    UpdateTransformUtils.updateAndGetEulerAngles(state, transform)
    ->WonderCommonlib.Tuple2.getLast
    ->Obj.magic
    ->Js.Nullable.return
  | dataName if dataName == WonderComponentTypeTransform.Index.dataName.normalMatrix =>
    ModelMatrixTransformUtils.getNormalMatrix(state, transform)->Obj.magic->Js.Nullable.return
  | dataName if dataName == WonderComponentTypeTransform.Index.dataName.localToWorldMatrix =>
    WonderComponentWorkerUtils.ModelMatrixTransformUtils.getLocalToWorldMatrix(
      localToWorldMatrices,
      transform,
    )
    ->Obj.magic
    ->Js.Nullable.return
  | dataName if dataName == WonderComponentTypeTransform.Index.dataName.dirty =>
    DirtyTransformUtils.isDirty(state, transform)->Obj.magic
  | _ =>
    WonderCommonlib.Exception.throwErr(
      WonderCommonlib.Log.buildFatalMessage(
        ~title="getData",
        ~description=j`unknown dataName:${dataName->Obj.magic}`,
        ~reason="",
        ~solution=j``,
        ~params=j``,
      ),
    )
  }
}
