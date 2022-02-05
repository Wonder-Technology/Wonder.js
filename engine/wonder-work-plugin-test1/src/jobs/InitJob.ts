// import { execFunc } from "../Type"
// import { callFunc } from "wonder-engine-facade/src/MostAPI"

// export let exec: execFunc = (states) => {
//     return callFunc(() => {
//         console.log("init test1 job exec", states["wonder-work-plugin-test1"].data1)

//         return {
//             ...states,
//             "wonder-work-plugin-test1": {
//                 data1: 1
//             }
//         }
//     })
// }



// import { execFunc } from "../Type"
// import { callFunc } from "wonder-engine-facade/src/MostAPI"
// import { getAllGameObjects } from "wonder-engine-core"

export let exec = ([{ callFunc }, { getAllGameObjects }]: any, states: any) => {
    return callFunc(() => {
        console.log("init test1 job exec", states["wonder-work-plugin-test1"].data1)

        console.log("getAllGameObjects:", getAllGameObjects())

        return {
            ...states,
            "wonder-work-plugin-test1": {
                data1: 2
            }
        }
    })
}