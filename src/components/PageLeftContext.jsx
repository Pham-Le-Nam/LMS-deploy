import React, { createContext, useContext, useState } from 'react';

const PageLeftContext = createContext();

// Create a provider component
export const PageLeftProvider = ({ children }) => {
    const [pageLeft, setPageLeft] = useState(100);

    return (
        <PageLeftContext.Provider value={{ pageLeft, setPageLeft }}>
            {children}
        </PageLeftContext.Provider>
    );
};

// Create a custom hook for accessing user context
export const usePageLeft = () => useContext(PageLeftContext);