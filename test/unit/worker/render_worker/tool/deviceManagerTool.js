var DeviceManagerTool = YYC.Class(DeviceManagerToolBase, {
    Public:{
        resetData: function(){
            wd.initDeviceManagerWorkerData(wdrd.DeviceManagerWorkerData);
        }
    }
})

var deviceManagerTool = new DeviceManagerTool();
