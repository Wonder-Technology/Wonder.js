let getScene = () => {
  let po = ContainerManager.getPO();

  po.scene;
};

let setScene = scene => {
  let po = ContainerManager.getPO();

  {...po, scene} |> ContainerManager.setPO;
};

let getGameObject = () => {
  let po = ContainerManager.getPO();

  po.gameObject;
};

let setGameObject = gameObject => {
  let po = ContainerManager.getPO();

  {...po, gameObject} |> ContainerManager.setPO;
};

let getTransform = () => {
  let po = ContainerManager.getPO();

  po.transform;
};

let setTransform = transform => {
  let po = ContainerManager.getPO();

  {...po, transform: transform->Some} |> ContainerManager.setPO;
};

let getConfig = () => {
  let po = ContainerManager.getPO();

  po.config;
};

let setConfig = config => {
  let po = ContainerManager.getPO();

  {...po, config} |> ContainerManager.setPO;
};
