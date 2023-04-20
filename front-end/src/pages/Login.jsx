import React from 'react'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

export default function Login() {
    /* Criando 2 variaveis de estado para email e senha e associando aos campos */
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    function handleChange(event) {
        if (event.target.name === 'email') setEmail(event.target.value)
        else setPassword(event.target.value)
    }

    /* Submit que envia os dados dos campos ao back-end */
    async function handleSubmit(event) {
        event.preventDefault() //Impede o recarregamento da página
        try {
            let response = await fetch('http://localhost:3333/users/login', {
                method: "POST",
                body: JSON.stringify({ email, password }),
                header: { "Content-type": "application/json; charset=UTF-8" }
            })
            console.log({ response })
        }
        catch (error) {
            console.error(error)
        }
    }

    /*Comunicação do backend com o frontend 
    Metodos: xmlhttpRequest e o fetch

    Axios facilita usar o xmlhttpRequest
    Ky facilita usar o fetch


    
    */
    return (
        <>
            <Typography variant="h3" component="h1" sx={{ textAlign: 'center' }}>
                Autentique-se
            </Typography>
            <Paper sx={{
                width: '512px',
                maxWidth: '90%',
                margin: '25px auto 0 auto',
                p: '12px'
            }}>
                <Typography variant="h5" component="div">
                    <form onSubmit={handleSubmit}>
                        <TextField className='form-field' id="email" name="email" label="E-mail" variant="filled" fullWidth onChange={handleChange} value={email} />
                        <TextField className='form-field' id="password" name="password" label="Senha" variant="filled" type="password" fullWidth onChange={handleChange} value={password} />
                        <Button variant="contained" type="submit" color="secondary" fullWidth>Enviar</Button>
                    </form>
                </Typography>
            </Paper>
        </>
    )
}