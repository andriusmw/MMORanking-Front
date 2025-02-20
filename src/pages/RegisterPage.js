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
    const [region, setRegion] = useState(''); // Estado para la región seleccionada
    const [showHelp, setShowHelp] = useState(false); // Estado para mostrar/ocultar ayuda
    const [showHelpWLName, setShowHelpWLName] = useState(false); // Estado para mostrar/ocultar ayuda
    const [WLname, setWLName] = useState("");
  
    // Opciones para el desplegable
    const regionOptions = [
      { value: '', label: '-- Select a region --' },
      { value: 'EU', label: 'EU' },
      { value: 'US', label: 'US' },
      { value: 'TW', label: 'TW' },
    ];
  



    const HandleForm = async (e) => {

        e.preventDefault();
        setError("");
        setSuccess(false)

        if(pass1 !== pass2){
            setError("Password do not match");
            return;
        }

        try {
            await registerUserService({name,email,password: pass1, region, WLname})
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

        {/*---------------REGION ---------------- */}
            <fieldset>
        <label htmlFor="region">
          Region: the region of your Battle.net Account for synchronizing your characters
        </label>
        <div className="region-container">
          <select
            id="region"
            name="region"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            required
          >
            {regionOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <button
            type="button"
            className="help-button"
            onClick={() => setShowHelp(!showHelp)}
          >
            ?
          </button>
        </div>

        {showHelp && (
          <div className="help-text">
            <p>
              Select the region that corresponds to your Battle.net account:
            </p>
            <ul>
              <li><strong>EU:</strong> Europe ( servers in Europe AND Russia)</li>
              <li><strong>US:</strong> Americas ( servers in the United States, Canada, México, South America and Australia)</li>
              <li><strong>TW:</strong> Taiwan ( servers in Asia (China, Japan, South-Korea, Taiwan ))</li>
            </ul>
            <p>
              This helps us sync your characters correctly with Blizzard's servers.
            </p>
          </div>
        )}
      </fieldset>


         {/*---------------Warcraft Logs User ---------------- */}
             <fieldset>
                <div>
                    <label htmlFor="wlusername">Warcraft Logs Username:</label>
                    <input type="string" id="wlusername" name="wlusername" required
                        onChange={(e) => setWLName(e.target.value)}
                    /> 
                     <button type="button" className="help-button" onClick={() => setShowHelpWLName(!showHelpWLName)}> ? </button>
                </div>
                </fieldset>

                {showHelpWLName && (
          <div className="help-text">
            <p>
              Introduce your username on warcraftlogs, this will be used later to check that the logs you
              upload are yours and no-one is copying your results with a character with the same name as one of yours. 

            </p>
          
          </div>
        )}






                <button>Register</button>
                {error ? <p>{error}</p>: null}
                {success ? <p>Register initiated, check your E-mail Inbox to activate your Account. Click here to go to <Link to="/login">Login Page</Link></p>: null}
            </form>
        </section>
    )
}