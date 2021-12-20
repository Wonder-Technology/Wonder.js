// import { Map } from "immutable"
// import { getExn } from "wonder-commonlib-ts/src/NullableUtils"
import { dataValue, getComponentData } from "wonder-core/src/abstract/scene_graph/IComponentForJs.gen"
import { outline, state, config, dataName as dataNameType } from "./Type"
import { componentName, dataName as dataNameTypeOutline } from "wonder-component-type-outline"

// export let getData: getComponentData<state, outline> = () => {
//     return {
//         componentName: "Outline",
//         createStateFunc: () => {
//             return {
//                 gameObjectOutlineMap: Map(),
//                 gameObjectMap: Map(),
//                 maxIndex: 0,
//                 outlineColorMap: Map()
//             }
//         },
//         createComponentFunc: (state) => {
//             let component = state.maxIndex

//             return [
//                 {
//                     ...state,
//                     maxIndex: state.maxIndex + 1
//                 },
//                 component
//             ]
//         },
//         addComponentFunc: (state, gameObject, component) => {
//             return {
//                 ...state,
//                 gameObjectOutlineMap: state.gameObjectOutlineMap.set(
//                     gameObject, component
//                 ),
//                 gameObjectMap: state.gameObjectMap.set(component, gameObject)
//             }
//         },
//         hasComponentFunc: (state, gameObject) => {
//             return state.gameObjectOutlineMap.has(gameObject)
//         },
//         getComponentFunc: (state, gameObject) => {
//             return getExn(state.gameObjectOutlineMap.get(gameObject))
//         },
//         getAllComponentsFunc: (state) => {
//             return Array.from(state.gameObjectOutlineMap.values())
//         },
//         getGameObjectsFunc: (state, component) => {
//             return [getExn(state.gameObjectMap.get(component))]
//         },
//         getComponentDataFunc: (state, component, dataName: string) => {
//             let data = null

//             switch (dataName) {
//                 case "outlineColor":
//                     data = getExn(state.outlineColorMap.get(component))
//                     break;
//                 default:
//                     throw new Error(`unknown dataName:${dataName}`)
//             }

//             return data as any as dataValue
//         },
//         setComponentDataFunc: (state, component, dataName: string, dataValue: any) => {
//             switch (dataName) {
//                 case "outlineColor":
//                     state = {
//                         ...state,
//                         outlineColorMap: state.outlineColorMap.set(component, dataValue)
//                     }
//                     break
//                 default:
//                     throw new Error(`unknown dataName:${dataName}`)
//             }

//             return state
//         }
//     }
// }


export let getData: getComponentData<state, config, dataNameType, outline> = () => {
    return {
        componentName: componentName,
        createStateFunc: (_config) => {
            return {
                gameObjectOutlineMap: {},
                gameObjectMap: {},
                maxIndex: 0,
                outlineColorMap: {}
            }
        },
        createComponentFunc: (state) => {
            let component = state.maxIndex

            state.maxIndex = state.maxIndex + 1

            return [
                state,
                component
            ]
        },
        addComponentFunc: (state, gameObject, component) => {
            state.gameObjectOutlineMap[gameObject as any as number] = component
            state.gameObjectMap[component] = gameObject

            return state
        },
        hasComponentFunc: (state, gameObject) => {
            return state.gameObjectOutlineMap[gameObject as any as number] !== undefined
        },
        getComponentFunc: (state, gameObject) => {
            return state.gameObjectOutlineMap[gameObject as any as number]
        },
        getAllComponentsFunc: (state) => {
            return Object.values(state.gameObjectOutlineMap)
        },
        getGameObjectsFunc: (state, component) => {
            return [state.gameObjectMap[component]]
        },
        getComponentDataFunc: (state, component, dataName) => {
            let data = null

            switch (dataName) {
                case dataNameTypeOutline.outlineColor:
                    // data = getExn(state.outlineColorMap[component])
                    data = state.outlineColorMap[component]
                    break;
                default:
                    throw new Error(`unknown dataName:${dataName}`)
            }

            return data as any as dataValue
        },
        setComponentDataFunc: (state, component, dataName, dataValue: any) => {
            switch (dataName) {
                case dataNameTypeOutline.outlineColor:
                    state.outlineColorMap[component] = dataValue
                    break
                default:
                    throw new Error(`unknown dataName:${dataName}`)
            }

            return state
        }
    }
}