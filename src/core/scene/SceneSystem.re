open SceneType;

open GameObjectType;

/* external gameObjectToScene : GameObjectType.gameObject => SceneType.scene = "%identity"; */
let create (state: StateDataType.state) =>
  GameObjectSystem.create state;
  /* let (state, uid) = GameObjectSystem.create state;
     (state, gameObjectToScene gameObject) */

let addChild (scene: scene) (child: gameObject) (state: StateDataType.state) =>
  /* todo handle camera */
  GameObjectSystem.addChild scene child state;