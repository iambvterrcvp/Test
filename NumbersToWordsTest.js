// Parses the decimal part
var parseDecimal = function (s) {
    let numberString = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    let outputStr = ' point';
    let i = 0;

    while (i < s.length) {
        let n = parseInt(s.charAt(i));
        outputStr += ' ' + numberString[n];
        i++;
    }

    return outputStr;
};

// Parses the integer part
var parseNumber = function (s) {
    let hundredthString = ['', 'thousand', 'million', 'billion'];
    let outputStr = '', sPart = '';
    let sArray = [];
    let i = 0, count = 0;

    // Splits input to 3-digit numbers, and added it to sArray
    for (i = s.length - 1; i >= 0; i--) {
        sPart = s[i] + sPart;
        count = s.length - 1 - i;

        if (count % 3 == 2 || i == 0) {
            sArray.push(sPart);
            sPart = '';
        }
    }

    // Traverses all 3-digit numbers, and parses by hundreds
    for (i = 0; i < sArray.length; i++) {
        let n = parseInt(sArray[i]);

        // Ignores value when 0 but not in the hundreds part or in the hundreds part but input is greater than hundreds
        if (n == 0 && (i > 0 || (i == 0 && sArray.length > 1))) continue;

        // Gets output based on parsing by hundreds,
        // and adding 'thousand', 'million', or 'billions' based on sArray index (in accordance with hundredthString array too)
        outputStr = (parseByHundreds(n) + ' ' + hundredthString[i]) + (outputStr == '' ? '' : ' ' + outputStr);
    }

    return outputStr.trim();
};

// Returns the English word equivalent for the tenths integer part of the input string
// (example: 'zero', 'eleven', 'ninety nine')
var parseByTens = function (n) {
    let numberString = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
                        'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen',
                        'eighteen', 'nineteen'];
    let tenthString = ['', 'ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
    let tens = n < 10 || (n > 10 && n < 20) ? numberString[n] :
               (tenthString[Math.floor(n / 10)] + (n % 10 == 0 ? '' : ' ' + numberString[n % 10]));

    return tens;
};

// If input is less than 100, returns parseByTens output
// Else, it returns hundredth number (n/100) + 'hundred' + parseByTens output.
var parseByHundreds = function (n) {
    let numberString = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    let hundreds = (n < 100 ? '' : (numberString[Math.floor(n / 100)] + ' hundred '));
    let tens = parseByTens(n < 100 ? n : n % 100);

    return hundreds + (hundreds != '' && tens == 'zero' ? '' : tens);
};

// Returns an array of converted numbers/decimals to string (in English word)
var convertNumberToString = function (a) {
    let outputArr = [];

    for (let i = 0; i < a.length; i++) {
        let output = '';
        let input = a[i];
        let inputSplitString = [];
        let inputSplitStringLength = 0;

        // Returns -1:
        // if input is not a valid number, or
        // an input with length greater than 1 but integer starts with 0 (not applicable to decimal), or
        // a negative number input
        if (isNaN(parseFloat(input)) ||
            (input.length > 1 && input.indexOf('.') == -1 && input.charAt(0) == '0') ||
            input.charAt(0) == '-') {

            outputArr.push(-1);
            continue;
        }

        // Splits input string based on '.' occurrence
        inputSplitString = input.split('.');
        inputSplitStringLength = inputSplitString.length;

        // Returns -1:
        // If input has more than 2 occurences of '.', or
        // input is not a valid decimal (example: 123.)
        if (inputSplitStringLength > 2 || (inputSplitStringLength == 2 && inputSplitString[1] == '')) {
            outputArr.push(-1);
            continue;
        }

        // Parses the integer part
        output = parseNumber(inputSplitString[0]);
        // Parses the decimal part
        output += inputSplitStringLength == 2 ? parseDecimal(inputSplitString[1]) : '';

        outputArr.push(output);
    }

    return outputArr;
};

// Check Number to String conversion (sample inputs)
console.log(convertNumberToString(['123', '123.', '.123', '', 'abc',
                                   '0123', '123.456', '100', '1', '11',
                                   '1234', '1000000000', '-123', '99', '000000',
                                   '999999999', '123456789012', '2.900', '1.000', '1000',
                                   '1000000', '2000019', '12001', '123999000', '0',
                                   '0.7801', '123.123.123']));