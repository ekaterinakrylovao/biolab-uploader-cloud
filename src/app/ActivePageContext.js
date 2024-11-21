import { createContext, useContext, useState } from 'react';

const ActivePageContext = createContext();

export const useActivePage = () => useContext(ActivePageContext);

export const ActivePageProvider = ({ children }) => {
    const [activePage, setActivePage] = useState('');

    return (
        <ActivePageContext.Provider value={{ activePage, setActivePage }}>
            {children}
        </ActivePageContext.Provider>
    );
};
