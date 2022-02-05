/* TypeScript file generated from IComponentForJs.res by genType. */
/* eslint-disable import/first */


import type {gameObject as IGameObjectForJs_gameObject} from './IGameObjectForJs.gen';

// tslint:disable-next-line:interface-over-type-literal
export type componentName = string;

// tslint:disable-next-line:interface-over-type-literal
export type createStateFunc<state,config> = (_1:config) => state;

// tslint:disable-next-line:interface-over-type-literal
export type getGameObjectsFunc<state,component> = (_1:state, _2:component) => IGameObjectForJs_gameObject[];

// tslint:disable-next-line:interface-over-type-literal
export type createComponentFunc<state,component> = (_1:state) => [state, component];

// tslint:disable-next-line:interface-over-type-literal
export type addComponentFunc<state,component> = (_1:state, _2:IGameObjectForJs_gameObject, _3:component) => state;

// tslint:disable-next-line:interface-over-type-literal
export type hasComponentFunc<state> = (_1:state, _2:IGameObjectForJs_gameObject) => boolean;

// tslint:disable-next-line:interface-over-type-literal
export type getComponentFunc<state,component> = (_1:state, _2:IGameObjectForJs_gameObject) => (null | undefined | component);

// tslint:disable-next-line:interface-over-type-literal
export type getAllComponentsFunc<state,component> = (_1:state) => component[];

// tslint:disable-next-line:max-classes-per-file 
// tslint:disable-next-line:class-name
export abstract class dataValue { protected opaque!: any }; /* simulate opaque types */

// tslint:disable-next-line:interface-over-type-literal
export type getComponentDataFunc<state,dataName,component> = (_1:state, _2:component, _3:dataName) => (null | undefined | dataValue);

// tslint:disable-next-line:interface-over-type-literal
export type setComponentDataFunc<state,dataName,component> = (_1:state, _2:component, _3:dataName, _4:dataValue) => state;

// tslint:disable-next-line:interface-over-type-literal
export type registeredComponent<state,config,dataName,component> = {
  readonly componentName: componentName; 
  readonly createStateFunc: createStateFunc<state,config>; 
  readonly getGameObjectsFunc: getGameObjectsFunc<state,component>; 
  readonly createComponentFunc: createComponentFunc<state,component>; 
  readonly addComponentFunc: addComponentFunc<state,component>; 
  readonly hasComponentFunc: hasComponentFunc<state>; 
  readonly getComponentFunc: getComponentFunc<state,component>; 
  readonly getComponentDataFunc: getComponentDataFunc<state,dataName,component>; 
  readonly setComponentDataFunc: setComponentDataFunc<state,dataName,component>; 
  readonly getAllComponentsFunc: getAllComponentsFunc<state,component>
};

// tslint:disable-next-line:interface-over-type-literal
export type getComponentData<state,config,dataName,component> = () => registeredComponent<state,config,dataName,component>;
