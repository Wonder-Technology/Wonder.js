open BufferSettingPOType;

let getTransformCount = () => {
  SettingRepo.getBuffer()
  ->Result.mapSuccess(({transformCount}) => transformCount);
};
