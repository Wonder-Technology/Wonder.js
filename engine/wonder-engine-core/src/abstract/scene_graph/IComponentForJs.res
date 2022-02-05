@genType
type componentName = string

type createStateFunc<'state, 'config> = (. 'config) => 'state

type getGameObjectsFunc<'state, 'component> = (
  . 'state,
  'component,
) => array<IGameObjectForJs.gameObject>

type createComponentFunc<'state, 'component> = (. 'state) => ('state, 'component)

type addComponentFunc<'state, 'component> = (
  . 'state,
  IGameObjectForJs.gameObject,
  'component,
) => 'state

type hasComponentFunc<'state> = (. 'state, IGameObjectForJs.gameObject) => bool

type getComponentFunc<'state, 'component> = (
  . 'state,
  IGameObjectForJs.gameObject,
) => Js.Nullable.t<'component>

type getAllComponentsFunc<'state, 'component> = (. 'state) => array<'component>

// type dataName = int

@genType
type dataValue

type getComponentDataFunc<'state, 'dataName, 'component> = (
  . 'state,
  'component,
  'dataName,
) => Js.Nullable.t<dataValue>

type setComponentDataFunc<'state, 'dataName, 'component> = (
  . 'state,
  'component,
  'dataName,
  dataValue,
) => 'state

@genType
type registeredComponent<'state, 'config, 'dataName, 'component> = {
  componentName: componentName,
  createStateFunc: createStateFunc<'state, 'config>,
  getGameObjectsFunc: getGameObjectsFunc<'state, 'component>,
  createComponentFunc: createComponentFunc<'state, 'component>,
  addComponentFunc: addComponentFunc<'state, 'component>,
  hasComponentFunc: hasComponentFunc<'state>,
  getComponentFunc: getComponentFunc<'state, 'component>,
  getComponentDataFunc: getComponentDataFunc<'state, 'dataName, 'component>,
  setComponentDataFunc: setComponentDataFunc<'state, 'dataName, 'component>,
  getAllComponentsFunc: getAllComponentsFunc<'state, 'component>,
}

@genType
type getComponentData<'state, 'config, 'dataName, 'component> = unit => registeredComponent<
  'state,
  'config,
  'dataName,
  'component,
>
