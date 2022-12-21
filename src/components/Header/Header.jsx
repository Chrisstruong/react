import { Link } from 'react-router-dom'
const Header = (props) => {
    return (
        <header style={{ height: "480px", overflow: 'hidden' }}>
            <nav className="nav">
                <Link to="/">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                    />
                </Link>
            </nav>
            <img style={{ width: "100%" }} src="https://images.unsplash.com/photo-1671525872560-ee97bd152fd7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2787&q=80" alt="" />
        </header>
    )
}

export default Header