open MainStateDataType;

open SettingType;

let execJob = (_, state) => RecordTransformMainService.create(state);