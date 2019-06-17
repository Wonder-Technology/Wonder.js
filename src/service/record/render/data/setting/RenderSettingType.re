open SettingGPUType;

type instanceBuffer = {objectInstanceCountPerSourceInstance: int};

type settingRecord = {
  gpu: option(gpu),
  instanceBuffer: option(instanceBuffer),
};