import React, { createContext, useContext, useState } from 'react';

// Create the context
const PaymentsContext = createContext();

// Create a provider component
export const PaymentsProvider = ({ children }) => {
    const [payments, setPayments] = useState([]);

    return (
        <PaymentsContext.Provider value={{ payments, setPayments }}>
            {children}
        </PaymentsContext.Provider>
    );
};

// Create a custom hook for accessing Payments context
export const usePayments = () => useContext(PaymentsContext);