import { useState } from "react"
import { registerUserService } from "../services";
import { Link, useNavigate } from "react-router-dom";

export const RegisterPage = () => {
    const navigate = useNavigate()

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pass1, setPass1] = useState("");
    const [pass2, setPass2] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const HandleForm = async (e) => {

        e.preventDefault();
        setError("");
        setSuccess(false)

        if(pass1 !== pass2){
            setError("Password do not match");
            return;
        }

        try {
            await registerUserService({name,email,password: pass1})
            //go to login
            setSuccess(true)
           // navigate('/login');
        } catch {
            setSuccess(false)
            setError(error.message);
        }

    }



    return (
        <section>
            <h1>Register</h1>
            <form onSubmit={HandleForm}>  
            <fieldset>
                    <label htmlFor="name">Username:</label>
                    <input type="string" id="name" name="name" required
                        onChange={(e) => setName(e.target.value)}
                    /> 
                </fieldset>
                <fieldset>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" required 
                           onChange={(e) => setEmail(e.target.value)}
                    /> 
                </fieldset>
                <fieldset>
                    <label htmlFor="pass1">Password:</label>
                    <input type="password" id="pass1" name="pass1" required
                          onChange={(e) => setPass1(e.target.value)}
                    /> 
                </fieldset>
                <fieldset>
                    <label htmlFor="pass2">Repeat password:</label>
                    <input type="password" id="pass2" name="pass2" required
                          onChange={(e) => setPass2(e.target.value)}

                    /> 
                </fieldset>

                <button>Register</button>
                {error ? <p>{error}</p>: null}
                {success ? <p>Register initiated, check your E-mail Inbox to activate your Account. Click here to go to <Link to="/login">Login Page</Link></p>: null}
            </form>
        </section>
    )
}