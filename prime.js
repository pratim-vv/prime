// Fermat's little theorem
function isPrimeFermat(a, n) {
    if (modPow(a, n - 1, n) !== 1) {
        return false;
    }
    return true;
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
