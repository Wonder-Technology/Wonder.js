

let create = () => JobEntity.create("update_accumulation_pass")

let exec = () =>
  AccumulationPassCPDoService.increaseSampleAccumulation()->Result.succeed->WonderBsMost.Most.just
