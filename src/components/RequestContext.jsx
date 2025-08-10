import React, { createContext, useContext, useState } from 'react';

// Create the context
const RequestContext = createContext();

// Create a provider component
export const RequestProvider = ({ children }) => {
    const [request, setRequest] = useState([]);

    return (
        <RequestContext.Provider value={{ request, setRequest }}>
            {children}
        </RequestContext.Provider>
    );
};

// Create a custom hook for accessing Request context
export const useRequest = () => useContext(RequestContext);