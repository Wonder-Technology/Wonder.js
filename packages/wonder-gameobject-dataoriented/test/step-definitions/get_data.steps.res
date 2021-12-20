open WonderBsJestCucumber
open Cucumber
open Expect
open Operators

open StateType

let feature = loadFeature("./test/features/get_data.feature")

defineFeature(feature, test => {
  let data = ref(Obj.magic(1))
  let state = ref(Obj.magic(1))

  test(."create a state", ({\"when", then}) => {
    \"when"("I get data", () => {
      data := Main.getData()
    })

    then("createStateFunc should create a state", () => {
      data.contents.createStateFunc()->expect == {
          maxUID: 0,
        }
    })
  })

  test(."create a gameObject", ({\"when", \"and", then}) => {
    \"when"("I get data", () => {
      data := Main.getData()
    })

    \"and"("create a state", () => {
      state := data.contents.createStateFunc()
    })

    then("createGameObjectFunc should create a gameObject", () => {
      let (state, gameObject) = data.contents.createGameObjectFunc(. state.contents)

      state.maxUID->expect == 1
      gameObject->expect == 0
    })
  })

  test(."get all gameObjects", ({\"when", \"and", then}) => {
    let allGameObjects = []

    \"when"("I get data", () => {
      data := Main.getData()
    })

    \"and"("create a state", () => {
      state := data.contents.createStateFunc()
    })

    \"and"("create two gameObjects", () => {
      let (s1, g1) = data.contents.createGameObjectFunc(. state.contents)
      let (s2, g2) = data.contents.createGameObjectFunc(. s1)

      state := s2
      allGameObjects
      ->WonderCommonlib.ArraySt.push(g1)
      ->WonderCommonlib.ArraySt.push(g2)
      ->ignore
    })

    then("getAllGameObjects should return them", () => {
      data.contents.getAllGameObjectsFunc(. state.contents)->expect == allGameObjects
    })
  })
})
