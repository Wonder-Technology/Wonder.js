var deviceManagerTool = (function () {
    return {
        setGL: wd.setDeviceManagerGL,
        getViewport: wd.getDeviceManagerViewport,
        resetData: function(){
            wd.initDeviceManagerData(wd.DeviceManagerData);
        }
    }
})()

