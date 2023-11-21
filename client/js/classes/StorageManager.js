export class StorageManager
{
    WriteLS(key, value)
    {
        localStorage.setItem(key, value);
    }

    WriteSS(key, value)
    {
        sessionStorage.setItem(key, value);
    }

    ReadLS(key)
    {
        return localStorage.getItem(key);
    }

    ReadSS(key)
    {
        return sessionStorage.getItem(key);
    }

    RemoveLS(key)
    {
        localStorage.removeItem(key);
    }

    RemoveSS(key)
    {
        sessionStorage.removeItem(key);
    }

    DeleteMonster(id)
    {
        let monsters = this.ReadLS('cards');
        monsters = JSON.parse(monsters);
        monsters = monsters.filter(item => item.id != id);
        this.WriteLS('cards', JSON.stringify(monsters));
    }

    StoreMonster(monster)
    {
        let monstersArray = JSON.parse(this.ReadLS('cards')) || [];        
        let monsterFound = false;

        if(monstersArray.length > 0)
        {
            for(let i = 0; i < monstersArray.length; i++)
            {
                if(monstersArray[i]['id'] == monster['id'])
                {
                    monstersArray[i] = monster;
                    monsterFound = true;
                    break;
                }
            }
        }
        
        if(!monsterFound)
        {
            monstersArray.push(monster);
        }
        monstersArray = JSON.stringify(monstersArray);
        
        this.WriteLS('cards', monstersArray);
    }

    SetMonsterID()
    {
        let monstersArray = JSON.parse(this.ReadLS('cards')) || [];
        let monID = 1;

        if(monstersArray.length > 0)
        {
            monstersArray.forEach(mon =>
            {
                monID = mon['id'];
            });
            monID++;
        }

        return monID;
    }
}