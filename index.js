const {Client, GatewayIntentBits, ActivityType} = require("discord.js");
const { OpenAI } = require('openai');
const dotenv = require("dotenv").config()


const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY,
})


const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ] 
});

// to check our bot is online 
client.on("ready", ()=>{
    console.log(`Logged in as ${client.user.tag}`);
    client.user.setActivity({
        name: `working for Ritesh's server`,
        type: ActivityType.Custom,
    });
});



// to interact with the user messages
client.on('messageCreate', async (message) => {
    if(message.author.bot) return;
    // else{
    //     message.reply({
    //         content: "Hi from Bot"
    //     });
    // } 

    // send typing effect till the use waits for message 
    await message.channel.sendTyping();
    const sendTypingInterval = setInterval(() => {
        message.channel.sendTyping();
    }, 5000);

    // connection to OpenAI API
    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
            {
                // name 
                role: "system",
                content : 'Chat GPT is a friendly chatbot.'
            },
            {
                role: 'user',
                content: message.content,
            }
        ]
    }).catch((error) => console.error('OpenAI Error:\n', error));

    clearInterval(sendTypingInterval);

    if(!response)
    {
        message.reply('I am having trouble with the OPENAI server, Please Try again in a moment...')
    }

    message.reply(response.choices[0].message.content);
});


// interaction with /ping command
client.on('interactionCreate', (interaction) => {
    if(interaction.isCommand()){
        if(interaction.commandName==="ping")
        {
            interaction.reply("pong")
        }
        if(interaction.commandName==="about")
        {
            interaction.reply("I am an AI Chatbot integrated with OpenAI.")
        }
    }
})







client.login(process.env.DISCORD_TOKEN);