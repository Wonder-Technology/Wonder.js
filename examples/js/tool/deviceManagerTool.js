var deviceManagerTool = (function () {
    return {
        setGL: wd.setDeviceManagerGL,
        resetData: function(){
            wd.initDeviceManagerData(wd.DeviceManagerData);
        }
    }
})()

