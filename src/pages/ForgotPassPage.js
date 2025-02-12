import { useContext, useState } from "react";
import { getUserByEmailService, loginUserService } from "../services";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {editUserPasswordService} from "../services"
import { Link } from "react-router-dom";

export const ForgotPassPage = () => {
    const { token, user, setUser, logout } = useContext(AuthContext); 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [reccode, setReccode] = useState("");
    const [reccodeForm, setReccodeForm] = useState("");
    const [visible1, setVisible1] = useState(true);
    const [visible2, setVisible2] = useState(false);
    const [visible3, setVisible3] = useState(false);
    const [visible4, setVisible4] = useState(false);
    const [sending, setSending] = useState(false);
    const [pass1, setPass1] = useState("");
    const [pass2, setPass2] = useState("");

    const {login} = useContext(AuthContext)
    const navigate = useNavigate();

      // Estado para los personajes
  //const [characters, setCharacters] = useState(user?.characters || []);

 

    const handleForm = async (e) => {
        e.preventDefault();
        setError("");

        try {
            //service to create random code on user profile and receive it. store it in a state.to send it with the email to the next component. 
            const data = await getUserByEmailService(email);
           
            //guardando el recoverycode en el estado
            setReccode(data.reccode);
            setVisible2(true);
            setVisible1(false);

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
                   // console.log("pasa a phase 3")
                    setVisible2(false);
                    setVisible3(true);
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
                    setSending(true);
                    const data = new FormData();
                    data.append("password", pass1);


                    //console.log("llama al service")
                    const userId = user?.user?.id
                    const data2 = await editUserPasswordService({userId, data, token});
                    setVisible4(true);
                    setVisible3(false);

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
        {visible1 ? (
             <section>
             <h1>FORGOT YOUR PASSWORD? PHASE 1</h1>
             <p>If you forgot your password or want to change it, please write down your email and you will receive
                 a code for changing your password. 
             </p>
             <p>NOTE: This is a delicated process, for security there is no "going back button" so if you need to change
                something during the process you will need to reload the page and re-start the process instead.
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
        ) : ( null  )
           }
        

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
        { visible3 ? (
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



        {/* view 4 FORGOT YOUR PASSWORD? */}
        { visible4 ? (
         <section>
            <h1>SUCCES!!</h1>
            <p>Your password has ben changed! </p>
            <p>Please go to  <Link to={"/login"}>LOGIN PAGE?</Link> </p>
      
        
        </section> ) : (null) }     

    </>
    )
}