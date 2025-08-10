import React, { createContext, useContext, useState } from 'react';

const PageContext = createContext();

// Create a provider component
export const PageProvider = ({ children }) => {
    const [page, setPage] = useState(0);

    return (
        <PageContext.Provider value={{ page, setPage }}>
            {children}
        </PageContext.Provider>
    );
};

// Create a custom hook for accessing user context
export const usePage = () => useContext(PageContext);