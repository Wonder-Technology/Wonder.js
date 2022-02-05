let truncate = arr => arr->Js.Array.map(FloatTool.truncateFloatValue(_, 5), _)
