
import '@testing-library/jest-dom';
import { render } from "@testing-library/react";

import EditTransactions from './EditTransActions';
import DataContext from "../DataContext.tsx";

it("Renders the EditTransactions page", () => {
    render(<DataContext.Provider value={{
        originalData: [{
            "Posted Date": new Date('1/1/2024'),
            "Reference Number": 1,
            Payee: "Joe Blow",
            Address: "here",
            Amount: 100,
            Category: "gum",
        }],
        organizedData: {
            2024: {
                1: [{
                    "Posted Date": new Date('1/1/2024'),
                    "Reference Number": 1,
                    Payee: "Joe Blow",
                    Address: "here",
                    Amount: 100,
                    Category: "gum",
                }]
            }
        },
        dataToView: [{
            "Posted Date": new Date('1/1/2024'),
            "Reference Number": 1,
            Payee: "Joe Blow",
            Address: "here",
            Amount: 100,
            Category: "gum",
        }]
    }}><EditTransactions /></DataContext.Provider>);

    expect(true).toBeTruthy();
});