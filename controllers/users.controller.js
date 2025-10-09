 
export const getPublicMessage = (req, res) => {
    res.sendSuccess("Hola para todos!")
}


export const getCurrentUser = (req, res) => {
    res.sendSuccess(req.user.email, "Email del usuario actual. Eres user o admin")
}


export const getCurrentAdmin = (req, res) => {
    console.log(req.user)
    res.sendSuccess(req.user.email, "Email del admin actual. Eres admin")
}