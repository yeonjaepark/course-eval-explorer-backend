import { Router } from 'express';
import * as Reviews from './controllers/review_controller';


const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'welcome to our query products 2!' });
});

// your routes will go here
router.route('/reviews')
  .post(Reviews.getReviews);

export default router;
