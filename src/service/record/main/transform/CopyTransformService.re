open TransformType;

let unsafeGetCopiedBuffer = ({copiedBuffer}) =>
  copiedBuffer |> OptionService.unsafeGet;

let unsafeGetCopiedLocalToWorldMatrices = ({copiedLocalToWorldMatrices}) =>
  copiedLocalToWorldMatrices |> OptionService.unsafeGet;

let unsafeGetCopiedLocalPositions = ({copiedLocalPositions}) =>
  copiedLocalPositions |> OptionService.unsafeGet;