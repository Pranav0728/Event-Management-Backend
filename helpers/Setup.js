const { connection } = require("../dbConfig");


exports.createTables = async () => {
  try {
    const result = await connection.query(
      `CREATE TABLE IF NOT EXISTS tpo_events (
      eventId int auto_increment primary key, 
      eventName varchar(255),
      eventDescription varchar(255),
      nameOfSpeaker varchar(255), 
      organizationOfSpeaker varchar(255),
      locationOfSpeaker varchar(255),
      date date, 
      category varchar(255), 
      time time, 
      department varchar(255), 
      eligible_degree_year varchar(255), 
      batch varchar(25) DEFAULT NULL, 
      isPaid bool DEFAULT NULL, 
      cost int DEFAULT NULL,
      isOnline bool DEFAULT false,
      eventLink varchar(255) DEFAULT NULL,
      paymentQR text,
      banner text,
      loaOfSpeaker text,
      notice text,
      eventDeadline DATETIME DEFAULT '3000-01-01',
      attendanceFlag bool DEFAULT false,
      photosUploaded bool DEFAULT false,
      attendanceReport text,
      signedLOA text,
      isDeleted bool DEFAULT false,
      isDead bool DEFAULT false,
      eventPhotos text
      );

      CREATE TABLE IF NOT EXISTS tpo_student_details (
      student_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
      email_id varchar(255) NOT NULL,
      password varchar(255) NOT NULL,
      first_name varchar(45) DEFAULT NULL,
      last_name varchar(45) DEFAULT NULL,
      role varchar(45) DEFAULT false,
      clg_id varchar(45) DEFAULT NULL,
      branch varchar(45) DEFAULT NULL,
      degree_year varchar(25) DEFAULT NULL,
      ac_yr varchar(255) DEFAULT NULL,
      degree varchar(25) DEFAULT NULL,
      UNIQUE KEY email_id (email_id)
      );

      CREATE TABLE IF NOT EXISTS tpo_event_registrations (
      reg_id INT PRIMARY KEY AUTO_INCREMENT,
      student_id INT ,
      event_id INT,
      isApproved BOOLEAN DEFAULT false,
      transaction_id varchar(255) DEFAULT NULL,
      attended BOOLEAN DEFAULT false,
      timeOfAttendance DATETIME DEFAULT NULL,
      FOREIGN KEY (event_id) REFERENCES tpo_events(eventId) ON DELETE CASCADE,
      FOREIGN KEY (student_id) REFERENCES tpo_student_details(student_id)
      );
      
      CREATE TABLE IF NOT EXISTS current_batch(
      batch_id INT PRIMARY KEY AUTO_INCREMENT,
      batch varchar(25) DEFAULT NULL
      )
      
      `
      
    );
    return result;
  } catch (error) {
    console.log(error);
  }
};


exports.createStudent = async (
        email_id,
        password,
        first_name,
        last_name,
        role,
        clg_id,
        branch,
        degree_year,
        ac_yr,
        degree,
) => {
  try {
    const [result] = await connection.query(
      "INSERT INTO tpo_student_details (email_id,password,first_name,last_name,role,clg_id,branch,degree_year,ac_yr,degree) VALUES (?, ?,?, ?, ?, ?, ?, ?, ?,?)",
      [
        email_id,
        password,
        first_name,
        last_name,
        role,
        clg_id,
        branch,
        degree_year,
        ac_yr,
        degree,
      ]
    );
    return result;
  } catch (error) {
    throw new Error("Error creating Student: " + error.message);
  }
};

