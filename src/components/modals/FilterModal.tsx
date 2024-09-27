'use client';
import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from '../ui/dialog';
import { Button } from '@/components/ui/button';
import { PiSlidersHorizontalBold } from 'react-icons/pi';
import { useFilter } from '@/context/FilterContext';
import { Checkbox } from '@/components/ui/checkbox';

export const FilterModal = () => {
    const {
        isModalOpen,
        setIsModalOpen,
        selectedTypes,
        setSelectedTypes,
        selectedBrands,
        setSelectedBrands,
        selectedPriceRanges,
        setSelectedPriceRanges,
        selectedColors,
        setSelectedColors,
        selectedStock,
        setSelectedStock,
    } = useFilter();

    const filterOptions = {
        types: ['Mobile phones', 'Accessories'] as Type[],
        brands: ['Samsung', 'Xiaomi', 'Apple', 'OnePlus', 'Sony'] as Brand[],
        priceRanges: [
            '0 - 100 €/month',
            '100 - 500 €/month',
            '500 - 1000 €/month',
            '1000 - 1500 €/month',
            '1500 - 2000 €/month',
        ] as PriceRange[],
        colors: ['Black', 'Yellow', 'Blue', 'Pink', 'Silver'] as Color[],
        stock: ['In stock', 'Out of stock'] as Stock[],
    };

    const handleCheckboxChange = (
        value: string,
        checked: boolean,
        setter: (values: any[]) => void,
        currentValues: any[]
    ) => {
        if (checked) {
            setter([...currentValues, value]);
        } else {
            setter(currentValues.filter((v) => v !== value));
        }
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
                <Button
                    variant='filter'
                    icon={<PiSlidersHorizontalBold />}
                    iconPosition='left'
                    aria-label='Filter'
                >
                    Filter by
                </Button>
            </DialogTrigger>
            <DialogContent className='overflow-y-auto sm:max-h-[85vh]'>
                <DialogTitle>Filter By</DialogTitle>
                <DialogDescription>
                    <div>
                        <h3 className='font-semibold text-black'>Type</h3>
                        {filterOptions.types.map((type) => (
                            <div key={type}>
                                <Checkbox
                                    checked={selectedTypes.includes(type)}
                                    onChange={(e) =>
                                        handleCheckboxChange(
                                            type,
                                            e.target.checked,
                                            setSelectedTypes,
                                            selectedTypes
                                        )
                                    }
                                >
                                    {type}
                                </Checkbox>
                            </div>
                        ))}
                    </div>
                    <div>
                        <h3 className='font-semibold text-black'>Brand</h3>
                        {filterOptions.brands.map((brand) => (
                            <div key={brand}>
                                <Checkbox
                                    checked={selectedBrands.includes(brand)}
                                    onChange={(e) =>
                                        handleCheckboxChange(
                                            brand,
                                            e.target.checked,
                                            setSelectedBrands,
                                            selectedBrands
                                        )
                                    }
                                >
                                    {brand}
                                </Checkbox>
                            </div>
                        ))}
                    </div>
                    <div>
                        <h3 className='font-semibold text-black'>Price</h3>
                        {filterOptions.priceRanges.map((priceRange) => (
                            <div key={priceRange}>
                                <Checkbox
                                    checked={selectedPriceRanges.includes(
                                        priceRange
                                    )}
                                    onChange={(e) =>
                                        handleCheckboxChange(
                                            priceRange,
                                            e.target.checked,
                                            setSelectedPriceRanges,
                                            selectedPriceRanges
                                        )
                                    }
                                >
                                    {priceRange}
                                </Checkbox>
                            </div>
                        ))}
                    </div>
                    <div>
                        <h3 className='font-semibold text-black'>Color</h3>
                        {filterOptions.colors.map((color) => (
                            <div key={color}>
                                <Checkbox
                                    checked={selectedColors.includes(color)}
                                    onChange={(e) =>
                                        handleCheckboxChange(
                                            color,
                                            e.target.checked,
                                            setSelectedColors,
                                            selectedColors
                                        )
                                    }
                                >
                                    {color}
                                </Checkbox>
                            </div>
                        ))}
                    </div>
                    <div>
                        <h3 className='font-semibold text-black'>Stock</h3>
                        {filterOptions.stock.map((stock) => (
                            <div key={stock}>
                                <Checkbox
                                    checked={selectedStock.includes(stock)}
                                    onChange={(e) =>
                                        handleCheckboxChange(
                                            stock,
                                            e.target.checked,
                                            setSelectedStock,
                                            selectedStock
                                        )
                                    }
                                >
                                    {stock}
                                </Checkbox>
                            </div>
                        ))}
                    </div>
                </DialogDescription>
            </DialogContent>
        </Dialog>
    );
};
