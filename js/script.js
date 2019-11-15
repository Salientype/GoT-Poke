


const skillsPoolTable = document.createElement('table');

const skillsPoolTableSetup =`
<thead>
    <tr>
        <th scope="col">Skill Name</th>
        <th scope="col">Power</th>
        <th scope="col">Mana</th>
    </tr>
</thead>
<tbody>
    <tr>
        <th scope="row">1</th>
    
    </tr>
    <tr>
        <th scope="row">2</th>

    </tr>
    <tr>
        <th scope="row">3</th>
    
    </tr>
</tbody>
`;

skillsPoolTable.innerHTML = skillsPoolTableSetup;
let skillsArray = [];

const frodo = new Player('Frodo', 'hobbit', 'male');
frodo.fetchData('https://pokeapi.co/api/v2/move-category/0/', function(response) {
    
    skillsArray = response;
    console.log(skillsArray);

});

setTimeout ( function() { console.log(skillsArray) }, 1000);
