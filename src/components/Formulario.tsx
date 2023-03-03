import {useState} from "react";
import styled from "styled-components"

const Formulario = ( ) =>{


    const [emailError, setEmailError] =useState<boolean>(false);
    const [edad,setEdad] = useState<number>(0)

    const validateEmail=(email: string):boolean=>{
        
        const valid=/^[a-zA-Z0-9]+@[a-zA-Z0-9]+.[a-z]*$/

        if(email.match(valid)) return true;
        return false

    }

    return(
        <>
            Introduce tu nombre: <input type="text"/> <br/>
            Introduce tu edad: <input 
                type="number"
                value={edad}
                onChange={(e)=> setEdad(parseInt(e.target.value))}
                />
            <br/>
            {edad > 14 && (
                <>
                    {/*on blur para cuando slaes de campo*/}
                    Introduce email:{" "}
                    <Input error={emailError}
                        onChange={(e)=>{
                            if(emailError) setEmailError(!validateEmail(e.target.value))}
                        }
                        type="text"
                         
                        onBlur={(e)=> setEmailError(!validateEmail(e.target.value))}

                    />{" "}
                    <br/>
                    {emailError && <>Email incorrecto</>}
                </>
            )}

            {edad>18 ? <div>Eres mayor de edad</div>  : <div>Eres menor de edad</div>}
            {edad>18 && (
                <>
                <Input type="checkbox"/> Tengo coche
                </>
            )}
        </>
    )
}

type InputProp = {
    error?: boolean
}

const Input= styled.input<InputProp>`

    background-color: ${ props=> props.error ? "red" : "white" };
    color: ${props => props.error===true ? "white": "green"}

`

export default Formulario;