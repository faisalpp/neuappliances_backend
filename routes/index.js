const express = require('express');
const authController = require('../controller/authController')
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');
const userProfileController = require('../controller/userProfileController');
const adminController = require('../controller/adminController');
const categoryController = require('../controller/categoryController');
const applianceController = require('../controller/applianceController');
const categorySection = require('../controller/sectionController');

const router = express.Router();


router.get('/api/admin/logout', adminAuth ,authController.logout);
router.get('/api/logout', auth ,authController.logout);

// User Related Routes
router.post('/api/register', authController.register);
router.post('/api/login', authController.login);
router.get('/api/user/refresh', authController.refresh);
router.post('/api/user/profile',auth,userProfileController.getUserProfile);
router.post('/api/user/update-profile',auth,userProfileController.UpdateProfile);

// Admin Related Routes
router.get('/api/admin/register', adminController.register);
router.post('/api/admin/login', adminController.login);
router.get('/api/admin/logout', adminController.logout);
router.get('/api/admin/refresh', adminController.refresh);
// Categories Related Routes
router.get('/api/admin/get-categories',adminAuth,categoryController.GetCategories);
router.post('/api/admin/category-by-id',adminAuth,categoryController.GetCategoryById);
router.post('/api/admin/create-category',adminAuth,categoryController.CreateCategory);
router.post('/api/admin/update-category',adminAuth,categoryController.UpdateCategory);
// Sections Related Routes
router.post('/api/admin/create-section',adminAuth,categorySection.CreateSection);
router.post('/api/admin/update-section',adminAuth,categorySection.UpdateSection);
router.post('/api/admin/section-by-id',adminAuth,categorySection.GetCategorySectionById);
router.post('/api/admin/sections',adminAuth,categorySection.GetCategorySections);
// Section Item Related Routes
router.post('/api/admin/create-section-item',adminAuth,categorySection.CreateSectionItem);
router.post('/api/admin/update-section-item',adminAuth,categorySection.UpdateSectionItem);
router.post('/api/admin/section-item-by-id',adminAuth,categorySection.GetSectionItemById);
router.post('/api/admin/section-items',adminAuth,categorySection.GetSectionItems);
 
 router.get('/api/get-appliances',applianceController.GetAppliances);
 router.post('/api/appliance-sections',applianceController.GetApplianceSections);

module.exports = router;