// writable set, update, subscribe metodit
import { writable } from 'svelte/store';
// vitseille  taulukko
const omalista = writable([]);

// exporttaa defaulttina omanlistan
export default omalista;
