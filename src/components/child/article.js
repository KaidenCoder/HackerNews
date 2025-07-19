import { useState, useEffect } from "react"
import { FaClock, FaHandPointUp, FaRegNewspaper} from 'react-icons/fa';

export default function Article(props){
    const [comments, setComments] = useState([])

    useEffect(() => {
        async function fetchComments(){
            const commentsPromise = await Promise.all(
                props.kids.map(id => fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`))
                .then(res => res.json())
            )
            setComments(commentsPromise)
        }
    }, [])
    return (
        <main>
            <section className='news-section'key={props.id}>
                <div className='post-icon'>
                    <FaRegNewspaper />
                </div>
                <div>      
                    <h2>{props.title}</h2>
                    <div className="news-post">
                        <p><FaHandPointUp /> {props.score} { props.score  > 1 ? `points` : `point`} </p>
                        <p>By <span style={{color: '#e8590c'}}>{props.by}</span></p>
                        <p><FaClock/> {Math.floor((Date.now() - props.time * 1000) / (1000 * 60 * 60 * 24))} days ago </p>
                        <a href={props.url} target="_blank" rel="noopener noreferrer">Read more</a>
                    </div>
                </div>
                <p>{props.text}</p>
                <p>{comments.length} {comments.length > 1 ? 'comments' : 'comment'}</p>
                <div>
                    {comments.length > 0 && comments.map((comment, index) => (
                        <div>
                            <p>{comment.by} * {Math.floor((Date.now() - comment.time * 1000) / (1000 * 60 * 60 * 24))} days ago </p>
                            <p>{comment.text}</p>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    )
}