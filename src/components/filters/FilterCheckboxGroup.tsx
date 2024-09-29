import { FilterState } from '@/context/FilterContext';
import { CheckboxForm } from '@/components/filters/CheckboxForm';
import { CheckBoxLargeScrn } from '@/components/filters/CheckBoxLargeScrn';

interface FilterCheckboxGroupProps {
    form: any;
    filterSections: {
        name: keyof FilterState;
        title: string;
        options: string[];
    }[];
    handleFilterChange?: (
        category: keyof FilterState,
        selected: string[]
    ) => void;
    onImmediateChange?: (
        category: keyof FilterState,
        selected: string[]
    ) => void;
}

export const FilterCheckboxGroup: React.FC<FilterCheckboxGroupProps> = ({
    form,
    filterSections,
    handleFilterChange,
    onImmediateChange,
}) => {
    const handleCheckboxChange = (
        name: keyof FilterState,
        selected: string[]
    ) => {
        handleFilterChange?.(name, selected);
        onImmediateChange?.(name, selected);
    };

    return (
        <>
            {filterSections.map((section) =>
                form ? (
                    <CheckboxForm
                        key={section.name}
                        form={form}
                        name={section.name}
                        title={section.title}
                        options={section.options}
                        onChange={() =>
                            handleCheckboxChange(
                                section.name,
                                form.getValues()[section.name]
                            )
                        }
                    />
                ) : (
                    <CheckBoxLargeScrn
                        key={section.name}
                        name={section.name}
                        title={section.title}
                        options={section.options}
                    />
                )
            )}
        </>
    );
};
