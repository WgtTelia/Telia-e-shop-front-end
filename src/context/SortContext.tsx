'use client';
import { useUrlSync } from '@/lib/hooks/useUrlSync';
import React, {
    createContext,
    ReactNode,
    useContext,
    useReducer,
    Dispatch,
    useEffect,
} from 'react';

export const SORT_OPTIONS: SortOptionType[] = [
    { label: 'Most popular', value: 'POPULAR_DESC' },
    { label: 'Price: lowest to highest', value: 'PRICE_ASC' },
    { label: 'Price: highest to lowest', value: 'PRICE_DESC' },
];

interface SortState {
    sortOption: SortOptionValueType;
    isSheetOpen: boolean;
    isDropDownOpen: boolean;
}

type SortAction =
    | { type: 'SET_SORT_OPTION'; payload: SortOptionValueType }
    | { type: 'SET_SHEET_OPEN'; payload: boolean }
    | { type: 'SET_DROPDOWN_OPEN'; payload: boolean };

const SET_SORT_OPTION = 'SET_SORT_OPTION';
const SET_SHEET_OPEN = 'SET_SHEET_OPEN';
const SET_DROPDOWN_OPEN = 'SET_DROPDOWN_OPEN';

const setSortOption = (option: SortOptionValueType): SortAction => ({
    type: SET_SORT_OPTION,
    payload: option,
});

const setIsSheetOpen = (open: boolean): SortAction => ({
    type: SET_SHEET_OPEN,
    payload: open,
});

const setIsDropDownOpen = (open: boolean): SortAction => ({
    type: SET_DROPDOWN_OPEN,
    payload: open,
});

interface SortContextProps {
    state: SortState;
    dispatch: Dispatch<SortAction>;
}

export const initialState: SortState = {
    sortOption: SORT_OPTIONS[0].value,
    isDropDownOpen: false,
    isSheetOpen: false,
};

const SortContext = createContext<SortContextProps | undefined>(undefined);

function sortReducer(state: SortState, action: SortAction): SortState {
    switch (action.type) {
        case 'SET_SORT_OPTION':
            return { ...state, sortOption: action.payload };
        case 'SET_SHEET_OPEN':
            return { ...state, isSheetOpen: action.payload };
        case SET_DROPDOWN_OPEN:
            return { ...state, isDropDownOpen: action.payload };
        default:
            return state;
    }
}

export const SortProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [state, dispatch] = useReducer(sortReducer, initialState);
    const { updateUrl, getInitialFilters } = useUrlSync();

    useEffect(() => {
        const initialFiltersAndSort = getInitialFilters();
        if (initialFiltersAndSort.sort) {
            dispatch({
                type: 'SET_SORT_OPTION',
                payload: initialFiltersAndSort.sort,
            });
        }
    }, [getInitialFilters]);

    useEffect(() => {
        updateUrl({ sort: state.sortOption });
    }, [state.sortOption, updateUrl]);

    return (
        <SortContext.Provider value={{ state, dispatch }}>
            {children}
        </SortContext.Provider>
    );
};

export const useSort = () => {
    const context = useContext(SortContext);
    if (!context) {
        throw new Error('useSort must be used within a SortProvider');
    }
    return {
        ...context.state,
        setSortOption: (option: SortOptionValueType) =>
            context.dispatch(setSortOption(option)),

        setIsSheetOpen: (open: boolean) =>
            context.dispatch(setIsSheetOpen(open)),

        setIsDropDownOpen: (open: boolean) =>
            context.dispatch(setIsDropDownOpen(open)),
    };
};
