import express from 'express';
import controller from '../controllers/features';
const router = express.Router();

router.get('/feature', controller.getFeature);
router.post('/feature', controller.addFeature);

export = router;
