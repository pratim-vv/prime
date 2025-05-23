const { isPrimeFermat, modPow, greatestCommonDivisor } = require('../prime.js');

describe('isPrimeFermat', () => {
    test('returns true for primes', () => {
        expect(isPrimeFermat(2, 3)).toBe(true);
        expect(isPrimeFermat(2, 5)).toBe(true);
        expect(isPrimeFermat(3, 7)).toBe(true);
    });

    test('returns false for most composites', () => {
        expect(isPrimeFermat(2, 4)).toBe(false);
        expect(isPrimeFermat(47, 1892039232489123)).toBe(false);
        expect(isPrimeFermat(42069, 525600)).toBe(false);
    });

    test('returns true for Carmichael numbers (Fermat false positive)', () => {
        // not all bases fool Carmichael numbers, must be a base coprime to carmichael number
        expect(isPrimeFermat(2, 561)).toBe(true); 
        expect(isPrimeFermat(53, 63973)).toBe(true);
    });
});

describe('modPow', () => {
    test('correctly computes modular exponentiation', () => {
        expect(modPow(2, 3, 5)).toBe(8 % 5); // 8 % 5 = 3
        expect(modPow(3, 4, 7)).toBe(81 % 7); // 81 % 7 = 4
        expect(modPow(5, 0, 13)).toBe(1);
    });
});

describe('greatestCommonDivisor', () => {
    test('correctly finds greatest common denominator', () => {
        expect(greatestCommonDivisor(12, 8)).toBe(4);
        expect(greatestCommonDivisor(8, 12)).toBe(4);
        expect(greatestCommonDivisor(838673879, 947304261)).toBe(1);
        expect(greatestCommonDivisor(2738502576, 374736)).toBe(48);
    });
});