import { useState } from "react";
import Cabecalho from "../../components/cabecalho";
import './index.scss';
import axios from "axios";
import Filme from "../../components/filme";

export default function Filmes() {

    const [nomeFilme, setNomeFilme] = useState('');
    const [filmes, setFilmes] = useState([]);
    const [countVerMais, setCountVerMais] = useState(0);
    const [pagina, setPagina] = useState(2);

    async function buscarFilme()
    {   

        
        let url = `https://www.omdbapi.com/?s=${nomeFilme}&apikey=86af1cb4`;
        let resposta = await axios.get(url);

        let arrayFilmes = resposta.data.Search;

        if (arrayFilmes !== undefined) {
            setFilmes(arrayFilmes);
        }           
    }

    function botaoEnter(e)
    {
        if (e.key === 'Enter')
            buscarFilme();
    }

    async function verMais()
    {
        setCountVerMais(countVerMais + 1);
        console.log(countVerMais);

        let url = `https://www.omdbapi.com/?s=${nomeFilme}&apikey=86af1cb4&page=${pagina + countVerMais}`;
        let resposta = await axios.get(url);
        let arrayFilmes = resposta.data.Search;

        arrayFilmes !== undefined &&
        setFilmes([...filmes, ...arrayFilmes]);
    }

    async function proximaPagina()
    {
        setCountVerMais(0);

        let url = `https://www.omdbapi.com/?s=${nomeFilme}&apikey=86af1cb4&page=${pagina}`;
        let resposta = await axios.get(url);
        let arrayFilmes = resposta.data.Search;

        if(arrayFilmes !== undefined)
        {
            setFilmes(arrayFilmes); 
            setPagina(pagina + 1);       
        } 
    }

    return (
        <div className="pagina-filmes">
            <Cabecalho />

            <main>
                <div className="container">
                    <div className="cont-img">
                        <h1>IMDB</h1>
                    </div>

                    <div className="container-tabela">
                        <h2>Consulta de Filmes</h2>

                        <div className="cont-input">
                            <label>Nome</label>
                            <input type="text" value={nomeFilme} onChange={e => setNomeFilme(e.target.value)} onKeyDown={e => botaoEnter(e)}/>
                            <img src="/icon-buscar.svg" alt="" onClick={buscarFilme}/>
                        </div>
                        
                        <div className="tabela">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Código</th>
                                        <th>Título</th>
                                        <th>Ano</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        filmes.map(item => <Filme filme={item}/>)
                                    }
                                </tbody>
                            </table>
                        </div>

                        <h4>Página {pagina -1}</h4>

                        <button onClick={verMais}>Ver mais</button>
                        <button onClick={proximaPagina}>Próxima página</button>     
                    </div>
                </div>
            </main>
        </div>
    )
}