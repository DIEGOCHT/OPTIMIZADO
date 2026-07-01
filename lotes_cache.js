const API_URL =
"https://script.google.com/macros/s/AKfycbzju385U93y9LzS-yStDOsO9i2vo97oAS-VaKRkMsV3giDUud34jAB5pbwvDior0tbN/exec";

const CACHE_KEY = "LOTES_CACHE";

const canal = new BroadcastChannel("LOTES");

const LotesCache = {

    async actualizar() {

        const respuesta = await fetch(
            API_URL + "?t=" + Date.now(),
            {
                cache: "no-store"
            }
        );

        const datos = await respuesta.json();

        const cache = {};

        datos.forEach(lote => {

            cache[lote.Lote] = lote;

        });

        localStorage.setItem(
            CACHE_KEY,
            JSON.stringify(cache)
        );

        canal.postMessage({
            tipo: "CACHE_ACTUALIZADA"
        });

        return cache;

    },

    obtener(nombre) {

        const datos =
        JSON.parse(
            localStorage.getItem(CACHE_KEY) || "{}"
        );

        return datos[nombre] || null;

    },

    obtenerTodos() {

        return JSON.parse(
            localStorage.getItem(CACHE_KEY) || "{}"
        );

    }

};