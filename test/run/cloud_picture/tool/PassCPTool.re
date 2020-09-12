let getSampleCount = () => PassCPRepo.getSampleCount();

let getPixelBufferData = () =>
  PassCPRepo.getPixelBufferData()->OptionSt.getExn;

let getCommonBufferData = () =>
  PassCPRepo.getCommonBufferData()->OptionSt.getExn;

let getResolutionBufferData = () =>
  PassCPRepo.getResolutionBufferData()->OptionSt.getExn;

let buildAndSetAllBufferData = (window, device) => {
  InitPassCPJobEntity._buildAndSetAllBufferData(window, device);
};
