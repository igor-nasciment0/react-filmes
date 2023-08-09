export default function Filme(props)
{
    return(
        <tr>
            <td>{props.filme.imdbID}</td>
            <td>{props.filme.Title}</td>
            <td>{props.filme.Year}<img src={props.filme.Poster} alt={`Poster de ${props.filme.Title}`} /></td>
        </tr>
    )
}