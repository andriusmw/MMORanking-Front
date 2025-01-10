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

    if(!response.ok) {
        throw new Error(json.message);
    }

    return json.data;
}