import { formatCurrency } from "../scripts/utils/money.js";

console.group("TEST SUITE: formatCurrency")

if (formatCurrency(2095) === '20.95'){
    console.log("Converts cents into dollars: passed");
}else{console.warn("Converts cents into dollars: passed: failed")};

if (formatCurrency(0) === '0.00'){
    console.log("Works with 0: passed");
}else{console.warn("Works with 0: failed")};

if (formatCurrency(2000.5) === '20.01'){
    console.log("Rounds up to the nearest cent: passed");
}else{console.warn("Rounds up to the nearest cent: failed")};

if (formatCurrency(2000.4) === '20.00'){
    console.log("Rounds down to the nearest cent: passed");
}else{console.warn("Rounds down to the nearest cent: failed")};

console.groupEnd();
