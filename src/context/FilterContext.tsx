'use client';
import React, {
    createContext,
    useContext,
    useReducer,
    Dispatch,
    ReactNode,
} from 'react';

export interface FilterState {
    types: string[];
    brands: string[];
    priceRanges: string[];
    colors: string[];
    stock: string[];
    isModalOpen: boolean;
}

const initialState: FilterState = {
    types: [],
    brands: [],
    priceRanges: [],
    colors: [],
    stock: [],
    isModalOpen: false,
};

interface FilterContextProps {
    selectedFilters: FilterState;
    handleFilterChange: (
        category: keyof FilterState,
        selected: string[]
    ) => void;
    handleImmediateChange: (
        category: keyof FilterState,
        selected: string[]
    ) => void;
    setIsModalOpen: (isOpen: boolean) => void;
    isModalOpen: boolean;
}

const FilterContext = createContext<FilterContextProps | undefined>(undefined);

const filterReducer = (
    state: FilterState,
    action: { type: string; payload?: any }
): FilterState => {
    switch (action.type) {
        case 'SET_FILTER':
        case 'SET_IMMEDIATE_FILTER':
            return {
                ...state,
                [action.payload.category]: action.payload.selected,
            };
        case 'TOGGLE_MODAL':
            return { ...state, isModalOpen: action.payload };
        default:
            return state;
    }
};

export const FilterProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [state, dispatch] = useReducer(filterReducer, initialState);

    const handleFilterChange = (
        category: keyof FilterState,
        selected: string[]
    ) => {
        dispatch({ type: 'SET_FILTER', payload: { category, selected } });
    };

    const handleImmediateChange = (
        category: keyof FilterState,
        selected: string[]
    ) => {
        dispatch({
            type: 'SET_IMMEDIATE_FILTER',
            payload: { category, selected },
        });
        // Fetch data here for larger screens
    };

    const setIsModalOpen = (isOpen: boolean) => {
        dispatch({ type: 'TOGGLE_MODAL', payload: isOpen });
    };

    return (
        <FilterContext.Provider
            value={{
                selectedFilters: state,
                handleFilterChange,
                handleImmediateChange,
                setIsModalOpen,
                isModalOpen: state.isModalOpen,
            }}
        >
            {children}
        </FilterContext.Provider>
    );
};

export const useFilter = (): FilterContextProps => {
    const context = useContext(FilterContext);
    if (!context) {
        throw new Error('useFilter must be used within a FilterProvider');
    }
    return context;
};
