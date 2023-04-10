/**
 * GET chat messages
 */
 router.post('/chat', async function (req, res, next) {
   const payload = req.body
   const openaiUrl = 'https://v1/chat/completions'  //可以自己搭建一个反代理地址
   const keys = [
     'sk-',
     'sk-',
     'sk-',
     'sk-',
     'sk-',
   ] 
   const headers = {
     'Content-Type': 'application/json',
     'Transfer-Encoding': 'chunked',
     Authorization: `Bearer ${keys[Math.floor(Math.random() * keys.length)]}`, 
   }
   const data = {
     model: 'gpt-3.5-turbo',
     messages: [{ role: 'user', content: payload.message }],
   }
   try {
     const response = await axios.post(openaiUrl, data, { headers })
     res.writeHead(200, {
       'Content-Type': 'application/json',
       'Transfer-Encoding': 'chunked',
     })
     res.write(JSON.stringify(response.data.choices)) 
     res.end()
   } catch (error) {
     console.error(error)
     next(error)
   }
 })
