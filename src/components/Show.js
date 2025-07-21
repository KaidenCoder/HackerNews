import useApiHook from '../hooks/apiHook'
import { FaClock, FaHandPointUp, FaRegNewspaper} from 'react-icons/fa';
import { useTab } from '../context/context';

export default function Show(){

    const {newsMap, newsId, loading, count, setCount} = useApiHook()
    const {setArticleData} = useTab()

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
            <h1>Show</h1>
            <section>
                {loading ? "Loading..." :
                <section>
                   
                    <div>
                        <span>Posts {count.start} - {count.end} </span>
                        <button  disabled={count.start == 0} onClick={() => handlePrev()}>Prev</button>
                        <button disabled={count.end == newsId.length} onClick={() => handleNext()}>Next</button>
                    </div>
                    {currentNews.map((item,index) =>(
                        <section className='news-section' key={index} 
                        onClick={(() => setArticleData({
                            data: item,
                            isArticle: true,
                            value:'show'
                        }))}>
                         <div className='post-icon'>
                            <FaRegNewspaper />
                        </div>
                        <div>      
                            <h2>{item.title}</h2>
                            <div className="news-post">
                                <p><FaHandPointUp /> {item.score} { item.score  > 1 ? `points` : `point`} </p>
                                <p>By <span style={{color: '#e8590c'}}>{item.by}</span></p>
                                <p><FaClock/> {Math.floor((Date.now() - item.time * 1000) / (1000 * 60 * 60 * 24))} days ago </p>
                            </div>
                        </div>
                        </section>
                    ))}              
                </section>             
                 }      
            </section>
        </main>
    )
}