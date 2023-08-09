import { useState } from "react";
import Cabecalho from "../../components/cabecalho";
import './index.scss';
import axios from "axios";
import Filme from "../../components/filme";

export default function Filmes() {

    async function buscarFilme()
    {
        let url = `https://www.omdbapi.com/?s=${nomeFilme}&apikey=86af1cb4`;
        let resposta = await axios.get(url);
        setFilmes(resposta.data.Search);
    }

    const [nomeFilme, setNomeFilme] = useState('');
    const [filmes, setFilmes] = useState([]);

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
                            <input type="text" value={nomeFilme} onChange={e => setNomeFilme(e.target.value)}/>
                            <img src="/icon-buscar.svg" alt="" onClick={buscarFilme}/>
                        </div>

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
                </div>
            </main>
        </div>
    )
}