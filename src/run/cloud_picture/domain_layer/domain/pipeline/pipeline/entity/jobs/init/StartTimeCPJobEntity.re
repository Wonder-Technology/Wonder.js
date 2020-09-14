let create = () => JobEntity.create("start_time");

let exec = () => {
  TimeRunAPI.start()->Result.succeed->WonderBsMost.Most.just;
};
