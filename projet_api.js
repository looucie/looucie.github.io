function listProjetDetail(domElementId, projetData) {
    const params = new URLSearchParams(window.location.search);
    const projName = params.get("projetName");
    const projId = getProjetIdByName(projName, projetData);
    
    console.log("Nom récupéré:", projName);
    console.log("ID trouvé:", projId);
    
    if (!projId) {
        console.error("Projet non trouvé:", projName);
        return;
    }
    
    const projet = projetData[projId];
    const domElement = document.getElementById(domElementId);
    
    domElement.innerHTML = `
        <div class="titreprojet">
            <img src="photos/${projet.cover}.png" alt="projet ${projet.name}">
            <div class="titre_text">
                <h1>${projet.name}</h1>
                <div class="button">${projet.categorie}</div>
            </div>
        </div>
        <div class="description">
            <p>${projet.contexte}</p>
            <p>${projet.objectifs}</p>
        </div>
        <div class="etapesetcompé" style="display: flex; flex-direction: row; align-items: flex-start; gap: 5%;">
            <div class="etapes" style="background-color: ${projet.color};">
            <h2>Etapes clés</h2>
            <ul class="chiffres">
                ${projet.etapes.map(etape => `<li>${etape}</li>`).join('')}
            </ul>
            </div>
            <div class="compétences" style="background-color: ${projet.color};"> 
            <h2>Compétences</h2>
            <ul class="points">
                ${projet.soft_skills.map(soft => `<li>${soft}</li>`).join('')}
                </br>
                ${projet.hard_skills.map(hard => `<li>${hard}</li>`).join('')}
            </ul>
            </div>
        </div>
        <div class="outils_card">
            <div class="outils" style="background-color: ${projet.color};">
            <h2>Outils</h2>
            <div class="images_outils">
                ${projet.outils.map(outil => `<img src="photos/outils/${outil}.svg">`).join('')}
            </div>
            </div>
        </div>
        <center>
            <iframe src="${projet.prototype}" width="1080" height="800"></iframe>
        </center>
    `;
}


function getProjetIdByName(name, projetData) {
    for (let key in projetData) {
        if (projetData[key].name == name) {
            return key;
        }
    }
    return null; // Retourner null si non trouvé
}


function listAllProjet(domElementId, projetData) {
    const domElement = document.getElementById(domElementId);
    
    domElement.innerHTML = Object.entries(projetData)
        .sort((a, b) => parseInt(b[0]) - parseInt(a[0]))
        .map(([id, projet]) => `
            <a href="projet.html?projetName=${encodeURIComponent(projet.name)}" class="projet">
                <img src="photos/${projet.cover}.png">
                <button id="${projet.categorie}">${projet.categorie}</button>
                <p>${projet.name}</p>
            </a>
        `).join('');
}


function list3Projet(domElementId, projetData, selectedIds = [7, 6, 3]) {
    const domElement = document.getElementById(domElementId);
    const classes = ['projet', 'projet2', 'projet3'];

    domElement.innerHTML = selectedIds
        .filter(id => projetData[id])
        .map((id, index) => {
            const projet = projetData[id];
            return `
                <a href="projet.html?projetName=${encodeURIComponent(projet.name)}" class="${classes[index]}">
                    <img src="photos/${projet.cover}.png" />
                    <p>${projet.name}</p>
                </a>
            `;
        }).join('');
}