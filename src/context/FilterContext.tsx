'use client';
import React, {
    createContext,
    ReactNode,
    useContext,
    useReducer,
    Dispatch,
} from 'react';

//TODO: add a sort function for the fetch data

interface FilterState {
    selectedTypes: Type[];
    selectedBrands: Brand[];
    selectedPriceRanges: PriceRange[];
    selectedColors: Color[];
    selectedStock: Stock[];
    isModalOpen: boolean;
}

type FilterAction =
    | { type: 'SET_SELECTED_TYPES'; payload: Type[] }
    | { type: 'SET_SELECTED_BRANDS'; payload: Brand[] }
    | { type: 'SET_SELECTED_PRICE_RANGES'; payload: PriceRange[] }
    | { type: 'SET_SELECTED_COLORS'; payload: Color[] }
    | { type: 'SET_SELECTED_STOCK'; payload: Stock[] }
    | { type: 'SET_MODAL_OPEN'; payload: boolean };

const SET_SELECTED_TYPES = 'SET_SELECTED_TYPES';
const SET_SELECTED_BRANDS = 'SET_SELECTED_BRANDS';
const SET_SELECTED_PRICE_RANGES = 'SET_SELECTED_PRICE_RANGES';
const SET_SELECTED_COLORS = 'SET_SELECTED_COLORS';
const SET_SELECTED_STOCK = 'SET_SELECTED_STOCK';
const SET_MODAL_OPEN = 'SET_MODAL_OPEN';

const setSelectedTypes = (types: Type[]): FilterAction => ({
    type: SET_SELECTED_TYPES,
    payload: types,
});

const setSelectedBrands = (brands: Brand[]): FilterAction => ({
    type: SET_SELECTED_BRANDS,
    payload: brands,
});

const setSelectedPriceRanges = (priceRanges: PriceRange[]): FilterAction => ({
    type: SET_SELECTED_PRICE_RANGES,
    payload: priceRanges,
});

const setSelectedColors = (colors: Color[]): FilterAction => ({
    type: SET_SELECTED_COLORS,
    payload: colors,
});

const setSelectedStock = (stock: Stock[]): FilterAction => ({
    type: SET_SELECTED_STOCK,
    payload: stock,
});

const setIsModalOpen = (open: boolean): FilterAction => ({
    type: SET_MODAL_OPEN,
    payload: open,
});

interface FilterContextProps {
    state: FilterState;
    dispatch: Dispatch<FilterAction>;
}

export const initialFilterState: FilterState = {
    selectedTypes: [],
    selectedBrands: [],
    selectedPriceRanges: [],
    selectedColors: [],
    selectedStock: [],
    isModalOpen: false,
};

export const FilterContext = createContext<FilterContextProps | undefined>(
    undefined
);

function filterReducer(state: FilterState, action: FilterAction): FilterState {
    switch (action.type) {
        case SET_SELECTED_TYPES:
            return { ...state, selectedTypes: action.payload };
        case SET_SELECTED_BRANDS:
            return { ...state, selectedBrands: action.payload };
        case SET_SELECTED_PRICE_RANGES:
            return { ...state, selectedPriceRanges: action.payload };
        case SET_SELECTED_COLORS:
            return { ...state, selectedColors: action.payload };
        case SET_SELECTED_STOCK:
            return { ...state, selectedStock: action.payload };
        case SET_MODAL_OPEN:
            return { ...state, isModalOpen: action.payload };
        default:
            return state;
    }
}

export const FilterProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [state, dispatch] = useReducer(filterReducer, initialFilterState);

    return (
        <FilterContext.Provider value={{ state, dispatch }}>
            {children}
        </FilterContext.Provider>
    );
};

export const useFilter = () => {
    const context = useContext(FilterContext);
    if (!context) {
        throw new Error('useFilter must be used within a FilterProvider');
    }
    return {
        ...context.state,
        setSelectedTypes: (types: Type[]) =>
            context.dispatch(setSelectedTypes(types)),
        setSelectedBrands: (brands: Brand[]) =>
            context.dispatch(setSelectedBrands(brands)),
        setSelectedPriceRanges: (priceRanges: PriceRange[]) =>
            context.dispatch(setSelectedPriceRanges(priceRanges)),
        setSelectedColors: (colors: Color[]) =>
            context.dispatch(setSelectedColors(colors)),
        setSelectedStock: (stock: Stock[]) =>
            context.dispatch(setSelectedStock(stock)),
        setIsModalOpen: (open: boolean) =>
            context.dispatch(setIsModalOpen(open)),
    };
};
