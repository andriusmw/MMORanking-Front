import { Link } from "react-router-dom"

export const NotFoundPage = () => {
    return (
        <section>
            <h1>404 ERROR </h1>
            <p>Page Not Found</p>
            <Link to={'/'}>Back to Home Page</Link>
        </section>
    )
}