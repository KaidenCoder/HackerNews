import useApiHook from '../hooks/apiHook'

export default function Ask(){
    const {newsMap, newsId, loading, count, setCount} = useApiHook()
    
        const currentNews = newsId.slice(count.start, count.end)
        .map(id => newsMap[id]).filter(Boolean)
    
        const handlePrev = () => {
            if(count.start - 10 >= 0){
                setCount({
                    start: count.start - 10,
                    end: count.end - 10
                })
            } else {
                setCount({
                    start: 0,
                    end: 10
                })
            }
        }
    
        const handleNext = () => {
            if(count.end + 10 < newsId.length){
                setCount({
                    start: count.start + 10,
                    end: count.end + 10
                })
            } else {
                setCount({
                    start: newsId.length - 10,
                    end: newsId.length
                })
            }
        }
    
        return (
            <main>
                <h1>Ask</h1>
                <section>
                    {loading ? "Loading..." :
                    <div>
                        <div>
                            <span>Posts {count.start} - {count.end} </span>
                            <button  disabled={count.start == 0} onClick={() => handlePrev()}>Prev</button>
                            <button disabled={count.end == newsId.length} onClick={() => handleNext()}>Next</button>
                        </div>
                        {currentNews.map((item,index) =>(
                            <div key={index}>
                                <h2>{item.title}</h2>
                                <p>By {item.by} | {new Date(item.time * 1000).toLocaleDateString()}</p>
                                <a href={item.url} target="_blank" rel="noopener noreferrer">Read more</a>
                            </div>
                        ))}              
                    </div>             
                     }      
                </section>
            </main>
        )
}