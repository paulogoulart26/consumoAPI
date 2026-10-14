import { useState, useEffect } from "react";

export default function Perfil (){
    const [perfil, setPerfil] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
            try{
                const response = await fetch(
                    "https://6a79e554674f43f4db11ebc8.mockapi.io/api/person/7"
                );
                const data = await response.json();
                
                setPerfil(response.data);
            }
        }
    })

}