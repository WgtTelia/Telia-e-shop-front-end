'use client';
import React, { createContext, useContext, useReducer, ReactNode } from 'react';

const initialState: Filter = {
    types: [],
    brands: [],
    priceRanges: [],
    colors: [],
    stock: [],
    isModalOpen: false,
};

interface SetFilterAction {
    type: 'SET_FILTER';
    payload: {
        category: keyof Filter;
        selected: string[];
    };
}

interface SetImmediateFilterAction {
    type: 'SET_IMMEDIATE_FILTER';
    payload: {
        category: keyof Filter;
        selected: string[];
    };
}

interface ToggleModalAction {
    type: 'TOGGLE_MODAL';
    payload: boolean;
}

type FilterAction =
    | SetFilterAction
    | SetImmediateFilterAction
    | ToggleModalAction;

interface FilterContextProps {
    selectedFilters: Filter;
    handleFilterChange: (category: keyof Filter, selected: string[]) => void;
    handleImmediateChange: (category: keyof Filter, selected: string[]) => void;
    setIsModalOpen: (isOpen: boolean) => void;
    isModalOpen: boolean;
}

const FilterContext = createContext<FilterContextProps | undefined>(undefined);

const filterReducer = (state: Filter, action: FilterAction): Filter => {
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

    const handleFilterChange = (category: keyof Filter, selected: string[]) => {
        dispatch({ type: 'SET_FILTER', payload: { category, selected } });
    };

    const handleImmediateChange = (
        category: keyof Filter,
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
