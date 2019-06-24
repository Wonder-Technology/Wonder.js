let getWrapData = wrap =>
  TextureType.(
    switch (wrap |> uint8ToWrap) {
    | Clamp_to_edge => 33071
    | Mirrored_repeat => 33648
    | Repeat => 10497
    }
  );

let getFilterData = filter =>
  TextureType.(
    switch (filter |> uint8ToFilter) {
    | Nearest => 9728
    | Linear => 9729
    | Nearest_mipmap_nearest => 9984
    | Linear_mipmap_nearest => 9985
    | Nearest_mipmap_linear => 9986
    | Linear_mipmap_linear => 9987
    }
  );