import React from 'react';
import PageTitle from '../../components/ui/PageTitle';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import Fab from '@mui/material/Fab';
import myfetch from '../../utils/myfetch';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function PaymentMethodForm() {
    const API_PATH = '/payment_methods'

    const [state, setState] = React.useState({
        paymentMethod: {}, //Objeto vazio
        showWaiting: false
    })
    const {
        paymentMethod,
        showWaiting
    } = state

    function handleFromFieldChange(event){
        const paymentMethodCopy = {...paymentMethod}
        paymentMethodCopy[event.target.name] = event.target.value
        setState({...state, paymentMethod: paymentMethodCopy})
    }

    function handleFormSubmit(event) {
        event.preventDefault() //Evita que a página seja recarregada

        //Envia os dados para o back-end
        sendData()
    }

    async function sendData(){
        setState({...state, showWaiting: true})
        try{
            await myfetch.post(API_PATH, paymentMethod)
            //Dar feedback positivo e voltar para a listagem
            alert('Salvou')
            setState({...state, showWaiting:false})
        }
        catch{
            console.error(error)
            //DAR FEEDBACK NEGATIVO
            setState({...state,showWaiting: false})
        }
    }

    return (
        <>  
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={showWaiting}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

            <PageTitle title="Cadastrar novo método de pagamento" />

            <form onSubmit={handleFormSubmit}>
                <TextField 
                    label="Descrição" 
                    variant="filled" 
                    fullWidth
                    required
                    name="description" //Nome do campo na tabela
                    value={paymentMethod.description} //Nome do campo na tabela
                    onChange={handleFromFieldChange}
                />

                <TextField 
                    label="Taxa de operação" 
                    variant="filled" 
                    type="number"
                    fullWidth
                    required
                    name="operator_fee" //Nome do campo na tabela
                    value={paymentMethod.operator_fee} //Nome do campo na tabela
                    onChange={handleFromFieldChange}
                />

                <Fab variant="extended" color="secondary" type="submit">
                    <SendIcon sx={{ mr: 1 }} />
                    Enviar
                </Fab>
            </form>
        </>
    )
}