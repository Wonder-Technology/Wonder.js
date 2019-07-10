let getAllSources =
    (
      texture,
      (
        pxSourceMap,
        nxSourceMap,
        pySourceMap,
        nySourceMap,
        pzSourceMap,
        nzSourceMap,
      ),
    ) =>
  switch (
    TextureSourceMapService.getSource(texture, pxSourceMap),
    TextureSourceMapService.getSource(texture, nxSourceMap),
    TextureSourceMapService.getSource(texture, pySourceMap),
    TextureSourceMapService.getSource(texture, nySourceMap),
    TextureSourceMapService.getSource(texture, pzSourceMap),
    TextureSourceMapService.getSource(texture, nzSourceMap),
  ) {
  | (
      Some(pxSource),
      Some(nxSource),
      Some(pySource),
      Some(nySource),
      Some(pzSource),
      Some(nzSource),
    ) =>
    Some((pxSource, nxSource, pySource, nySource, pzSource, nzSource))
  | _ => None
  };