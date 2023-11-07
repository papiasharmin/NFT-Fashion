import JSBI from 'jsbi'

export function fromReadableAmount(amount, decimals) {
  const extraDigits = Math.pow(10, countDecimals(amount))
  const adjustedAmount = amount * extraDigits
  return JSBI.divide(
    JSBI.multiply(
      JSBI.BigInt(adjustedAmount),
      JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(decimals))
    ),
    JSBI.BigInt(extraDigits)
  )
}

export function toReadableAmount(rawAmount, decimals){
  const bi = JSBI.BigInt(rawAmount);
  const bd = JSBI.BigInt(decimals);
  const ex = JSBI.exponentiate(JSBI.BigInt(10), bd)
  console.log('CONVERSION',bi,bd,ex)

  const b =  JSBI.divide(bi,ex).toString();
  console.log('CONVERSIONfimal',b)
  return b
}

function countDecimals(x) {
  if (Math.floor(x) === x) {
    return 0
  }
  return x.toString().split('.')[1].length || 0
}