import React, { createContext, useContext, useState } from 'react';

// Create the context
const HistoriesContext = createContext();

// Create a provider component
export const HistoriesProvider = ({ children }) => {
    const [histories, setHistories] = useState([]);

    return (
        <HistoriesContext.Provider value={{ histories, setHistories }}>
            {children}
        </HistoriesContext.Provider>
    );
};

// Create a custom hook for accessing user context
export const useHistories = () => useContext(HistoriesContext);