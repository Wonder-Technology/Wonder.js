// open WonderBsJestCucumber
// open Cucumber
// open Expect
// open Operators

// let errorCaseScenarios = (
//   (getDataFunc, setDataFunc, getStateFunc, setStateFunc, setComponentFunc),
//   (getComponentDataFunc, createStateFunc),
//   test,
//   componentName,
// ) => {
//   test(.{j`${componentName} not be added to a gameObject`}, ({given, \"when", \"and", then}) => {
//     let component = ref(Obj.magic(1))

//     given("create a gameObject", () => {
//       ()
//     })

//     \"when"("I get data", () => {
//       setDataFunc(getComponentDataFunc())
//     })

//     \"and"("create a state", () => {
//       setStateFunc(createStateFunc())
//     })

//     \"and"({j`create a ${componentName}`}, () => {
//       // let data = getDataFunc()-> Obj.magic
//       let (s, m) = data.createComponentFunc(. getStateFunc())

//       setStateFunc(s)
//       setComponentFunc(m)
//     })

//     then("getGameObjectsFunc should return empty", () => {
//       getDataFunc().getGameObjectsFunc(. getStateFunc(), getComponentFunc())->expect == []
//     })
//   })

//   test(."get unknown data", ({\"when", \"and", then}) => {
//     let component = ref(Obj.magic(1))

//     \"when"("I get data", () => {
//       setDataFunc(getComponentDataFunc())
//     })

//     \"and"("create a state", () => {
//       setStateFunc(createStateFunc())
//     })

//     \"and"({j`create a ${componentName}`}, () => {
//       let (s, m) = getDataFunc().createComponentFunc(. getStateFunc())

//       setStateFunc(s)
//       setComponentFunc(m)
//     })

//     then({j`get ${componentName}'s unknown data should error`}, () => {
//       expect(() => {
//         getDataFunc().getComponentDataFunc(. getStateFunc(), getComponentFunc(), 100)
//       })->toThrow()
//     })
//   })

//   test(."set unknown data", ({\"when", \"and", then}) => {
//     let component = ref(Obj.magic(1))

//     \"when"("I get data", () => {
//       setDataFunc(getComponentDataFunc())
//     })

//     \"and"("create a state", () => {
//       setStateFunc(createStateFunc())
//     })

//     \"and"({j`create a ${componentName}`}, () => {
//       let (s, m) = getDataFunc().createComponentFunc(. getStateFunc())

//       setStateFunc(s)
//       setComponentFunc(m)
//     })

//     then({j`set ${componentName}'s unknown data should error`}, () => {
//       expect(() => {
//         getDataFunc().setComponentDataFunc(. getStateFunc(), getComponentFunc(), 100, Obj.magic(-1))
//       })->toThrow()
//     })
//   })
// }
