// Fermat's little theorem
function isPrimeFermat(a, n) {
    if (modPow(a, n - 1, n) !== 1) {
        return false;
    }
    return true;
}

// Probilistic Algorithm for Testing Primality paper
function isPrimeMillerRabin(n, attempts=20) {
    // small primes hardcoded for efficiency-sake
    if (n === 2 || n === 3) return true;
    if (n === 5 || n === 7) return true;
    if (n === 11 || n === 13) return true;
    if (n === 17 || n === 19) return true;

    // base cases as indicated in paper
    if (n <= 1) return false;
    if (n % 2 === 0) return false;

    // variables as denoted in original paper
    let k =  n - 1;
    let i = 0;
    while (k % 2 === 0) {
        k = Math.floor(k / 2);
        i++;
    }

    for (let j = 0; j < attempts; j++) {

        // b is primality witness
        let b = randomRange(1, n - 1);

        // Check fermat primality first
        if(!isPrimeFermat(b, n)) return false;

        let gcd = greatestCommonDivisor(modPow(b, k, n) - 1, n);
        if (gcd === 1 || gcd === n) {
            continue;
        } else {
            return false;
        }
    }
    return true;
}

// Inspired by "On Periods in the Reciprocals of Primes"
function shanksPeriod(prime) {
    let seen = {};
    let max = parseInt('9'.repeat(String(prime).length));
    for (let i = 1; i <= max; i++) {
        seen[i] = 0;
    }
    let tracker = [];
    let currentNumerator = 10;

    while (true) {
        let digit = Math.floor(currentNumerator / prime);
        if (digit === 0) {
            if (seen[currentNumerator]) break;
            tracker.push(0);
            seen[currentNumerator] = 1;
            currentNumerator *= 10;
            continue;
        }
        currentNumerator = currentNumerator - (prime * digit);
        if (seen[currentNumerator]) break;
        else {
            seen[currentNumerator] = 1;
            tracker.push(digit);
            currentNumerator *= 10;
        }
    }
    return tracker;
}

// Helper function for modular exponentiation
function modPow(base, exponent, mod) {
    let result = 1;
    base = base % mod;
    while (exponent > 0) {
        if (exponent % 2 === 1) {
            result = (result * base) % mod;
        }
        exponent = Math.floor(exponent / 2);
        base = (base * base) % mod;
    }
    return result;
}

// Helper function for random integer in [min, max]
function randomRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Helper function for finding Greatest Common Divisor using Euclidean Method
function greatestCommonDivisor(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b) {
        let t = b;
        b = a % b;
        a = t;
    }
    return a;
}


module.exports = {isPrimeFermat, isPrimeMillerRabin, modPow, randomRange, greatestCommonDivisor, shanksPeriod};

