open DirectionLightType;

let _getData =
  (. sourceComponent, record) => (
    OperateDirectionLightService.getColor(sourceComponent, record),
    OperateDirectionLightService.getIntensity(sourceComponent, record),
  );

let _setData =
  (. sourceComponent, (color, intensity), record) =>
    record
    |> OperateDirectionLightService.setColor(sourceComponent, color)
    |> OperateDirectionLightService.setIntensity(sourceComponent, intensity);

let handleCloneComponent =
    (sourceComponent, countRangeArr: array(int), record) =>
  CloneLightService.handleCloneComponent(
    sourceComponent,
    countRangeArr,
    (
      CreateDirectionLightService.create(true),
      _getData,
      _setData |> Obj.magic,
    ),
    record,
  );