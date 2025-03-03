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
    const [failedAttempts, setFailedAttempts] = useState(0);

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
                if (reccode === reccodeForm) {
                    setVisible2(false);
                    setVisible3(true);
                    setFailedAttempts(0); // Reset attempts if code is correct
                } else {
                    setFailedAttempts(prev => prev + 1);
                    if (failedAttempts >= 2) { // Since we increment after checking, we check for 2 to block on the 3rd attempt
                        setError("Too many failed attempts. Account locked, check your mail for more info.");
                        // Here, you would also need to notify the backend to lock the account
                        await lockAccount(user?.user?.id);
                        logout();
                    } else {
                        setError("Incorrect recovery code.");
                    }
                }
            } catch(error) {
                setError(error.message);
            }
        };
        
        // New function to lock the account
        const lockAccount = async (userId) => {
            try {
                await fetch(`${process.env.REACT_APP_BACKEND}/api/lock-account`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ userId: userId , email: email})
                });
            } catch (error) {
                console.error("Failed to lock account:", error);
            }
        };


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
                    const data2 = await editUserPasswordService({email, data, token});
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
             <section className="form-section">
             <h2>FORGOT YOUR PASSWORD? PHASE 1</h2>
             <form  className="form-container"   onSubmit={handleForm} >
             <p>If you forgot your password or want to change it, please write down your email and you will receive
                 a code for changing your password. 
             </p>
             <p>NOTE: This is a delicated process, for security there is no "going back button" so if you need to change
                something during the process you will need to reload the page and re-start the process instead.
             </p>
           
             <fieldset className="form-fieldset">
                 <label htmlFor="email">Email</label>
                 <input type="email" id="email" name="email" required 
                     onChange={(e) => setEmail(e.target.value)}
                 />
             </fieldset>
            
 
             <button className="submit-button">Send recovery code</button>
             {error ? <p>{error}</p>: null}
            </form>
         </section>
        ) : ( null  )
           }
        

         {/* FORM 2 FORGOT YOUR PASSWORD? */}
        { visible2 ? (
         <section className="form-section">
            <h2>FORGOT YOUR PASSWORD? PHASE 2</h2>
            <form className="form-container" onSubmit={handleForm2}>
            <p>Introduce the code you received by E-mail. 
            </p>
        
            <fieldset className="form-fieldset">
                <label htmlFor="recCodeForm">Email</label>
                <input type="text" id="recCodeForm" name="recCodeForm" required 
                    onChange={(e) => setReccodeForm(e.target.value)}
                />
            </fieldset>
           

            <button className="submit-button">Check Code</button>
            {error ? <p>{error}</p>: null}
           </form>
        </section> ) : (null) }

              {/* FORM 3 FORGOT YOUR PASSWORD? */}
        { visible3 ? (
         <section className="form-section">
            <h2>FORGOT YOUR PASSWORD? PHASE 3</h2>
            <form className="form-container" onSubmit={handleForm3}>
            <p>Introduce the the new password 
            </p>
        
            <fieldset className="form-fieldset">
                <label htmlFor="pass1">Password:</label>
                <input type="password" id="pass1" name="pass1" required 
                    onChange={(e) => setPass1(e.target.value)}
                />
            </fieldset>
            <fieldset className="form-fieldset">
                <label htmlFor="pass2">Repeat password:</label>
                <input type="password" id="pass2" name="pass2" required 
                    onChange={(e) => setPass2(e.target.value)}
                />
            </fieldset>
           

            <button className="submit-button">Change Password</button>
            {error ? <p>{error}</p>: null}
           </form>
        </section> ) : (null) }



        {/* view 4 FORGOT YOUR PASSWORD? */}
        { visible4 ? (
         <section className="form-section">
              <h1>SUCCES!!</h1>
             <form className="form-container" >

            <p>Your password has ben changed! Please go to  </p>
       
            
            <button className="submit-button">
             <Link to={"/login"} >LOGIN PAGE</Link> 
             </button>
             </form>
            
      
        
        </section> ) : (null) }     

    </>
    )
}