var convertArrayToObject = (array, key) => array.reduce((obj, item) => ((obj[[item[key]]] = item), obj), {});
var getReferrers = function (user_list) {
    var user_list_obj = convertArrayToObject(user_list, 'id');
    var user_list2 = JSON.parse(JSON.stringify(user_list));
    user_list2.forEach(user => {
        let referrer = user_list_obj[user.referrerId];
        user.referrer = user.referrerId != null && referrer != null && referrer.name != null ? referrer.name : null;
        return user;
    });
    return user_list2;
};

var getMaxPalindrome = function (S) {
    var digitDictionary = Array(10).fill('');
    var digitLength = 0, mod = 0;
    var digitStr = '', start = '', mid = '', end = '';

    for (var i = 0; i < S.length; i++) {
        digitDictionary[S[i]] += S[i];
    }

    for (i = digitDictionary.length - 1; i >= 0; i--) {
        digitLength = digitDictionary[i].length;

        if (digitLength == 0 || ((start + mid + end).length <= 1 && i == 0)) continue;

        mod = digitLength % 2;
        if (digitLength > 1) {
            digitStr = digitDictionary[i].slice(0, digitLength/2);
            start += digitStr;
            end = digitStr + end;
        }
        mid = mod == 1 && mid == '' ? digitDictionary[i].charAt(0) : mid;
    }

    return start + mid + end;
};

var getMaxIndexDiff = function (A) {
    var maxDiff = 0, diff = 0;
    var map = new Map();

    for (var i = 0; i < A.length; i++) {
        if (!map.has(A[i])) {
            map.set(A[i], i);
            continue;
        }
        diff = i - map.get(A[i]);
        maxDiff = maxDiff < diff ? diff : maxDiff;
    }

    return maxDiff;
};

// https://www.geeksforgeeks.org/longest-common-prefix-using-sorting/
var getLongestPrefix = function (arr) {
    let pref = '', shortestStr = '', char = '';
    let i = 0, j = 0;

    if (arr.length == 0) return pref;

    shortestStr = arr[0];
    for (i = 1; i < arr.length; i++) {
        if (arr[i].length < shortestStr.length) {
            shortestStr = arr[i];
        }
    }

    if (shortestStr.length == 0) return pref;

    for (i = 0; i < shortestStr.length; i++) {
        char = arr[0].charAt(i)
        for (j = 1; j < arr.length; j++) {
            if (arr[j].charAt(i) != char) {
                break;
            }
        }
        if (j != arr.length) {
            break;
        }
    }

    pref = shortestStr.slice(0, i);
    return pref;
};

var getRemovedValue = function (value, index) {
    var result = 0;

    if (index == 0) {
        result = value.substring(index+1)
    } else if (index == value.length-1) {
        result = value.substring(0, value.length-1);
    } else {
        result = value.substring(0, index) + value.substring(index+1);
    }

    return Math.abs(parseInt(result)) == 0 ? 0 : parseInt(result);
};

var getMaxValueRemovedChar = function (removeChar = '5', N) {
    //var N = -5859;
    var NString = N.toString();
    var indexArr = [];
    var maxValue = -1, value = 0;
    var hasMaxValueSet = false;

    for (var i = 0; i < NString.length; i++) {
        if (NString[i] != removeChar) continue;
        indexArr.push(i);
    }

    for (i = 0; i < indexArr.length; i++) {
        value = getRemovedValue(NString, indexArr[i]);
        if (!hasMaxValueSet || maxValue < value) {
            maxValue = value;
            hasMaxValueSet = true;
        }
    }

    return maxValue;
};

// https://app.codility.com/programmers/trainings/9/binary_gap/
var getMaxZeroBit = function (N) {
    //var N = 1041;
    var bitVal = 0, val = 0, index = 0, maxCount = 0, count = 0;
    var isOneBitFound = false;
    while (val != N) {
        bitVal = N & (1 << index);

        isOneBitFound = (bitVal != 0 && !isOneBitFound) || isOneBitFound;

        count = bitVal == 0 && isOneBitFound ? count + 1 : 0;
        maxCount = maxCount < count ? count : maxCount;

        index++;

        val += bitVal;
    }
    return maxCount;
};

var getMaxStringOrderedAlphabetically = function (S) {
    //var S = "cdiity";
    var currCharCode, nextCharCode, maxIndex = -1;
    var maxIndexFound = false;
    var outputStr = "";
    for (var index = 0; index < S.length-1; index++) {
        currCharCode = S[index].charCodeAt(0)
        nextCharCode = S[index+1].charCodeAt(0);
        if (currCharCode > nextCharCode && !maxIndexFound) {
            maxIndex = index;
            maxIndexFound = true;
            continue;
        }
        outputStr += S[index];
    }
    return maxIndex == -1 ? outputStr : outputStr + S[S.length-1];
};

// https://coderbyte.com/algorithm/stock-maximum-profit
var getMaxProfit= function (arr) {
    //var arr = [45, 24, 35, 31, 40, 38, 11];//.sort(function(a,b) { return b-a;});
    var changeBuyIndex = true;
    var maxProfit = -1, sellPrice = 0, buyPrice = 0;

    for (var index = 0; index < arr.length-1; index++) {
        sellPrice = arr[index+1];
        if (changeBuyIndex) buyPrice = arr[index];
        if (sellPrice < buyPrice) {
            changeBuyIndex = true;
            continue;
        }
        maxProfit = maxProfit < sellPrice - buyPrice ? sellPrice - buyPrice : maxProfit;
        changeBuyIndex = false;
    }
    return maxProfit;
};

/*
var getReferrersTest = [
    { id: 0, referrerId: null, name: "Tess" },
    { id: 1, referrerId: 2, name: "Joe" },
    { id: 2, referrerId: 5, name: "Jane" },
    { id: 3, referrerId: 1, name: "Billy" },
    { id: 4, referrerId: 0, name: "Vina" }
    //{ id: 1, referrerId: 2, name: "Joe" },
    //{ id: 2, referrerId: null, name: "Jane" }
    // ... big array of users
];

console.log(JSON.stringify(getReferrers(getReferrersTest)));
console.log(JSON.stringify(test));
console.log(getMaxPalindrome('12345'));
console.log(getMaxIndexDiff([1, 2, 3]));
console.log(getLongestPrefix(["flow", "flower", "flight"]));
*/

// Test commit