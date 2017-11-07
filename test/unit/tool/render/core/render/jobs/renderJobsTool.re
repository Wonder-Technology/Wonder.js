let initWithRenderConfig = () =>
  TestTool.initWithRenderConfig(
    ~bufferConfig=
      Js.Nullable.return({
        "transformDataBufferCount": Js.Nullable.undefined,
        "geometryPointDataBufferCount": Js.Nullable.return(1000),
        "basicMaterialDataBufferCount": Js.Nullable.undefined
      }),
    ~renderConfig=
      RenderConfigTool.buildRenderConfig(
        ~renderSetting={|
    {
    "platform": "pc",
    "browser": [
        {
            "name": "chrome",
            "version": "newest"
        },
        {
            "name": "firefox",
            "version": "newest"
        }
    ],
    "backend": {
        "name": "webgl1"
    },
    "init_pipeline": "simple_basic_render",
    "render_pipeline": "simple_basic_render"
}
|},
        ()
      ),
    ()
  );