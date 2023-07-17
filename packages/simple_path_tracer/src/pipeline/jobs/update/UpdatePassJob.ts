import { getPass, getWebGPU, setPass } from "../../../data/Repo"

export let exec = () => {
    let { device } = getWebGPU()
    let { isCameraMove, totalSampleCount, commonDataBufferData } = getPass();

    let [commonDataBuffer, commonDataData] = commonDataBufferData;

    let newTotalSampleCount = null
    let newIsCameraMove = null
    if (isCameraMove) {
        newTotalSampleCount = 1
        newIsCameraMove = false
    }
    else {
        newTotalSampleCount = totalSampleCount
        newIsCameraMove = isCameraMove
    }

    commonDataData[1] = newTotalSampleCount

    device.queue.writeBuffer(commonDataBuffer, 0, commonDataData)

    setPass({
        ...getPass(),
        isCameraMove: newIsCameraMove,
        totalSampleCount: newTotalSampleCount + 1,
    });
}