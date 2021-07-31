const express = require("express");
const axios = require('axios');
// const fetch = require('node-fetch');
const router = express.Router();
router.get("", (req, res, next) => {
  try{
    const req = axios({
      url: `https://www.wikidata.org/w/api.php?action=parse&page=Q719338&format=json`,
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


router.get("/:id", (req, res, next) => { 
    try{
        const id = req.params.id
        axios({
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

router.get("images/:id", (req, res, next) => {
  try {
    const id = req.params.id
    axios({
    url: `https://www.wikidata.org/w/api.php?action=parse&page=${id}&format=json`,
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8'
    },
  }).then(response => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(response.data.parse.images);
  })
  } catch(error) {
    console.log(error);
  }
})

module.exports = router