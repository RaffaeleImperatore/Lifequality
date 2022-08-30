const bottone = document.getElementById('searchButton');

bottone.addEventListener('click', function(){

    document.getElementById("categorie").innerHTML = "";
    document.getElementById("sommario").innerHTML = "";
    let input = document.getElementById('city');
    let valore = input.value;
    valore = valore.toLowerCase();
    valore = valore.replace(' ','-');

    if (valore != "") {
        
            async function getData() {
            const response = await fetch(`https://api.teleport.org/api/urban_areas/slug:${valore}/scores/`);                     
            const text = await response.json();  
            try {                   
            const categories = _.get(text, "text.categories", "");
            const summary = _.get(text, "text.summary", "");            
            text.categories.forEach((e,i)=>{
                const elem = document.createElement("div");
                elem.id = `cat${i}`;
                elem.textContent = `${e.name}: ${(e.score_out_of_10).toFixed(2)}`;
                elem.setAttribute("style", `color: ${e.color};`);
                document.getElementById('categorie').appendChild(elem);
            })
            sommario.insertAdjacentHTML("afterbegin", text.summary);
            console.log(categories);
            console.log(summary);
        } catch {
            const elem = document.createElement("div");
            elem.textContent = `Città inserita non presente in elenco, si prega di riprovare`;
            elem.setAttribute("style", "color: red;");
            document.getElementById('categorie').appendChild(elem);
        }
        }
        getData();  
    } 
})