let create = () => {
  DirectionLightApService.create();
};

let getGameObject = light => {
  DirectionLightApService.getGameObject(light);
};

let getColor = light => {
  DirectionLightApService.getColor(light);
};

let setColor = (light, color) => {
  DirectionLightApService.setColor(light, color);
};

let getIntensity = light => {
  DirectionLightApService.getIntensity(light);
};

let setIntensity = (light, intensity) => {
  DirectionLightApService.setIntensity(light, intensity);
};

let getAllLights = () => {
  DirectionLightApService.getAllLights();
};

let getDirection = light => {
  DirectionLightApService.getDirection(light);
};

let getLightCount = () => {
  DirectionLightApService.getLightCount();
};
