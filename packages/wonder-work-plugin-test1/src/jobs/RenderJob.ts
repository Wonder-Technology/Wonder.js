import { execFunc } from "../Type"
import { callFunc } from "wonder-facade/src/MostAPI"

export let exec: execFunc = (states) => {
    return callFunc(() => {
        console.log("render test1 job exec", states["wonder-work-plugin-test1"].data1)

        return {
            ...states,
            "wonder-work-plugin-test1": {
                data1: states["wonder-work-plugin-test1"].data1 + 1
            }
        }

    })
}


