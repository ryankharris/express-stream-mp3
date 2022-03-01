const path = require('path');
const fs = require('fs');
const express = require('express');
const common = require('./common');
const app = express();
const port = 3000;

app.use(express.static(path.join('src', 'client')));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server is Live!');
});

app.get('/stream', (req, res) => {
  const stat = fs.statSync(common.outputPath);
  res.setHeader("content-type", "audio/mpeg");
  res.setHeader("content-length", stat.size);
  console.log('stream MP3 to client');
  fs.createReadStream(common.outputPath).pipe(res);
});

// The following route works
// app.get('/stream', (_, res) => {
//   const stat = fs.statSync(common.outputPath);
//   const options = {
//     headers: {
//       'Content-Type': 'audio/mpeg',
//       'Content-Length': stat.size
//     }
//   };
//   res.sendFile(common.outputPath, options, (err) => {
//     if (err) {
//       console.log('Error sending file.')
//     } else {
//       console.log('Sent MP3.')
//     }
//   });
// });

app.listen(port, () => {
  console.log(`MP3 serve app listening on port ${port}`)
});
