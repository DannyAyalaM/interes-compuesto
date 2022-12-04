import { useField } from "formik"

// const formato = (number) => {
//     const exp = /(\d)(?=(\d{3})+(?!\d))/g;
//     const rep = '$1,';
//     return number.toString().replace(exp,rep);
// }

const Input = ({label, ...props}) => {
    const [field, meta] = useField(props)
    return (
        <div className="container__label">
            <label>{label} </label> <br />
            <input {...field} {...props} />
            {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
        </div>
    )
} 

export default Input