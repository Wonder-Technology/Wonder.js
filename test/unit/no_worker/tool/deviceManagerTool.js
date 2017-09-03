var DeviceManagerTool = YYC.Class(DeviceManagerToolBase, {
    Public:{
        getGL: wd.getDeviceManagerGL,
        setGL: wd.setDeviceManagerGL,

        resetData: function(){
            wd.initDeviceManagerData(wd.DeviceManagerData);
        }
    }
})

var deviceManagerTool = new DeviceManagerTool();
