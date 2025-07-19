import {useEffect, useState} from 'react'
import { feedURLs } from '../constants/urls'
import { useTab } from '../context/context'

export default function useApiHook(){
    const [newsMap, setNewsMap] = useState({})
    const [newsId, setNewsId] = useState([])
    const [loading, setLoading] = useState(true)
    const [count, setCount] = useState({
        start: 0,
        end: 10
    })
    const {tab} = useTab()

    useEffect(() => {
        async function fetchNewsId(){
            const response = await fetch(feedURLs[tab])
            const data = await response.json()
            setNewsId(data)
        }

        fetchNewsId()
    }, [tab])

    useEffect(() => {
        async function fetchNews(){
            if(newsId.length === 0) return;
            try {
            setLoading(true)

            const idsToFetch = newsId.slice(count.start, count.end).filter(id => !newsMap[id])
            if(idsToFetch.length === 0){
                setLoading(false)
                return
            }
            const newsPromise = await Promise.all(
                idsToFetch.map(id => fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
                .then(res=> res.json()))
            )
            const updatedMap = {...newsMap}
            newsPromise.forEach(element => {
                if(element){
                    updatedMap[element.id] = element
                }
            });
                setNewsMap(updatedMap)
                setLoading(false)

            } catch(error){
                console.log("Error fetching news:", error)
                setLoading(false)

            }
        }
        fetchNews()
    }, [tab, newsId, count])
    return { newsMap, newsId, loading, count, setCount, setLoading, setNewsMap, setNewsId };
}