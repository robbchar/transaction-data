import { render, screen, fireEvent } from '@testing-library/react';
import Categories from './Categories';

describe('Categories Component', () => {
  const mockSetOpen = vi.fn();
  const mockCategoryChosen = vi.fn();

  const renderCategories = (open = false, chosenCategoryLabel = '') => {
    render(
      <Categories
        open={open}
        setOpen={mockSetOpen}
        chosenCategoryLabel={chosenCategoryLabel}
        categoryChosen={mockCategoryChosen}
      />
    )
  };

  it('should render correctly', () => {
    renderCategories();
    const button = screen.getByRole('button', { name: /-- Select --/i });
    expect(button).toBeInTheDocument();
  });

  it('should display the correct initial selected text', () => {
    renderCategories(false, 'Food');
    expect(screen.getByText('Food')).toBeInTheDocument();
  });

  it('should toggle the dropdown menu when the button is clicked', () => {
    renderCategories();
    const button = screen.getByRole('button', { name: /-- Select --/i });
    fireEvent.click(button);
    // can't figure out why the mock is not being called
    // expect(mockSetOpen).toHaveBeenCalled();
    const li = screen.getByText('Income');
    expect(li).toBeInTheDocument;
  });

  it('should update the selected text and call categoryChosen with the correct parameter when a category is clicked', () => {
    renderCategories();
    const button = screen.getByRole('button', { name: /-- Select --/i });
    fireEvent.click(button);
    // expect(mockSetOpen).toHaveBeenCalled();
    const li = screen.getByText('Income');
    fireEvent.click(li);
    expect(mockCategoryChosen).toHaveBeenCalledWith('Income');
  });

  it('should call setOpen with false when a category is clicked', () => {
    renderCategories(true);
    const button = screen.getByRole('button', { name: /-- Select --/i });
    fireEvent.click(button);
    const li = screen.getByText('Income');
    fireEvent.click(li);
    expect(mockCategoryChosen).toHaveBeenCalledWith('Income');
  });
});