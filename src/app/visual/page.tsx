import './visual.css'
import Timeline from '../../components/timeline/timeline'

export default function VisualPage(){
    return (
        <div className='page-contianer'>
            <h1>gain design</h1>
            <a>Some visual art projects and explorations from over the years. Different eras use differet approaches, toolsets and ideologies.</a>
            <Timeline />
        </div>
    )
}