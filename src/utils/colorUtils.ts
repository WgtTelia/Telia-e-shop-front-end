export const colorMapping: { [key: string]: string } = {
  black: '#000000',
  pink: '#FFC0CB',
  yellow: '#FFFF00',
  blue: '#0000FF',
  green: '#008000',
  lavender: '#E6E6FA',
  white: '#FFFFFF',
  grey: '#808080',
};

export const mapColorToHex = (color: string): string => {
  return colorMapping[color.toLowerCase()] || '#000000';
};
