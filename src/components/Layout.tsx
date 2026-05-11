import Nav from "./Nav"
interface LayoutProps {
    children: React.ReactNode
}

export default function Layout({children} : LayoutProps){
    return(
        <div className="layout">
            <Nav />
            <div className="content">
                {children}
            </div>
        </div>
    )
}