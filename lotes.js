// ======================================================
// LOTES.JS
// Versión 1.0
// ======================================================

window.Lotes = (function () {

    const API_URL = "https://script.google.com/macros/s/AKfycbzju385U93y9LzS-yStDOsO9i2vo97oAS-VaKRkMsV3giDUud34jAB5pbwvDior0tbN/exec";

    const CACHE_KEY = "LOTES_CACHE";

    const canal = new BroadcastChannel("LOTES");

    //--------------------------------------------------

    async function actualizar(){

        console.log("Consultando Apps Script...");

        const response = await fetch(
            API_URL + "?t=" + Date.now(),
            {
                cache:"no-store"
            }
        );

        const datos = await response.json();

        const cache = {};

        datos.forEach(lote=>{

            cache[lote.Lote]=lote;

        });

        localStorage.setItem(
            CACHE_KEY,
            JSON.stringify(cache)
        );

        canal.postMessage({

            tipo:"CACHE_ACTUALIZADA",

            fecha:Date.now(),

            total:datos.length

        });

        console.log("Cache creada.");

        return cache;

    }

    //--------------------------------------------------

    function obtener(nombre){

        const cache =
        JSON.parse(
            localStorage.getItem(CACHE_KEY)||"{}"
        );

        return cache[nombre]||null;

    }

    //--------------------------------------------------

    function obtenerTodos(){

        return JSON.parse(

            localStorage.getItem(CACHE_KEY)||"{}"

        );

    }

    //--------------------------------------------------

    function escuchar(callback){

        canal.onmessage=function(e){

            if(e.data.tipo==="CACHE_ACTUALIZADA"){

                callback(e.data);

            }

        };

    }

    //--------------------------------------------------

    return{

        actualizar,

        obtener,

        obtenerTodos,

        escuchar

    };

})();
