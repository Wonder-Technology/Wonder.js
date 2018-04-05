open DirectionLightInitMaterialType;

let getLightCount = ({index}) =>
  CountLightService.getLightCount(index, RecordDirectionLightService.getBufferMaxCount());