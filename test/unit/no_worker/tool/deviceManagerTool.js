var deviceManagerTool = (function () {
    return {
        setGL: wd.setDeviceManagerGL,
        getViewport: wd.getDeviceManagerViewport,
        setViewport: wd.setDeviceManagerViewport,

        resetData: function(){
            wd.initDeviceManagerData(wd.DeviceManagerData);
        }
    }
})()

