let create = () => JobEntity.create("start_time");

let exec = () => {
  TimeStatisticDoService.start()->Result.succeed->WonderBsMost.Most.just;
};
