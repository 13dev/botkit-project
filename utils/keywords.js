// module.exports =

let data = {
    IDENTIFY_ME: ['tempo de atividade',  'quem es tu', 'qual e o teu nome', 'quem es'],
    SHUTDOWN: ['desligar'],
    //WHATS_USER_NAME: ['qual e o meu nome', 'quem sou eu'],
    //SET_USER_NAME: ['chama me (.*)', 'o meu nome e (.*)'],
    GREETINGS: ['ola', 'boas'],
    GET_TASKS: ['get my first (.*) tasks'],
    GET_TASKS_BY_TYPE: ['get my first (.*) tasks of type (.*)'],
    GET_PRIORITY_TASKS: ['get my top priority tasks'],
};

// Transform all in RegExp class
for (const [,handler] of Object.entries(data)) {
    handler.forEach((value, index) => {
        handler[index] = new RegExp(value);
    })
}


module.exports = data;
