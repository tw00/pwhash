function hex2array(str) { 
    var result = [];
    // Ignore any trailing single digit; I don't know what your needs
    // are for this case, so you may want to throw an error or convert
    // the lone digit depending on your needs.
    while (str.length >= 2) { 
        result.push(parseInt(str.substring(0, 2), 16));
        str = str.substring(2, str.length);
    }

    return result;
}

function array2hex(arr) {
    var result = "";
    for (i in arr) {
        var str = arr[i].toString(16);
        // Pad to two digits, truncate to last two if too long.  Again,
        // I'm not sure what your needs are for the case, you may want
        // to handle errors in some other way.
        str = str.length == 0 ? "00" :
            str.length == 1 ? "0" + str : 
            str.length == 2 ? str :
            str.substring(str.length-2, str.length);
        result += str;
    }

    return result;
}

function array2binary(arr) {
    var result = "";
    for (i in arr) {
        result += String.fromCharCode(arr[i]);
    }
    return result;
}

function binary2array(arr) {
    var result = [];
    var c = 0;
    for (i in arr) {
        result[c] = String.charCodeAt(arr[i]);
        c = c + 1;
    }
    return result;
}
