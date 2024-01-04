import { ActionFunctionArgs, redirect } from "react-router-dom";
import auth from "../lib/auth";

export const action = async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();
    console.log(Object.fromEntries(formData.entries()))

    const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/posts', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${auth.getJWT()}`,
        },
        body: formData,
    });
    console.log(response)

    if (!response.ok) {
        const { message } = await response.json();

        return { message };
    }

    return redirect('/')
}