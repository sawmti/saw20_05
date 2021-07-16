async function getEntities() {
    const response = await fetch('/api/entities');
    const data = await response.json();
    //console.log(data);
    return data
}
async function getEntitiesValor(id) {
    const response = await fetch(`/api/entities/${id}`);
    const data = await response.json();
    console.log(id);
    return data
}


function fillEntities() {
    getEntities().then(data => {
        console.log(data);
        const ulEntities = document.getElementById("entities");
        data.parse.images.forEach(entity => {
          const liEntity = document.createElement("li");
          const text = document.createTextNode(entity);
          liEntity.appendChild(text);
          ulEntities.appendChild(liEntity);
        })
    })
}

function fillEntitiesValor(Id) {

    var valorChaya = Id;
    getEntitiesValor(valorChaya).then(data => {
        console.log(data);
        const ulEntities = document.getElementById("entities");
        data.parse.images.forEach(entity => {
          const liEntity = document.createElement("li");
          const text = document.createTextNode(entity);
          liEntity.appendChild(text);
          ulEntities.appendChild(liEntity);
        })
    })
}