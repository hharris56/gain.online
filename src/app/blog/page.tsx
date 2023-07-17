import "./blog.css"
import Posts from "./posts/posts"

export default function CodePage(){
    return (
        <div>
            <h1>gain blog</h1>
            <a>a collection of thoughts written sometime between me having them and you reading them</a>
            <div className="blog-container">
                <Posts/>
            </div>
        </div>
    )
}