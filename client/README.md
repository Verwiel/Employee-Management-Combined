Create MySQL table with the following format:
```
CREATE TABLE `heroku_c4e479df1191d6a`.`employee_table` (
  `employee_id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `phone` VARCHAR(11) NOT NULL,
  PRIMARY KEY (`employee_id`));
```

npm install && cd client npm install
npm start from root directory