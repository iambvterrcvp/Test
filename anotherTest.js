// Problem: 
// Write a function that combines two same-length lists by alternatingly taking elements from each list.
// If you pass [1, 2, 3] and [10, 100, 1000] to the function, the result should be [1, 10, 2, 100, 3, 1000].

const fn = (arr1, arr2) => {
  // let result = []
  // for (let idx = 0; idx < arr1.length; idx++) {
  //   result.push(arr1[idx])
  //   result.push(arr2[idx])
  // }
  // return result
  return arr1.flatMap((item, index) => [item, arr2[index]])
}

console.log(fn([1, 2, 3], [10, 100, 1000]))