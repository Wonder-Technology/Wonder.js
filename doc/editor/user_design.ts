// npm install

import { registerExtension } from "wonder"

import { getData } from "wonder-engine-core"

let extensionState = Wonder.init()

TODO event name should all be 驼峰命名(lower case begin)(e.g. "wonder-editScene-engine-core")


Wonder.registerExtension("Wonder-EditScene-Engine-Core")
Wonder.registerExtension("Wonder-RunScene-Engine-Core")
let eec
let rec

// eec.onActive()
// rec.onActive()



Wonder.registerExtension("Wonder-Canvas")
let c

// c.onActive()



let ee

// ee.onActive()


Wonder.registerExtension("Wonder-Editor-EventManager")
Wonder.registerExtension("Wonder-EditScene-EventManager")
Wonder.registerExtension("Wonder-RunScene-EventManager")

let ee

// ee.onActive()

Wonder.registerExtension("Wonder-Editor-UI")


let eu

// eu.onActive()





Wonder.registerExtension("Wonder-Register-Extension-UI")


let re

// re.onActive()



Wonder.registerExtension("Wonder-Menu")
let me
// me.onActive()
// me.addFirstItem("Config")
// me.addSecondItem("Config", "Version", "Wonder-ShowVersion")



Wonder.registerExtension("Wonder-Init")
Wonder.registerExtension("Wonder-Update")
Wonder.registerExtension("Wonder-Render")




edem.trigger("Wonder-Active-Extension").then()
esem.trigger("Wonder-Active-Extension").then()
rsem.trigger("Wonder-Active-Extension").then()


me.addFirstItem("Config")
me.addSecondItem("Config", "Version", "Wonder-ShowVersion")

let _init = () => {
    // edem.trigger("Wonder-Editor-Init").then()
    // esem.trigger("Wonder-EditScene-Init").then()
    // rsem.trigger("Wonder-RunScene-Init").then()
    edem.trigger("Wonder-Init").then()
    esem.trigger("Wonder-Init").then()
    rsem.trigger("Wonder-Init").then()
}

let _frame = () => {
    // Wonder.update()

    // esem.trigger("Wonder-Engine-Update").then()
    // rsem.trigger("Wonder-Engine-Update").then()

    // esem.trigger("Wonder-Engine-Render").then()
    // rsem.trigger("Wonder-Engine-Render").then()

    esem.trigger("Wonder-Update").then()
    rsem.trigger("Wonder-Update").then()

    esem.trigger("Wonder-Render").then()
    rsem.trigger("Wonder-Render").then()


    requestAnimationFrame(_frame)
}

_init() -> Js.Promise.then_(() => {
    _frame()
}, _)


webpack: watch