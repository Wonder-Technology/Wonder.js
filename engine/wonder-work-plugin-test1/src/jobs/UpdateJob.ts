import { execFunc } from "../Type"
import { callFunc } from "wonder-engine-facade/src/MostAPI"
import { getAllGameObjects } from "wonder-engine-core"

export let exec: execFunc = (states) => {
    return callFunc(() => {
        console.log("update test1 job exec", states["wonder-work-plugin-test1"].data1)

        console.log("getAllGameObjects:", getAllGameObjects())

        return {
            ...states,
            "wonder-work-plugin-test1": {
                data1: 2
            }
        }
    })
}