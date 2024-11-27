async function fetchData({url, body=null, method="GET"}) {
    
    
    if (typeof body != "object") {
        throw new Error(`The body must be an object not type ${typeof body}`)
    }
    

    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json",
            },

            if (body) {
                body: JSON.stringify(body)
            }
          
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
}


export default fetchData;