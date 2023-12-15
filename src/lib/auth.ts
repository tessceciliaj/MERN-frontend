const signIn = (jwt: string) => {
    localStorage.setItem('jwt', jwt)
}

// !! blir en Boolean, kollar så jwt finns
const isSignedIn = () => !!localStorage.getItem('jwt')

// hämta token
const getJWT = () => localStorage.getItem('jwt');

// rensa local storage
const signOut = () => localStorage.clear();

export default {
    signIn,
    isSignedIn,
    getJWT,
    signOut
}