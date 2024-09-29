import { CheckboxGroup } from './CheckboxGroup';

interface FilterCheckboxGroupProps {
    form: any;
    filterSections: {
        name: string;
        title: string;
        options: string[];
    }[];
    handleFilterChange: (category: string, selected: string[]) => void;
    onImmediateChange?: (category: string, selected: string[]) => void;
}

export const FilterCheckboxGroup: React.FC<FilterCheckboxGroupProps> = ({
    form,
    filterSections,
    handleFilterChange,
    onImmediateChange,
}) => {
    const handleCheckboxChange = (name: string, selected: string[]) => {
        handleFilterChange(name, selected);
        if (onImmediateChange) {
            onImmediateChange(name, selected);
        }
    };

    return (
        <>
            {filterSections.map((section) => (
                <CheckboxGroup
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
            ))}
        </>
    );
};
