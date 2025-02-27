import { ErrorMessage } from "../components/ErrorMessage";
import { RecordList } from "../components/RecordsList";
import useRecords from "../hooks/useRecords";
import { useState } from "react";

export const ContactPage = () => {
  const [formSubmitted, setFormSubmitted] = useState(false); // Para manejar el estado del envío

  

  return (
    <>
      <section className="contact" id="contact">
        <h2 className="heading">
          Contact <span>Me!</span>
        </h2>

        <form
        action="https://formspree.io/f/xkgnrvjj"
       method="POST"
        >
          <label>
            Your email:
            <input type="email" name="email"/>
         </label>
         <label>
            Your message:
            <textarea name="message"></textarea>
        </label>
 
        <button type="submit">Send</button>
        </form>
    </section>


    </>
  );
};