open PointLightType;

let _getData =
  [@bs]
  (
    (sourceComponent, state: StateDataType.state) => (
      PointLightOperateCommon.getColor(sourceComponent, state),
      PointLightOperateCommon.getIntensity(sourceComponent, state),
      PointLightOperateCommon.getConstant(sourceComponent, state),
      PointLightOperateCommon.getLinear(sourceComponent, state),
      PointLightOperateCommon.getQuadratic(sourceComponent, state),
      PointLightOperateCommon.getRange(sourceComponent, state)
    )
  );

let _setData =
  [@bs]
  (
    (
      sourceComponent,
      (color, intensity, constant, linear, quadratic, range),
      state: StateDataType.state
    ) =>
      PointLightOperateCommon.(
        state |> setColor(sourceComponent, color),
        state |> setIntensity(sourceComponent, intensity),
        state |> setConstant(sourceComponent, constant),
        state |> setLinear(sourceComponent, linear),
        state |> setQuadratic(sourceComponent, quadratic),
        state |> setRange(sourceComponent, range)
      )
  );

let handleCloneComponent = (sourceComponent, countRangeArr: array(int), state: StateDataType.state) =>
  LightCloneComponentCommon.handleCloneComponent(
    sourceComponent,
    countRangeArr,
    (PointLightCreateCommon.create, _getData, _setData |> Obj.magic),
    state
  );