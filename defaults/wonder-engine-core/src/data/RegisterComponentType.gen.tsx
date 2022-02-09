/* TypeScript file generated from RegisterComponentType.res by genType. */
/* eslint-disable import/first */


import type {IComponentForJs_addComponentFunc as WonderEngineCoreType_IComponentForJs_addComponentFunc} from 'wonder-engine-core-type/WonderEngineCoreType.gen';

import type {IComponentForJs_componentName as WonderEngineCoreType_IComponentForJs_componentName} from 'wonder-engine-core-type/WonderEngineCoreType.gen';

import type {IComponentForJs_createComponentFunc as WonderEngineCoreType_IComponentForJs_createComponentFunc} from 'wonder-engine-core-type/WonderEngineCoreType.gen';

import type {IComponentForJs_getAllComponentsFunc as WonderEngineCoreType_IComponentForJs_getAllComponentsFunc} from 'wonder-engine-core-type/WonderEngineCoreType.gen';

import type {IComponentForJs_getComponentDataFunc as WonderEngineCoreType_IComponentForJs_getComponentDataFunc} from 'wonder-engine-core-type/WonderEngineCoreType.gen';

import type {IComponentForJs_getComponentFunc as WonderEngineCoreType_IComponentForJs_getComponentFunc} from 'wonder-engine-core-type/WonderEngineCoreType.gen';

import type {IComponentForJs_getGameObjectsFunc as WonderEngineCoreType_IComponentForJs_getGameObjectsFunc} from 'wonder-engine-core-type/WonderEngineCoreType.gen';

import type {IComponentForJs_hasComponentFunc as WonderEngineCoreType_IComponentForJs_hasComponentFunc} from 'wonder-engine-core-type/WonderEngineCoreType.gen';

import type {IComponentForJs_setComponentDataFunc as WonderEngineCoreType_IComponentForJs_setComponentDataFunc} from 'wonder-engine-core-type/WonderEngineCoreType.gen';

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
  readonly componentName: WonderEngineCoreType_IComponentForJs_componentName; 
  state: state; 
  readonly createComponentFunc: WonderEngineCoreType_IComponentForJs_createComponentFunc<state,component>; 
  readonly getGameObjectsFunc: WonderEngineCoreType_IComponentForJs_getGameObjectsFunc<state,component>; 
  readonly addComponentFunc: WonderEngineCoreType_IComponentForJs_addComponentFunc<state,component>; 
  readonly hasComponentFunc: WonderEngineCoreType_IComponentForJs_hasComponentFunc<state>; 
  readonly getComponentFunc: WonderEngineCoreType_IComponentForJs_getComponentFunc<state,component>; 
  readonly getAllComponentsFunc: WonderEngineCoreType_IComponentForJs_getAllComponentsFunc<state,component>; 
  readonly getComponentDataFunc: WonderEngineCoreType_IComponentForJs_getComponentDataFunc<state,dataName,component>; 
  readonly setComponentDataFunc: WonderEngineCoreType_IComponentForJs_setComponentDataFunc<state,dataName,component>
};
