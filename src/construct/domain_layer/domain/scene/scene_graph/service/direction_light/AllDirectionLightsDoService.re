let getAllLights = () => {
  ListSt.range(0, IndexDirectionLightDoService.getMaxIndex())
  ->ListSt.map(DirectionLightEntity.create);
};

let getLightCount = () => {
  getAllLights()->ListSt.length;
};
