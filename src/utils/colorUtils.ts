export const colorMapping: { [key: string]: string } = {
  black: '#232222',
  pink: '#FFC0CB',
  yellow: '#FFEA7A',
  blue: '#4682B4',
  green: '#87A96B',
  lavender: '#B9B9FB',
  white: '#FAFAFA',
  grey: '#808080',
};

export const mapColorToHex = (color: string): string => {
  return colorMapping[color.toLowerCase()] || '#000000';
};
