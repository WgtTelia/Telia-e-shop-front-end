'use client';
import React, {
    createContext,
    ReactNode,
    useContext,
    useReducer,
    Dispatch,
} from 'react';

//TODO: add a sort function for the fetch data

type SortOption =
    | 'Most popular'
    | 'Price: lowest to highest'
    | 'Price: highest to lowest';

interface SortState {
    sortOption: SortOption;
    isSheetOpen: boolean;
    isDropDownOpen: boolean;
}

type SortAction =
    | { type: 'SET_SORT_OPTION'; payload: SortOption }
    | { type: 'SET_SHEET_OPEN'; payload: boolean }
    | { type: 'SET_DROPDOWN_OPEN'; payload: boolean };

const SET_SORT_OPTION = 'SET_SORT_OPTION';
const SET_SHEET_OPEN = 'SET_SHEET_OPEN';
const SET_DROPDOWN_OPEN = 'SET_DROPDOWN_OPEN';

const setSortOption = (option: SortOption): SortAction => ({
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
    sortOption: 'Most popular',
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
        setSortOption: (option: SortOption) =>
            context.dispatch(setSortOption(option)),

        setIsSheetOpen: (open: boolean) =>
            context.dispatch(setIsSheetOpen(open)),

        setIsDropDownOpen: (open: boolean) =>
            context.dispatch(setIsDropDownOpen(open)),
    };
};
