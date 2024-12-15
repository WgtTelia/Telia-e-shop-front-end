'use client';
import React, {
    createContext,
    useContext,
    useReducer,
    ReactNode,
    useEffect,
} from 'react';
import classifiersService from '@/lib/services/classifiersService';
import { CanceledError } from 'axios';

const initialState: Filter = {
    types: [],
    brands: [],
    priceRanges: [],
    colors: [],
    stock: [],
    isModalOpen: false,
};

type FilterAction =
    | { type: 'SET_CLASSIFIERS'; payload: FilterOptions }
    | {
          type: 'SET_FILTER';
          payload: { category: keyof Filter; selected: string[] };
      }
    | { type: 'TOGGLE_MODAL'; payload: boolean }
    | {
          type: 'TOGGLE_CHECKBOX';
          payload: { category: keyof Filter; value: string; checked: boolean };
      };

interface FilterContextProps {
    selectedFilters: Filter;
    handleFilterChange: (category: keyof Filter, selected: string[]) => void;
    setIsModalOpen: (isOpen: boolean) => void;
    isModalOpen: boolean;
    toggleCheckbox: (
        currentValues: keyof Filter,
        value: string,
        checked: boolean
    ) => void;
}

const FilterContext = createContext<FilterContextProps | undefined>(undefined);

const filterReducer = (state: Filter, action: FilterAction): Filter => {
    switch (action.type) {
        case 'SET_CLASSIFIERS':
            return {
                ...state,
                availableOptions: {
                    productGroups: action.payload.productGroups || [],
                    brands: action.payload.brands || [],
                    priceIntervals: action.payload.priceIntervals || [],
                    colors: action.payload.colors || [],
                    stockOptions: action.payload.stockOptions || [],
                },
            };
        case 'SET_FILTER':
            return {
                ...state,
                [action.payload.category]: action.payload.selected,
            };
        case 'TOGGLE_MODAL':
            return {
                ...state,
                isModalOpen: action.payload,
            };
        case 'TOGGLE_CHECKBOX':
            const currentValues = state[action.payload.category] as string[];
            const updatedValues = action.payload.checked
                ? [...currentValues, action.payload.value]
                : currentValues.filter((v) => v !== action.payload.value);
            return {
                ...state,
                [action.payload.category]: updatedValues,
            };

        default:
            return state;
    }
};

export const FilterProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [state, dispatch] = useReducer(filterReducer, initialState);

    // query string = filter ; Cashing policy  - server component only; search params could be shared between component , by using params, instead.

    // instead of having state in a useEffect, we use the useQuery hook from react-query for better performance and state management.

    // use query params to show filters and fetch  and get results, and setTimeout for displaying results. (no more then half a second delay);

    //sort could be implemented after filters;

    useEffect(() => {
        const { request, cancel } =
            classifiersService.getObject<FilterOptions>();
        request
            .then((response) => {
                dispatch({ type: 'SET_CLASSIFIERS', payload: response.data });
            })
            .catch((error) => {
                if (error instanceof CanceledError) return;
                console.error('Error fetching classifiers:', error);
            });
        return () => cancel();
    }, []);

    const handleFilterChange = (category: keyof Filter, selected: string[]) => {
        dispatch({ type: 'SET_FILTER', payload: { category, selected } });
    };

    const setIsModalOpen = (isOpen: boolean) => {
        dispatch({ type: 'TOGGLE_MODAL', payload: isOpen });
    };

    const toggleCheckbox = (
        category: keyof Filter,
        value: string,
        checked: boolean
    ) => {
        dispatch({
            type: 'TOGGLE_CHECKBOX',
            payload: { category, value, checked },
        });
    };

    return (
        <FilterContext.Provider
            value={{
                selectedFilters: state,
                handleFilterChange,
                setIsModalOpen,
                isModalOpen: state.isModalOpen,
                toggleCheckbox,
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
