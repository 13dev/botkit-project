module.exports = {

    SET_USER_NAME: async (bot, message) => {
        const name = message.match[1];

        controller.storage.users.get(message.user, (err, user) => {
            if (!user) {
                user = {
                    id: message.user
                };
            }

            user.name = name;

            controller.storage.users.save(user, () => {
                bot.reply(message, `Percebi. Vou chamá-lo de ${user.name} a partir de agora.`);
            });
        });
    },

    WHATS_USER_NAME: async (bot, message) => {

        controller.storage.users.get(message.user, (err, user) => {
            if (user && user.name) {
                bot.reply(message, `O seu nome é ${user.name}`);
                return;
            }

            bot.startConversation(message, (err, convo) => {
                if (err) {
                    bot.botkit.log('Impossivel começar uma conversa.', err);
                    return;
                }

                convo.say('Ainda não sei o seu nome!');
                convo.ask('Qual o seu nome/apelido?', (response, convo) => {

                    convo.ask(`Queres que te chame de ${response.text} ?`, [
                        {
                            pattern: 'sim',
                            callback: (response, convo) => {
                                // since no further messages are queued after this,
                                // the conversation will end naturally with status == 'completed'
                                convo.next();
                            }
                        },
                        {
                            pattern: 'nao',
                            callback: (response, convo) => convo.stop(),
                        },
                        {
                            default: true,
                            callback: (response, convo) => {
                                convo.repeat();
                                convo.next();
                            }
                        }
                    ]);

                    convo.next();
                    // store the results in a field called nickname
                }, {'key': 'nickname'});

                convo.on('end', (convo) => {
                    if (convo.status === 'completed') {
                        bot.reply(message, 'OK! Vou atualizar o meu dossiê...');

                        controller.storage.users.get(message.user, (err, user) => {
                            if (!user) {
                                user = {
                                    id: message.user,
                                };
                            }

                            user.name = convo.extractResponse('nickname');
                            controller.storage.users.save(user, () => {
                                bot.reply(message, `Vou chamá-lo de ${user.name} a partir de agora.`);
                            });
                        });

                        return;
                    }
                    // conversation ended
                    bot.reply(message, 'bye!');

                });

            });

        });
    }
};
