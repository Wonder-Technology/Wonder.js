type jobName = string

@genType.import(("most", "Stream"))
type stream<'a> = WonderBsMost.Most.stream<'a>

type execFunc<'states> = 'states => stream<'states>

@genType
type getExecFunc<'states> = (PipelineType.pipelineName, jobName) => Js.Nullable.t<execFunc<'states>>

@genType
type pipelineData = PipelineType.pipelineData

@genType
type createStateFunc<'state> = unit => 'state

@genType
type initFunc<'state> = 'state => unit

type pluginName = string

type allPipelineData = array<pipelineData>

@genType
type registeredWorkPlugin<'state, 'states> = {
  pluginName: pluginName,
  createStateFunc: createStateFunc<'state>,
  initFunc: initFunc<'state>,
  getExecFunc: getExecFunc<'states>,
  allPipelineData: allPipelineData,
}

@genType
type getRegisteredWorkPluginData<'state, 'config, 'states> = 'config => registeredWorkPlugin<
  'state,
  'states,
>
