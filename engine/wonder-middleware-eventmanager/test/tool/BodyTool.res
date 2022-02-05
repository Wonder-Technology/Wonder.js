@val external document: Dom.htmlDocument = ""

// let getBody = po => Obj.magic(document)["body"]->EventType.bodyToEventTarget
let getBody = po => Obj.magic(document)["body"]
