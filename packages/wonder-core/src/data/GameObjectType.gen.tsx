/* TypeScript file generated from GameObjectType.res by genType. */
/* eslint-disable import/first */


import type {createGameObjectFunc as IGameObjectForJs_createGameObjectFunc} from '../../src/abstract/scene_graph/IGameObjectForJs.gen';

import type {getAllGameObjectsFunc as IGameObjectForJs_getAllGameObjectsFunc} from '../../src/abstract/scene_graph/IGameObjectForJs.gen';

// tslint:disable-next-line:max-classes-per-file 
// tslint:disable-next-line:class-name
export abstract class state { protected opaque!: any }; /* simulate opaque types */

// tslint:disable-next-line:max-classes-per-file 
// tslint:disable-next-line:class-name
export abstract class gameObject { protected opaque!: any }; /* simulate opaque types */

// tslint:disable-next-line:interface-over-type-literal
export type usedGameObjectData = {
  state: state; 
  readonly createGameObjectFunc: IGameObjectForJs_createGameObjectFunc<state,gameObject>; 
  readonly getAllGameObjectsFunc: IGameObjectForJs_getAllGameObjectsFunc<state,gameObject>
};
