let getSampleCount = () => PassCPRepo.getSampleCount()

let getTotalSampleCount = () => PassCPRepo.getTotalSampleCount()

let setTotalSampleCount = totalSampleCount => PassCPRepo.setTotalSampleCount(totalSampleCount)

let getPixelBufferData = () => PassCPRepo.getPixelBufferData()->OptionSt.getExn

let getCommonBufferData = () => PassCPRepo.getCommonBufferData()->OptionSt.getExn

let getResolutionBufferData = () => PassCPRepo.getResolutionBufferData()->OptionSt.getExn

let buildAndSetAllBufferData = (window, device) =>
  InitPassCPJobEntity._buildAndSetAllBufferData(window, device)
