var deviceManagerTool = (function () {
    return {
        resetData: function(){
            wd.initDeviceManagerWorkerData(wdrd.DeviceManagerWorkerData);
        }
    }
})()

