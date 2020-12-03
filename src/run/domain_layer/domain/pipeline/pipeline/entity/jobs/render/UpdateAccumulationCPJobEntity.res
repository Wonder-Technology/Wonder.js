let create = () => JobEntity.create("update_accumulation")

let exec = () =>
  AccumulationPassCPDoService.increaseSampleAccumulation()->Result.succeed->WonderBsMost.Most.just
