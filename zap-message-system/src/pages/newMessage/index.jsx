import { Button } from "@mui/material";
import { useEffect, useState } from 'react';
import api from '../../service/api'
import Swal from 'sweetalert2';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { useHistory } from "react-router-dom";
import * as yup from 'yup';
import './styles.css';

const NewMessage = () => {

    const [channel, setChannel] = useState("");
    const [trigger, setTrigger] = useState("");
    const [timer, setTimer] = useState("");
    const [message, setMessage] = useState("");
    const [triggerOption, setTriggerOption] = useState([]);
    const [channelOption, setChannelOption] = useState([]);

    const history = useHistory();

    const handleClickGoBack = () => {
        history.goBack();
    }

    const handleGetChannels = async () => {
        try {
            const response = await api.get('/messages');
            const msg = response.data;
            const channelsList = msg.map(item => item.channel)
            const channelsWithoutDuplicates = [...new Set(channelsList)];
            setChannelOption(channelsWithoutDuplicates);
        } catch (error) {
            Swal.fire("Ocorreu um erro!", "Erro ao popular lista de gatilhos!");
        }
    }

    const handleGetTriggers = async () => {
        try {
            const response = await api.get('/messages');
            const msg = response.data;
            const triggerList = msg.map(item => item.trigger)
            const triggersWithoutDuplicates = [...new Set(triggerList)];
            setTriggerOption(triggersWithoutDuplicates);
        } catch (error) {
            Swal.fire("Ocorreu um erro!", "Erro ao popular lista de gatilhos!");
        }
    }

    useEffect(() => {
        handleGetChannels();
        handleGetTriggers();
    }, [])

    const schema = yup.object().shape({
        channel: yup.string().required("Campo obrigatorio").min(5, "Selecione o canal!"),
        trigger: yup.string().required("Campo obrigatorio").min(5, "Selecione o gatilho!"),
        timer: yup.string().required("Campo obrigatorio").min(5, "Campo tempo é muito curto!"),
        message: yup.string().required("Campo obrigatorio").min(5, "Digite uma mensagem!")
    });

    const handleSubmit = async (event) => {
        try {
            const isValid = schema.isValid({ channel, trigger, timer, message });
            if (isValid === false) {
                Swal.fire("Verifique os campos!");
                return;
            }
            event.preventDefault();
            const response = await api.post('/messages', {
                id: "",
                channel: channel,
                trigger: trigger,
                timer: timer,
                message: message
            });
            console.log(response.data());





        } catch (error) {
            Swal.fire(`Aconteceu um erro!\n${error}`);
        }

        Swal.fire(
            'Cadastrado!',
            'Usuário cadastrado com sucesso!',
            'success'
        )

    }

    return (

        <div className="ContainerNewMessage">
            <Card className="CardNewMessage" sx={{ maxWidth: 545 }}></Card>
            <Button onClick={handleClickGoBack}>Voltar</Button>
            <form>
                <Button onClick={handleSubmit}>Cadastrar</Button>
                <CardContent>
                    <Select value={trigger} onChange={(event) => setTrigger(event.target.value)} defaultValue={""} displayEmpty>
                        <MenuItem value="">Todos</MenuItem>
                        {triggerOption.map((row) =>
                            <MenuItem value={row}>{row}</MenuItem>
                        )}
                    </Select>
                    <Select value={channel} onChange={(event) => setChannel(event.target.value)} defaultValue={""} displayEmpty>
                        <MenuItem value="">Todos</MenuItem>
                        {channelOption.map((row) =>
                            <MenuItem value={row}>{row}</MenuItem>
                        )}
                    </Select>

                    <TextField value={timer} onChange={(event) => setTimer(event.target.value)} label="Tempo" variant="standard" /><br />
                    <TextField multiline maxRows={10} variant="filled" value={message} onChange={(event) => setMessage(event.target.value)} label="Mensagem" />

                </CardContent>
            </form>
        </div>
    )

}

export default NewMessage;