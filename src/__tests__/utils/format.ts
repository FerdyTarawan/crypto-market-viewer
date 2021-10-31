import { abbreviateNumber } from 'utils/format';

describe(abbreviateNumber, () => {
  it('should return correct result', () => {
    expect(abbreviateNumber(100)).toBe('100');
    expect(abbreviateNumber('50')).toBe('50');
    expect(abbreviateNumber(1000)).toBe('1.00K');
    expect(abbreviateNumber(1899.71234)).toBe('1.90K');
    expect(abbreviateNumber(1_550_000)).toBe('1.55M');
    expect(abbreviateNumber(1_000_000_000)).toBe('1.00B');
    expect(abbreviateNumber(1_000_000_000_000)).toBe('1.00T');
  });
});
