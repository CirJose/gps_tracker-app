const initConfig = {
    host: `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}`,
    idRol: 6,
    apiKey:'AIzaSyBJaAVy3Qn0pp42cuLfy_-uCFQeXwNN4t8',
    idioma:{
        defaultLocale:"es-EC",
        defaultCountry:"EC",
        listaPaises:["EC","CA","US","CO","PE","CL","AR"],
        listaLocales:{
            "EC":"es-EC",
            "CA":"en-CA",
            "US":"en",
            "CO":"es-CO",
            "PE":"es-PE",
            "CL":"es-CL",
            "AR":"es-AR"
        },
    }
}

export default initConfig;
