let getSampleCount = () => PassCPRepo.getSampleCount();

let getPixelBufferData = () => PassCPRepo.getPixelBufferData();

let getCommonBufferData = () => PassCPRepo.getCommonBufferData();

let getResolutionBufferData = () => PassCPRepo.getResolutionBufferData();

let buildAndSetAllBufferData = (window, device) => {
  InitPassCPJobEntity._buildAndSetAllBufferData(window, device);
};
