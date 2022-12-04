import { Form, Formik } from 'formik'
import { useState } from 'react'
import './App.css'
import Button from './components/Button'
import Input from './components/Input'
import Result from './components/Result'
import * as Yup from 'yup'

const compoundInterest = (deposit, contribution, years, rate) => {
  let total = deposit
  for (let i = 0; i < years; i++) {
    total = (total + contribution) * (rate + 1)
  }

  return Math.round(total)
}

const formatter = new Intl.NumberFormat('en-US', {
  stylel: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

const App = () => {
  const [state, setState] = useState('')
  const handleSubmit = ({ deposit, contribution, years, rate }) => {
    const val = compoundInterest(Number(deposit), Number(contribution), Number(years), Number(rate))
    setState(formatter.format(val))
  }
  return (
    <div className="container">
      <div className='container__form'>
        <Formik
          initialValues={{
            deposit: '',
            contribution: '',
            years: '',
            rate: ''
          }}
          validationSchema={ Yup.object({
            deposit: Yup.number().required('Obligatorio').typeError('Debe ser un numero'),
            contribution: Yup.number().required('Obligatorio').typeError('Debe ser un numero'),
            years: Yup.number().required('Obligatorio').typeError('Debe ser un numero'),
            rate: Yup
              .number()
              .required('Obligatorio')
              .typeError('Debe ser un numero')
              .min(0, 'El valor minimo es 0')
              .max(1, 'El valor maximo es 1'),
          }) }
          onSubmit={handleSubmit}
          onReset={values => {
            setState('')
          }}
        >
          <Form>
            <Input name="deposit" type="number" label="Deposito inicial" />
            <Input name="contribution" type="number" label="Contribucion contribution" />
            <Input name="years" type="number" label="Anhos" />
            <Input name="rate" type="number" label="rate promedio" />
            <Button type="submit">Calcular</Button>
            <Button type="reset">Limpiar</Button>
          </Form>
        </Formik>
        <Result data={state}/>
      </div>
    </div>
  )
}
export default App;
