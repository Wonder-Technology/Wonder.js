open SceneType;

open GameObjectType;

open SceneSystem;

let addSceneChild (scene: scene) (child: gameObject) (state: StateDataType.state) =>
  /* todo check alive */
  addChild scene child state;