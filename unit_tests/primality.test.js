const { isPrimeFermat, modPow, greatestCommonDivisor, isPrimeMillerRabin, shanksPeriod } = require('../prime.js');


describe('isPrimeFermat', () => {
    test('returns true for primes', () => {
        expect(isPrimeFermat(2, 3)).toBeTruthy();
        expect(isPrimeFermat(12, 7873)).toBeTruthy();
        expect(isPrimeFermat(3, 113)).toBeTruthy();
    });

    test('returns false for most composites', () => {
        expect(isPrimeFermat(2, 4)).toBeFalsy()
        expect(isPrimeFermat(47, 1892039232489123)).toBeFalsy();
        expect(isPrimeFermat(42069, 525600)).toBeFalsy();
    });

    test('returns true for Carmichael numbers (Fermat false positive)', () => {
        // not all bases fool Carmichael numbers, must be a base coprime to carmichael number
        expect(isPrimeFermat(2, 561)).toBeTruthy(); 
        expect(isPrimeFermat(53, 63973)).toBeTruthy();
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

describe('isPrimeMillerRabin', () => {
    test('correctly identifies composite numbers', () => {
        expect(isPrimeMillerRabin(88)).toBeFalsy();
        expect(isPrimeMillerRabin(75300195731073)).toBeFalsy();
    });

    test('correctly identifies nonprime numbers', () => {
        expect(isPrimeMillerRabin(-534459)).toBeFalsy();
        expect(isPrimeMillerRabin(1)).toBeFalsy();
    });

    test('correctly identifies prime numbers', () => {
        expect(isPrimeMillerRabin(17)).toBeTruthy();
        expect(isPrimeMillerRabin(2)).toBeTruthy();
        expect(isPrimeMillerRabin(6911)).toBeTruthy();
        // TODO: Set limit for largest prime or be able to handle large primes
        // expect(isPrimeMillerRabin(77777780837)).toBeTruthy(); 
    });

    test('correctly identifies Carmichael numbers as composites', () => {
        expect(isPrimeMillerRabin(561)).toBeFalsy();
        expect(isPrimeMillerRabin(63973)).toBeFalsy();
        expect(isPrimeMillerRabin(101649241)).toBeFalsy();
    });
})

describe('shanksPeriod', () => {
    test('throws error for primes 2 and 5', () => {
        expect(() => shanksPeriod(2)).toThrowError(RangeError,
            "The function does not support primes 2 or 5."
        );
        expect(() => shanksPeriod(5)).toThrowError(RangeError,
            "The function does not support primes 2 or 5."
        );
    });
    
    test('gives correct period', () => {
        expect(shanksPeriod(3)).toEqual([3]);
        expect(shanksPeriod(7)).toEqual([1, 4, 2, 8, 5, 7])
        expect(shanksPeriod(109)).toEqual(
            [
                0, 0, 9, 1, 7, 4, 3, 1, 1, 9, 2, 6, 
                6, 0, 5, 5, 0, 4, 5, 8, 7, 1, 5, 5, 
                9, 6, 3, 3, 0, 2, 7, 5, 2, 2, 9, 3, 
                5, 7, 7, 9, 8, 1, 6, 5, 1, 3, 7, 6, 
                1, 4, 6, 7, 8, 8, 9, 9, 0, 8, 2, 5, 
                6, 8, 8, 0, 7, 3, 3, 9, 4, 4, 9, 5, 
                4, 1, 2, 8, 4, 4, 0, 3, 6, 6, 9, 7, 
                2, 4, 7, 7, 0, 6, 4, 2, 2, 0, 1, 8, 
                3, 4, 8, 6, 2, 3, 8, 5, 3, 2, 1, 1
            ]
        )
    })
})
