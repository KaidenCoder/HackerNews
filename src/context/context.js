import { createContext, useState,  useContext} from "react";

const TabContext = createContext();

export const TabProvider = ({children}) => {
    const [tab, setTab] = useState('news')

    return (
        <TabContext.Provider value={{
            tab, setTab}}>
            {children}
        </TabContext.Provider>
    )
}

export const useTab = () => useContext(TabContext)