const messages = {
    WELCOME: {
        INITIAL: "Bem vindo ao pomodóry, basta dizer configurar, para decidir a duração do pomodoro ou então iniciar para começarmos a contagem com as configurações padrão. O que deseja fazer?",
        REPROMPT: "posso iniciar o timer?"
    },
    TECHNIQUE: {
        START: "Iniciando pomodoro, respire e foque no que está fazendo e então eu te aviso a hora da pausa",
        DEFAULT: "Você não possui nenhuma configuração do pomodoro, posso iniciá-lo com as configurações recomendadas?",
        DEFAULT_START: "iniciando pomodoro. Duração: 25 minutos, com pausas de 5 minutos. Então vamos la! foque no que está fazendo e eu te aviso a hora da pausa."
    },
    CONFIGURATION: {
        INITIAL: "Vamos começar a configuração do seu pomodoro. me diga qual duração se encaixa melhor a você, 15. 25. 30. ou 50 minutos?",
        BREAK: "Certo, agora me diga quanto tempo de pausa prefere, 5. 10. 15. ou 20 minutos por pausa?",
        DONE: "Agora que seu pomodóry está configurado, basta dizer: Abrir pomodóry e então iniciar.",
    },
    NOTIFY_MISSING_PERMISSIONS: {
        EMAIL: "Não consegui descobrir seu email, você pode me ajudar dando permissão lá no aplicativo da Alexa.",
        REMINDER: "Não tenho permissão para notificá-lo sobre o término do turno, por favor, habilite a opção lembrete lá no aplicativo da Alexa."
    },
    TIMER: {
        ROUND_END: "Hora de relaxar. vá pegar um café... Ou então... ir ao banheiro... E quando voltar, se prepare para o próximo ciclo",
        BREAK_END: "Acabou o tempo de descanso, para iniciar um novo ciclo, diga: abrir pomodóry e iniciar pomodoro"
    },
    ERROR: {
        DID_NOT_UNDERSTAND: "Desculpe, eu não entendi, vocẽ pode repetir?",
        UNKNOW: "Algo deu errado, estamos avaliando o erro para em breve corrigí-lo",
    },
    STOP: "Obrigado por usar o pomodóry. Estou cancelando qualquer lembrete que eu tenha criado. até mais!",
    ZERO_EFFORT: "Me parece que você ainda não usou o Pomodory hoje! aguardo você me chamar para iniciamos a contagem",
    CALCULATE_EFFORT: (yieldTime) => { return `Você rendeu aproximadamente ${time_convert(yieldTime)} Usando o Pomodóry` },
    HELP: "Pomodóry é uma skill para auxíliar pessoas que possuem algum déficit de Atenção, você pode dizer configurar, para configurar o pomodoro do seu jeito. ou então iniciar. o que você deseja fazer?",
    CURIOSITY: "A técnica Pomodoro tem como objetivo fazer você se concentrar nas tarefas que precisa realizar, foi criada pelo italiano Francesco Cirillo e tem esse nome derivado da palavra italiana pomodoro, como referência ao popular cronômetro gastronômico na forma dessa fruta.",
}

function time_convert(num) {
    const hours = Math.floor(num / 60);
    const minutes = num % 60;
    if (hours === 0) {
        return `{minutes} minutos.`
    } else {
        return `${hours} horas e ${minutes} minutos.`;
    }
}

module.exports = messages;