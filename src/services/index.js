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



/*----------------------- GET LADDER RECORDS --------------------------------
----------------------------------------------------------------------------*/

export const getLadderRecordsService = async (filters = {}, token) => {
    // Valores por defecto si no se proporcionan filtros
    const defaultFilters = {
      dungeon_name: "*",
      dungeonDifficulty: "*",
      season: "*",
      numPlayers: "*",
      charClass: "*",
      charSpec: "*",
      server: "*",
    };
  
    // Combinar filtros recibidos con los valores por defecto
    const finalFilters = { ...defaultFilters, ...filters };
  
    // Construir la URL con los parámetros en el formato de rutas
    const url = `${process.env.REACT_APP_BACKEND}/records/${finalFilters.dungeon_name}/${finalFilters.dungeonDifficulty}/${finalFilters.season}/${finalFilters.numPlayers}/${finalFilters.charClass}/${finalFilters.charSpec}/${finalFilters.server}`;
  
    // Enviar la solicitud con el token en los headers
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`, // Añade el token en el formato esperado por validateAuth
      },
    });
    const json = await response.json();
  
    if (!response.ok) {
      throw new Error(json.message);
    }
  
    return json.data;
  };


















/*--------------------------------- REGISTER --------------------------------
----------------------------------------------------------------------------*/

export const registerUserService = async ({name, email, password , region, WLname}) => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, email, password, region, WLname})
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




/*----------------------- GET ALL NEWS WITH PAGINATION--------------------------------
----------------------------------------------------------------------------*/

export const getAllNewsService = async (page = 1, limit = 15) => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/news?page=${page}&limit=${limit}`);

    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);
    }

    return json;  // Now json will contain both 'data' and 'total'
}


/*----------------------- GET SINGLE NEW --------------------------------
----------------------------------------------------------------------------*/

export const getSingleNewService = async (id) =>  {
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/news/${id}`);

    const json = await response.json();

    if(!response.ok) {
        throw new Error(json.message);
    }

    return json.data;
}


/*------------------------------CREATE POST -----------------------------*/
/*-----------------------------------------------------------------------*/

export const createPostService = async ({data, token}) => {
    console.log("token")
    console.log(token)
    console.log("body.data")
    console.log(data)
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/news`,{
        method: "POST",
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

//------------------ DELETE POST SERVICE --------------

export const deletePostService = async ({idNew, token}) => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/news/${idNew}`,{
        method: "DELETE",
        headers: {
            Authorization: "BEARER " +  token,
        },
    });
    const json = await response.json();

    if(!response.ok) {
        console.log("error al borrar")
        console.log(json)
        throw new Error(json.message);
    }
  
}

/*------------------------------CREATE RECORD SERVICE -----------------------------*/
/*-----------------------------------------------------------------------*/

export const createRecordService = async ({data, token}) => {
    console.log("token")
    console.log(token)
    console.log("body.data")
    console.log(data)
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/records/new`,{
        method: "POST",
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


/*----------------------- GET PUBLIC STATS --------------------------------
----------------------------------------------------------------------------*/


export const getStatsService = async () => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/stats`)

    const json = await response.json();

    if(!response.ok) {
        throw new Error(json.message);
    }

    return json.data;
     
}