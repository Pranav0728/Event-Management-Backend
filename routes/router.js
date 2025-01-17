const express = require("express")
const router = express.Router();
const eventMiddleware = require("../middlewares/eventMiddleware")
const eventController = require("../controllers/eventController")
const userController = require("../controllers/userController")
const adminController = require("../controllers/adminController")
const qrCodeController = require("../controllers/qrCodeController")
const setupController = require("../controllers/setupController")
const studentController = require("../controllers/studentController")
const getslash = require("../controllers/get")

//event handlers
router.post('/event', eventMiddleware,eventController.createEvent)
router.get('/',getslash.get)
router.get('/event', eventController.getAllEvents)
router.put('/event/:eventId', eventMiddleware, eventController.updateEvent)
router.delete('/event/:eventId', eventController.deleteEvent) // this delete removes the event permanently
router.delete('/removeEvent/:eventId', eventController.removeEvent) // this movese the event to the event history
router.post('/undoEvent/:eventId', eventController.undoEvent) // this moves the event back to the events tab

//get all events from the table
router.get('/allEvents', eventController.getEventHistory)
//get dead events
router.get('/getDeadEvents', eventController.getDeadEvents)

//event photos upload
router.post('/uploadPhotos/:eventId', eventController.uploadEventPhotos)

// event status
router.get('/eventStatus/:eventId', adminController.getStatus)
//user handlers
router.get('/getEligibleEvents/:student_id', eventController.getEligibleEvents)
router.post('/userEventReg/:event_id', userController.registerForEvent ) //registers the user for a event

//admin handlers
router.get('/getAllRegistrations/:eventId', adminController.getAllRegistrations)
router.get('/getApprovedRegistrations/:eventId', adminController.getApprovedRegistrations)
router.put('/approveStudent/:eventId', adminController.approveStudent)
router.delete('/deleteRegistration/:eventId', adminController.deleteRegistration)
router.put('/markAsAttended', adminController.markAsAttended)
router.get('/getAttendance/:eventId', adminController.getAttendance) //get a particular events attendance list
router.get('/getAllAttendance', adminController.getAllAttendance) //for the all events attendance sheet
router.get('/getStudentDetail/:student_id', adminController.getStudentData)


router.post('/studentRegister', studentController.studentRegister)
router.post('/studentLogin', studentController.studentLogin)


//qrcode send handler
router.post('/sendAttendanceQrcode',qrCodeController.sendAttendanceQrcode)



//test routes:
router.get('/setup', setupController.createTables)

//event history uploads:
router.post('/uploadSignedLOA/:eventId', eventController.uploadSignedLOA)
router.delete('/deleteSignedLOA/:eventId', eventController.deleteSignedLOA)

router.post('/uploadAttendanceReport/:eventId', eventController.uploadAttendanceReport)
router.delete('/deleteAttendanceReport/:eventId', eventController.deleteAttendanceReport)

router.delete('/deletePhotos/:eventId', eventController.deleteEventPhotos)
router.get('/getFile/:fileName', eventController.downloadEventDoc)

router.get('/getEventById/:eventId', eventController.getAEvent)



module.exports = router