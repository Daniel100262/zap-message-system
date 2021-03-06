import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import Table from '@mui/material/Table';
import StyledTableRow from '../StyledTableRow';
import StyledTableCell from '../StyledTableCell';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import api from '../../service/api'
import './styles.css';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';

const DataTable = () => {

    const [data, setData] = useState([]);
    const [timer, setTimer] = useState("");
    const [channel, setChannel] = useState("");
    const [trigger, setTrigger] = useState("");
    const [triggerOption, setTriggerOption]  = useState([]);
    const [channelOption, setChannelOption]  = useState([]);

    const history = useHistory();

    const theme = createTheme();

    theme.typography.h3 = {
        fontSize: '1.2rem',
        '@media (min-width:600px)': {
            fontSize: '1.5rem',
        },

        [theme.breakpoints.up('md')]: {
            fontSize: '2.4rem',
        },
    };

    const handleClickNewMessage = () => {
        history.push("/messages/new")
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const response = await api.get(`/messages?channel_like=${channel}&trigger_like=${trigger}&timer_like=${timer}`)
    
        setData(response.data);
    }

    const handleGetMessages = async () => {
        try {
            const response = await api.get('/messages')
            setData(response.data);
        } catch (error) {
            Swal.fire("Ocorreu um erro!", "Erro ao popular a lista de mensagens!");
        }
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

    const abreMsg = (msg) => {
        Swal.fire(msg);
    }

    useEffect(() => {
        handleGetChannels();
        handleGetMessages();
        handleGetTriggers();
    }, [])

    

    return (
        <div className="TableCard" >
            <form onSubmit={handleSubmit}>

            <ThemeProvider theme={theme}>
                <Typography variant="h3">Mensagens</Typography>
            </ThemeProvider>

            <Select value={trigger} label="Canal" onChange={(event) => setTrigger(event.target.value)} defaultValue={""} displayEmpty>
                <MenuItem value="">Todos</MenuItem>
               {triggerOption.map((row) =>
                    <MenuItem key={row} value={row}>{row}</MenuItem>    
                )}
            </Select>

            <Select value={channel} label="Gatilho" onChange={(event) => setChannel(event.target.value)} defaultValue={""} displayEmpty>
                <MenuItem value="">Todos</MenuItem>
               {channelOption.map((row) =>
                    <MenuItem key={row} value={row}>{row}</MenuItem>    
                )}
            </Select>


            <TextField value={timer} onChange={(event) => setTimer(event.target.value)} label="Tempo" variant="outlined" />
                
            <Button onClick={handleSubmit}>Pesquisar</Button>
            </form>
            <Button onClick={handleClickNewMessage}>Nova Mensagem</Button>
            <TableContainer sx={{ maxWidth: 700 }} component={Paper}>
                <Table sx={{ minWidth: 500 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Canal</StyledTableCell>
                            <StyledTableCell>Gatilho</StyledTableCell>
                            <StyledTableCell>Tempo</StyledTableCell>
                            <StyledTableCell>A????es</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        
                        {data.map((row) => (
                            
                            <StyledTableRow key={row.id}>
                                <StyledTableCell>{row.channel}</StyledTableCell>
                                <StyledTableCell>{row.trigger}</StyledTableCell>
                                <StyledTableCell>{row.timer}</StyledTableCell>
                                <StyledTableCell>
                                    <Button
                                        onClick={() => {abreMsg(row.message)}}
                                        variant="contained">
                                        Ver mensagem
                                    </Button>
                                    
                                </StyledTableCell>

                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>

            </TableContainer>
        </div>
        
    );
}

export default DataTable;