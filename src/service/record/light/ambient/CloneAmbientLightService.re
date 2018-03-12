open AmbientLightType;

let _getData =
  [@bs]
  ((sourceComponent, record) => OperateAmbientLightService.getColor(sourceComponent, record));

let _setData =
  [@bs]
  (
    (sourceComponent, color, record) =>
      record |> OperateAmbientLightService.setColor(sourceComponent, color)
  );

let handleCloneComponent = (sourceComponent, countRangeArr: array(int), record) =>
  CloneLightService.handleCloneComponent(
    sourceComponent,
    countRangeArr,
    (CreateAmbientLightService.create, _getData, _setData |> Obj.magic),
    record
  );