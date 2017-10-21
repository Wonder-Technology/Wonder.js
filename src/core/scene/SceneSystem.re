open SceneType;

open GameObjectType;

let create (state: StateDataType.state) =>
  GameObjectSystem.create state;

let addChild (scene: scene) (child: gameObject) (state: StateDataType.state) =>
  /* todo handle camera */
  GameObjectSystem.addChild scene child state;