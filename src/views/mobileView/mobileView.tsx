import "./mobileView.css"
import MobileHeader from "../../components/header/mobileHeader"
import Footer from "../../components/footer/footer"

export default function MobileView(props: any){
    return (
        <>
            <MobileHeader />
                <div style={{padding: '1rem'}}>
                    {props.children}
                </div>
            <Footer />
        </>
    )
}