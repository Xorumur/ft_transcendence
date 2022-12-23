import { writable } from 'svelte/store';

export const roomId = writable(-1);
export const map = writable(0);
export const gameMode = writable(0);