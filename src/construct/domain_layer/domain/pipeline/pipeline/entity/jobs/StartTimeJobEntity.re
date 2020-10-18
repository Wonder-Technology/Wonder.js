let create = () => JobEntity.create("start_time");

let exec = () => {
  TimeDoService.start()->Result.succeed->WonderBsMost.Most.just;
};
