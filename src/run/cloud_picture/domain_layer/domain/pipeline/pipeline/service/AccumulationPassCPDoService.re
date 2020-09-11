let increaseSampleAccumulation = () => {
  PassCPRepo.setTotalSampleCount(
    PassCPRepo.getTotalSampleCount() + PassCPRepo.getSampleCount(),
  );
};