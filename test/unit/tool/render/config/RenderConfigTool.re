let buildRenderConfig =
    (
      ~renderSetting=Render_setting.render_setting,
      ~initPipelines=Init_pipelines.init_pipelines,
      ~renderPipelines=Render_pipelines.render_pipelines,
      ~initJobs=Init_jobs.init_jobs,
      ~renderJobs=Render_jobs.render_jobs,
      ~shaders=Shaders.shaders,
      ~shaderLibs=Shader_libs.shader_libs,
      ()
    ) => (
  renderSetting,
  initPipelines,
  renderPipelines,
  initJobs,
  renderJobs,
  shaders,
  shaderLibs
);