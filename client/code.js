async function getEntities() {
    const response = await fetch('/api/wikidata');
    const data = await response.json();
    //console.log(data);
    return data
}
async function getEntitiesValor(id) {
    const response = await fetch(`/api/wikidata/${id}`);
    const data = await response.json();
    console.log(id);
    return data
}
// trae los valores de la tabla
async function getWikiMongoValues(id) {
    const response = await fetch(`/api/wikimongo/byTeamId/${id}`)
    const data = await response.json();
    console.log(id);
    return data;
}

// esto es una prueba de JSON
function fillEntities() {
    getEntities().then(data => {
        console.log(data);
        const ulEntities = document.getElementById("entities");
        const wikiTexto = document.getElementById("wikiTexto");
        // data.parse.forEach(entity => {
          const liEntity = document.createElement("li");
          const text = document.createTextNode(data.parse.text["*"]);
          console.log(data.parse.text)
          var doc = new DOMParser().parseFromString(data.parse.text["*"], "text/xml");
          var wrapper = document.createElement("div")
          wrapper.innerHTML = data.parse.text["*"]
          
        //   liEntity.appendChild(text);
        wikiTexto.appendChild(wrapper);
        //})
    })
}
// Obtiene eel id, y rellena los valores de la tabla de informacion segun la intancia de mongo DB y Wikidata
function fillEntitiesValor(id) {
    getEntitiesValor(id).then(data => {
        getWikiMongoValues(id).then(mongoData => {
            console.log(data);
            console.log(mongoData);
            
            if (mongoData.ok) { initDOM(mongoData.wikiMongo) } else {return}
            const wikiMongoData = mongoData.wikiMongo[0];
            console.log(wikiMongoData)
            const wikiTexto = document.getElementById("wikiTexto");
            const idImgTeam = document.getElementById("tblImgTeam");
            const idTeam_name = document.getElementById("tblTeamName");
            const idArrImages = document.getElementById("arrImages");
            const idInception = document.getElementById("tblInception");
            const idOfficial_name = document.getElementById("tblOfficialName");
            const idNickname = document.getElementById("tblNickname")
            const idCoach_name = document.getElementById("tblCoachName");
            const idLeague = document.getElementById("tblLeague"); 
            const idHome_venue = document.getElementById("tblHomeVenue");
            const idOwner_of = document.getElementById("tblOwnerOf");
            const idMap = document.getElementById("map");
            const idWeb_url = document.getElementById("tblWebURL");
            initChatBox();
            wikiTexto.innerHTML = data.parse.text["*"]

        // console.log( wikiTexto.querySelector('#P571').querySelector(".wikibase-snakview-value").textContent)
        // console.log( wikiTexto.querySelector('.wikibase-entitytermsview-aliases-alias').textContent)
        //console.log(wikiTexto.querySelector('#P1705').querySelector(".wikibase-snakview-value").textContent)
            let img;
            let teamName;
            let arrImages;
            let inception;
            let official_name;
            let nickname;
            let coach_name;
            let league;
            let home_venue;
            let owner_of;
            let location;
            let web_url;
            let strImage;
            // console.log(wikiMongoData.imgTeam.data)
            // console.log(bin2string(wikiMongoData.imgTeam.data))
            // logo del equipo
            if (wikiMongoData != undefined && wikiMongoData.imgTeam != null && wikiMongoData.imgTeam != ''){
                var imagen_Bin_String = bin2string(wikiMongoData.imgTeam.data)
                idImgTeam.src = `${imagen_Bin_String}`;
            }
            else if (wikiTexto.querySelector('#P154') != null){
                strImage = wikiTexto.querySelector('#P154').querySelector('.image').href;
                idImgTeam.src = `https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/${strImage.substring(strImage.indexOf('File:') + 5)}&width=200`
            } else {
                idImgTeam.src = 'images/no-image.jpg'
            }
            // Nombre del equipo
            if (wikiMongoData != undefined && wikiMongoData.teamName != null && wikiMongoData.teamName != ''){
                teamName = wikiMongoData.teamName
            }
            else if (wikiTexto.querySelector('#P1705') != null){
                teamName = wikiTexto.querySelector('#P1705').querySelector(".wikibase-snakview-value").textContent
            } else if (wikiTexto.querySelector('.wikibase-entitytermsview-aliases-alias') != null) {
                teamName = wikiTexto.querySelector('.wikibase-entitytermsview-aliases-alias').textContent
            } else {
                teamName = 'NO DATA';
            }
            // Imagenes
            if (data.parse.images.length > 0) {
                if (idArrImages.firstChild != '') {
                    idArrImages.innerHTML = '';
                }
                data.parse.images.forEach(entity => {
                    img = new Image()
                    img.src = `https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/${entity}&width=150`
                    img.style.marginRight = 5;
                    idArrImages.appendChild(img);
                })
            } else {
                if (idArrImages.firstChild != '') {
                    idArrImages.innerHTML = '';
                }
                img = new Image()
                img.src = 'images/no-image.jpg'
                img.style.width = 100;
                idArrImages.appendChild(img);
            }

            // Comienzos
            if (wikiMongoData != undefined && wikiMongoData.inception != null && wikiMongoData.inception != ''){
                inception = wikiMongoData.inception
            }
            else if(wikiTexto.querySelector('#P571') != null){
            inception = wikiTexto.querySelector('#P571').querySelector(".wikibase-snakview-value").textContent
            } else {
                inception = 'NO DATA';
            }
            // Nombre oficial
            if (wikiMongoData != undefined && wikiMongoData.officialName != null && wikiMongoData.officialName != ''){
                official_name = wikiMongoData.officialName
            }
            else if(wikiTexto.querySelector('#P1448') != null){
                official_name = wikiTexto.querySelector('#P1448').querySelector(".wikibase-snakview-value").textContent
            } else {
                official_name = 'NO DATA';
            }
            // Apodo
            if (wikiMongoData != undefined && wikiMongoData.nickname != null && wikiMongoData.nickname != ''){
                nickname = wikiMongoData.nickname
            }
            else if(wikiTexto.querySelector('#P1449') != null){
                nickname = wikiTexto.querySelector('#P1449').querySelector(".wikibase-snakview-value").textContent
            } else {
                nickname = 'NO DATA';
            }

            // Entrenador
            if (wikiMongoData != undefined && wikiMongoData.coachName != null && wikiMongoData.coachName != ''){
                coach_name = wikiMongoData.coachName
            }
            else if (wikiTexto.querySelector('#P286') != null) {
            coach_name = wikiTexto.querySelector('#P286').querySelector(".wikibase-snakview-value").querySelector("a").text
            } else {
                coach_name = 'NO DATA';
            }
            // Liga
            if (wikiMongoData != undefined && wikiMongoData.league != null && wikiMongoData.league != ''){
                league = wikiMongoData.league
            }
            else if (wikiTexto.querySelector('#P118') != null){
                league = wikiTexto.querySelector('#P118').querySelector(".wikibase-snakview-value").querySelector("a").text
            } else {
                league = 'NO DATA';
            }
            // Lugar de Origen
            if (wikiMongoData != undefined && wikiMongoData.homeVenue != null && wikiMongoData.homeVenue != ''){
                home_venue = wikiMongoData.homeVenue
            }
            else if (wikiTexto.querySelector('#P115') != null){
                home_venue = wikiTexto.querySelector('#P115').querySelector(".wikibase-snakview-value").querySelector("a").text
            } else {
                home_venue = 'NO DATA';
            }
            // Estadio
            if (wikiMongoData != undefined && wikiMongoData.ownerOf != null && wikiMongoData.ownerOf != ''){
                owner_of = wikiMongoData.ownerOf
            }
            else if (wikiTexto.querySelector('#P1830') != null){
                owner_of = wikiTexto.querySelector('#P1830').querySelector(".wikibase-snakview-value").querySelector("a").text
            } else {
                owner_of = 'NO DATA';
            }
            // Location
            if ((wikiMongoData != undefined && wikiMongoData.locLatitude != null && wikiMongoData.locLatitude != '') &&
            (wikiMongoData != undefined && wikiMongoData.locLongitude != null && wikiMongoData.locLongitude != '') &&
            (wikiMongoData != undefined && wikiMongoData.locZoomMap != null && wikiMongoData.locZoomMap != '')){
                let lat = wikiMongoData.locLatitude;
                let lon = wikiMongoData.locLongitude;
                let zoom = wikiMongoData.locZoomMap;
                createMap(lat, lon, zoom, idMap)
            }
            else if (wikiTexto.querySelector('#P159') != null
                && wikiTexto.querySelector('#P159').querySelector('.mw-kartographer-map') != null){
                    
                location = wikiTexto.querySelector('#P159').querySelector('.mw-kartographer-map').attributes
                let zoom = location[6].value;
                let lat = location[7].value;
                let lon = location[8].value;
                createMap(lat, lon, zoom, idMap)
            } else {
                idMap.classList.remove(...idMap.classList);
                idMap.innerHTML = '';
                idMap.style.width = 20;
                idMap.style.height = 20;
            }
            // Website
            if (wikiMongoData != undefined && wikiMongoData.webURL != null && wikiMongoData.webURL != ''){
                web_url = wikiMongoData.webURL
            }
            else if (wikiTexto.querySelector('#P856') != null){
                web_url = wikiTexto.querySelector('#P856').querySelector(".wikibase-snakview-value").querySelector("a").text
            } else {
                web_url = 'NO DATA';
            }
            
            idTeam_name.textContent = teamName;
            idInception.textContent = inception;
            idOfficial_name.textContent = official_name;
            idNickname.textContent = nickname;
            idCoach_name.textContent = coach_name;
            idLeague.textContent = league;
            idHome_venue.textContent = home_venue;
            idOwner_of.textContent = owner_of;
            idWeb_url.textContent = web_url;
        })
    })
}
// Inciializa el html - botones
function initDOM(wikiMongo) {
    
    const btnAddWiki = document.getElementById("idBtnAddWiki");
    const btnEditWiki = document.getElementById("idBtnEditWiki");
    if (wikiMongo.length > 0) {
        btnAddWiki.style.display = 'none';
        btnEditWiki.style.display = 'block'
    } else {
        btnAddWiki.style.display = 'block';
        btnEditWiki.style.display = 'none'
    }
}
// muestra el formulario o lo oculta
function showForm(mode) {
    const teamId = document.getElementById("teamId");
    const wikiForm = document.getElementById("wikiForm");
    const hiddenMode = document.getElementById("mode");
    teamId.value = document.getElementById("lstEquipos").value;
    hiddenMode.value = mode;
    if(mode === 'add') {
        wikiForm.style.display == 'none' ? wikiForm.style.display = 'block' : wikiForm.style.display = 'none'
    } else {
        wikiForm.style.display == 'none' ? wikiForm.style.display = 'block' : wikiForm.style.display = 'none'
        fillDataFromWikiMongo(teamId.value)
    }

}

// Inciliza un mapa con los de xyz, desde el paa de wiki
function createMap(lat, lon, zoom, idMap) {
    idMap.style.width = 200
    idMap.style.height = 200
    // Creating map options
    var mapOptions = {
        center: [lat, lon],
        zoom: zoom
    }
    
    // Creating a map object
    var map = new L.map('map', mapOptions);
    
    // Creating a Layer object
    var layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
    
    // Adding layer to the map
    map.addLayer(layer);
    let marker = new L.Marker([lat, lon]);
    marker.addTo(map);
}
// se guarda la info seun cambios en los registros del form
async function saveDataFromAdd() {
    const wikiForm = document.getElementById("wikiForm")
    const mode = document.getElementById("mode").value;
    var imgBinary;
    // var data = new FormData()
    // data.append('teamId', wikiForm["teamId"].value);
    // data.append('imgTeam', wikiForm["imgTeam"].files[0]);
    // data.append('teamName', wikiForm["teamName"].value);
    // data.append('inception', wikiForm["inception"].value);
    // data.append('officialName', wikiForm["officialName"].value);
    // data.append('nickname', wikiForm["nickname"].value);
    // data.append('coachName', wikiForm["coachName"].value);
    // data.append('homeVenue', wikiForm["homeVenue"].value);
    // data.append('ownerOf', wikiForm["ownerOf"].value);
    // data.append('locLatitude', wikiForm["locLatitude"].value);
    // data.append('locLongitude', wikiForm["locLongitude"].value);
    // data.append('locZoomMap', wikiForm["locZoomMap"].value);
    if (wikiForm["imgTeam"].files.length > 0){
        imgBinary = await obtainBinary(wikiForm["imgTeam"].files[0])
        console.log(imgBinary)
    }
    //toBase64(wikiForm["imgTeam"].files[0]).then(data => console.log(data))
    data = {
        teamId: wikiForm["teamId"].value,
        imgTeam: imgBinary,
        teamName: wikiForm["teamName"].value,
        inception: wikiForm["inception"].value,
        officialName: wikiForm["officialName"].value,
        nickname: wikiForm["nickname"].value,
        coachName: wikiForm["coachName"].value,
        homeVenue: wikiForm["homeVenue"].value,
        ownerOf: wikiForm["ownerOf"].value,
        locLatitude: wikiForm["locLatitude"].value,
        locLongitude: wikiForm["locLongitude"].value,
        locZoomMap: wikiForm["locZoomMap"].value
    }
    
    if (mode === 'add') {
        postDataToApiMongoDb(data)
    } else {
        putDataToApiMongoDb(data)
    }
    console.log(data)
    return false
}

// guarda informacion de por metodo post, para llegar al end poitn de la api (guarda)
async function postDataToApiMongoDb(data) {
    let url = '/api/wikimongo'
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    response.json(); // parses JSON response into native JavaScript objects
}

// actualiza
async function putDataToApiMongoDb(data) {
    const hiddenDocumentID = document.getElementById("documentID")
    let url = `/api/wikimongo/${hiddenDocumentID.value}`
    const response = await fetch(url, {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    response.json(); // parses JSON response into native JavaScript objects
}

// Si existe el dato en BD, se referescara la informacion en el form
async function fillDataFromWikiMongo(teamId) {
    getWikiMongoValues(teamId).then(mongoData => { 
        const hiddenDocumentID = document.getElementById("documentID");
        let data = mongoData.wikiMongo[0]
        hiddenDocumentID.value = data._id;
        wikiForm["teamName"].value = data.teamName != null ? data.teamName : ''
        wikiForm["inception"].value = data.inception != null ? data.inception : ''
        wikiForm["officialName"].value = data.officialName != null ? data.officialName : ''
        wikiForm["nickname"].value = data.nickname != null ? data.nickname : ''
        wikiForm["coachName"].value = data.coachName != null ? data.coachName : ''
        wikiForm["homeVenue"].value = data.homeVenue != null ? data.homeVenue : ''
        wikiForm["ownerOf"].value = data.ownerOf != null ? data.ownerOf : ''
        wikiForm["locLatitude"].value = data.locLatitude != null ? data.locLatitude : ''
        wikiForm["locLongitude"].value = data.locLongitude != null ? data.locLongitude : ''
        wikiForm["locZoomMap"].value = data.locZoomMap != null ? data.locZoomMap : ''
    })
}

// obtiene la promesa del dato trasnformar
async function obtainBinary(file){
    var data = await toBase64(file)
    return await data;
}

// Esto es transformador a BUFFER para guardar en BD.
const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

// esto trasnformamos la data desde la bd, a binario
function bin2string(array){
    var result = "";
    for(var i = 0; i < array.length; ++i){
        result+= (String.fromCharCode(array[i]));
    }
    return result;
}

// no pudimos implemntar
function initChatBox() {
    const idChatBox = document.getElementById("chatBox");
    
}