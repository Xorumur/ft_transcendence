import { goto } from "$app/navigation";
import axios from "axios";

export async function GuardRoutes() {
	let logged;
	if (localStorage.getItem("access_token") === null) {
		goto("/");
		return ;
	}
	try {
		logged = await axios.get("http://localhost:4200/user/logged", {
			headers: {
				Authorization: "Bearer " + localStorage.getItem("access_token"),
			},
	});
	} catch (error) {
		console.log("-> error", error);
		goto("/");
		return ;
	}
}
