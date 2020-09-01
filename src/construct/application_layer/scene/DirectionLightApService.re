let create = () => {
  CreateDirectionLightDoService.create();
};

let getGameObject = light => {
  GameObjectDirectionLightDoService.getGameObject(light);
};

let getColor = light => {
  OperateDirectionLightDoService.getColor(light);
};

let setColor = (light, color) => {
  OperateDirectionLightDoService.setColor(light, color);
};

let getIntensity = light => {
  OperateDirectionLightDoService.getIntensity(light);
};

let setIntensity = (light, intensity) => {
  OperateDirectionLightDoService.setIntensity(light, intensity);
};
