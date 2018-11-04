open PointLightType;

let _getData =
  (. sourceComponent, record) => (
    OperatePointLightService.getColor(sourceComponent, record),
    OperatePointLightService.getIntensity(sourceComponent, record),
    OperatePointLightService.getConstant(sourceComponent, record),
    OperatePointLightService.getLinear(sourceComponent, record),
    OperatePointLightService.getQuadratic(sourceComponent, record),
    OperatePointLightService.getRange(sourceComponent, record),
  );

let _setData =
  (.
    sourceComponent,
    (color, intensity, constant, linear, quadratic, range),
    record,
  ) =>
    OperatePointLightService.(
      record
      |> setColor(sourceComponent, color)
      |> setIntensity(sourceComponent, intensity)
      |> setConstant(sourceComponent, constant)
      |> setLinear(sourceComponent, linear)
      |> setQuadratic(sourceComponent, quadratic)
      |> setRange(sourceComponent, range)
    );

let handleCloneComponent =
    (sourceComponent, countRangeArr: array(int), record) =>
  CloneLightService.handleCloneComponent(
    sourceComponent,
    countRangeArr,
    (CreatePointLightService.create(true), _getData, _setData |> Obj.magic),
    record,
  );