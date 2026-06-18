const fs = require('fs');
const file = 'client/src/components/chat/MessageBubble.jsx';

let content = fs.readFileSync(file, 'utf8');
content = content.replace(/<<<<<<< HEAD[\s\S]*?=======\r?\n([\s\S]*?)>>>>>>> friend\/main\r?\n?/g, '$1');
fs.writeFileSync(file, content);
console.log('Fixed MessageBubble.jsx');
