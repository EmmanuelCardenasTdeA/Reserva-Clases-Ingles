import React,{useState,useEffect,useCallback,useMemo,createContext, Profiler} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CLAVE_RESERVAS = '@reservas_ingles';

export const ReservasContext = createContext(null)

export function ReservaProvider({children}){
    const[reservas,setReservas] = useState([]);
    const[cargando,setCargando] = useState(true)

    //Cargar las reservas guardadas, si no hay nada devuelve un arreglo vacio
    useEffect(()=>{
        const cargar = async () =>{
            try {
                const guardado = await AsyncStorage.setItem(CLAVE_RESERVAS);//revisar
                if(guardado !== null){
                    setReservas(JSON.parse(guardado))
                }
            }catch (error) {
                console.log(`Error leyendo las reservas: ${error}`);
            }finally{
                setCargando(false)
            }
        };
        cargar();
    },[]);

    //Guardado
     useEffect(()=>{
        if(cargando)return;
        AsyncStorage.setItem(CLAVE_RESERVAS, JSON.stringify(reservas)).catch((error) => console.log(`Error al guardar reservas: ${error}`)
    
    );
    }, [reservas,cargando]);

    const agregarReserva = useCallback((clase, horario)=>{
        const nueva = {
            id: clase.id + "-" + horario,
            titulo:clase.titulo,
            profesor: clase.profesor.nombre + " " + clase.profesor.apellido,
            precio: clase.precio,
            horario,
            creadoEn: new Date().toISOString()
        }

        let resultado = {ok:true};
        setReservas((previas) => {
            if(previas.some((r) => r.id === nueva.id)){
                return previas;
            }

            return[nueva, ...previas]
        }); //setReservas
        return resultado
    },[]);//cierre callBack
const valor = useMemo(
    () => ({cargando, agregarReserva,reservas}), [cargando,agregarReserva,reservas]
);
return <ReservaProvider.Provider value={valor}>{children}</ReservaProvider.Provider>//revisar
}//Cierre funcion