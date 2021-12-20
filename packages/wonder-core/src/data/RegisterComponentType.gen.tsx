/* TypeScript file generated from RegisterComponentType.res by genType. */
/* eslint-disable import/first */


import type {addComponentFunc as IComponentForJs_addComponentFunc} from '../../src/abstract/scene_graph/IComponentForJs.gen';

import type {componentName as IComponentForJs_componentName} from '../../src/abstract/scene_graph/IComponentForJs.gen';

import type {createComponentFunc as IComponentForJs_createComponentFunc} from '../../src/abstract/scene_graph/IComponentForJs.gen';

import type {getAllComponentsFunc as IComponentForJs_getAllComponentsFunc} from '../../src/abstract/scene_graph/IComponentForJs.gen';

import type {getComponentDataFunc as IComponentForJs_getComponentDataFunc} from '../../src/abstract/scene_graph/IComponentForJs.gen';

import type {getComponentFunc as IComponentForJs_getComponentFunc} from '../../src/abstract/scene_graph/IComponentForJs.gen';

import type {getGameObjectsFunc as IComponentForJs_getGameObjectsFunc} from '../../src/abstract/scene_graph/IComponentForJs.gen';

import type {hasComponentFunc as IComponentForJs_hasComponentFunc} from '../../src/abstract/scene_graph/IComponentForJs.gen';

import type {setComponentDataFunc as IComponentForJs_setComponentDataFunc} from '../../src/abstract/scene_graph/IComponentForJs.gen';

// tslint:disable-next-line:max-classes-per-file 
// tslint:disable-next-line:class-name
export abstract class state { protected opaque!: any }; /* simulate opaque types */

// tslint:disable-next-line:max-classes-per-file 
// tslint:disable-next-line:class-name
export abstract class component { protected opaque!: any }; /* simulate opaque types */

// tslint:disable-next-line:max-classes-per-file 
// tslint:disable-next-line:class-name
export abstract class config { protected opaque!: any }; /* simulate opaque types */

// tslint:disable-next-line:max-classes-per-file 
// tslint:disable-next-line:class-name
export abstract class dataName { protected opaque!: any }; /* simulate opaque types */

// tslint:disable-next-line:interface-over-type-literal
export type usedComponentData = {
  readonly componentName: IComponentForJs_componentName; 
  state: state; 
  readonly createComponentFunc: IComponentForJs_createComponentFunc<state,component>; 
  readonly getGameObjectsFunc: IComponentForJs_getGameObjectsFunc<state,component>; 
  readonly addComponentFunc: IComponentForJs_addComponentFunc<state,component>; 
  readonly hasComponentFunc: IComponentForJs_hasComponentFunc<state>; 
  readonly getComponentFunc: IComponentForJs_getComponentFunc<state,component>; 
  readonly getAllComponentsFunc: IComponentForJs_getAllComponentsFunc<state,component>; 
  readonly getComponentDataFunc: IComponentForJs_getComponentDataFunc<state,dataName,component>; 
  readonly setComponentDataFunc: IComponentForJs_setComponentDataFunc<state,dataName,component>
};
