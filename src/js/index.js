const configuracao = document.getElementById("config");

const words = {
    BR: "src/txt/br.txt",
    EN: "src/txt/en.txt",
    ES: "src/txt/es.txt",
    FR: "src/txt/fr.txt",
    IT: "src/txt/it.txt",
};

let txt = Object.values(words)[Math.floor(Math.random() * Object.keys(words).length)];
let espacoPalavraPC = document.getElementById("palavraPC");
let palavraGeradaParaPC = "";
let palavraGeradaParaMobile = "";
let copiarComputador = document.getElementById("copiarPC");
let numeroP = "";
let numeroM = "";
let cont = 0;
let vetor = "off";
let corFundoPC = document.getElementById("telaPC");
let arrayTXT;
let mudarArray = document.getElementById("mudar_Array");
let done = 0;

corFundoPC.classList.add("palPcor");

function definirCaractereAleatorio() {
    cont++;
    cta = (vetor[(Math.floor(Math.random() * vetor.length))]);
}

function limpar() {
    espacoPalavraPC.textContent = "";
    copiarComputador.style = "background-color: whitesmoke;";
    document.getElementById("Qp").value = "30";
    numeroP = 30;
    cont = 0;
    corFundoPC.classList.remove("letrasPCor");
    corFundoPC.classList.remove("numerosPCor");
    corFundoPC.classList.remove("letrasNumerosPCor");
    corFundoPC.classList.remove("diversosPCor");
    corFundoPC.classList.remove("alfabetosPCor");
    corFundoPC.classList.remove("palPcor");
    document.getElementById("Qp").classList.remove("bloquear");
    document.getElementById("Qp").classList.remove("hidden");

    let pResumo = document.getElementById("resumoDinamico");
    if (pResumo) pResumo.innerHTML = "";
}

function changeArray() {
    fetch(txt)
        .then((res) => res.text())
        .then((data) => {
            (arrayTXT = data.split(/\r?\n/));
            definirPalavras();
        });
}

fetch(txt)
    .then((res) => res.text())
    .then((data) => {
        (arrayTXT = data.split(/\r?\n/));
        definirPalavras();
        switch (txt) {
            case "src/txt/br.txt":
                mudarArray.value = "BR";
                break;
            case "src/txt/en.txt":
                mudarArray.value = "EN";
                break;
            case "src/txt/es.txt":
                mudarArray.value = "ES";
                break;
            case "src/txt/fr.txt":
                mudarArray.value = "FR";
                break;
            case "src/txt/it.txt":
                mudarArray.value = "IT";
                break;
        }
    });

mudarArray.addEventListener("change", function (event) {
    selecionado = (mudarArray.value);
    txt = (words[selecionado]);
    changeArray();
});

document.getElementById("letras_numeros").addEventListener("click", () => {
    limpar();
    corFundoPC.classList.add("letrasNumerosPCor");
    vetor = letras_E_numeros;
    cont = 0;
    definirPC();
});

document.getElementById("letras").addEventListener("click", () => {
    limpar();
    corFundoPC.classList.add("letrasPCor");
    vetor = letras;
    cont = 0;
    definirPC();
});

document.getElementById("numeros").addEventListener("click", () => {
    limpar();
    corFundoPC.classList.add("numerosPCor");
    vetor = numeros;
    cont = 0;
    definirPC();
});

document.getElementById("diversos").addEventListener("click", () => {
    limpar();
    corFundoPC.classList.add("diversosPCor");
    vetor = caracteres;
    cont = 0;
    definirPC();
});

function numeroTrocadoPC() {
    cont = 0;
    espacoPalavraPC.textContent = "";
    copiarComputador.style = "background-color: whitesmoke;";
    numeroP = document.getElementById("Qp").value;

    switch (document.getElementById("Qp").value) {
        case "":
            numeroP = 30;
            break;
    }
    definirPC();
}

function definirPC() {
    while (cont < numeroP) {
        definirCaractereAleatorio();
        espacoPalavraPC.textContent += cta;
    }
}

copiarComputador.addEventListener("click", function () {
    try {
        palavraGeradaParaPC = espacoPalavraPC.textContent;
        copiarPalavra(palavraGeradaParaPC);
    } catch (problem) {
        copiarComputador.textContent = "💀";
        espacoPalavraPC.textContent = problem + ":<";
        setTimeout(function () {
            location.reload();
        }, 1000);
        return;
    }

    copiarComputador.style = "background-color: #50C878; font-size: xx-large;";
    copiarComputador.textContent = ":>";
    
    setTimeout(function () {
        copiarComputador.textContent = "⧉";
        
        switch (vetor) {
            case "off":
                defPC();
                break;
            default:
                cont = 0;
                espacoPalavraPC.textContent = "";
                definirPC();
        }
        
        copiarComputador.style = "background-color: whitesmoke;";
        done++;
        document.getElementById("done").textContent = "✓ " + done;
    }, 200);
});

function copiarPalavra(pal) {
    let palavraTemp = document.createElement("input");
    palavraTemp.value = pal;
    document.body.appendChild(palavraTemp);
    palavraTemp.select();
    document.execCommand("copy");
    document.body.removeChild(palavraTemp);
}

function definirPalavras() {
    limpar();
    document.getElementById("Qp").classList.add("bloquear");
    vetor = "off";
    corFundoPC.classList.add("palPcor");
    defPC();
    document.getElementById("Qp").classList.add("hidden");
}

function defPC() {
    let palavraSorteada = arrayTXT[Math.floor(Math.random() * arrayTXT.length)];
    if (vetor === "off") {
        summaryWord(palavraSorteada);
    } else {
        espacoPalavraPC.textContent = palavraSorteada;
    }
}

let textCont = document.getElementById("contadorTexto");
let maxN = 8;
let nowN = maxN;
let contando;

contador();

function contador() {
    nowN = maxN;
    textCont.classList.toggle("hidden");
    document.getElementById("stuffs").classList.toggle("hidden");
    if (textCont.classList.contains("hidden")) {
        clearInterval(contando);
        document.getElementById("stuffs").classList.add("hidden");
        return;
    }
    contando = setInterval(function () {
        nowN--;
        textCont.textContent = nowN;
        if (nowN <= 0) {
            nowN = maxN;
            textCont.textContent = "🔎";
        }
    }, 1000);
}

async function summaryWord(summaryIt) {
    let langKey = Object.keys(words).find(key => words[key] === txt).toLowerCase();
    let langAPI = langKey === "br" ? "pt" : langKey;
    const cleanWord = summaryIt.trim().toLowerCase();

    let espacoPalavraPC = document.getElementById("palavraPC");
    espacoPalavraPC.textContent = "..."; 

    try {
        const searchUrl = `https://${langAPI}.wiktionary.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(cleanWord)}&srwhat=nearmatch&format=json&origin=*`;
        const searchRes = await fetch(searchUrl);

        if (!searchRes.ok) throw new Error("Erro fetch 1");

        const searchData = await searchRes.json();
        const firstResult = searchData?.query?.search?.[0];

        if (firstResult) {
            const pageTitle = firstResult.title;
            const parseUrl = `https://${langAPI}.wiktionary.org/w/api.php?action=parse&page=${encodeURIComponent(pageTitle)}&prop=text&format=json&origin=*`;
            const parseRes = await fetch(parseUrl);

            if (!parseRes.ok) throw new Error("Erro fetch 2");

            const parseData = await parseRes.json();
            const html = parseData?.parse?.text?.["*"];

            if (html) {
                const doc = new DOMParser().parseFromString(html, "text/html");
                doc.querySelectorAll("style, script, .metadata, .ambox").forEach(el => el.remove());

                let defs = [...doc.querySelectorAll("ol li")]
                    .map(li => li.innerText.trim().replace(/\n/g, ' '))
                    .filter(x => x.length > 10 && !x.includes(".mw-parser-output"))
                    .slice(0, 1);

                if (defs.length === 0) {
                    defs = [...doc.querySelectorAll("p")]
                        .map(par => par.innerText.trim().replace(/\n/g, ' '))
                        .filter(x => x.length > 20 && !x.includes(".mw-parser-output"))
                        .slice(0, 1);
                }

                if (defs.length > 0) {
                    let primeiraFrase = defs[0].split('.')[0]; 
                    
                    espacoPalavraPC.textContent = summaryIt + " - " + primeiraFrase;
                    return;
                }
            }
        }
        
        throw new Error("Error");

    } catch (err) {
        espacoPalavraPC.textContent = summaryIt;
    }
}