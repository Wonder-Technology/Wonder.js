open AmbientLightType;

let _getData =
  [@bs]
  (
    (sourceComponent, state: StateDataType.state) =>
      AmbientLightOperateCommon.getColor(sourceComponent, state)
  );

let _setData =
  [@bs]
  (
    (sourceComponent, color, state: StateDataType.state) =>
      AmbientLightOperateCommon.(state |> setColor(sourceComponent, color))
  );

let handleCloneComponent = (sourceComponent, countRangeArr: array(int), state: StateDataType.state) =>
  LightCloneComponentCommon.handleCloneComponent(
    sourceComponent,
    countRangeArr,
    (AmbientLightCreateCommon.create, _getData, _setData |> Obj.magic),
    state
  );