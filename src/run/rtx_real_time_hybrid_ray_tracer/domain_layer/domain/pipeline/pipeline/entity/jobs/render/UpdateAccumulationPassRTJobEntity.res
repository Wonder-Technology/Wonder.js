

let create = () => JobEntity.create("update_accumulation_pass")

let exec = () =>
  AccumulationPassRTDoService.increaseSampleAccumulation()->Result.succeed->WonderBsMost.Most.just
