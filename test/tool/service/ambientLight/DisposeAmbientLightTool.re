open AmbientLightType;

open DisposeAmbientLightService;

let handleDisposeComponent = (light, record) =>
  DisposeLightService.handleDisposeComponent(light, (isAlive, _disposeData), record);