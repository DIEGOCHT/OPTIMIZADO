window.Lotes = (() => {

    const API_URL =
    "TU_APPS_SCRIPT";

    const CACHE_KEY = "LOTES_CACHE";

    const canal =
    new BroadcastChannel("LOTES");

    async function actualizar(){

        const response = await fetch(
            API_URL + "?t=" + Date.now(),
            { cache:"no-store" }
        );

        const datos = await response.json();

        // Guardar respaldo
        localStorage.setItem(
            CACHE_KEY,
            JSON.stringify(datos)
        );

        // Enviar datos completos
        canal.postMessage({

            tipo:"CACHE_ACTUALIZADA",

            datos:datos,

            fecha:Date.now()

        });

        return datos;

    }

    function leer(){

        return JSON.parse(

            localStorage.getItem(CACHE_KEY)||"[]"

        );

    }

    return{

        actualizar,

        leer,

        canal

    };

})();
