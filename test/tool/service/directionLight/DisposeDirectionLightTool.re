open DirectionLightType;

open DisposeDirectionLightService;

let handleDisposeComponent = (light, record) =>
  DisposeLightService.handleDisposeComponent(light, (isAlive, _disposeData), record);