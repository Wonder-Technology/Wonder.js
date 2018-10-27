let convertComponentType = componentType =>
  switch (componentType) {
  | 5120 => WDType.BYTE
  | 5121 => WDType.UNSIGNED_BYTE
  | 5122 => WDType.SHORT
  | 5123 => WDType.UNSIGNED_SHORT
  | 5125 => WDType.UNSIGNED_INT
  | 5126 => WDType.FLOAT
  | componentType =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="_convertToAccessors",
        ~description={j|unknown componentType: $componentType|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j},
      ),
    )
  };