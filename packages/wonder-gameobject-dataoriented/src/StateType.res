type uid = int

@genType
type gameObject = uid

@genType
type state = {mutable maxUID: gameObject}
