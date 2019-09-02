const express = require('express');
const router = express.Router();
const Subsciber = require('../models/subscriber');

router.get('/', async (req, res) => {
      try {
            const subscribers = await Subsciber.find()
            res.json(subscribers);
      } catch (err) {
            res.status(500).json({ message: err.message });
      }
})

router.get('/:id', getSubscriber, (req, res) => {
      res.send(res.subscriber);
})

router.post('/', async (req, res) => {
      const subscriber = new Subsciber({
            name: req.body.name,
            subscribedToChannel: req.body.subscribedToChannel
      })
      try{
            const newSubScriber = await subscriber.save();
            res.status(201).json(newSubScriber)
      } catch (err) {
            res.status(400).json({ message: err.message })
      }
})

router.patch('/:id', getSubscriber, async (req, res) => {
      if (req.body.name != null) {
            res.subscriber.name = req.body.name;
      }
      if(req.body.subscribedToChannel != null) {
            res.subscriber.subscribedToChannel = req.body.subscribedToChannel;
      }
      try {
            const updatedSubscriber = await res.subscriber.save();
            res.json(updatedSubscriber);
      } catch (err) {
            res.status(400).json({ message: err.message });
      }
})


router.delete('/:id', getSubscriber, async (req, res) => {
      try{
            await res.subscriber.remove();
            res.json({ message: 'deleted subscriber' });
      } catch (err) {
            res.status(500).json({ message: err.message })
      }
})

async function getSubscriber(req, res, next) {
      let subscriber;
      try{
            subscriber = await Subsciber.findById(req.params.id);
            if (subscriber == null) {
                  return res.status(404).json({ message: 'Cannot find subscriber' });
            }
      } catch (err) {
            return res.status(500).json({ message: err.message });
      }
      res.subscriber = subscriber;
      next();
}

module.exports = router;
