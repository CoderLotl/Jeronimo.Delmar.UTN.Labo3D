export class Extras
{
    Filter(array, attribute, value)
    {
        return array.filter(obj => obj[attribute] == value);
    }

    Average(array, attribute)
    {
        let accum = array.reduce( (acc,  obj) =>
        {
            return acc + parseInt(obj[attribute]);
        }, 0);        

        return accum / array.length;
    }
}