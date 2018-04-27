open SettingGPUType;

type memory = {
  maxBigTypeArrayPoolSize: int
};

type settingRecord = {
  gpu: option(gpu),
  memory: option(memory)
};