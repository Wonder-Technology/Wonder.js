open StateDataType;

let initData =
    (
      (
        render_setting,
        init_pipelines,
        render_pipelines,
        init_jobs,
        render_jobs,
        shaders,
        shader_libs
      ),
      state
    ) => {
  ...state,
  renderJobConfig:
    /* Some({
         render_setting: recordArr[0],
         init_pipelines: recordArr[1],
         render_pipelines: recordArr[2],
         init_jobs: recordArr[3],
         render_jobs: recordArr[4],
         shaders: recordArr[5],
         shader_libs: recordArr[6]
       }) */
    Some({
      render_setting,
      init_pipelines,
      render_pipelines,
      init_jobs,
      render_jobs,
      shaders,
      shader_libs
    })
};