const passport = require('passport');
const session = require('express-session');
const path = require('path');
//const EmbedBuilder = require('discord.js');
const http = require('http');
const { MessageEmbed } = require("discord.js")
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers
} = require('./utils/users');




//..

const express = require('express');
const app = express();
const server = http.createServer(app);

const io = socketio(server);

const port = 8080;




server.listen(port);

//..


// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

const botName = 'Ale𝙭 AI';

// Run when client connects
io.on('connection', socket => {
  socket.on('joinRoom', ({ username, room }) => {
    const user = userJoin(socket.id, username, room);

    socket.join(user.room);

    socket.emit('message', formatMessage(botName, 'Welcome to OurSpace!'));

    socket.broadcast
      .to(user.room)
      .emit(
        'message',
        formatMessage(botName, `${user.username} has joined the system.`)
      );

    const ip = socket.handshake.headers['x-forwarded-for'] || socket.conn.remoteAddress.split(":")[3];

    console.log('USER: ', user.username, ip, socket.id, ' - connected');

    // Send user and room info
    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room)
    });
  });

  // Listen for chatMessage
	
	const ip = socket.handshake.headers['x-forwarded-for'] || socket.conn.remoteAddress.split(":")[3];

  socket.on('chatMessage', msg => {
    const user = getCurrentUser(socket.id);

    io.to(user.room).emit('message', formatMessage(user.username, msg));

  });

  // Runs when client disconnects
  socket.on('disconnect', () => {
    const user = userLeave(socket.id);

    if (user) {
      io.to(user.room).emit(
        'message',
        formatMessage(botName, `${user.username} has left the system.`)
      )
const ip = socket.handshake.headers['x-forwarded-for'] || socket.conn.remoteAddress.split(":")[3];

console.log('USER: ', user.username, ip, socket.id,' - disconnected')
		
      // Send users and room info
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room)
      });
    }
  });
});



//=========   DISCORD BOT ============//
          //    begin      //
// discord.js import
const { Client, Collection } = require('discord.js');
const client = new Client({
  disableMentions: 'everyone',
})
const { readdirSync } = require('fs');
const { join } = require('path');
const Discord = require('discord.js');
// node-fetch for making HTTP requests


client.on("warn", (info) => console.log(info));
client.on("error", console.error);

//______Write the rest of your Discord bot code______



//==

/////////////// E V A L \\\\\\\\\\\\\\

client.on("message", message => {
  const args = message.content.split(" ").slice(1);

  if (message.content.startsWith("D.eval")) {
    if(message.author.id !== "YOUR ID") return;
    try {
      const code = args.join(" ");
      let evaled = eval(code);

      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);
const { MessageEmbed } = require('discord.js');
      const evalEmbed = new MessageEmbed()
                .setColor(000000)
                .addField('Input:', ` \`\`\`xl\n${args}\n\`\`\``)
		.addField('Output:', ` \`\`\`xl\n${evaled}\n\`\`\``)
            message.channel.send(evalEmbed)
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${(err)}\n\`\`\``);
    }
  }
});
/////////////// E V A L \\\\\\\\\\\\\\

//==



client.login(process.env.DISCORD_TOKEN);
           //     end      //
//========= DISCORD BOT ============//

//contact: Tac Shadow#5920
//server:  https://dsc.gg/tacticalshadow
//DM me if you are facing any bugs, or want a feature request. I'll even respond to a good morning :]