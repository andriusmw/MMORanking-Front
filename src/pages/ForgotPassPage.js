import { useContext, useState } from "react";
import { getUserByEmailService, loginUserService } from "../services";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const ForgotPassPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [reccode, setReccode] = useState("");
    const [reccodeForm, setReccodeForm] = useState("");
    const [visible2, setVisible2] = useState(false);
    const [sending, setSending] = useState(false);
    const [pass1, setPass1] = useState("");
    const [pass2, setPass2] = useState("");

    const {login} = useContext(AuthContext)
    const navigate = useNavigate();


    const handleForm = async (e) => {
        e.preventDefault();
        setError("");

        try {
            //replace with service to create random code on user profile
            // and receive it. store it in a state.to send it with the email to the next component. 
            const data = await getUserByEmailService(email);
           
           // console.log(data);
           // console.log(data.reccode);
            //guardando el recoverycode en el estado
            setReccode(data.reccode);
            setVisible2(true);
        
       

        } catch(error) {
            setError(error.message);

        }
    }



        // HANDLE FORM PHASE 2--------------------------

        const handleForm2 = async (e) => {
            e.preventDefault();
            setError("");
    
            try {
                //check if the recovery code on the form is the same as in the user.reccode
                if (reccode == reccodeForm) {
                    console.log("pasa a phase 3")
                } else {
                    setError(error.message);
                }

            } catch(error) {
                setError(error.message);
    
            }
        }


        // HANDLE FORM PHASE 3--------------------------

        const handleForm3 = async (e) => {
            e.preventDefault();
            setError("");
    
            try {
                //check if the recovery code on the form is the same as in the user.reccode
                if (pass1 == pass2) {
                    console.log("llama al service")
                } else {
                    setError("passwords are not the same");
                }

            } catch(error) {
                setError(error.message);
    
            }
        }












    return ( 
    <>
        {/* FORM 1 FORGOT YOUR PASSWORD? */}
        {visible2 ? (null) : (
            <section>
            <h1>FORGOT YOUR PASSWORD? PHASE 1</h1>
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
        )}
        

         {/* FORM 2 FORGOT YOUR PASSWORD? */}
        { visible2 ? (
         <section>
            <h1>FORGOT YOUR PASSWORD? PHASE 2</h1>
            <p>Introduce the code you received by E-mail. 
            </p>
           <form onSubmit={handleForm2}>
            <fieldset>
                <label htmlFor="recCodeForm">Email</label>
                <input type="text" id="recCodeForm" name="recCodeForm" required 
                    onChange={(e) => setReccodeForm(e.target.value)}
                />
            </fieldset>
           

            <button>Check Code</button>
            {error ? <p>{error}</p>: null}
           </form>
        </section> ) : (null) }

              {/* FORM 3 FORGOT YOUR PASSWORD? */}
        { visible2 ? (
         <section>
            <h1>FORGOT YOUR PASSWORD? PHASE 3</h1>
            <p>Introduce the the new password 
            </p>
           <form onSubmit={handleForm3}>
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
           

            <button>Check Code</button>
            {error ? <p>{error}</p>: null}
           </form>
        </section> ) : (null) }



    </>
    )
}