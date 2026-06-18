const fs = require('fs');

const files = [
  'server/services/voiceTranscriber.js',
  'server/services/aiSummarizer.js',
  'client/index.html',
  'client/src/index.css',
  'client/tailwind.config.js',
  'client/src/components/chat/ChatWindow.jsx'
];

files.forEach(file => {
  try {
    let content = fs.readFileSync(file, 'utf8');
    // Replace the entire conflict block with just the friend's version
    content = content.replace(/<<<<<<< HEAD[\s\S]*?=======\r?\n([\s\S]*?)>>>>>>> friend\/main\r?\n?/g, '$1');
    fs.writeFileSync(file, content);
    console.log(`Resolved conflicts in ${file}`);
  } catch (err) {
    console.error(`Error resolving ${file}:`, err.message);
  }
});
