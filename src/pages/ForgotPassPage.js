import { useContext, useState } from "react";
import { getUserByEmailService, loginUserService } from "../services";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const ForgotPassPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [reccode, setReccode] = useState("");

    const {login} = useContext(AuthContext)
    const navigate = useNavigate();


    const handleForm = async (e) => {
        e.preventDefault();
        setError("");

        try {
            //replace with service to create random code on user profile
            // and receive it. store it in a state.to send it with the email to the next component. 
            const data = await getUserByEmailService(email);
           
            console.log(data);
           // console.log(data.reccode);
            //guardando el recoverycode en el estado
           // setReccode(data.reccode);
      
        
       

        } catch(error) {
            setError(error.message);

        }
    }

    return (
        <section>
            <h1>FORGOT YOUR PASSWORD?</h1>
            <p>If you forgot your password or want to change it, please write down your email and you will receive
                a code for changing your password. 
            </p>
           <form onSubmit={handleForm}>
            <fieldset>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required 
                    onChange={(e) => setEmail(e.target.value)}
                />
            </fieldset>
           

            <button>Send recovery code</button>
            {error ? <p>{error}</p>: null}
           </form>
        </section>
    )
}