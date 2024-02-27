const { REST, Routes } = require('discord.js');

const commands = [
    {
      name: 'ping',
      description: 'Replies with Pong!',
    },
    {
      name: 'about',
      description: 'about the ChatBot'
    }
  ];

  const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

  try {
    console.log('Started refreshing application (/) commands.');
  
    rest.put(Routes.applicationCommands(process.env.APPLICATION_ID), { body: commands });
  
    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  } 