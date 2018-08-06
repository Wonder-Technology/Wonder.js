let getOperateType = flags =>
  Array.unsafe_get(JobConfigService.unsafeGetFlags(flags), 0);