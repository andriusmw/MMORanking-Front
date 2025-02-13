export const SingleArticle = ({article}) => {
    return (
        <article>
            
            <button>Go back</button>
            
            <p>{article.title}</p>
            <p>{article.text}</p>
            <p>{article.image}</p>
            <p>{article.created_at}</p>
            <p>{article.user_name}</p>
         

          
        </article>
    ) 
}