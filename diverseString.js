function solution(A, B, C) {
  let result = ''
  const names = ['a', 'b', 'c']
  let val = [A, B, C]
  let consec = 0
  let lastIdx = -1
  while (true) {
    const sortedIdx = sortAndGetIndices(val)
    let idx = -1
    for (const item of sortedIdx) {
      if ((consec < 2 || lastIdx !== item) && val[item] > 0) {
        idx = item
        break
      }
    }
    if (idx === -1) break
    val[idx] -= 1
    if (idx === lastIdx) consec++
    else {
      consec = 1
      lastIdx = idx
    }
    result += names[idx]
  }

  return result
}

function sortAndGetIndices(arr) {
  const indexedArray = arr.map((value, index) => ({ value, index }))
  indexedArray.sort((a, b) => b.value - a.value)
  return indexedArray.map((element) => element.index)
}

console.log(solution(6, 1, 1))