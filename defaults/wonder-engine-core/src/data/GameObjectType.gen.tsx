/* TypeScript file generated from GameObjectType.res by genType. */
/* eslint-disable import/first */


import type {IGameObjectForJs_createGameObjectFunc as WonderEngineCoreType_IGameObjectForJs_createGameObjectFunc} from './WonderEngineCoreType.gen';

import type {IGameObjectForJs_getAllGameObjectsFunc as WonderEngineCoreType_IGameObjectForJs_getAllGameObjectsFunc} from './WonderEngineCoreType.gen';

// tslint:disable-next-line:max-classes-per-file 
// tslint:disable-next-line:class-name
export abstract class state { protected opaque!: any }; /* simulate opaque types */

// tslint:disable-next-line:max-classes-per-file 
// tslint:disable-next-line:class-name
export abstract class gameObject { protected opaque!: any }; /* simulate opaque types */

// tslint:disable-next-line:interface-over-type-literal
export type usedGameObjectData = {
  state: state; 
  readonly createGameObjectFunc: WonderEngineCoreType_IGameObjectForJs_createGameObjectFunc<state,gameObject>; 
  readonly getAllGameObjectsFunc: WonderEngineCoreType_IGameObjectForJs_getAllGameObjectsFunc<state,gameObject>
};
