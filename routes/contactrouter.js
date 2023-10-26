const express = require("express");
const router = express.Router();

const {
    getContacts, 
    createContacts, 
    updateContacts, 
    deleteContacts
} = require("../controllers/contactcontroller");

router.route("/").get(getContacts).post(createContacts);
router.route("/:name").get(getContacts).put(updateContacts).delete(deleteContacts);

module.exports = router;