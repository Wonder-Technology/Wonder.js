open GameObjectType;

open GameObjectSystem;

open ComponentType;

let addGameObjectTransformComponent
    (gameObject: gameObject)
    (component: component)
    (state: StateDataType.state) =>
  /* todo check alive */
  addComponent gameObject component (ComponentComponentIdSystem.getComponentId Geometry) state;