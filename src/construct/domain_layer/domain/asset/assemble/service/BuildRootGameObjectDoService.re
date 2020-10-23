open WDDType;

let build = ({scene}, gameObjects) => {
  switch (scene.gameObjects->ListSt.length) {
  | 1 => gameObjects->ListSt.head->OptionSt.get
  | _ =>
    CreateGameObjectDoService.create()
    ->Result.bind(gameObject => {
        Tuple2.collectResult(
          GetComponentGameObjectDoService.getTransform(gameObject),
          scene.gameObjects
          ->ListSt.traverseResultM(gameObjectIndex => {
              gameObjects
              ->ListSt.nth(gameObjectIndex)
              ->OptionSt.flatMap(GetComponentGameObjectDoService.getTransform)
              ->OptionSt.get
            }),
        )
        ->Result.bind((parent, children) => {
            AssembleCommonDoService.addChildrenToParent(parent, children)
          })
        ->Result.mapSuccess(() => gameObject)
      })
  };
};
