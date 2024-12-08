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

interface SetFilterAction {
    type: 'SET_FILTER';
    payload: {
        category: keyof Filter;
        selected: string[];
    };
}

interface SetClassifiersAction {
    type: 'SET_CLASSIFIERS';
    payload: ClassifiersData;
}

interface ToggleModalAction {
    type: 'TOGGLE_MODAL';
    payload: boolean;
}

interface ToggleCheckboxAction {
    type: 'TOGGLE_CHECKBOX';
    payload: {
        category: keyof Filter;
        value: string;
        checked: boolean;
    };
}
type FilterAction =
    | SetFilterAction
    | SetClassifiersAction
    | ToggleModalAction
    | ToggleCheckboxAction;

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
                    types: action.payload.productGroups || [],
                    brands: action.payload.brands || [],
                    priceRanges: action.payload.priceIntervals || [],
                    colors: action.payload.colors || [],
                    stock: action.payload.stockOptions || [],
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

    useEffect(() => {
        const { request, cancel } =
            classifiersService.getObject<ClassifiersData>();
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
