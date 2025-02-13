/*----------------------- GET LATEST RECORDS --------------------------------
----------------------------------------------------------------------------*/


export const getAllRecordsService = async () => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/votes`)

    const json = await response.json();

    if(!response.ok) {
        throw new Error(json.message);
    }

    return json.data;
     
}

/*----------------------- GET SINGLE RECORD --------------------------------
----------------------------------------------------------------------------*/

export const getSingleRecordService = async (id) =>  {
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/entries/votes/${id}`);

    const json = await response.json();

    if(!response.ok) {
        throw new Error(json.message);
    }

    return json.data;
}

/*--------------------------------- REGISTER --------------------------------
----------------------------------------------------------------------------*/

export const registerUserService = async ({name, email, password}) => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, email, password})
    });

    const json = await response.json();

    if(!response.ok) {
        throw new Error(json.message);
    }



}


/*--------------------------------- LOGIN --------------------------------
----------------------------------------------------------------------------*/

export const loginUserService = async ({email, password}) => {

    const response = await fetch(`${process.env.REACT_APP_BACKEND}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({email, password})
    });

    const json = await response.json();
    //console.log(json)

    if(!response.ok) {
        throw new Error(json.message);
    }

    return json;
} ;


/******************************** GET MY USER DATA ***************************** */
/******************************************************************************* */

export const getMyUserDataService = async ({token}) => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/users/profile`, {
        headers: {
           Authorization: `Bearer ${token}`
        },
    });
    const json = await response.json();
    console.log("response from getMyUserDataService")
    console.log(json)

    if(!response.ok) {
        throw new Error(json.message);
    }

    return json;
    //return json.data
}


//------------------------ EDIT USER SERVICE -------------------
/*********************************************************************** */

export const editUserDataService = async ({idUser, data, token}) => {
    console.log("token")
    console.log(token)
    console.log("body.data")
    console.log(data)
    console.log(idUser)
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/users/${idUser}`,{
        method: "PATCH",
        body: data,
        headers: {
            Authorization: "BEARER " +  token,
        },
    });

    const json = await response.json();

    if(!response.ok) {
        console.log(json)
        throw new Error(json.message);
    }
   
    return json.data;
};


/*********************************** SYNC CHARACTERS *************************** */
/******************************************************************************* */


export const getAllCharactersService = async () => {
    //const response = await fetch(`${process.env.REACT_APP_BACKEND}/auth/bnet`)
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/123`)
    const json = await response.json();

    if(!response.ok) {
        throw new Error(json.message);
    }

    return json.data;
     
}


//------------------ DELETE CHARACTER SERVICE --------------

export const deleteCharacterService = async ({id, token}) => {
    const idCharacter = id;
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/character/${idCharacter}`,{
        method: "DELETE",
        headers: {
            Authorization: "BEARER " +  token,
        },
    });
    const json = await response.json();

    if(!response.ok) {
        console.log("error trying to delete it")
        console.log(json)
        throw new Error(json.message);
    }
  
}


/*----------------------- GET USER BY EMAIL (To change password) --------------------------------
----------------------------------------------------------------------------*/

export const getUserByEmailService = async (email) =>  {
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/users/${email}`);

    const json = await response.json();

    if(!response.ok) {
        throw new Error(json.message);
    }

    return json.data;
}

//------------------------ EDIT USER PASSWORD SERVICE -------------------
/*********************************************************************** */

export const editUserPasswordService = async ({userId, data, token}) => {
  
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/userpass/${userId}`,{
        method: "PATCH",
        body: data,
        headers: {
            Authorization: "BEARER " +  token,
        },
    });

    const json = await response.json();

    if(!response.ok) {
        console.log(json)
        throw new Error(json.message);
    }
   
    return json.data;
};


/*----------------------- GET ALL NEWS --------------------------------
----------------------------------------------------------------------------*/


export const getAllNewsService = async () => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/news`)

    const json = await response.json();

    if(!response.ok) {
        throw new Error(json.message);
    }

    return json.data;
     
}