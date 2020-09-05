let create = () => JobEntity.create("update_accumulation");

let exec = () => {
  AccumulationCPDoService.increaseSampleAccumulation()
  ->Result.succeed
  ->WonderBsMost.Most.just;
};
