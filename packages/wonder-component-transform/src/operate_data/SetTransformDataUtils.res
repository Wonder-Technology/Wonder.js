open StateType

let setData = (.
  state,
  transform,
  dataName: DataType.dataName,
  dataValue: WonderCore.IComponentForJs.dataValue,
): StateType.state => {
  switch dataName {
  | dataName if dataName == WonderComponentTypeTransform.Index.dataName.parent =>
    let parent: Js.Nullable.t<StateType.transform> = dataValue->Obj.magic

    // Js.Nullable.isNullable(parent)
    //   ? {
    //       HierachyTransformUtils.removeParent(state, transform)
    //     }
    //   : {
    //       parent->Js.Nullable.iter((. parent) => {
    //         HierachyTransformUtils.setParent(state, parent, transform)
    //       })
    //     }

    switch parent->WonderCommonlib.OptionSt.fromNullable {
    | None => HierachyTransformUtils.removeParent(state, transform)
    | Some(parent) => HierachyTransformUtils.setParent(state, parent, transform)
    }
  | dataName if dataName == WonderComponentTypeTransform.Index.dataName.localPosition =>
    ModelMatrixTransformUtils.setLocalPosition(state, transform, dataValue->Obj.magic)
  | dataName if dataName == WonderComponentTypeTransform.Index.dataName.localRotation =>
    ModelMatrixTransformUtils.setLocalRotation(state, transform, dataValue->Obj.magic)
  | dataName if dataName == WonderComponentTypeTransform.Index.dataName.localScale =>
    ModelMatrixTransformUtils.setLocalScale(state, transform, dataValue->Obj.magic)
  | dataName if dataName == WonderComponentTypeTransform.Index.dataName.localEulerAngles =>
    ModelMatrixTransformUtils.setLocalEulerAngles(state, transform, dataValue->Obj.magic)
  | dataName if dataName == WonderComponentTypeTransform.Index.dataName.position =>
    UpdateTransformUtils.updateAndSetPosition(state, transform, dataValue->Obj.magic)
  | dataName if dataName == WonderComponentTypeTransform.Index.dataName.rotation =>
    UpdateTransformUtils.updateAndSetRotation(state, transform, dataValue->Obj.magic)
  | dataName if dataName == WonderComponentTypeTransform.Index.dataName.scale =>
    UpdateTransformUtils.updateAndSetScale(state, transform, dataValue->Obj.magic)
  | dataName if dataName == WonderComponentTypeTransform.Index.dataName.eulerAngles =>
    UpdateTransformUtils.updateAndSetEulerAngles(state, transform, dataValue->Obj.magic)
  | dataName if dataName == WonderComponentTypeTransform.Index.dataName.update =>
    UpdateTransformUtils.mutableUpdate(state, transform)
  | _ =>
    WonderCommonlib.Exception.throwErr(
      WonderCommonlib.Log.buildFatalMessage(
        ~title="setData",
        ~description=j`unknown dataName:${dataName->Obj.magic}`,
        ~reason="",
        ~solution=j``,
        ~params=j``,
      ),
    )
  }
}
