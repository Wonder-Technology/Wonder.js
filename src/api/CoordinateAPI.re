let convertWorldToScreen =
    (
      cameraView,
      cameraProjection,
      (worldX, worldY, worldZ, screenWidth, screenHeight),
      state,
    ) =>
  CoordinateMainService.convertWorldToScreen(
    cameraView,
    cameraProjection,
    (worldX, worldY, worldZ, screenWidth, screenHeight),
    state,
  )
  |> Js.Nullable.fromOption;