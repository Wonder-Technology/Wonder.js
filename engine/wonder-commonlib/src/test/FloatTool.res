@bs.send external toFixed: (float, int) => string = ""

@bs.val external convertStringToInt: string => int = "Number"

@bs.val external convertFloatToString: float => string = "String"

@bs.val external convertStringToFloat: string => float = "Number"

let truncateFloatValue = (value: float, digit: int) => {
  let res = toFixed(value, digit)

  convertStringToFloat(res)
}
