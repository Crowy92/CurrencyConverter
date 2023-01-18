import { displayConversion } from "../logic";

test('returns null if non integer is passed for amount', () => {
    expect(displayConversion('hi','hi', 'hi', 'hi')).toBe(null)
    expect(displayConversion(2,'hi', 3, 'hi')).toBeFalsy()
})
test('returns a string if two numbers are passed and two strings', () => {
    expect(displayConversion(2,2, 'hi', 'hi')).toBeTruthy()
    expect(displayConversion(2,2, 'hi', 'hi')).toBe("2 hi is equivalent to 4 hi")
})
test('the resulting string contains the two numbers multiplied together', () => {
    expect(displayConversion(2,2, 'hi', 'hi')).toContain('4')
    expect(displayConversion(32,2, 'hi', 'hi')).toContain('64')
    expect(displayConversion(2,2.2, 'hi', 'hi')).toContain('4.4')
})