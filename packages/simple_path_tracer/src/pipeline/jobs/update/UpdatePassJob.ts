import { getPass, getWebGPU, setPass } from "../../../data/Repo"

let _updateCommonDataBufferData = () => {
    let { device } = getWebGPU()
    let { frameIndex, commonDataBufferData } = getPass();

    let [commonDataBuffer, commonDataData] = commonDataBufferData;

    commonDataData[1] = frameIndex + 1;

    device.queue.writeBuffer(commonDataBuffer, 0, commonDataData)
}

export let exec = () => {
    let pass = getPass();

    _updateCommonDataBufferData();

    setPass({
        ...pass,
        frameIndex: pass.frameIndex + 1,
    });
}