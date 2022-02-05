/* TypeScript file generated from IGameObjectForJs.res by genType. */
/* eslint-disable import/first */


// tslint:disable-next-line:max-classes-per-file 
// tslint:disable-next-line:class-name
export abstract class gameObject { protected opaque!: any }; /* simulate opaque types */

// tslint:disable-next-line:interface-over-type-literal
export type createStateFunc<state> = () => state;

// tslint:disable-next-line:interface-over-type-literal
export type createGameObjectFunc<state,gameObject> = (_1:state) => [state, gameObject];

// tslint:disable-next-line:interface-over-type-literal
export type getAllGameObjectsFunc<state,gameObject> = (_1:state) => gameObject[];

// tslint:disable-next-line:interface-over-type-literal
export type gameObjectData<state,gameObject> = {
  readonly createStateFunc: createStateFunc<state>; 
  readonly createGameObjectFunc: createGameObjectFunc<state,gameObject>; 
  readonly getAllGameObjectsFunc: getAllGameObjectsFunc<state,gameObject>
};
