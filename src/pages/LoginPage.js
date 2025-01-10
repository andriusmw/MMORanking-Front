import { useState } from "react";

export const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassowrd] = useState("");
    const [error, setError] = useState("");

    const handleForm = async (e) => {
        e.preventDefault();
        setError("");

        try {

        } catch(error) {

        }
    }

    return (
        <section>
            <h1>Login</h1>
           <form onSubmit={handleForm}>
            <fieldset>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required 
                    onChange={(e) => setEmail(e.target.value)}
                />
            </fieldset>
            <fieldset>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" required
                     onChange={(e) => setPassowrd(e.target.value)}
                />
            </fieldset>

            <button>LogIn</button>
            {error ? <p>{error}</p>: null}
           </form>
        </section>
    )
}