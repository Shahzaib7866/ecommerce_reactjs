import express from 'express';
import authRoutes from './authRoutes.js';
import productRoutes from './productRoutes.js';
import orderRoutes from './orderRoutes.js';

const router = express.Router();

router.use('/api/auth', authRoutes);
router.use('/api/products', productRoutes);
router.use('/api/orders', orderRoutes);
// router.use('/payment', paymentRoutes);
// router.use('/analytics', analyticsRoutes);

export default router;







