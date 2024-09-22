import { Picker } from '@/components/filters/Picker'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const mockOptions = ['Option 1', 'Option 2', 'Option 3']
const mockOnChange = jest.fn()

describe('Picker Component', () => {
  it('renders all options', () => {
    render(
      <Picker
        options={mockOptions}
        selectedOption='Option 1'
        onChange={mockOnChange}
      />
    )

    mockOptions.forEach((option) => {
      expect(screen.getByText(option)).toBeInTheDocument()
    })
  })

  it('applies correct styles for selected option', () => {
    render(
      <Picker
        options={mockOptions}
        selectedOption='Option 2'
        onChange={mockOnChange}
      />
    )

    const selectedOption = screen.getByText('Option 2')
    expect(selectedOption).toHaveClass('bg-gray-600 text-white')

    const nonSelectedOption = screen.getByText('Option 1')
    expect(nonSelectedOption).toHaveClass('text-gray-550')
  })

  it('scrolls to the correct position when an option is clicked', async () => {
    const scrollToMock = jest.fn()
    window.HTMLElement.prototype.scrollTo = scrollToMock

    render(
      <Picker
        options={mockOptions}
        selectedOption='Option 1'
        onChange={mockOnChange}
      />
    )

    const optionToClick = screen.getByText('Option 3')
    await userEvent.click(optionToClick)

    expect(scrollToMock).toHaveBeenCalledWith({ top: 48, behavior: 'smooth' })
  })
  it('calls onChange and scrolls to the selected option on click', async () => {
    render(
      <Picker
        options={mockOptions}
        selectedOption='Option 1'
        onChange={mockOnChange}
      />
    )

    const optionToClick = screen.getByText('Option 3')
    await userEvent.click(optionToClick)

    expect(mockOnChange).toHaveBeenCalledWith('Option 3')
  })
})
