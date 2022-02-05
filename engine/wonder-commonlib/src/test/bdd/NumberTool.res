@val external convertStringToNumber: string => float = "Number"

let getExnAndConvertArgumentsToNumber = arguments => {
  arguments->OptionSt.getExn->ArgumentsTool.getArgumentsArr->ArraySt.map(convertStringToNumber)
}
