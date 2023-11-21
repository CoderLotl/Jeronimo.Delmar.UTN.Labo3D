import { StorageManager } from '../classes/StorageManager.js';
import { DrawCards } from './home.js';
import { ApplyBootstrap, DrawForm, DrawTable, InitInputs, LoadMonsterSession } from './alta.js';
let buttons;
let storageManager = new StorageManager();

document.addEventListener('DOMContentLoaded', ()=>
{
    buttons = 
    {
        home: document.getElementById('home-btn'),
        alta: document.getElementById('alta-btn'),
        blog: document.getElementById('blog-btn'),
        contacto: document.getElementById('contacto-btn'),
    };    
    
    SetMonsterTypesInLS(); // Se setean los tipos de monstruos en el Local Storage, para uso en el form de alta.
    Init(); // Se setean las funciones de los botones del navbar.
    ContinueSession();  // Se continua la sesion guardada en el Session Storage.
                        //Si la pagina se refrescó en algún momento, se sigue desde la última sección visitada.
});

function Init()
{
    // BUTTON HOME
    buttons.home.addEventListener('click', ()=> // Sets the mechanic for the 'Home' button
    {
        SwitchButton('home');
        DrawCards();
        storageManager.WriteSS('lastPage', 'home');
    });

    // BUTTON ALTA MONSTRUO
    buttons.alta.addEventListener('click', ()=> // Sets the mechanic for the 'Alta Monstruo' button
    {        
        SwitchButton('alta');
        DrawForm();
        DrawTable();
        InitInputs();        
        LoadMonsterSession();
        storageManager.WriteSS('lastPage', 'alta');
    });

    // BUTTON BLOG
    buttons.blog.addEventListener('click', ()=>
    {        
        SwitchButton('blog');
    });

    // BUTTON CONTACTO
    buttons.contacto.addEventListener('click', ()=>
    {        
        SwitchButton('contacto');
    });
    SwitchButton('home');
}

//
function SwitchButton(selected)
{
    for(let key in buttons)
    {
        if(key != selected)
        {
            buttons[key].style.backgroundColor = '';
        }
        else
        {
            buttons[key].style.backgroundColor = 'yellowgreen';
        }
    }    
}

function ContinueSession()
{
    let session = storageManager.ReadSS('lastPage');
    if(session !== null)
    {
        buttons[session].click();
    }
    else
    {
        DrawCards();
    }
}

function SetMonsterTypesInLS()
{
    storageManager.WriteLS('monster-types', JSON.stringify(['Vampiro', 'Hombre Lobo', 'Fantasma', 'Bruja', 'Esqueleto']));
}