import { StorageManager } from '../classes/StorageManager.js';
import { DynamicDrawer } from '../classes/DynamicDrawer.js';
import { Monstruo } from '../classes/Monstruo.js';
import { DataAccessXML } from '../classes/DataAccessXML.js';
import { DataAccessAxios } from '../classes/DataAccessAxios.js';
import { DataAccessFetch } from '../classes/DataAccessFetch.js';
import { Extras } from '../utilities/Extras.js';
let extras = new Extras();
let DD = new DynamicDrawer();
let storageManager = new StorageManager();
let monster = {};
let monsters;
let monsterLoaded = false;
let tableHeaders = ['Nombre', 'Alias', 'Defensa', 'Miedo', 'Tipo']; // Cabeceras de las tablas.
let tableHeaderFilters = ['Nombre', 'Alias', 'Defensa', 'Miedo', 'Tipo']; // Filtro de cabeceras.
let inputs = ''; // Array de inputs. Se define luego de la inicializacion
let inputsDefaultValues = '';  // Valores default de los inputs. Se inicializa con los inputs mismos.
let inputExceptions = ['id', 'defensa']; // Propiedades del monstruo que no tienen relacion directa con los inputs y requieren de chequeos complejos
let initialMonster = {id: '', nombre: '', alias : '', defensa: '', miedo: '', tipo: ''}; // Esquema inicial del monstruo. Sirve como modelo para la instanciacion.
let timer = 3000; // Timer del spinner
let url = 'http://localhost:3000/monstruos';

/**
 * Este script contiene todas las funciones necesarias para dibujar y redibujar el index
 * de manera dinamica, con los elementos y mecanicas correspondientes a la pagina de 'Alta Monstruo'.
 */

//////////////////////////////////////// --- FUNCTIONS FOR EXPORT
export function DrawForm()
{
    SetInitialMonster();
    // Borrado del HTML del div 'container'
    let container = document.getElementById('container');
    container.innerHTML = '';    

    let monsterTypes = storageManager.ReadLS('monster-types');
    monsterTypes = JSON.parse(monsterTypes);    

    // Inyección del CSS de Alta Monstruo
    let css = DD.CreateLink('stylesheet', "./css/alta.css");
    container.appendChild(css);

    // DIV 'formContainer'
    let formContainer = DD.CreateDiv('formContainer');
    container.appendChild(formContainer);    

    // FORM
    let form = document.createElement('form');
    form.id = 'form';
    formContainer.appendChild(form);
    
    // TITULO DEL FORM
    let h1 = document.createElement('h1');
    h1.textContent = 'Información del Monstruo';
    h1.id = 'formTitle';
    form.appendChild(h1);

    // FIELDSET DATOS
    let fieldset = document.createElement('fieldset');
    fieldset.id = 'fieldSet';    
    let legend = document.createElement('legend');
    legend.textContent = 'Datos';    
    fieldset.appendChild(legend);
    form.appendChild(fieldset);

    // DIV DEL NAME
    let divName = DD.CreateDiv('divName');    
    fieldset.appendChild(divName);
    // LABEL DEL NAME
    let labelName = DD.CreateLabel('Nombre', 'labelName', 'inputName', 'pumpkin-icon');
    divName.appendChild(labelName);    
    // INPUT DEL NAME
    let inputName = DD.CreateInput('inputName', 'text', false, true);
    inputName.placeholder = 'Nombre';    
    divName.appendChild(inputName);
    

    // DIV DEL ALIAS
    let divAlias = DD.CreateDiv('divAlias');    
    fieldset.appendChild(divAlias);
    // LABEL DEL ALIAS
    let labelAlias = DD.CreateLabel('Alias', 'labelAlias', 'inputAlias', 'pumpkin-icon');    
    divAlias.appendChild(labelAlias);
    // INPUT DEL ALIAS
    let inputAlias = DD.CreateInput('inputAlias', 'text', false, true);    
    inputAlias.placeholder = 'Alias';
    divAlias.appendChild(inputAlias);

    // FIELDSET DE DEFENSA
    let defensaFieldset = document.createElement('fieldset');
    defensaFieldset.id = 'defensaFieldset';
    fieldset.appendChild(defensaFieldset);
    let defensaLegend = DD.CreateLegend('Defensa', 'defensa-lgnd', 'pumpkin-icon');
    defensaFieldset.appendChild(defensaLegend);

    //////////////////////////////////////// --- RADIO BUTTON OPTIONS
    let divEstaca = DD.CreateDiv(false, 'defensa-option'); // ESTACA
    let rdbEstaca = DD.CreateInput('rdb-estaca', 'radio', 'defensa', true, 'estaca');
    rdbEstaca.checked = true;
    let rdbEstacaLabel = DD.CreateLabel('Estaca', 'rdb-estaca-label', 'rdb-estaca');    
    divEstaca.appendChild(rdbEstaca);
    divEstaca.appendChild(rdbEstacaLabel);
    defensaFieldset.appendChild(divEstaca);

    let divPlata = DD.CreateDiv(false, 'defensa-option'); // PLATA
    let rdbPlata = DD.CreateInput('rdb-plata', 'radio', 'defensa', true, 'plata');
    let rdbPlataLabel = DD.CreateLabel('Plata', 'rdb-plata-label', 'rdb-plata');    
    divPlata.appendChild(rdbPlata);
    divPlata.appendChild(rdbPlataLabel);
    defensaFieldset.appendChild(divPlata);

    let divCrucifijo = DD.CreateDiv(false, 'defensa-option'); // CRUCIFIJO
    let rdbCrucifijo = DD.CreateInput('rdb-crucifijo', 'radio', 'defensa', true, 'crucifijo');
    let rdbCrucifijoLabel = DD.CreateLabel('Crucifijo', 'rdb-crucifijo-label', 'rdb-crucifijo');    
    divCrucifijo.appendChild(rdbCrucifijo);
    divCrucifijo.appendChild(rdbCrucifijoLabel);
    defensaFieldset.appendChild(divCrucifijo);

    let divPocion = DD.CreateDiv(false, 'defensa-option'); // POCION
    let rdbPocion = DD.CreateInput('rdb-pocion', 'radio', 'defensa', true, 'pocion');
    let rdbPocionLabel = DD.CreateLabel('Poción', 'rdb-pocion-label', 'rdb-pocion');    
    divPocion.appendChild(rdbPocion);
    divPocion.appendChild(rdbPocionLabel);
    defensaFieldset.appendChild(divPocion);
    //////////////////////////////////////// --- FIN DE RADIO BUTTON OPTIONS

    // FIELDSET MIEDO
    let miedoDiv = document.createElement('fieldset');
    miedoDiv.id = 'miedo-fieldset';
    fieldset.appendChild(miedoDiv);
    // MIEDO LEGEND
    let miedoLgnd = DD.CreateLegend('Miedo', 'miedo-lgnd', 'pumpkin-icon');
    miedoDiv.appendChild(miedoLgnd);
    // MIEDO RANGE
    let rngMiedo = DD.CreateRange('rng-miedo', 0, 100, 0); // SLIDER MIEDO
    miedoDiv.appendChild(rngMiedo);
    // MIEDO NUMERIC VALUE
    let miedoValue = DD.CreateSpan('miedo-value', 0);
    miedoDiv.appendChild(miedoValue);

    // TIPO FIELDSET
    let tipoFieldset = document.createElement('fieldset');
    tipoFieldset.id = 'tipo-fieldset';
    fieldset.appendChild(tipoFieldset);
    // TIPO LEGEND
    let tipoLgnd = DD.CreateLegend('Tipo', 'tipo-lgnd', 'pumpkin-icon');
    tipoFieldset.appendChild(tipoLgnd);
    // TIPO SELECT || SE CARGAN LAS OPCIONES DESDE EL LOCAL STORAGE
    let tipo = DD.CreateDropdown('tipo-options', monsterTypes); // Creo las opciones
    tipoFieldset.appendChild(tipo);

    // DIALOG CON SPINNER
    let dialog = document.createElement('dialog');
    dialog.id = 'dialog';
    dialog.classList.add('hidden');
    fieldset.appendChild(dialog);
    // SPINNER IMAGE    
    let spinnerImg = document.createElement('img');
    spinnerImg.src = './resources/gif/pumpkin_spinner.gif';
    spinnerImg.id = 'spinnerImg';
    dialog.appendChild(spinnerImg);
    // SPINNER TEXT
    let spinnerText = document.createElement('p');
    spinnerText.id = 'spinner-text';
    spinnerText.textContent = 'Procesando...';
    dialog.appendChild(spinnerText);
    
    // WARNING SIREN DIV
    let sirenDiv = DD.CreateDiv('sirenDiv');
    sirenDiv.classList.add('siren');
    sirenDiv.classList.add('hidden');
    fieldset.appendChild(sirenDiv);    
    // WARNING SIREN
    let siren = document.createElement('i');    
    siren.classList.add('siren-icon');    
    sirenDiv.appendChild(siren);
    // WARNING SIREN TEXT
    let sirenText = document.createTextNode('ADVERTENCIA: Personaje cargado');    
    sirenDiv.appendChild(sirenText);    

    // BUTTONS DIV
    let buttonsDiv = DD.CreateDiv('buttonsDiv');
    fieldset.appendChild(buttonsDiv);

    // BTN GUARDAR
    let btnGuardar = DD.CreateButton('btn-guardar', 'Guardar<br><i class="fas fa-save"></i>');
    buttonsDiv.appendChild(btnGuardar);
    // BTN CLEAR FORM
    let btnClear = DD.CreateButton('btn-clear', 'Limpiar Form');
    buttonsDiv.appendChild(btnClear);
    // BTN BORRAR MONSTRUO
    let btnBorrar = DD.CreateButton('btn-borrar', 'Borrar Monstruo');
    btnBorrar.classList.add('hidden');
    buttonsDiv.appendChild(btnBorrar);
}

export function ApplyBootstrap()
{
    let table = document.getElementById('monsters-table');
    table.classList.add('table-bordered');    
    table.classList.add('table-responsive-sm');

    let btnGuardar = document.getElementById('btn-guardar');
    btnGuardar.classList.add('btn');
    btnGuardar.classList.add('btn-outline-primary');

    let btnClear = document.getElementById('btn-clear');
    btnClear.classList.add('btn');
    btnGuardar.classList.add('btn-outline-secondary');

    let btnBorrar = document.getElementById('btn-borrar');
    btnBorrar.classList.add('btn');
    btnBorrar.classList.add('btn-outline-danger');
}

// -----------------------------------------------

export async function DrawTable(refresh = false, externalArray = null, drawEmpty = null)
{
    let table = document.getElementById('monsters-table');
    if(table)
    {
        table.remove();
    }

    let cards;

    // Si recibe una lista externa de monstruos para dibujar, no le pide al server para dibujar la tabla.
    // Caso contrario si lo hace.
    // Esto es importante porque en el filtrado va a trabajar con los monstruos cargados en memoria.
    if(!externalArray)
    {
        let daf = new DataAccessFetch();    
        cards = await daf.getData(url);
        monsters = cards;        
    }
    else
    {
        cards = externalArray;
    }

    if(cards.length > 0 || drawEmpty)
    {        
        DrawFilterPanel();
        SetFilterMechanics();
        DrawColumnsFilter();
        SetColumnsFilterMechanics();

        let miedo = 0;
        if(cards.length > 0)
        {
            miedo = extras.Average(cards, 'miedo');            
            cards = cards.sort( (a, b) => b['miedo'] - a['miedo']);
        }
        
        document.getElementById('miedo-av').value = miedo;

        //console.log('drawing table...');
        let container = document.getElementById('container');
        let cssTable = DD.CreateLink('stylesheet', './css/tabla.css');
        container.appendChild(cssTable);
        let table = DD.CreateTable(tableHeaders, 'monsters-table', cards, tableHeaderFilters);        
        
        container.appendChild(table);
        
        SetTableMechanics(table);
        ApplyBootstrap();
    }

    if(refresh)
    {
        storageManager.WriteSS('monsterLoaded', 'false');
        monsterLoaded = false;
        document.getElementsByClassName('siren')[0].classList.add('hidden');
        document.getElementById('btn-borrar').classList.add('hidden');
    }
}

// ---- TABLE FILTER

function DrawColumnsFilter()
{
    let colFilPanel = document.getElementById('col-filters-div');
    if(!colFilPanel)
    {
        let colFil = DD.CreateDiv('col-filters-div');    
        tableHeaders.forEach(head =>
        {
            let colFilDiv = DD.CreateDiv();
    
            let colFillabel = DD.CreateLabel(head);        
            let colFilCheck = DD.CreateInput(null, 'checkbox', head, false, head, 'col-filter');
            colFilCheck.checked = true;
    
            colFilDiv.appendChild(colFillabel);
            colFilDiv.appendChild(colFilCheck);
            colFil.appendChild(colFilDiv);
        });
        container.appendChild(colFil);
    }
}

function SetColumnsFilterMechanics()
{
    let colFilters = document.getElementsByClassName('col-filter');
    //console.log(colFilters.length);

    for(let i = 0; i < colFilters.length; i ++)
    {
        colFilters[i].addEventListener('change', ()=>
        {            
            tableHeaderFilters = [];
            for(let j = 0; j < colFilters.length; j++)
            {
                if(colFilters[j].checked)
                {
                    tableHeaderFilters.push(colFilters[j].value);
                }
                else
                {
                    tableHeaderFilters = tableHeaderFilters.filter(item => item !== colFilters[j].value);
                }
            }            
            
            let table = document.getElementById('monsters-table');
            if(table)
            {
                let rows = table.getElementsByTagName('tr');
                let headers = table.getElementsByTagName('th');

                for(let i = 0; i < headers.length; i++)
                {                    
                    let data = Object.keys(headers[i].dataset)[0];
                    if(!tableHeaderFilters.includes(data))
                    {
                        headers[i].classList.add('hidden');
                    }
                    else
                    {
                        headers[i].classList.remove('hidden');
                    }
                }

                for(let i = 0; i < rows.length; i++) // Itero por cada una de las filas
                {
                    let cells = rows[i].getElementsByTagName('td'); // Consigo todas las celdas de la fila
                    for( let j = 0; j < cells.length; j++) // Itero por cada una de las celdas
                    {
                        let data = Object.keys(cells[j].dataset)[0];
                        if(!tableHeaderFilters.includes(data))
                        {
                            cells[j].classList.add('hidden');
                        }
                        else
                        {
                            cells[j].classList.remove('hidden');
                        }
                    }
                }
            }
        });
    }
}

// ---- FILTER

function DrawFilterPanel()
{
    if(!document.getElementById('filter-div'))
    {
        let filterDiv = DD.CreateDiv('filter-div');
        container.appendChild(filterDiv);
        
        let fil1 = DD.CreateDiv('fil-div');
        let filterSelect = DD.CreateDropdown('filtro-tipo', ['Todos', 'Vampiro', 'Hombre Lobo', 'Fantasma', 'Bruja', 'Esqueleto']);
        let filterLabel = DD.CreateLegend('Filtro', 'filt1-lbl', 'filt1');    
        fil1.appendChild(filterLabel);
        fil1.appendChild(filterSelect);

        filterDiv.appendChild(fil1);

        //--------
        let miedoAvDiv = DD.CreateDiv('miedo-av-div');
        filterDiv.appendChild(miedoAvDiv);        
        let miedoAvLgn = DD.CreateLegend('Promedio Miedo', 'miedo-av-lgn');
        miedoAvDiv.appendChild(miedoAvLgn);        
        
        let miedoAvField = DD.CreateInput('miedo-av', 'text');
        miedoAvField.readOnly = true;
        miedoAvField.value = 0;

        miedoAvDiv.appendChild(miedoAvField);        
    }
}

function SetFilterMechanics()
{
    let filter = document.getElementById('filtro-tipo');

    filter.addEventListener('change', ()=>
    {        
        if(filter.value != 'Todos')
        {
            let monArray = monsters;
            monArray = extras.Filter(monArray, 'tipo', filter.value);
            DrawTable(false, monArray, true);            
        }
        else
        {
            DrawTable(false, monsters);            
        }
    });
}

// -----------------------------------------------

// SETEAR INPUTS ACA, SOLO SI CORRESPONDE ******************
export function InitInputs()
{
    inputs = {
        'nombre': document.getElementById('inputName'),
        'alias': document.getElementById('inputAlias'),        
        'miedo': document.getElementById('rng-miedo'),
        'tipo': document.getElementById('tipo-options'),
    };
    inputsDefaultValues = 
    {
        'nombre': '',
        'alias': '',        
        'miedo': 0,
        'tipo': 'Vampiro',
    }
    
    SetButtonClear(document.getElementById('btn-clear'));
    SetButtonGuardar(document.getElementById('btn-guardar'));
    SetButtonBorrar(document.getElementById('btn-borrar'));

    let miedoValue = document.getElementById('miedo-value');
    let rngMiedo = document.getElementById('rng-miedo');
    // MIEDO INPUT EVENT
    rngMiedo.addEventListener('input', ()=>
    {
        miedoValue.textContent = rngMiedo.value;
        var blue = rngMiedo.value * 255 / 100;
        var red = 255 - blue;
        miedoValue.style.color = "rgb(" + Math.round(blue) + ", 0, " + Math.round(red) + ")";
    });
    // SE EJECUTA EL INPUT DE rng-miedo PARA INICIALIZAR miedo-value
    document.getElementById('rng-miedo').dispatchEvent(new Event('input'));
    
    // SETEAR INPUTS PARA GUARDAR TEMPORARIAMENTE ACA ******************
    AddEventToInputsForTemporarySave();
}

// -----------------------------------------------

// SETEAR LA CARGA DEL MONSTRUO TEMPORAL ACA ******************
export function LoadMonsterSession()
{
    SetInitialMonster();
    let temporaryMonster = storageManager.ReadSS('temp-monster'); // carga de monstruo temporal
    if(temporaryMonster)
    {
        let lddMons = storageManager.ReadSS('monsterLoaded'); // carga del estado temporal; si el monstruo era de la tabla o no.
        if(lddMons && lddMons == 'true')
        {
            monsterLoaded = true;
            document.getElementsByClassName('siren')[0].classList.remove('hidden');
            document.getElementById('btn-borrar').classList.remove('hidden');
        }

        let tempMonster = JSON.parse(temporaryMonster); // parseo del monstruo temporal
        
        monster['id'] = tempMonster['id']; // seteo de la id del temporal al actual
        for(let prop in tempMonster)
        {
            if(!inputExceptions.includes(prop)) // carga de los datos a los INPUTS (!!)
            {
                monster[prop] = tempMonster[prop];
                inputs[prop].value = tempMonster[prop];
            }
        }

        monster['defensa'] = tempMonster['defensa'];        
        // carga de los datos a los inputs especiales aca.
        SetDefense(tempMonster['defensa']);

        document.getElementById('rng-miedo').dispatchEvent(new Event('input')); // disparo del evento del range 'miedo'
    }
}
//////////////////////////////////////// --- END OF FUNCTIONS FOR EXPORT

//////////////////////////////////////// --- PRIVATE FUNCTIONS
//function Set

// SETEAR LOS INPUTS QUE GUARDAN AL MONSTRUO TEMPORARIO ACA ******************
// RECORDAR MODIFICAR SetCurrentMonster
function AddEventToInputsForTemporarySave()
{
    let select = document.getElementById('tipo-options');
    let radios = document.querySelectorAll('input[type="radio"]');

    // Inputs comunes
    for(let prop in inputs)
    {
        inputs[prop].addEventListener('input', ()=>
        {            
            SetCurrentMonster();
        });
    }
    
    // Input SELECT
    select.addEventListener('change', ()=>
    {
        SetCurrentMonster();
    });

    // Inputs RADIO
    radios.forEach(rad =>
    {
        rad.addEventListener('change', ()=>
        {
            SetCurrentMonster();
        });
    })
}

// -----------------------------------------------

function SetCurrentMonster()
{
    // El monstruo toma los datos de los inputs comunes y el select
    for(let prop in inputs)
    {       
        monster[prop] = inputs[prop].value;
    }
    // El monstruo toma los datos de los radios
    monster.defensa = GetDefense();    

    storageManager.WriteSS('temp-monster', JSON.stringify(monster));
}

// -----------------------------------------------

function SetInitialMonster()
{
    monster = new Monstruo(initialMonster);
}

// -----------------------------------------------

function SetTableMechanics(tabla)
{
    let rows = tabla.getElementsByTagName('tr');
    let headers = tabla.getElementsByTagName('th');    

    for(let i = 0; i < rows.length; i++) // Itero por cada una de las filas
    {
        let cells = rows[i].getElementsByTagName('td'); // Consigo todas las celdas de la fila
        for( let j = 0; j < cells.length; j++) // Itero por cada una de las celdas
        {
            cells[j].addEventListener('click', ()=> // ... Y a cada una les asigno el siguiente codigo:
            {                
                let rowData = [];                
                for(let k = 0; k < cells.length; k++) // Al hacer click en cualquier celda, se cargan los datos de toda la fila.
                {
                    rowData.push(cells[k].textContent);
                    monster[headers[k].textContent.toLowerCase()] = cells[k].textContent;
                }
                monster.id = rows[i].dataset.id;                                
                console.log(monster);
                document.getElementsByClassName('siren')[0].classList.remove('hidden');
                document.getElementById('btn-borrar').classList.remove('hidden');
                LoadMonsterDataToForm(monster); // <<< -- CARGA DE LA TABLA AL FORM
            });
        }
    }
}

// -----------------------------------------------

// CARGA DE LA TABLA AL FORM
// SETEAR LA CARGA DEL MONSTRUO AL FROM ACA ******************
function LoadMonsterDataToForm(monster)
{
    for(let prop in monster)
    {
        if(!inputExceptions.includes(prop))
        {            
            inputs[prop].value = monster[prop];
        }        
    }
    SetDefense(monster['defensa']);

    document.getElementById('rng-miedo').dispatchEvent(new Event('input'));
    storageManager.WriteSS('monsterLoaded', 'true');
    monsterLoaded = true;
}

// -----------------------------------------------
// ----------------------------------------------- ZONA DE INPUTS ESPECIALES
// ----------------------------------------------- 

function SetDefense(value)
{
    let defensas = document.querySelectorAll('input[type="radio"]');
    for(let i = 0; i < defensas.length; i++)
    {
        if(defensas[i].value == value)
        {            
            defensas[i].checked = true;
            break;
        }
    }
}

// -----------------------------------------------

function GetDefense()
{
    let defensas = document.querySelectorAll('input[type="radio"]');
    let defensa = '';

    for(let i = 0; i < defensas.length; i++)
    {
        if(defensas[i].checked)
        {
            defensa = defensas[i].value;
            break;                
        }
    }
    return defensa;
}

// ----------------------------------------------- 
// ----------------------------------------------- ZONA DE BAJA IMPORTANCIA
// ----------------------------------------------- 

function ValidateFields()
{
    if(document.getElementById('inputName').value == '')
    {
        return false;
    }
    if(document.getElementById('inputAlias').value == '')
    {
        return false;
    }
    return true;
}

///////////////////////////////////////////////////////////// --- BUTTONS

function SetButtonGuardar(btn)
{
    btn.addEventListener('click', (e)=>
    {
        
        if(ValidateFields())
        {
            ControlSpinner(true);
            setTimeout(async () =>
            {                
                //let daf = new DataAccessFetch();
                let daf = new DataAccessXML(); // ACA ESTA XML <<<<< ----------------------------------------------------- 

                if(monster['id'] == '')
                {
                    //monster['id'] = storageManager.SetMonsterID();
                    let id = 0;
                    let monsters = await daf.getData(url); // XML GET
                    monsters.forEach(mon =>
                    {
                        id = mon['id'];
                    });
                    monster['id'] = id+1;
                }        
        
                console.log(monster);
        
                //storageManager.StoreMonster(monster);
                if(monsterLoaded)
                {
                    let response = await daf.putData(url, monster['id'], monster); // XML PUT
                    if(response)
                    {
                        ControlSpinner();
                    }
                    console.log(response);
                }
                else
                {
                    console.log(monster['id']);
                    let response = await daf.postData(url, monster); // XML POST
                    ControlSpinner();
                    console.log(response);
                }

                DrawTable(true);
                document.getElementById('btn-clear').dispatchEvent(new Event('click'));
            }, 1000);
            e.preventDefault();
        }
    });
}

// -----------------------------------------------

function SetButtonClear(btn)
{
    btn.addEventListener('click', (e)=>
    {
        SetInitialMonster();        
        SetDefense('estaca');
        for(let prop in inputs)
        {
            inputs[prop].value = inputsDefaultValues[prop];
        }        
        document.getElementById('rng-miedo').dispatchEvent(new Event('input'));

        storageManager.RemoveSS('temp-monster');
        storageManager.WriteSS('monsterLoaded', 'false');
        monsterLoaded = false;
        document.getElementsByClassName('siren')[0].classList.add('hidden');
        document.getElementById('btn-borrar').classList.add('hidden');
        e.preventDefault();
    });
}

// -----------------------------------------------

function SetButtonBorrar(btn)
{
    btn.addEventListener('click', (e)=>
    {
        if(monster['id'] != '')
        {
            ControlSpinner(true);
            setTimeout(async () =>
            {                
                //storageManager.DeleteMonster(monster['id']);
                let daf = new DataAccessAxios();                                // ACA ESTA AXIOS <<<<< ----------------------------------------------------- 
                let response = await daf.deleteData(url, monster['id']);        // DELETE AXIOS
                if(response)
                {
                    ControlSpinner();
                }
                console.log(response);
        
                DrawTable(true);
                document.getElementById('btn-clear').dispatchEvent(new Event('click'));
            }, timer);
        }
        e.preventDefault();
    });
}

// ----------------------------------------------- 

function ControlSpinner(tuki = null)
{
    if(tuki)
    {
        document.getElementById('dialog').classList.remove('hidden');
        //console.log('tuki');
    }
    else
    {
        document.getElementById('dialog').classList.add('hidden');
        //console.log('no tuki');
    }    
}
//////////////////////////////////////// --- END OF PRIVATE FUNCTIONS