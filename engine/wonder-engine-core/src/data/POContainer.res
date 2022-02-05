type poContainer = {mutable po: option<POType.po>}

let _createPOContainer = (): poContainer => {po: None}

let poContainer = _createPOContainer()

let setPO = (po: POType.po) => {
  poContainer.po = po->Some

  ()
}

let unsafeGetPO = () => {
  poContainer.po->WonderCommonlib.OptionSt.unsafeGet
}
