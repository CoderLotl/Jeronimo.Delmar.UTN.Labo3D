
export class DataAccessFetch
{
    // GET
    async getData(url)
    {
        try {
            const response = await fetch(url,
            {
                method: 'GET',
                headers:
                {
                    'Content-Type': 'application/json'
                }
            });            
            return response.ok? response.json() : `${response.status}: ${response.statusText}`;
        }
        catch (error)
        {
            console.error('Error fetching data:');
            throw error;
        }
    }

    async getDataByID(url, id)
    {
        try {
            const response = await fetch(url + "/" + id,
            {
                method: 'GET',
                headers:
                {
                    'Content-Type': 'application/json'
                }
            });
            if(response.ok)
            {
                const data = await response.json();
                return data;
            }
            else
            {
                return `${response.status}: ${response.statusText}`;
            }
        }
        catch (error)
        {
            console.error('Error fetching data:', error);
            throw error;
        }
    }
    
    // POST
    async postData(url, payload)
    {
        try {
            const response = await fetch(url,
            {
                method: 'POST',
                headers:
                {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            if(response.ok)
            {
                const data = await response.json();
                console.log(data);
                return `${response.status}: ${response.statusText}`;
            }
            else
            {
                return `${response.status}: ${response.statusText}`;
            }
        }
        catch (error)
        {
            console.error('Error posting data:', error);
            throw error;
        }
    }

    // PUT
    async putData(url, id, payload)
    {
        try {
            const response = await fetch(url + "/" + id,
            {
                method: 'PUT',
                headers:
                {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            if(response.ok)
            {
                const data = await response.json();                
                console.log(data);
                return `${response.status}: ${response.statusText}`;
            }
            else
            {
                return `${response.status}: ${response.statusText}`;
            }
        }
        catch (error)
        {
            console.error('Error updating data:', error);
            throw error;
        }
    }
    
    // DELETE
    async deleteData(url, id)
    {
        try {
            const response = await fetch(url + "/" + id,
            {
                method: 'DELETE',
                headers:
                {
                    'Content-Type': 'application/json'
                }
            });
            return `${response.status}: ${response.statusText}`;            
        }
        catch (error)
        {
            console.error('Error deleting data:', error);
            throw error;
        }
    }
}
/*
let DAF = new DataAccessFetch();
let newMon = {"nombre":"PEPE","alias":"PEPEEEEEEEE","miedo":43,"tipo":"Fantasma","defensa":"crucifijo"};

async function Play()
{
    let url = 'http://localhost:3000/monstruos';
    let data = await DAF.getData(url);
    //let data = await DAF.getDataByID(url, 11);
    //let data = await DAF.postData(url, newMon);
    //let data = await DAF.deleteData(url, 11);
    //let data = await DAF.putData(url, 10, newMon);
    console.log(data);
}

Play();*/