const Result = ({ data }) => {
    return (
        data ? <div className="resultado">El interes es: <span>{ data }</span></div> : null

    )
}

export default Result