// File: api/index.js
module.exports = async (req, res) => {
  try {
    const queryString = new URLSearchParams(req.query).toString();
    const targetUrl = queryString 
      ? `https://sms-bmb-api.fakcloud.tech/?${queryString}` 
      : "https://sms-bmb-api.fakcloud.tech/";
    
    const fetchResponse = await fetch(targetUrl);
    const rawData = await fetchResponse.text();
    
    let usefulData = rawData;
    
    try {
        let jsonData = JSON.parse(rawData);
        
        // 1. Tumhari custom branding set ki
        jsonData.Branding = "𐏓꯭Ξ⤹³𓆩˹𝐍𝐸𝑋𝐺𝐸𝑁-𝑇𝐸𝐶𝐻-𝑍𝑂𝑁𝐸꧊𓆪";
        
        // 2. Owner change kiya aur Website/WhatsApp remove kar diya
        if (jsonData.Credits) {
            jsonData.Credits.Owner = "NexGen Tech Zone";
            delete jsonData.Credits.Website;
            delete jsonData.Credits.WhatsApp;
        }
        
        usefulData = JSON.stringify(jsonData, null, 2);
    } catch (e) {
        usefulData = rawData;
    }

    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(`
      <html>
        <head>
          <title>NexGen Tech System</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="background-color: black; color: #00FF00; font-family: monospace; text-align: center; padding-top: 8%;">
          <h1>⚡ Developed By NexGen Tech ⚡</h1>
          <p style="color: #aaaaaa;">[ System Core Active ]</p>
          <hr style="border-color: #00FF00; width: 70%;">
          
          <div style="background: #111; padding: 20px; border: 1px dashed #00FF00; display: inline-block; text-align: left; max-width: 90%; overflow-x: auto; margin-top: 20px;">
            <h3 style="margin-top: 0; color: white;">[ Output Response ]</h3>
            <pre style="margin: 0; font-size: 16px;">${usefulData}</pre>
          </div>
        </body>
      </html>
    `);
  } catch (error) {
    res.setHeader('Content-Type', 'text/html');
    res.status(500).send(`
      <body style="background-color: black; color: red; font-family: monospace; text-align: center; padding-top: 10%;">
        <h1>[!] API CONNECTION FAILED [!]</h1>
        <h2>Developed By NexGen Tech</h2>
        <p>Error Details: Target API connect nahi ho rahi.</p>
      </body>
    `);
  }
};
