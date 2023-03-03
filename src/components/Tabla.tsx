import { useState } from "react";
import styled from 'styled-components';
import Link from 'next/link';


type Row = {
  dni: string;
  name: string;
};

type Column = {
  colname: string;
};

const Tabla = () => {
    
    const [NameError, setNameError] =useState<boolean>(true);
    const [DNIError, setDNIError] =useState<boolean>(true);
    const [nombre, setNombre] = useState<string>(" ");
    const [dni, setDNI] = useState<string>(" ");
    const [rows, setRows] = useState<Row[]>([]); 

    const validateName=(email: string):boolean=>{
        
        const valid=/[A-Z]+[a-z]/

        if(email.match(valid)) return true;
        return false

    }
    const validateDNI=(email: string):boolean=>{
        
        const valid=/[0-9]{8}[A-Z]/

        if(email.match(valid)) return true;
        return false

    }
    
    const addRow = (dni: string, name: string) => {
        
            setRows([...rows, { dni, name }]);
        
    };

    const deleteRow = (index: number) => {
    const newRows = [...rows];
    newRows.splice(index, 1);
    setRows(newRows);
    };

    return (
    <>       
            <Tablagrid container = {true}>
                <Tablagrid item = {true}>Nombre</Tablagrid>
                <Tablagrid item = {true}>DNI</Tablagrid>
                <Tablagrid item = {true}>Eliminar</Tablagrid>
                
                {rows.map((row,index) => (
                    <>
                        <Input_n
                            value={row.name}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                        
                        <Input_d
                        
                        value={row.dni}
                        onChange={(e) => setDNI(e.target.value)}
                        
                        />
                        
                        <button className="icon-button" onClick={() => deleteRow(index)}>
                        <img src="data:image/png;base64,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"/>
                        </button>
                        
                        
                    </>
                    
                ))}
                
                <br/>
            </Tablagrid> 

            <br/>

            <>
                <Tablagrid container = {true}>
                    <Tablagrid item = {true}>Nombre</Tablagrid>
                    <Tablagrid item = {true}>DNI</Tablagrid>

                    <br/>

                    <Tablagrid item = {true}> 
                        <Input_n error={NameError}
                            type="text" 
                            value={nombre} 
                            onChange={(e) => {
                                setNombre(e.target.value)
                                if(NameError) setNameError(!validateName(e.target.value))
                            }
                            }  
                            onBlur={(e)=> setNameError(!validateName(e.target.value))}
                        /> 
                    </Tablagrid>
                    <Tablagrid item = {true}>
                        <Input_d error={DNIError}
                            type="text"
                            value={dni} 
                            onChange={(e) => {
                                setDNI(e.target.value)
                                if(DNIError) setDNIError(!validateDNI(e.target.value))
                            }
                            }
                            onBlur={(e)=> setDNIError(!validateDNI(e.target.value))} 
                            
                        /> 
                    </Tablagrid>
                        <>
                        
                        </>
                    <div>
                        
                        <button onClick={()=>{ 
                            setDNIError(!validateDNI(nombre))
                            setNameError(!validateName(dni))
                            if(!NameError && !DNIError){
                                console.log(dni)
                                addRow(dni,nombre) 
                            }

                        }}>Añadir</button>
                    </div>
                </Tablagrid>
            </>

    </>
    )
}

type t_Props = {
    container: boolean;
    item: boolean;
}

const Tablagrid = styled.div`

    

    background-size: ${(props: t_Props) => props.container ? "auto" : "none"};
    background-image: ${(props: t_Props) => props.container ? "radial-gradient(#ff8a00, #e52e71)" : "none"};
    border: ${(props: t_Props) => props.container ? "3px solid rgba(0, 0, 0, 0.8)" : "none"};
    border-color: ${(props: t_Props) => props.container ? "3px solid rgba(0, 0, 0, 0.8)" : "none"};


    align-items: ${(props: t_Props) => props.container ? "auto" : "none"};
    justify-content: ${(props: t_Props) => props.container ? "auto" : "none"};

    display: ${(props: t_Props) => props.container ? "grid" : "block"};
    grid-auto-rows: ${(props: t_Props) => props.container ? "center" : "none"};
    grid-template-columns: ${(props: t_Props) => props.container ? "auto auto auto" : "none"};
    column-gap: ${(props: t_Props) => props.container ? "1px" : "none"};
    row-gap: ${(props: t_Props) => props.container ? "0px" : "none"};
    padding: ${(props: t_Props) => props.container ? "0px" : "none"};


    background-color: ${(props: t_Props) => props.item ? " #919191" : "none"};
    //border: ${(props: t_Props) => props.item ? "3px solid rgba(0, 0, 0, 0.8)" : "none"};
    padding: ${(props: t_Props) => props.item ? "1px" : "none"};
    font-size: ${(props: t_Props) => props.item ? "12px" : "none"};
    text-align: ${(props: t_Props) => props.item ? "center" : "none"};
`

type I_Propa = {
    errora?: boolean
}
type I_Propb = {
    errorb?: boolean
}

const Input_n= styled.input`

    background-color: ${ (props: I_Propa) => props.error ? "red" : "white" };
    border: ${(props: t_Propa) => props.error ? "3px solid rgba(0, 0, 0, 0.8)" : "3px solid rgba(0, 0, 0, 0.8)"};
    color: ${(props: I_Proa) => props.error===true ? "blue": "green"}

`
const Input_d= styled.input`

    background-color: ${ (props: I_Propb) => props.error ? "red" : "white" };
    border: ${(props: t_Propb) => props.error ? "3px solid rgba(0, 0, 0, 0.8)" : "3px solid rgba(0, 0, 0, 0.8)"};
    color: ${(props: I_Propb) => props.error===true ? "blue": "green"}

`

export default Tabla;