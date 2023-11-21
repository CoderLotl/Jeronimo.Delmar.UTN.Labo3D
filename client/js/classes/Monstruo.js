import { Personaje } from "./Personaje.js";

export class Monstruo extends Personaje
{
    constructor(obj)
    {
        super(obj['id'], obj['nombre'], obj['tipo']);
        
        for(let prop in obj)
        {
            if(prop != 'id' && prop != 'nombre' && prop != 'tipo')
            {
                this[prop] = obj[prop];
            }
        }
        //console.log(this);
    }    
}