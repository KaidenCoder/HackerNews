import { useState, useEffect } from "react"
import { FaClock, FaHandPointUp} from 'react-icons/fa';
import { useTab } from "../../context/context";

export default function Article(){
    const [comments, setComments] = useState([])
    const {tab, setTab, articleData, setArticleData } = useTab()

    useEffect(() => {
        async function fetchComments(){
            const commentsPromise = await Promise.all(
                articleData.data.kids.map(id => fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
                .then(res => res.json()))
            )
            setComments(commentsPromise)
        }
        if(articleData.data.kids && articleData.data.kids.length > 0){
            fetchComments()
        }
    }, [])

    return (
        <main>
            <section className='article-section'key={articleData.data.id}>
                <button onClick={() => {
                    setTab(articleData.value)
                    setArticleData({
                        data: {},
                        isArticle: false,
                        value: articleData.value
                    })
                }}>
                   Back
                </button>
                <div>      
                    <h2>{articleData.data.title}</h2>
                    <div className="news-post">
                        <p><FaHandPointUp /> {articleData.data.score} { articleData.data.score  > 1 ? `points` : `point`} </p>
                        <p>By <span style={{color: '#e8590c'}}>{articleData.data.by}</span></p>
                        <p><FaClock/> {Math.floor((Date.now() - articleData.data.time * 1000) / (1000 * 60 * 60 * 24))} days ago </p>
                        <a href={articleData.data.url} target="_blank" rel="noopener noreferrer">Read more</a>
                    </div>
                </div>
                <section>
                <div dangerouslySetInnerHTML={{ __html: articleData.data.text }}/>
                <p>{comments.length} {comments.length > 1 ? 'comments' : 'comment'}</p>
                <div>
                    {comments.length > 0 && comments.map((comment, index) => (
                        <div key={index}>
                            <p>{comment.by} * {Math.floor((Date.now() - comment.time * 1000) / (1000 * 60 * 60 * 24))} days ago </p>
                            <p dangerouslySetInnerHTML={{ __html: comment.text }}/>
                        </div>
                    ))}
                </div>
                </section>
            </section>
        </main>
    )
}