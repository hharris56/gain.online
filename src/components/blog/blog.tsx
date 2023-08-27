import './blog.css'

function Break(){
    return (
        <div style={{margin: "1em"}} />
    )
}

interface BlogProps{
    title: string,
    date: string,
    children: any
}

function BlogPost(props: BlogProps){
    return (
        <div className="post-container" key={props.title}>
            <div className="line-decoration" />
            <div style={{marginRight: "2rem"}}>
                <h2 style={{marginBottom: "0rem", marginTop: "0rem"}}>{props.title}</h2>
                <a style={{color: "grey", fontSize: "0.75em"}}>{props.date}</a>
                <Break/>
                {props.children}
                <div className='post-divider' />
            </div>
        </div>
    )
}

export {BlogPost, Break}