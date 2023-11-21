
export class DataAccessXML
{    
    async getData(url)
    {
        let xhr = new XMLHttpRequest();

        return new Promise((resolve, reject) => 
        {
            xhr.onreadystatechange = async ()=>
            {
                if(xhr.readyState == 4)
                {
                    if(xhr.status >= 200 && xhr.status < 300 )
                    {
                        resolve(JSON.parse(xhr.responseText));
                    }
                    else
                    {
                        reject(`${xhr.status}: ${xhr.statusText}`);
                    }
                }
            }
            xhr.open('GET', url, true);
            xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
            xhr.send();
        });
    }

    async getDataByID(url, id)
    {
        let xhr = new XMLHttpRequest();

        return new Promise((resolve, reject) => 
        {
            xhr.onreadystatechange = async ()=>
            {
                if(xhr.readyState == 4)
                {
                    if(xhr.status >= 200 && xhr.status < 300 )
                    {
                        resolve(JSON.parse(xhr.responseText));
                    }
                    else
                    {
                        reject(`${xhr.status}: ${xhr.statusText}`);
                    }
                }
            }
            xhr.open('GET', url + "/" + id, true);
            xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');            
            try
            {
                xhr.send();
            }
            catch(error)
            {
                console.log(error);
            }
        });
    }

    async postData(url, payload)
    {
        let xhr = new XMLHttpRequest();
        return new Promise((resolve, reject) => 
        {
            xhr.onreadystatechange = async ()=>
            {
                if(xhr.readyState == 4)
                {
                    if(xhr.status >= 200 && xhr.status < 300 )
                    {
                        resolve(JSON.parse(xhr.responseText));
                    }
                    else
                    {
                        reject(`${xhr.status}: ${xhr.statusText}`);
                    }
                }
            }
            xhr.open('POST', url, true);
            xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');            
            try
            {
                xhr.send(JSON.stringify(payload));
            }
            catch(error)
            {
                console.log(error);
            }
        });
    }

    async putData(url, id, payload)
    {
        let xhr = new XMLHttpRequest();
        return new Promise((resolve, reject) => 
        {
            xhr.onreadystatechange = async ()=>
            {
                if(xhr.readyState == 4)
                {
                    if(xhr.status >= 200 && xhr.status < 300 )
                    {
                        resolve(JSON.parse(xhr.responseText));
                    }
                    else
                    {
                        reject(`${xhr.status}: ${xhr.statusText}`);
                    }
                }
            }
            xhr.open('PUT', url + "/" + id, true);
            xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');            
            try
            {
                xhr.send(JSON.stringify(payload));
            }
            catch(error)
            {
                console.log(error);
            }
        });
    }

    async deleteData(url, id)
    {
        let xhr = new XMLHttpRequest();
        return new Promise((resolve, reject) => 
        {
            xhr.onreadystatechange = async ()=>
            {
                if(xhr.readyState == 4)
                {
                    if(xhr.status >= 200 && xhr.status < 300 )
                    {
                        resolve('Borrado con exito.');
                    }
                    else
                    {
                        reject(`${xhr.status}: ${xhr.statusText}`);
                    }
                }
            }
            xhr.open('DELETE', url + "/" + id, true);
            xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
            try
            {
                xhr.send();
            }
            catch(error)
            {
                console.log(error);
            }
        });
    }
}
/*
let daa = new DataAccessAjax();
let newMon = {"nombre":"PEPE","alias":"PEPEEEEEEEE","miedo":43,"tipo":"Fantasma","defensa":"crucifijo"};
let url = 'http://localhost:3000/monstruos';

//daa.getData(url).then(res=>console.log(res));
//daa.getDataByID(url, 1).then(res=>console.log(res));
//daa.postData(url, newMon).then(res=> console.log(res));
//daa.putData(url, 11, newMon).then(res=> console.log(res));
//daa.deleteData(url, 11).then(res=>console.log(res));*/