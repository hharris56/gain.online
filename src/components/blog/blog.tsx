import "./blog.css"

interface BlogProps{
    title: string,
    date: string,
    tags?: string[],
    children: any
}

function BlogPost(props: BlogProps){
    return (
        <div className="post-container" key={props.title}>
            <div className="line-decoration" />
            <div style={{marginRight: "2rem"}}>
                <h3 style={{marginBottom: "0rem", marginTop: "0rem"}}>{props.title}</h3>
                <a style={{color: "grey", fontSize: "0.75em"}}>{props.date}</a>
                {props.tags? <div className="tags-container">
                    {props.tags.map(t => Tag(t))}
                </div> : <></>}
                <Break/>
                {props.children}
                <div className='post-divider' />
            </div>
        </div>
    )
}

function Tag(name: string){
    return (
        <div className="tag-button">
            # {name}
        </div>
    )
}

function Break(){
    return (
        <div style={{margin: "1em"}} />
    )
}

export {BlogPost, Break}