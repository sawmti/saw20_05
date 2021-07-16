const express = require("express");
const axios = require('axios');
// const fetch = require('node-fetch');
const router = express.Router();
// router.get("/entities", (req, res, next) => {
//   try{
//     const req = axios({
//       url: `https://www.wikidata.org/w/api.php?action=parse&page=Q219458&format=json`,
//       method: 'GET',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json;charset=UTF-8'
//       },
//     }).then(response => {
//       res.statusCode = 200;
//       res.setHeader('Content-Type', 'application/json');
//       res.json(response.data);
//     })
//   } catch(error){
//       console.error(error);
//   }
// })


router.get("/entities/:id", (req, res, next) => {
    try{
        const id = req.params.id
        const req = axios({
        url: `https://www.wikidata.org/w/api.php?action=parse&page=${id}&format=json`,
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8'
        },
      }).then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response.data);
      })
    } catch(error){
        console.error(error);
    }
  })

module.exports = router