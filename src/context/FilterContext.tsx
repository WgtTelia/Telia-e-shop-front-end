'use client';
import React, {
    createContext,
    useContext,
    useReducer,
    ReactNode,
    useEffect,
} from 'react';
import { useFilterQuery } from '@/lib/hooks/useFilterQuery';
import { useUrlSync } from '@/lib/hooks/useUrlSync';

const initialState: Filter = {
    productGroups: [],
    brands: [],
    priceIntervals: [],
    colors: [],
    stockOptions: [],
    isModalOpen: false,
    isLoading: true,
};

interface FilterContextProps {
    selectedFilters: Filter;
    handleFilterChange: (category: keyof Filter, selected: string[]) => void;
    setIsModalOpen: (isOpen: boolean) => void;
    isModalOpen: boolean;
    toggleCheckbox: (
        category: keyof Filter,
        value: string,
        checked: boolean
    ) => void;
    isLoading: boolean;
    filterCount: number;
}

const FilterContext = createContext<FilterContextProps | undefined>(undefined);

type FilterCategoryAction = {
    type: 'SET_FILTER';
    payload: { category: keyof Filter; selected: string[] };
};

type ToggleModalAction = {
    type: 'TOGGLE_MODAL';
    payload: boolean;
};

type ToggleCheckboxAction = {
    type: 'TOGGLE_CHECKBOX';
    payload: { category: keyof Filter; value: string; checked: boolean };
};

type FilterAction =
    | FilterCategoryAction
    | ToggleModalAction
    | ToggleCheckboxAction;

const filterCategoryReducer = (
    state: Filter,
    action: FilterCategoryAction
): Filter => {
    return {
        ...state,
        [action.payload.category]: action.payload.selected,
    };
};

const modalReducer = (state: Filter, action: ToggleModalAction): Filter => {
    return {
        ...state,
        isModalOpen: action.payload,
    };
};

const checkboxReducer = (
    state: Filter,
    action: ToggleCheckboxAction
): Filter => {
    const currentValues = (state[action.payload.category] as string[]) || [];
    const updatedValues = action.payload.checked
        ? [...currentValues, action.payload.value]
        : currentValues.filter((v) => v !== action.payload.value);
    return {
        ...state,
        [action.payload.category]: updatedValues,
    };
};

const filterReducer = (state: Filter, action: FilterAction): Filter => {
    switch (action.type) {
        case 'SET_FILTER':
            return filterCategoryReducer(state, action);
        case 'TOGGLE_MODAL':
            return modalReducer(state, action);
        case 'TOGGLE_CHECKBOX':
            return checkboxReducer(state, action);
        default:
            return state;
    }
};
export const FilterProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [state, dispatch] = useReducer(filterReducer, initialState);
    const { data: classifiers, isLoading } = useFilterQuery();
    const { updateUrl, getInitialFilters } = useUrlSync();

    useEffect(() => {
        const initialFilters = getInitialFilters();
        Object.entries(initialFilters).forEach(([category, selected]) => {
            if (selected && Array.isArray(selected)) {
                dispatch({
                    type: 'SET_FILTER',
                    payload: {
                        category: category as keyof Filter,
                        selected,
                    },
                });
            }
        });
    }, [getInitialFilters]);

    useEffect(() => {
        const filterState = {
            productGroups: state.productGroups,
            brands: state.brands,
            priceIntervals: state.priceIntervals,
            colors: state.colors,
            stockOptions: state.stockOptions,
        };
        updateUrl(filterState);
    }, [
        state.productGroups,
        state.brands,
        state.priceIntervals,
        state.colors,
        state.stockOptions,
        updateUrl,
    ]);

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

    const filterCount = Object.values({
        productGroups: state.productGroups,
        brands: state.brands,
        priceIntervals: state.priceIntervals,
        colors: state.colors,
        stockOptions: state.stockOptions,
    }).reduce(
        (total, filterGroup) =>
            total + (Array.isArray(filterGroup) ? filterGroup.length : 0),
        0
    );

    return (
        <FilterContext.Provider
            value={{
                selectedFilters: {
                    ...state,
                    availableOptions:
                        classifiers && typeof classifiers === 'object'
                            ? classifiers
                            : undefined,
                },
                handleFilterChange,
                setIsModalOpen,
                isModalOpen: state.isModalOpen,
                toggleCheckbox,
                isLoading,
                filterCount,
            }}
        >
            {children}
        </FilterContext.Provider>
    );
};

export const useFilter = () => {
    const context = useContext(FilterContext);
    if (!context) {
        throw new Error('useFilter must be used within a FilterProvider');
    }
    return context;
};
