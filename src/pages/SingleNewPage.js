import { useParams } from "react-router-dom"
import useSingleNew from "../hooks/useSingleNew";
import { ErrorMessage } from "../components/ErrorMessage";
// replace for singleNew
import { SingleArticle } from "../components/SingleArticle";

export const SingleNewPage = () => {
    //to get the id that comes in the params at the url
    const {id} = useParams();
    //to load the states and the functions and ServicesCall of the SingleRecord
   // Moreover we send the Id to the hook so it can work properly.
     const {article, loading, error} = useSingleNew(id);

      if(loading) return <p>Loading New...</p>;
      if(error) return <ErrorMessage message={error} />

    return (
        <section>
           
            <SingleArticle article={article} />
        </section>
    )
}