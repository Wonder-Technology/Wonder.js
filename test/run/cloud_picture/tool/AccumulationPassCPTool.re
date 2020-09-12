let getAccumulationPixelBufferData = () =>
  AccumulationPassCPRepo.getAccumulationPixelBufferData()->OptionSt.getExn;

let getStaticBindGroupData = () => {
  AccumulationPassCPRepo.getStaticBindGroupData()->OptionSt.getExn;
};

let getPipeline = () => {
  AccumulationPassCPRepo.getPipeline()->OptionSt.getExn;
};
