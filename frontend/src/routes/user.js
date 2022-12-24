//contains all the information about the user
import { writable } from "svelte/store";

export const user = writable({
	pseudo: "",
	intra: "",
	firstName: "",
	lastName: "",
	email: "",
	image: "",
	roomId: -1,
	gameMode: 0,
	map: 0,
	socket: null,
});

