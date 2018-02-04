open DirectionLightType;

let _getData =
  [@bs]
  (
    (sourceComponent, state: StateDataType.state) => (
      DirectionLightOperateCommon.getColor(sourceComponent, state),
      DirectionLightOperateCommon.getIntensity(sourceComponent, state)
    )
  );

let _setData =
  [@bs]
  (
    (sourceComponent, (color, intensity), state: StateDataType.state) =>
      DirectionLightOperateCommon.(
        state |> setColor(sourceComponent, color) |> setIntensity(sourceComponent, intensity)
      )
  );

let handleCloneComponent = (sourceComponent, countRangeArr: array(int), state: StateDataType.state) =>
  LightCloneComponentCommon.handleCloneComponent(
    sourceComponent,
    countRangeArr,
    (DirectionLightCreateCommon.create, _getData, _setData |> Obj.magic),
    state
  );