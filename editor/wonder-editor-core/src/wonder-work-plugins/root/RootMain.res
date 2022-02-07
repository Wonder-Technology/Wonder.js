open RootType

let _getExecFunc = (_pipelineName: string, jobName: string) => {
  switch jobName {
  | "init_root_wonder" => InitJob.exec
  | _ => Js.Nullable.null->Obj.magic
  }
}

let _init = _state => {
  ()
}

let getData: WonderEngineCore.IWorkForJs.getRegisteredWorkPluginData<
  state,
  config,
  states,
> = () => {
  {
    pluginName: "wonder-work-plugin-root",
    createStateFunc: (): state => {
      ()
    },
    initFunc: _init,
    getExecFunc: _getExecFunc->Obj.magic,
    allPipelineData: [
      {
        name: "init",
        groups: [
          {
            name: "first_root_wonder",
            link: #concat,
            elements: [
              {
                name: "init_root_wonder",
                type_: #job,
              },
            ],
          },
        ],
        first_group: "first_root_wonder",
      },
    ],
  }
}
