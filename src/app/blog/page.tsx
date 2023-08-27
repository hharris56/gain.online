import Posts from "./posts/posts"

export default function BlogPage(){
    return (
        <div>
            <h1>gain blog</h1>
            <a>a collection of thoughts written sometime between me having them and you reading them</a>
            <div className="content-container">
                <Posts/>
            </div>
        </div>
    )
}