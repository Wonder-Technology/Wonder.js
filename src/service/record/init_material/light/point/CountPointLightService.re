open PointLightInitMaterialType;

let getLightCount = ({index}) =>
  CountLightService.getLightCount(index, RecordPointLightService.getBufferMaxCount());