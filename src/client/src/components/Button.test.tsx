import { fireEvent, render, screen } from '@testing-library/react';
import Button from './Button';

describe('Button component', () => {
  const mockOnClick = vi.fn();

  const renderButton = () => {
    render(
      <Button onClick={mockOnClick} value="testValue" label="Test Label" />,
    );
  };

  it('renders correctly', () => {
    renderButton();
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('calls onClick with correct parameters when clicked', () => {
    renderButton();
    const button = screen.getByText('Test Label');
    fireEvent.click(button);
    expect(mockOnClick).toHaveBeenCalledWith(true, 'testValue');
  });

  it('toggles isDisabled state correctly when clicked', () => {
    renderButton();
    const button = screen.getByText('Test Label');
    expect(button).toHaveAttribute('data-isdisabled', 'false');
    fireEvent.click(button);
    expect(button).toHaveAttribute('data-isdisabled', 'true');
    fireEvent.click(button);
    expect(button).toHaveAttribute('data-isdisabled', 'false');
  });

  it('applies correct styles based on isDisabled state', () => {
    renderButton();
    const button = screen.getByText('Test Label');
    expect(button).toHaveStyle('color: #24292E');
    fireEvent.click(button);
    expect(button).toHaveStyle('color: #959DA5');
  });
});
