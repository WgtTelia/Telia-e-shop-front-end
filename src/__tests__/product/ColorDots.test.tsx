import { ColorDots } from '@/components/product/ColorDots';
import { render, screen, fireEvent } from '@testing-library/react';

jest.mock('@/lib/utils/colorUtils', () => ({
    mapColorToHex: jest.fn((color) => {
        if (color === 'red') return '#FF0000';
        if (color === 'green') return '#00FF00';
        if (color === 'blue') return '#0000FF';
    }),
}));

const mockProps = {
    availableColors: [
        { color: 'red', index: 0 },
        { color: 'green', index: 1 },
        { color: 'blue', index: 2 },
    ],
    onColorSelect: jest.fn(),
};

describe('ColorDots', () => {
    it('renders a dot for each available color', () => {
        render(<ColorDots {...mockProps} />);

        const redDot = screen.getByTitle(/red/i);
        const greenDot = screen.getByTitle(/green/i);
        const blueDot = screen.getByTitle(/blue/i);

        expect(redDot).toBeInTheDocument();
        expect(greenDot).toBeInTheDocument();
        expect(blueDot).toBeInTheDocument();
    });

    it('calls the onColorSelect function with the selected color when a dot is clicked', () => {
        render(<ColorDots {...mockProps} />);

        const greenDot = screen.getByTitle(/green/i);
        fireEvent.click(greenDot);

        expect(mockProps.onColorSelect).toHaveBeenCalledWith(1);
    });

    it('sets the background color of each dot based on the color mapping', () => {
        render(<ColorDots {...mockProps} />);

        const redDot = screen.getByTitle(/red/i);
        const greenDot = screen.getByTitle(/green/i);
        const blueDot = screen.getByTitle(/blue/i);

        expect(redDot).toHaveStyle({ backgroundColor: '#FF0000' });
        expect(greenDot).toHaveStyle({ backgroundColor: '#00FF00' });
        expect(blueDot).toHaveStyle({ backgroundColor: '#0000FF' });
    });
});
