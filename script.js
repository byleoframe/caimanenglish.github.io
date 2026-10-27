/* ============================================================
   APRENDE INGLÉS CON EL CAIMÁN — script.js
   ============================================================
   ESTRUCTURA:
     1. DATOS (arrays con todo el contenido)
     2. FUNCIONES DE RENDERIZADO (pintan cada sección)
     3. JUEGOS (6 juegos didácticos)
     4. INICIO (se llama todo al cargar la página)
   ============================================================ */

/* ──────────────────────────────────────────────────────────
   1. DATOS
   ────────────────────────────────────────────────────────── */

// ── Abecedario ──────────────────────────────────────────────
const ALPHABET = [
  { letra:"A", palabra:"Apple",     pron:"ápol",      es:"Manzana"  },
  { letra:"B", palabra:"Ball",      pron:"bol",       es:"Pelota"   },
  { letra:"C", palabra:"Cat",       pron:"kat",       es:"Gato"     },
  { letra:"D", palabra:"Dog",       pron:"dog",       es:"Perro"    },
  { letra:"E", palabra:"Elephant",  pron:"éle-fant",  es:"Elefante" },
  { letra:"F", palabra:"Fish",      pron:"fish",      es:"Pez"      },
  { letra:"G", palabra:"Grapes",    pron:"greips",    es:"Uvas"     },
  { letra:"H", palabra:"House",     pron:"jáus",      es:"Casa"     },
  { letra:"I", palabra:"Ice",       pron:"ais",       es:"Hielo"    },
  { letra:"J", palabra:"Juice",     pron:"yus",       es:"Jugo"     },
  { letra:"K", palabra:"Kite",      pron:"kait",      es:"Cometa"   },
  { letra:"L", palabra:"Lion",      pron:"láion",     es:"León"     },
  { letra:"M", palabra:"Monkey",    pron:"mánki",     es:"Mono"     },
  { letra:"N", palabra:"Night",     pron:"nait",      es:"Noche"    },
  { letra:"O", palabra:"Orange",    pron:"óranch",    es:"Naranja"  },
  { letra:"P", palabra:"Penguin",   pron:"pénguin",   es:"Pingüino" },
  { letra:"Q", palabra:"Queen",     pron:"kuín",      es:"Reina"    },
  { letra:"R", palabra:"Rain",      pron:"rein",      es:"Lluvia"   },
  { letra:"S", palabra:"Sun",       pron:"san",       es:"Sol"      },
  { letra:"T", palabra:"Tiger",     pron:"táiger",    es:"Tigre"    },
  { letra:"U", palabra:"Umbrella",  pron:"ambréla",   es:"Paraguas" },
  { letra:"V", palabra:"Violin",    pron:"váio-lin",  es:"Violín"   },
  { letra:"W", palabra:"Water",     pron:"uóter",     es:"Agua"     },
  { letra:"X", palabra:"Xylophone", pron:"záilo-fon", es:"Xilófono" },
  { letra:"Y", palabra:"Yellow",    pron:"yélou",     es:"Amarillo" },
  { letra:"Z", palabra:"Zebra",     pron:"zíbra",     es:"Cebra"    }
];

// ── Números: generados automáticamente ─────────────────────
function numAIngles(n) {
  const u = ["","one","two","three","four","five","six","seven","eight","nine",
             "ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen",
             "seventeen","eighteen","nineteen"];
  const d = ["","","twenty","thirty","forty","fifty","sixty","seventy","eighty","ninety"];
  if (n === 1000) return "one thousand";
  if (n % 100 === 0 && n > 100) {
    const hundreds = ["","one","two","three","four","five","six","seven","eight","nine"];
    return hundreds[n/100] + " hundred";
  }
  if (n === 100) return "one hundred";
  if (n < 20)    return u[n];
  return d[Math.floor(n/10)] + (n%10 ? "-" + u[n%10] : "");
}
function numAEspanol(n) {
  const u = ["","uno","dos","tres","cuatro","cinco","seis","siete","ocho","nueve",
             "diez","once","doce","trece","catorce","quince","dieciséis",
             "diecisiete","dieciocho","diecinueve"];
  const d = ["","","veinte","treinta","cuarenta","cincuenta","sesenta","setenta","ochenta","noventa"];
  const c = ["","cien","doscientos","trescientos","cuatrocientos","quinientos",
             "seiscientos","setecientos","ochocientos","novecientos"];
  if (n === 1000) return "mil";
  if (n % 100 === 0 && n > 100) return c[n/100];
  if (n === 100) return "cien";
  if (n < 20)    return u[n];
  if (n < 30)    return n === 20 ? "veinte" : "veinti" + u[n%10];
  return d[Math.floor(n/10)] + (n%10 ? " y " + u[n%10] : "");
}
// 1–100 (every number) + 200, 300, ..., 1000
const NUMEROS = [
  ...Array.from({length:100}, (_,i) => ({ valor:i+1, en:numAIngles(i+1), es:numAEspanol(i+1) })),
  ...([200,300,400,500,600,700,800,900,1000].map(n => ({ valor:n, en:numAIngles(n), es:numAEspanol(n) })))
];

// ── Verbo To Be ─────────────────────────────────────────────
const TOBE_PRESENT = [
  { pronoun:"I",     forma:"am",  pron:"am",  ej:"I am a student.",        tr:"Yo soy estudiante."         },
  { pronoun:"You",   forma:"are", pron:"ar",  ej:"You are my friend.",      tr:"Tú eres mi amigo."           },
  { pronoun:"He",    forma:"is",  pron:"is",  ej:"He is tall.",             tr:"Él es alto."                 },
  { pronoun:"She",   forma:"is",  pron:"is",  ej:"She is happy.",           tr:"Ella está feliz."            },
  { pronoun:"It",    forma:"is",  pron:"is",  ej:"It is a cat.",            tr:"Es un gato."                 },
  { pronoun:"We",    forma:"are", pron:"ar",  ej:"We are in Bolivia.",      tr:"Estamos en Bolivia."         },
  { pronoun:"You",   forma:"are", pron:"ar",  ej:"You are all welcome.",    tr:"Todos son bienvenidos."      },
  { pronoun:"They",  forma:"are", pron:"ar",  ej:"They are my classmates.", tr:"Ellos son mis compañeros."   }
];
const TOBE_PAST = [
  { pronoun:"I",     forma:"was",  pron:"uos", ej:"I was at school.",        tr:"Yo estaba en la escuela."   },
  { pronoun:"You",   forma:"were", pron:"uer", ej:"You were very kind.",     tr:"Tú eras muy amable."         },
  { pronoun:"He",    forma:"was",  pron:"uos", ej:"He was tired.",           tr:"Él estaba cansado."          },
  { pronoun:"She",   forma:"was",  pron:"uos", ej:"She was a teacher.",      tr:"Ella era profesora."         },
  { pronoun:"It",    forma:"was",  pron:"uos", ej:"It was raining.",         tr:"Estaba lloviendo."           },
  { pronoun:"We",    forma:"were", pron:"uer", ej:"We were happy.",          tr:"Estábamos felices."          },
  { pronoun:"You",   forma:"were", pron:"uer", ej:"You were late.",          tr:"Ustedes llegaron tarde."     },
  { pronoun:"They",  forma:"were", pron:"uer", ej:"They were at the park.",  tr:"Ellos estaban en el parque." }
];

// ── Adjetivos ───────────────────────────────────────────────
const ADJETIVOS = [
  { en:"happy",     es:"feliz",       ej:"She is very happy.",        cat:"sentimientos", op:"sad"      },
  { en:"sad",       es:"triste",      ej:"He looks sad today.",       cat:"sentimientos", op:"happy"    },
  { en:"angry",     es:"enojado",     ej:"Don't be angry.",           cat:"sentimientos", op:"calm"     },
  { en:"calm",      es:"tranquilo",   ej:"Stay calm, please.",        cat:"sentimientos", op:"angry"    },
  { en:"excited",   es:"emocionado",  ej:"I'm so excited!",           cat:"sentimientos", op:"bored"    },
  { en:"bored",     es:"aburrido",    ej:"I'm bored.",                cat:"sentimientos", op:"excited"  },
  { en:"scared",    es:"asustado",    ej:"The child is scared.",      cat:"sentimientos", op:"brave"    },
  { en:"brave",     es:"valiente",    ej:"Be brave!",                 cat:"sentimientos", op:"scared"   },
  { en:"big",       es:"grande",      ej:"It's a big house.",         cat:"tamaño",       op:"small"    },
  { en:"small",     es:"pequeño",     ej:"A small dog.",              cat:"tamaño",       op:"big"      },
  { en:"tall",      es:"alto",        ej:"He is very tall.",          cat:"tamaño",       op:"short"    },
  { en:"short",     es:"bajo/corto",  ej:"She is short.",             cat:"tamaño",       op:"tall"     },
  { en:"long",      es:"largo",       ej:"A long road.",              cat:"tamaño",       op:"short"    },
  { en:"wide",      es:"ancho",       ej:"A wide street.",            cat:"tamaño",       op:"narrow"   },
  { en:"narrow",    es:"estrecho",    ej:"A narrow path.",            cat:"tamaño",       op:"wide"     },
  { en:"heavy",     es:"pesado",      ej:"This bag is heavy.",        cat:"tamaño",       op:"light"    },
  { en:"red",       es:"rojo",        ej:"A red apple.",              cat:"color",        op:""         },
  { en:"blue",      es:"azul",        ej:"The blue sky.",             cat:"color",        op:""         },
  { en:"green",     es:"verde",       ej:"Green leaves.",             cat:"color",        op:""         },
  { en:"yellow",    es:"amarillo",    ej:"A yellow sun.",             cat:"color",        op:""         },
  { en:"black",     es:"negro",       ej:"A black cat.",              cat:"color",        op:"white"    },
  { en:"white",     es:"blanco",      ej:"White snow.",               cat:"color",        op:"black"    },
  { en:"kind",      es:"amable",      ej:"She is very kind.",         cat:"personalidad", op:"mean"     },
  { en:"mean",      es:"malo/cruel",  ej:"Don't be mean.",            cat:"personalidad", op:"kind"     },
  { en:"funny",     es:"gracioso",    ej:"He is so funny.",           cat:"personalidad", op:"serious"  },
  { en:"serious",   es:"serio",       ej:"A serious student.",        cat:"personalidad", op:"funny"    },
  { en:"lazy",      es:"perezoso",    ej:"Don't be lazy!",            cat:"personalidad", op:"hardworking"},
  { en:"hardworking",es:"trabajador", ej:"She is hardworking.",       cat:"personalidad", op:"lazy"     },
  { en:"smart",     es:"inteligente", ej:"A smart kid.",              cat:"personalidad", op:"foolish"  },
  { en:"foolish",   es:"tonto",       ej:"Don't be foolish.",         cat:"personalidad", op:"smart"    },
  { en:"beautiful", es:"hermoso",     ej:"A beautiful flower.",       cat:"apariencia",   op:"ugly"     },
  { en:"ugly",      es:"feo",         ej:"An ugly monster.",          cat:"apariencia",   op:"beautiful"},
  { en:"clean",     es:"limpio",      ej:"Keep it clean.",            cat:"apariencia",   op:"dirty"    },
  { en:"dirty",     es:"sucio",       ej:"Dirty shoes.",              cat:"apariencia",   op:"clean"    },
  { en:"new",       es:"nuevo",       ej:"A new book.",               cat:"apariencia",   op:"old"      },
  { en:"old",       es:"viejo",       ej:"An old man.",               cat:"apariencia",   op:"new"      },
  { en:"fast",      es:"rápido",      ej:"A fast car.",               cat:"opuestos",     op:"slow"     },
  { en:"slow",      es:"lento",       ej:"A slow turtle.",            cat:"opuestos",     op:"fast"     },
  { en:"hot",       es:"caliente",    ej:"Hot coffee.",               cat:"opuestos",     op:"cold"     },
  { en:"cold",      es:"frío",        ej:"Cold water.",               cat:"opuestos",     op:"hot"      }
];

// ── Pronombres ──────────────────────────────────────────────
const PRONOMBRES = [
  { persona:"1ª sing.", suj:"I",    pron:"ai",   obj:"me",   posAdj:"my",    posPron:"mine",   refl:"myself",     es:"yo"         },
  { persona:"2ª sing.", suj:"You",  pron:"yu",   obj:"you",  posAdj:"your",  posPron:"yours",  refl:"yourself",   es:"tú/usted"   },
  { persona:"3ª m.",    suj:"He",   pron:"ji",   obj:"him",  posAdj:"his",   posPron:"his",    refl:"himself",    es:"él"         },
  { persona:"3ª f.",    suj:"She",  pron:"shi",  obj:"her",  posAdj:"her",   posPron:"hers",   refl:"herself",    es:"ella"       },
  { persona:"3ª n.",    suj:"It",   pron:"it",   obj:"it",   posAdj:"its",   posPron:"its",    refl:"itself",     es:"eso/ello"   },
  { persona:"1ª pl.",   suj:"We",   pron:"ui",   obj:"us",   posAdj:"our",   posPron:"ours",   refl:"ourselves",  es:"nosotros"   },
  { persona:"2ª pl.",   suj:"You",  pron:"yu",   obj:"you",  posAdj:"your",  posPron:"yours",  refl:"yourselves", es:"ustedes"    },
  { persona:"3ª pl.",   suj:"They", pron:"dei",  obj:"them", posAdj:"their", posPron:"theirs", refl:"themselves", es:"ellos/ellas"}
];

const PRON_EJEMPLOS = [
  { etiqueta:"Sujeto",        en:"I am from Bolivia.",      es:"Yo soy de Bolivia."       },
  { etiqueta:"Objeto",        en:"She likes me.",           es:"Ella me quiere."           },
  { etiqueta:"Adj. Posesivo", en:"This is my book.",        es:"Este es mi libro."         },
  { etiqueta:"Pron. Posesivo",en:"This book is mine.",      es:"Este libro es mío."        },
  { etiqueta:"Reflexivo",     en:"I hurt myself.",          es:"Me lastimé."               },
  { etiqueta:"Sujeto he/she", en:"He is my teacher.",       es:"Él es mi profesor."        },
  { etiqueta:"Objeto he/she", en:"I gave her a gift.",      es:"Le di un regalo a ella."   },
  { etiqueta:"Plural sujeto", en:"They play soccer.",       es:"Ellos juegan fútbol."      },
  { etiqueta:"Plural obj.",   en:"I see them every day.",   es:"Los veo todos los días."   },
  { etiqueta:"Pos. plural",   en:"Their house is big.",     es:"Su casa (de ellos) es grande."},
  { etiqueta:"It (animal)",   en:"It is sleeping.",         es:"Está durmiendo."           },
  { etiqueta:"We",            en:"We are students.",        es:"Somos estudiantes."        }
];

// ── 50 Verbos ───────────────────────────────────────────────
const VERBOS = [
  { base:"be",        pron:"bi",      pasado:"was/were",  es:"ser/estar",     regular:false },
  { base:"have",      pron:"jav",     pasado:"had",       es:"tener",         regular:false },
  { base:"do",        pron:"du",      pasado:"did",       es:"hacer",         regular:false },
  { base:"go",        pron:"gou",     pasado:"went",      es:"ir",            regular:false },
  { base:"say",       pron:"sei",     pasado:"said",      es:"decir",         regular:false },
  { base:"get",       pron:"get",     pasado:"got",       es:"obtener",       regular:false },
  { base:"make",      pron:"meik",    pasado:"made",      es:"hacer/fabricar",regular:false },
  { base:"know",      pron:"nou",     pasado:"knew",      es:"saber/conocer", regular:false },
  { base:"think",     pron:"zink",    pasado:"thought",   es:"pensar",        regular:false },
  { base:"see",       pron:"si",      pasado:"saw",       es:"ver",           regular:false },
  { base:"come",      pron:"kam",     pasado:"came",      es:"venir",         regular:false },
  { base:"take",      pron:"teik",    pasado:"took",      es:"tomar/llevar",  regular:false },
  { base:"give",      pron:"giv",     pasado:"gave",      es:"dar",           regular:false },
  { base:"find",      pron:"faind",   pasado:"found",     es:"encontrar",     regular:false },
  { base:"eat",       pron:"it",      pasado:"ate",       es:"comer",         regular:false },
  { base:"run",       pron:"ran",     pasado:"ran",       es:"correr",        regular:false },
  { base:"write",     pron:"rait",    pasado:"wrote",     es:"escribir",      regular:false },
  { base:"read",      pron:"rid",     pasado:"read",      es:"leer",          regular:false },
  { base:"speak",     pron:"spik",    pasado:"spoke",     es:"hablar",        regular:false },
  { base:"sit",       pron:"sit",     pasado:"sat",       es:"sentarse",      regular:false },
  { base:"stand",     pron:"stand",   pasado:"stood",     es:"pararse",       regular:false },
  { base:"leave",     pron:"liv",     pasado:"left",      es:"dejar/salir",   regular:false },
  { base:"put",       pron:"put",     pasado:"put",       es:"poner",         regular:false },
  { base:"begin",     pron:"bigín",   pasado:"began",     es:"comenzar",      regular:false },
  { base:"keep",      pron:"kip",     pasado:"kept",      es:"mantener",      regular:false },
  { base:"play",      pron:"plei",    pasado:"played",    es:"jugar/tocar",   regular:true  },
  { base:"walk",      pron:"uok",     pasado:"walked",    es:"caminar",       regular:true  },
  { base:"talk",      pron:"tok",     pasado:"talked",    es:"hablar/charlar",regular:true  },
  { base:"work",      pron:"uork",    pasado:"worked",    es:"trabajar",      regular:true  },
  { base:"live",      pron:"liv",     pasado:"lived",     es:"vivir",         regular:true  },
  { base:"love",      pron:"lav",     pasado:"loved",     es:"amar",          regular:true  },
  { base:"like",      pron:"laik",    pasado:"liked",     es:"gustar",        regular:true  },
  { base:"want",      pron:"uont",    pasado:"wanted",    es:"querer",        regular:true  },
  { base:"need",      pron:"nid",     pasado:"needed",    es:"necesitar",     regular:true  },
  { base:"help",      pron:"jelp",    pasado:"helped",    es:"ayudar",        regular:true  },
  { base:"try",       pron:"trai",    pasado:"tried",     es:"intentar",      regular:true  },
  { base:"ask",       pron:"ask",     pasado:"asked",     es:"preguntar",     regular:true  },
  { base:"answer",    pron:"ánser",   pasado:"answered",  es:"responder",     regular:true  },
  { base:"call",      pron:"kol",     pasado:"called",    es:"llamar",        regular:true  },
  { base:"open",      pron:"óupen",   pasado:"opened",    es:"abrir",         regular:true  },
  { base:"close",     pron:"klous",   pasado:"closed",    es:"cerrar",        regular:true  },
  { base:"listen",    pron:"lísen",   pasado:"listened",  es:"escuchar",      regular:true  },
  { base:"watch",     pron:"uoch",    pasado:"watched",   es:"mirar",         regular:true  },
  { base:"study",     pron:"stádi",   pasado:"studied",   es:"estudiar",      regular:true  },
  { base:"learn",     pron:"lern",    pasado:"learned",   es:"aprender",      regular:true  },
  { base:"teach",     pron:"tich",    pasado:"taught",    es:"enseñar",       regular:false },
  { base:"show",      pron:"shou",    pasado:"showed",    es:"mostrar",       regular:true  },
  { base:"visit",     pron:"vísit",   pasado:"visited",   es:"visitar",       regular:true  },
  { base:"travel",    pron:"trável",  pasado:"traveled",  es:"viajar",        regular:true  },
  { base:"dance",     pron:"dans",    pasado:"danced",    es:"bailar",        regular:true  }
];

// ── Videos educativos ───────────────────────────────────────
// CÓMO AGREGAR UN VIDEO: copia una línea, cambia el id de YouTube,
// el topic (tobe/adjetivos/pronombres/verbos/abecedario), título y desc.
const VIDEOS = [
  { id:"eqg0STvbp1g", topic:"tobe",       titulo:"Verb To Be – Presente completo",      desc:"Aprende am, is, are con ejemplos."           },
  { id:"g7tMnAC8NDY", topic:"tobe",       titulo:"Verb To Be – Oraciones negativas",    desc:"How to use 'not' with To Be."                },
  { id:"YIkewDhlSwQ", topic:"tobe",       titulo:"Verb To Be – Preguntas Yes/No",       desc:"Forma interrogativa con To Be."              },
  { id:"Tt_mH9e-PhY", topic:"tobe",       titulo:"Was / Were – Pasado",                 desc:"To Be en tiempo pasado con ejemplos."        },
  { id:"vHDZSHE0Y1w", topic:"adjetivos",  titulo:"Los 100 adjetivos más comunes",       desc:"Los adjetivos más usados en inglés."         },
  { id:"xUI2LhuZAaw", topic:"adjetivos",  titulo:"Adjetivos opuestos / Opposites",      desc:"Happy-sad, big-small y más opuestos."        },
  { id:"Zf5Ck8C9NSE", topic:"adjetivos",  titulo:"Adjetivos de personalidad",           desc:"Describe personas en inglés."                },
  { id:"kNW_gP_Qjjo", topic:"pronombres", titulo:"Personal Pronouns – Pronombres",      desc:"I, you, he, she, it, we, they explicados."   },
  { id:"zJH3u0jS620", topic:"pronombres", titulo:"Possessive Pronouns – Posesivos",     desc:"My, your, his, her, our, their."             },
  { id:"8kou5Uhfo3g", topic:"pronombres", titulo:"Object Pronouns – Me, him, her…",     desc:"Pronombres de objeto directo e indirecto."   },
  { id:"WRsLLGnYhJ0", topic:"verbos",     titulo:"50 verbos irregulares esenciales",    desc:"Los verbos irregulares más importantes."     },
  { id:"MI3S3kdkofo", topic:"verbos",     titulo:"Verbos regulares en pasado (-ed)",    desc:"Reglas para formar el pasado regular."       },
  { id:"UDgCFiNdTKw", topic:"abecedario", titulo:"The Alphabet – Song",                 desc:"Canción del abecedario en inglés."           }
];

/* ──────────────────────────────────────────────────────────
   UTILIDADES
   ────────────────────────────────────────────────────────── */
// Selecciona un elemento por su id
const porId = id => document.getElementById(id);

// Devuelve un array mezclado (copia del original)
function mezclar(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Muestra el banner de fin de juego
function mostrarFinal(idEscena, puntaje, total, fnReiniciar) {
  const banner = document.createElement("div");
  banner.className = "banner-final";
  const emoji = puntaje >= total * 0.8 ? "🎉" : puntaje >= total * 0.5 ? "😊" : "💪";
  banner.innerHTML = `
    <h3>${emoji} ¡Juego terminado!</h3>
    <p>Puntaje: <strong>${puntaje} / ${total}</strong></p>
    <button class="btn-reiniciar">Jugar de nuevo</button>
  `;
  banner.querySelector(".btn-reiniciar").onclick = () => {
    banner.remove();
    fnReiniciar();
  };
  porId(idEscena).appendChild(banner);
}

/* ──────────────────────────────────────────────────────────
   2. RENDERIZADO DE SECCIONES
   ────────────────────────────────────────────────────────── */

// ── Abecedario ──────────────────────────────────────────────
function pintarAbecedario() {
  const grid = porId("abc-grid");
  grid.innerHTML = ALPHABET.map(item => `
    <div class="flip-card">
      <div class="flip-inner">
        <div class="flip-frente">
          <span class="letra">${item.letra}</span>
          <span class="palabra">${item.palabra}</span>
          <span class="pron">/${item.pron}/</span>
        </div>
        <div class="flip-dorso">
          <span class="traduccion">${item.palabra}<br><span class="pron-dorso">/${item.pron}/</span><br>${item.es}</span>
        </div>
      </div>
    </div>
  `).join("");

  // Toque en móvil
  grid.querySelectorAll(".flip-card").forEach(c =>
    c.addEventListener("click", () => c.classList.toggle("girada"))
  );
}

// ── Números ─────────────────────────────────────────────────
// tabActiva: 1-10 = decenas (1–10 … 91–100), 11 = centenas (200–1000)
function pintarNumeros(tabActiva = 1) {
  const tabs = porId("decena-tabs");
  const decenasLabels = [1,2,3,4,5,6,7,8,9,10].map(d => ({ id:d, label:`${d*10-9}–${d*10}` }));
  const centenaTab = { id:11, label:"200–1000" };
  const allTabs = [...decenasLabels, centenaTab];

  tabs.innerHTML = allTabs.map(t => `
    <button class="pestaña${t.id===tabActiva?" activa":""}" data-tab="${t.id}">
      ${t.label}
    </button>
  `).join("");
  tabs.querySelectorAll(".pestaña").forEach(t =>
    t.addEventListener("click", () => pintarNumeros(+t.dataset.tab))
  );

  const grid = porId("numeros-grid");
  let lista;
  if (tabActiva <= 10) {
    const desde = (tabActiva - 1) * 10;
    lista = NUMEROS.slice(desde, desde + 10);
  } else {
    // last 9 entries: 200, 300, ..., 1000
    lista = NUMEROS.slice(100);
  }
  grid.innerHTML = lista.map(n => `
    <div class="num-tarjeta">
      <span class="num">${n.valor}</span>
      <span>
        <div class="num-en">${n.en}</div>
        <div class="num-es">${n.es}</div>
      </span>
    </div>
  `).join("");
}

// ── Verbo To Be ─────────────────────────────────────────────
function pintarToBe() {
  const pintarFilas = (datos, idTbody) => {
    porId(idTbody).innerHTML = datos.map(r => `
      <tr>
        <td><strong>${r.pronoun}</strong></td>
        <td><strong style="color:var(--color-acento)">${r.forma}</strong>
            <br><small style="color:var(--color-texto-suave);font-style:italic">/${r.pron}/</small></td>
        <td>${r.ej}</td>
        <td>${r.tr}</td>
      </tr>
    `).join("");
  };
  pintarFilas(TOBE_PRESENT, "tobe-present-body");
  pintarFilas(TOBE_PAST,    "tobe-past-body");
}

// ── Adjetivos ───────────────────────────────────────────────
function pintarAdjetivos(filtro = "todos") {
  // Botones de filtro
  const cats = ["todos", ...new Set(ADJETIVOS.map(a => a.cat))];
  const divFiltros = porId("adj-filtros");
  divFiltros.innerHTML = cats.map(c => `
    <button class="btn-filtro${c===filtro?" activo":""}" data-cat="${c}">
      ${c.charAt(0).toUpperCase()+c.slice(1)}
    </button>
  `).join("");
  divFiltros.querySelectorAll(".btn-filtro").forEach(b =>
    b.addEventListener("click", () => pintarAdjetivos(b.dataset.cat))
  );

  // Grid de tarjetas
  const lista = filtro === "todos" ? ADJETIVOS : ADJETIVOS.filter(a => a.cat === filtro);
  porId("adj-grid").innerHTML = lista.map(a => `
    <div class="adj-tarjeta">
      <div class="adj-en">${a.en}</div>
      <div class="adj-es">${a.es}</div>
      <div class="adj-ej">"${a.ej}"</div>
      ${a.op ? `<div class="adj-op">↔ opuesto: ${a.op}</div>` : ""}
    </div>
  `).join("");
}

// ── Pronombres ──────────────────────────────────────────────
function pintarPronombres() {
  porId("pron-body").innerHTML = PRONOMBRES.map(p => `
    <tr>
      <td>${p.persona} <small>(${p.es})</small></td>
      <td><strong style="color:var(--color-acento)">${p.suj}</strong>
          <br><small style="color:var(--color-texto-suave);font-style:italic">/${p.pron}/</small></td>
      <td>${p.obj}</td>
      <td>${p.posAdj}</td>
      <td>${p.posPron}</td>
      <td>${p.refl}</td>
    </tr>
  `).join("");

  porId("pron-ejemplos").innerHTML = PRON_EJEMPLOS.map(e => `
    <div class="carousel-tarjeta">
      <div class="etiqueta">${e.etiqueta}</div>
      <div class="en">${e.en}</div>
      <div class="es">${e.es}</div>
    </div>
  `).join("");
}

// ── Verbos ──────────────────────────────────────────────────
function pintarVerbos(busqueda = "") {
  const lista = busqueda
    ? VERBOS.filter(v => v.base.includes(busqueda) || v.es.includes(busqueda))
    : VERBOS;

  porId("verbos-tabla").innerHTML = `
    <table>
      <thead>
        <tr>
          <th>Base</th><th>Pronunciación</th><th>Pasado</th><th>Español</th><th>Tipo</th>
        </tr>
      </thead>
      <tbody>
        ${lista.map(v => `
          <tr>
            <td><strong>${v.base}</strong></td>
            <td style="font-style:italic;color:var(--color-texto-suave)">/${v.pron}/</td>
            <td style="color:var(--color-acento2)">${v.pasado}</td>
            <td>${v.es}</td>
            <td>${v.regular
              ? '<span style="color:var(--color-correcto)">Regular</span>'
              : '<span style="color:var(--color-acento2)">Irregular</span>'}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
}

// ── Videos ──────────────────────────────────────────────────
function pintarVideos(filtro = "todos") {
  const temas = ["todos","tobe","adjetivos","pronombres","verbos","abecedario"];
  const etiquetas = { todos:"Todos", tobe:"To Be", adjetivos:"Adjetivos",
                      pronombres:"Pronombres", verbos:"Verbos", abecedario:"Abecedario" };

  porId("video-filtros").innerHTML = temas.map(t => `
    <button class="btn-filtro${t===filtro?" activo":""}" data-vtema="${t}">
      ${etiquetas[t]}
    </button>
  `).join("");
  porId("video-filtros").querySelectorAll(".btn-filtro").forEach(b =>
    b.addEventListener("click", () => pintarVideos(b.dataset.vtema))
  );

  const lista = filtro === "todos" ? VIDEOS : VIDEOS.filter(v => v.topic === filtro);
  porId("videos-grid").innerHTML = lista.map(v => `
    <div class="video-tarjeta">
      <img src="https://img.youtube.com/vi/${v.id}/mqdefault.jpg" alt="${v.titulo}">
      <div class="video-info">
        <h4>${v.titulo}</h4>
        <p>${v.desc}</p>
        <a href="https://www.youtube.com/watch?v=${v.id}" target="_blank" rel="noopener">
          ▶ Ver en YouTube
        </a>
      </div>
    </div>
  `).join("");
}

/* ──────────────────────────────────────────────────────────
   3. JUEGOS
   ────────────────────────────────────────────────────────── */

// ── Juego 1: Quiz de Números ─────────────────────────────────
const NQ = { ronda:0, puntaje:0, total:8, seq:[] };

function iniciarQuizNumeros() {
  NQ.ronda = 0; NQ.puntaje = 0;
  NQ.seq = mezclar(NUMEROS).slice(0, NQ.total);
  siguienteNQ();
}

function siguienteNQ() {
  if (NQ.ronda >= NQ.total) {
    mostrarFinal("game-numeros", NQ.puntaje, NQ.total, iniciarQuizNumeros);
    return;
  }
  const correcto = NQ.seq[NQ.ronda];
  const opciones = mezclar([correcto, ...mezclar(NUMEROS.filter(n=>n.valor!==correcto.valor)).slice(0,3)]);
  porId("nq-progreso").textContent = `Pregunta ${NQ.ronda+1} / ${NQ.total} · Puntaje: ${NQ.puntaje}`;
  porId("nq-pregunta").textContent = `¿Cómo se escribe el número ${correcto.valor}?`;
  porId("nq-fb").textContent = "";
  porId("nq-fb").className = "juego-fb";
  porId("nq-opciones").innerHTML = opciones.map(o => `
    <button class="btn-opcion" data-v="${o.valor}">${o.en}</button>
  `).join("");
  porId("nq-opciones").querySelectorAll(".btn-opcion").forEach(b => {
    b.onclick = () => {
      const ok = +b.dataset.v === correcto.valor;
      b.classList.add(ok ? "ok" : "mal");
      if (ok) { NQ.puntaje++; porId("nq-fb").textContent = "✅ ¡Correcto!"; }
      else {
        porId("nq-fb").textContent = `❌ Era: ${correcto.en}`;
        porId("nq-opciones").querySelectorAll(`[data-v="${correcto.valor}"]`)[0]?.classList.add("ok");
      }
      porId("nq-fb").className = "juego-fb " + (ok ? "ok" : "mal");
      porId("nq-opciones").querySelectorAll(".btn-opcion").forEach(x => x.disabled = true);
      setTimeout(() => { NQ.ronda++; siguienteNQ(); }, 1200);
    };
  });
}

// ── Juego 2: Memorama EN/ES ──────────────────────────────────
const MEM = { cartas:[], abiertas:[], pares:0, movs:0, bloqueado:false };

function iniciarMemorama() {
  MEM.pares = 0; MEM.movs = 0; MEM.abiertas = []; MEM.bloqueado = false;
  porId("memo-movs").textContent = "0";
  porId("memo-pares").textContent = "0";
  const palabras = mezclar(VERBOS).slice(0,8);
  const pares = mezclar([
    ...palabras.map(v=>({ texto:v.base, pareja:v.es,  tipo:"en" })),
    ...palabras.map(v=>({ texto:v.es,   pareja:v.base, tipo:"es" }))
  ]);
  MEM.cartas = pares;
  const grid = porId("memo-grid");
  grid.innerHTML = pares.map((_,i) => `
    <div class="memo-carta" data-idx="${i}">?</div>
  `).join("");
  grid.querySelectorAll(".memo-carta").forEach(c =>
    c.addEventListener("click", () => voltearCarta(+c.dataset.idx))
  );
}

function voltearCarta(idx) {
  if (MEM.bloqueado) return;
  const celdas = porId("memo-grid").querySelectorAll(".memo-carta");
  const celda = celdas[idx];
  if (celda.classList.contains("volteada") || celda.classList.contains("encontrada")) return;
  celda.classList.add("volteada");
  celda.textContent = MEM.cartas[idx].texto;
  MEM.abiertas.push(idx);
  if (MEM.abiertas.length === 2) {
    MEM.movs++;
    porId("memo-movs").textContent = MEM.movs;
    MEM.bloqueado = true;
    const [a, b] = MEM.abiertas;
    const emparejado = MEM.cartas[a].pareja === MEM.cartas[b].texto &&
                       MEM.cartas[b].pareja === MEM.cartas[a].texto;
    setTimeout(() => {
      if (emparejado) {
        celdas[a].classList.add("encontrada");
        celdas[b].classList.add("encontrada");
        MEM.pares++;
        porId("memo-pares").textContent = MEM.pares;
        if (MEM.pares === 8) mostrarFinal("game-memorama", 8, 8, iniciarMemorama);
      } else {
        celdas[a].classList.remove("volteada"); celdas[a].textContent = "?";
        celdas[b].classList.remove("volteada"); celdas[b].textContent = "?";
      }
      MEM.abiertas = []; MEM.bloqueado = false;
    }, 900);
  }
}

// ── Juego 3: Escribe el pasado ───────────────────────────────
const TS = { ronda:0, puntaje:0, total:8, seq:[], respCorrecta:"" };

function iniciarTense() {
  TS.ronda = 0; TS.puntaje = 0;
  TS.seq = mezclar(VERBOS).slice(0, TS.total);
  porId("tense-input").value = "";
  porId("tense-fb").textContent = "";
  porId("tense-check").onclick = verificarTense;
  porId("tense-input").onkeydown = e => { if (e.key==="Enter") verificarTense(); };
  siguienteTense();
}

function siguienteTense() {
  if (TS.ronda >= TS.total) {
    mostrarFinal("game-tense", TS.puntaje, TS.total, iniciarTense);
    return;
  }
  const v = TS.seq[TS.ronda];
  TS.respCorrecta = v.pasado;
  porId("tense-progreso").textContent = `Pregunta ${TS.ronda+1} / ${TS.total} · Puntaje: ${TS.puntaje}`;
  porId("tense-pregunta").textContent = `¿Cuál es el pasado de "${v.base}"?`;
  porId("tense-hint").textContent = `(${v.es}) — ${v.regular ? "Regular" : "Irregular"}`;
  porId("tense-input").value = "";
  porId("tense-fb").textContent = "";
  porId("tense-fb").className = "juego-fb";
  porId("tense-input").focus();
}

function verificarTense() {
  const resp = porId("tense-input").value.trim().toLowerCase();
  const correctas = TS.respCorrecta.split("/").map(s=>s.trim().toLowerCase());
  const ok = correctas.includes(resp);
  if (ok) { TS.puntaje++; porId("tense-fb").textContent = "✅ ¡Correcto!"; }
  else { porId("tense-fb").textContent = `❌ Era: ${TS.respCorrecta}`; }
  porId("tense-fb").className = "juego-fb " + (ok ? "ok" : "mal");
  setTimeout(() => { TS.ronda++; siguienteTense(); }, 1100);
}

// ── Juego 4: Completa con To Be ──────────────────────────────
const TB_PREGUNTAS = [
  { oración:"I ___ a student.",         ops:["am","is","are","was"],  ans:"am",   pista:"pronombre: I"       },
  { oración:"She ___ my friend.",        ops:["am","is","are","was"],  ans:"is",   pista:"pronombre: She"     },
  { oración:"They ___ happy.",           ops:["am","is","are","were"], ans:"are",  pista:"pronombre: They"    },
  { oración:"We ___ at school.",         ops:["am","is","are","were"], ans:"are",  pista:"pronombre: We"      },
  { oración:"He ___ tall.",              ops:["am","is","are","was"],  ans:"is",   pista:"pronombre: He"      },
  { oración:"I ___ tired yesterday.",    ops:["am","is","was","were"], ans:"was",  pista:"ayer → pasado"      },
  { oración:"You ___ very kind.",        ops:["am","is","are","were"], ans:"are",  pista:"pronombre: You"     },
  { oración:"It ___ a big dog.",         ops:["am","is","are","was"],  ans:"is",   pista:"pronombre: It"      },
  { oración:"We ___ late yesterday.",    ops:["am","were","are","was"],ans:"were", pista:"ayer → pasado pl."  },
  { oración:"She ___ a teacher before.", ops:["is","was","are","were"],ans:"was",  pista:"before → pasado"    }
];
const TB = { ronda:0, puntaje:0, total:8, seq:[] };

function iniciarToBe() {
  TB.ronda = 0; TB.puntaje = 0;
  TB.seq = mezclar(TB_PREGUNTAS).slice(0, TB.total);
  siguienteTB();
}

function siguienteTB() {
  if (TB.ronda >= TB.total) {
    mostrarFinal("game-tobe", TB.puntaje, TB.total, iniciarToBe);
    return;
  }
  const q = TB.seq[TB.ronda];
  porId("tb-progreso").textContent = `Pregunta ${TB.ronda+1} / ${TB.total} · Puntaje: ${TB.puntaje}`;
  porId("tb-pregunta").textContent = q.oración;
  porId("tb-hint").textContent = `Pista: ${q.pista}`;
  porId("tb-fb").textContent = "";
  porId("tb-fb").className = "juego-fb";
  porId("tb-opciones").innerHTML = mezclar(q.ops).map(op => `
    <button class="btn-opcion" data-op="${op}">${op}</button>
  `).join("");
  porId("tb-opciones").querySelectorAll(".btn-opcion").forEach(b => {
    b.onclick = () => {
      const ok = b.dataset.op === q.ans;
      b.classList.add(ok ? "ok" : "mal");
      if (ok) { TB.puntaje++; porId("tb-fb").textContent = "✅ ¡Correcto!"; }
      else {
        porId("tb-fb").textContent = `❌ Era: ${q.ans}`;
        porId("tb-opciones").querySelector(`[data-op="${q.ans}"]`)?.classList.add("ok");
      }
      porId("tb-fb").className = "juego-fb " + (ok ? "ok" : "mal");
      porId("tb-opciones").querySelectorAll(".btn-opcion").forEach(x => x.disabled = true);
      setTimeout(() => { TB.ronda++; siguienteTB(); }, 1200);
    };
  });
}

// ── Juego 5: Opuestos de Adjetivos ──────────────────────────
const conOpuesto = ADJETIVOS.filter(a => a.op);
const ADJ = { ronda:0, puntaje:0, total:8, seq:[] };

function iniciarAdj() {
  ADJ.ronda = 0; ADJ.puntaje = 0;
  ADJ.seq = mezclar(conOpuesto).slice(0, ADJ.total);
  siguienteAdj();
}

function siguienteAdj() {
  if (ADJ.ronda >= ADJ.total) {
    mostrarFinal("game-adjetivos", ADJ.puntaje, ADJ.total, iniciarAdj);
    return;
  }
  const correcto = ADJ.seq[ADJ.ronda];
  const distractores = mezclar(ADJETIVOS.filter(a => a.en !== correcto.op && a.en !== correcto.en))
    .slice(0,3).map(a => a.en);
  const opciones = mezclar([correcto.op, ...distractores]);
  porId("adj-progreso").textContent = `Pregunta ${ADJ.ronda+1} / ${ADJ.total} · Puntaje: ${ADJ.puntaje}`;
  porId("adj-pregunta").textContent = `¿Cuál es el opuesto de "${correcto.en}"?`;
  porId("adj-fb").textContent = "";
  porId("adj-fb").className = "juego-fb";
  porId("adj-opciones").innerHTML = opciones.map(op => `
    <button class="btn-opcion" data-op="${op}">${op}</button>
  `).join("");
  porId("adj-opciones").querySelectorAll(".btn-opcion").forEach(b => {
    b.onclick = () => {
      const ok = b.dataset.op === correcto.op;
      b.classList.add(ok ? "ok" : "mal");
      if (ok) { ADJ.puntaje++; porId("adj-fb").textContent = "✅ ¡Correcto!"; }
      else {
        porId("adj-fb").textContent = `❌ Era: ${correcto.op}`;
        porId("adj-opciones").querySelector(`[data-op="${correcto.op}"]`)?.classList.add("ok");
      }
      porId("adj-fb").className = "juego-fb " + (ok ? "ok" : "mal");
      porId("adj-opciones").querySelectorAll(".btn-opcion").forEach(x => x.disabled = true);
      setTimeout(() => { ADJ.ronda++; siguienteAdj(); }, 1200);
    };
  });
}

// ── Juego 6: Pronombres en acción ────────────────────────────
const PR_PREGUNTAS = [
  { oración:"___ am a student.",    ans:"I",    ops:["I","He","We","They"],  pista:"1ª persona sing."   },
  { oración:"___ is my teacher.",   ans:"She",  ops:["She","I","They","We"], pista:"3ª persona fem."    },
  { oración:"___ are my friends.",  ans:"They", ops:["They","He","I","She"], pista:"3ª persona plural"  },
  { oración:"___ is a big dog.",    ans:"It",   ops:["It","He","She","We"],  pista:"animal / cosa"      },
  { oración:"___ are from Bolivia.",ans:"We",   ops:["We","I","They","You"], pista:"nosotros"           },
  { oración:"___ is tall.",         ans:"He",   ops:["He","She","It","I"],   pista:"3ª persona masc."   },
  { oración:"___ like English.",    ans:"You",  ops:["You","I","They","She"],pista:"2ª persona"         },
  { oración:"___ is raining.",      ans:"It",   ops:["It","He","She","We"],  pista:"clima / fenómeno"   },
  { oración:"___ are happy.",       ans:"We",   ops:["We","I","He","She"],   pista:"plural 1ª persona"  },
  { oración:"___ was at school.",   ans:"I",    ops:["I","He","They","She"], pista:"1ª pers. + pasado"  }
];
const PR = { ronda:0, puntaje:0, total:8, seq:[] };

function iniciarPron() {
  PR.ronda = 0; PR.puntaje = 0;
  PR.seq = mezclar(PR_PREGUNTAS).slice(0, PR.total);
  siguientePron();
}

function siguientePron() {
  if (PR.ronda >= PR.total) {
    mostrarFinal("game-pronombres", PR.puntaje, PR.total, iniciarPron);
    return;
  }
  const q = PR.seq[PR.ronda];
  porId("pr-progreso").textContent = `Pregunta ${PR.ronda+1} / ${PR.total} · Puntaje: ${PR.puntaje}`;
  porId("pr-pregunta").textContent = q.oración;
  porId("pr-hint").textContent = `Pista: ${q.pista}`;
  porId("pr-fb").textContent = "";
  porId("pr-fb").className = "juego-fb";
  porId("pr-opciones").innerHTML = mezclar(q.ops).map(op => `
    <button class="btn-opcion" data-op="${op}">${op}</button>
  `).join("");
  porId("pr-opciones").querySelectorAll(".btn-opcion").forEach(b => {
    b.onclick = () => {
      const ok = b.dataset.op === q.ans;
      b.classList.add(ok ? "ok" : "mal");
      if (ok) { PR.puntaje++; porId("pr-fb").textContent = "✅ ¡Correcto!"; }
      else {
        porId("pr-fb").textContent = `❌ Era: ${q.ans}`;
        porId("pr-opciones").querySelector(`[data-op="${q.ans}"]`)?.classList.add("ok");
      }
      porId("pr-fb").className = "juego-fb " + (ok ? "ok" : "mal");
      porId("pr-opciones").querySelectorAll(".btn-opcion").forEach(x => x.disabled = true);
      setTimeout(() => { PR.ronda++; siguientePron(); }, 1200);
    };
  });
}

/* ──────────────────────────────────────────────────────────
   NAVEGACIÓN Y APERTURA DE JUEGOS
   ────────────────────────────────────────────────────────── */
const INICIO_JUEGO = {
  numeros:    iniciarQuizNumeros,
  memorama:   iniciarMemorama,
  tense:      iniciarTense,
  tobe:       iniciarToBe,
  adjetivos:  iniciarAdj,
  pronombres: iniciarPron
};

function configurarJuegos() {
  // Botones del menú de juegos
  document.querySelectorAll(".btn-juego").forEach(b => {
    b.addEventListener("click", () => {
      const id = b.dataset.juego;
      // Cierra otros y abre el seleccionado
      document.querySelectorAll(".escena-juego").forEach(e => e.classList.remove("activa"));
      const escena = porId("game-" + id);
      escena.classList.add("activa");
      escena.scrollIntoView({ behavior:"smooth", block:"nearest" });
      INICIO_JUEGO[id]();
    });
  });

  // Botones cerrar
  document.querySelectorAll(".btn-cerrar").forEach(b => {
    b.addEventListener("click", () => {
      porId("game-" + b.dataset.juego).classList.remove("activa");
    });
  });
}

function configurarNav() {
  const toggle = porId("nav-toggle");
  const nav    = porId("main-nav");
  toggle.addEventListener("click", () => nav.classList.toggle("abierto"));
  // Cierra el menú al seleccionar un enlace
  nav.querySelectorAll("a").forEach(a =>
    a.addEventListener("click", () => nav.classList.remove("abierto"))
  );
}

function configurarBusquedaVerbos() {
  porId("verbo-buscar").addEventListener("input", e =>
    pintarVerbos(e.target.value.toLowerCase().trim())
  );
}

/* ──────────────────────────────────────────────────────────
   4. INICIO — se ejecuta cuando carga la página
   ────────────────────────────────────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  pintarAbecedario();
  pintarNumeros();
  pintarToBe();
  pintarAdjetivos();
  pintarPronombres();
  pintarVerbos();
  pintarVideos();
  configurarJuegos();
  configurarNav();
  configurarBusquedaVerbos();
});
