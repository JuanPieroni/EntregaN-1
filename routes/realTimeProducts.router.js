import { Router} from 'express'
const router = Router()

router.get ('/', (req, res) => {
    res.render('home', { title: 'Home', message: 'Bienvenido a la página de inicio' })
})

export default router