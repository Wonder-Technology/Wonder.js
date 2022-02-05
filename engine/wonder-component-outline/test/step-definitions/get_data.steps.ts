import { loadFeature, defineFeature } from "jest-cucumber"
import { dataName } from "../../../wonder-component-type-outline"
import { getData } from "../../src/Main"

const feature = loadFeature("./test/features/get_data.feature")

defineFeature(feature, test => {
  let data

  test('componentName', ({ when, then }) => {
    when('I get data', () => {
      data = getData()
    });

    then(/^componentName should be "(.*)"$/, (arg0) => {
      expect(arg0).toEqual("Outline")
    });
  });

  test('create a state', ({ when, then }) => {
    when('I get data', () => {
      data = getData()
    });

    then('createStateFunc should create a state', () => {
      expect(data.createStateFunc()).toEqual(
        {
          gameObjectOutlineMap: {},
          gameObjectMap: {},
          maxIndex: 0,
          outlineColorMap: {}
        }
      )
    });
  });

  test('create a outline', ({ when, and, then }) => {
    let state

    when('I get data', () => {
      data = getData()
    });

    and('create a state', () => {
      state = data.createStateFunc()
    });

    then('createComponentFunc should create a outline', () => {
      let [newState, outline] = data.createComponentFunc(state)

      expect(newState.maxIndex).toEqual(1)
      expect(outline).toEqual(0)
    });
  });

  test('add a outline to a gameObject', ({ given, when, and, then }) => {
    let gameObject
    let outline
    let state

    given('create a gameObject', () => {
      gameObject = 10
    });

    when('I get data', () => {
      data = getData()
    });

    and('create a state', () => {
      state = data.createStateFunc()
    });

    and('create a outline', () => {
      let [s, c] = data.createComponentFunc(state)
      state = s
      outline = c
    });

    and('add the outline to the gameObject', () => {
      state = data.addComponentFunc(state, gameObject, outline)
    });

    then('get the gameObject\'s outline should be the added one', () => {
      expect(data.getComponentFunc(state, gameObject)).toEqual(outline)
    });
  });

  test('get all outlines', ({ given, when, and, then }) => {
    let gameObject1, gameObject2
    let component1, component2
    let state

    given('create two gameObjects', () => {
      gameObject1 = 10
      gameObject2 = 11
    });

    when('I get data', () => {
      data = getData()
    });

    and('create a state', () => {
      state = data.createStateFunc()
    });

    and('create two outlines', () => {
      let [s1, c1] = data.createComponentFunc(state)
      state = s1
      component1 = c1

      let [s2, c2] = data.createComponentFunc(state)
      state = s2
      component2 = c2
    });

    and('add them to the gameObjects one by one', () => {
      state = data.addComponentFunc(state, gameObject1, component1)
      state = data.addComponentFunc(state, gameObject2, component2)
    });

    then('getAllComponentsFunc should get the two outlines', () => {
      expect(data.getAllComponentsFunc(state)).toEqual([component1, component2])
    });
  });

  test('judge whether a gameObject has a outline', ({ given, when, and, then }) => {
    let gameObject
    let outline
    let state

    given('create a gameObject', () => {
      gameObject = 10
    });

    when('I get data', () => {
      data = getData()
    });

    and('create a state', () => {
      state = data.createStateFunc()
    });

    and('create a outline', () => {
      let [s, c] = data.createComponentFunc(state)
      state = s
      outline = c
    });

    and('add the outline to the gameObject', () => {
      state = data.addComponentFunc(state, gameObject, outline)
    });

    then('hasComponentFunc should return true', () => {
      expect(data.hasComponentFunc(state, gameObject)).toBeTruthy()
    });
  });

  test('get a outline\'s gameObjects', ({ given, when, and, then }) => {
    let gameObject
    let outline
    let state

    given('create a gameObject', () => {
      gameObject = 10
    });

    when('I get data', () => {
      data = getData()
    });

    and('create a state', () => {
      state = data.createStateFunc()
    });

    and('create a outline', () => {
      let [s, c] = data.createComponentFunc(state)
      state = s
      outline = c
    });

    and('add the outline to the gameObject', () => {
      state = data.addComponentFunc(state, gameObject, outline)
    });

    then('getGameObjectsFunc should return the gameObject', () => {
      expect(data.getGameObjectsFunc(state, outline)).toEqual([gameObject])
    });
  });

  test('operate outline data', ({ when, and, then }) => {
    let outline
    let state
    let color

    when('I get data', () => {
      data = getData()
    });

    and('create a state', () => {
      state = data.createStateFunc()
    });

    and('create a outline', () => {
      let [s, c] = data.createComponentFunc(state)
      state = s
      outline = c
    });

    and('set outline\'s outlineColor', () => {
      color = [0.1, 0.5, 0.0]

      state = data.setComponentDataFunc(state, outline, dataName.outlineColor, color)
    });

    then('get outline\'s outlineColor should return the setted data', () => {
      expect(data.getComponentDataFunc(state, outline, dataName.outlineColor)).toEqual(color)
    });
  });

  test('get outline\'s unknown data', ({ when, and, then }) => {
    let outline
    let state

    when('I get data', () => {
      data = getData()
    });

    and('create a state', () => {
      state = data.createStateFunc()
    });

    and('create a outline', () => {
      let [s, c] = data.createComponentFunc(state)
      state = s
      outline = c
    });

    then(/^get outline's data(\d+) should error$/, (arg0) => {
      expect(() => {
        data.getComponentDataFunc(state, outline, "data1")
      }).toThrow("unknown dataName:data1")
    });
  });

  test('set ouline\'s unknown data', ({ when, and, then }) => {
    let outline
    let state

    when('I get data', () => {
      data = getData()
    });

    and('create a state', () => {
      state = data.createStateFunc()
    });

    and('create a outline', () => {
      let [s, c] = data.createComponentFunc(state)
      state = s
      outline = c
    });

    then(/^set outline's data(\d+) should error$/, (arg0) => {
      expect(() => {
        data.setComponentDataFunc(state, outline, "data1", 1)
      }).toThrow("unknown dataName:data1")
    });
  });
})