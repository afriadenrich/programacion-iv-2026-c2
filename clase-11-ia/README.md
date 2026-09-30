# TEMAS

- Angular si
- Componentes si
- Ruteo si
- Bindeos si
- Lazy Loading si
- input si
- output si
- Servicios si
- HttpModule si
- Formularios si
- Supabase
- Supabase Auth
- Supabase DB
- Supabase Storage
- RLS


Tecnologías:  

Angular 22 

Supabase Auth, DB, Storage y RLS 

Usar estándares del archivo Agents.md 

 

Rutas: 

Login, Registro, Home, QuiénSoy, Juego1, Juego2, Juego3, Juego4, Chat, Rankings  

  

Componentes:  

Reutilzar componentes globales (nav, footer, etc.)6 

 

Alcance: 
Proyecto de sala de juegos, debe tener una landing que informe sobre la sala y navegación a 4 juegos distintos. Ahorcado, Mayor o menor (juego de azar), Preguntados y batalla naval vs ia.  

 

Estilos:  
incorporar taiwind 

 

Seguridad: 
Guards para rutas. Los juegos no pueden accederse si no se está logueado. RLS para todo.  

Usuarios: 

regulares / admins 

 

Formularios: 
validaciones de angular, mensajes claros de error, mensaje de exito formato toastifyjs 

 

DB:  

Tabla Usuarios. Email unique, username unique 

Tablas Resultados de cada juego. Los resultados deben poder tener parámetros que permitan ordenar a los jugadores de mayor a menor desempeño. Una tabla por juego. Relación con usuarios por username. 

 

Login: 
Mail o nombre de usuario y contraseña. 

 

Registro: 

Mail, nombre, apellido, nombre de usuario, contraseña, fecha de nacimiento, foto de perfil (Supabase storage). 

 

Home 

Visualizar juegos, mensaje de bienvenida. Explicar cada juego. 

 

QuiénSoy 

Httpclient.get(“https://api.github.com/users/afriadenrich”) mostrar datos a modo de ficha.  

 

Juego1 -> Ahorcado. Teclado en pantalla formato botones. Temporizador. Palabras aleatoreas. Generar array.  

 

Juego2 -> Mayor o menor -> Azar -> usar cartas de poker. 3 vidas. Temporizador 

 

Juego3 -> preguntados -> generar array de ejemplo 20 preguntas -> opción múltiple -> mostrar correcta y/o incorrecta al jugar. Temporizador. 

 

Juego4 -> batalla naval vs ia. Ia aleatoria. Timeout en turno de ia. UX clara en turno ia. Colocación de barcos sin contacto entre ellos.  

 

Rankings 

Juegos guardan resultados, ordenar mejor a peor, mostrar ranking por juegos formato tabla. Traer 10 mejores. Muestra datos de cada juego + username 

 

Chat: 

Global. Todos los usuarios hablan. Guarda y muestra mensaje, username, fecha. Solo logueados. Usar supabase realtime. 