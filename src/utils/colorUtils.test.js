import { mapColorToHex } from './colorUtils';

describe('mapColorToHex', () => {
  it('returns the hex code for a valid color', () => {
    expect(mapColorToHex('black')).toBe('#232222');
    expect(mapColorToHex('PINK')).toBe('#FFC0CB');
    expect(mapColorToHex('Yellow')).toBe('#FFEA7A');
  });

  it('returns the default hex code for an invalid color', () => {
    expect(mapColorToHex('purple')).toBe('#000000');
    expect(mapColorToHex('')).toBe('#000000');
    expect(mapColorToHex('unknown')).toBe('#000000');
  });
});
