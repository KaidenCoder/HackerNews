import { createContext, useState,  useContext} from "react";

const TabContext = createContext();

export const TabProvider = ({children}) => {
    const [tab, setTab] = useState('news')
    const [articleData, setArticleData] = useState({
        data: {},
        isArticle : false,
        value: 'news'
    })

    return (
        <TabContext.Provider value={{
            tab, setTab,
            articleData, setArticleData}}>
            {children}
        </TabContext.Provider>
    )
}

export const useTab = () => useContext(TabContext)