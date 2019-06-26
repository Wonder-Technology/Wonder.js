open SettingGPUType;

type memory = {maxBigTypeArrayPoolSize: int};

type instanceBuffer = {
  sourceInstanceCount: int,
  objectInstanceCountPerSourceInstance: int,
};

type settingRecord = {
  gpu: option(gpu),
  instanceBuffer: option(instanceBuffer),
  basicSourceTextureCount: option(int),
  arrayBufferViewSourceTextureCount: option(int),
  cubemapTextureCount: option(int),
  directionLightCount: option(int),
  pointLightCount: option(int),
  memory: option(memory),
};