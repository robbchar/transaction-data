
import '@testing-library/jest-dom';
import { render } from "@testing-library/react";
import App from "./App";
import { MemoryRouter } from 'react-router-dom'

it('demo', () => {
    expect(true).toBe(true);
});

it("Renders the main page", () => {
    render(<App />, { wrapper: MemoryRouter });
    expect(true).toBeTruthy();
});