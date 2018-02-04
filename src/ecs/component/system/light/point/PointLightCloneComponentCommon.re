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
        state
        |> setColor(sourceComponent, color)
        |> setIntensity(sourceComponent, intensity)
        |> setConstant(sourceComponent, constant)
        |> setLinear(sourceComponent, linear)
        |> setQuadratic(sourceComponent, quadratic)
        |> setRange(sourceComponent, range)
      )
  );

let handleCloneComponent = (sourceComponent, countRangeArr: array(int), state: StateDataType.state) =>
  LightCloneComponentCommon.handleCloneComponent(
    sourceComponent,
    countRangeArr,
    (PointLightCreateCommon.create, _getData, _setData |> Obj.magic),
    state
  );