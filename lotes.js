// =====================================
// LOTES.JS
// Administrador central de lotes
// =====================================

const Lotes = (() => {

    const API_URL =
    "https://script.google.com/macros/s/AKfycbzju385U93y9LzS-yStDOsO9i2vo97oAS-VaKRkMsV3giDUud34jAB5pbwvDior0tbN/exec";

    const CACHE_KEY = "LOTES_CACHE";

    const canal = new BroadcastChannel("LOTES");

    async function actualizar(){

        console.log("Actualizando cache...");

        const response = await fetch(
            API_URL + "?t=" + Date.now(),
            {
                cache:"no-store"
            }
        );

        const datos = await response.json();

        const cache = {};

        datos.forEach(item=>{

            cache[item.Lote]=item;

        });

        localStorage.setItem(

            CACHE_KEY,

            JSON.stringify(cache)

        );

        canal.postMessage({

            tipo:"CACHE_ACTUALIZADA",

            total:datos.length,

            fecha:Date.now()

        });

        console.log(
            "Cache actualizada:",
            datos.length
        );

    }

    function obtener(nombre){

        const cache =
        JSON.parse(
            localStorage.getItem(CACHE_KEY)||"{}"
        );

        return cache[nombre]||null;

    }

    function obtenerTodos(){

        return JSON.parse(
            localStorage.getItem(CACHE_KEY)||"{}"
        );

    }

    return{

        actualizar,

        obtener,

        obtenerTodos

    };

})();