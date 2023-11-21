
export class DataAccessAxios
{
    async getData(url)   
    {
        try
        {
            let response = await axios.get(url);
            if(response.status >=200 && response.status < 300)
            {
                return response.data;
            }
            else
            {
                return `${response.status}: ${response.statusText}`;
            }
        }
        catch(error)
        {
            console.log(error);
        }
    }

    async getDataByID(url, id)
    {
        try
        {
            let response = await axios.get(url + "/" + id);
            if(response.status >=200 && response.status < 300)
            {
                return response.data;
            }
            else
            {
                return `${response.status}: ${response.statusText}`;
            }
        }
        catch(error)
        {
            console.log(error);
        }
    }

    async postData(url, payload)
    {
        try
        {
            let response = await axios.post(url, payload);
            if(response.status >=200 && response.status < 300)
            {
                return response.data;
            }
            else
            {
                return `${response.status}: ${response.statusText}`;
            }
        }
        catch(error)
        {
            console.log(error);
        }
    }

    async putData(url, id, payload)
    {
        try
        {
            let response = await axios.put(url + "/" + id, payload);
            if(response.status >=200 && response.status < 300)
            {
                return `${response.status}: ${response.statusText}`;
            }
            else
            {
                return `${response.status}: ${response.statusText}`;
            }
        }
        catch(error)
        {
            console.log(error);
        }
    }

    async deleteData(url, id)
    {
        try
        {
            let response = await axios.delete(url + "/" + id);
            if(response.status >=200 && response.status < 300)
            {
                return 'Borrado con exito.';
            }
            else
            {
                return `${response.status}: ${response.statusText}`;
            }
        }
        catch(error)
        {
            console.log(error);
        }
    }
}
/*
let url = 'http://localhost:3000/monstruos';
let newMon = {"nombre":"PEPE","alias":"PEPEEEEEEEEEEEE","miedo":43,"tipo":"Fantasma","defensa":"crucifijo"};
let DAX = new DataAccessAxios();
//DAX.getData(url).then(res=>console.log(res));
//DAX.getDataByID(url, 10).then(res=>console.log(res));
//DAX.postData(url, newMon).then(res=>console.log(res));
//DAX.deleteData(url, 11).then(res=>console.log(res));
//DAX.putData(url, 10, newMon).then(res=>console.log(res));*/