SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

create database laravelangular_db;
  
use laravelangular_db;


-- -----------------------------------------------------
-- Table `laravelangular_db`.`departments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `laravelangular_db`.`departments` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `created_at` TIMESTAMP NULL,
  `updated_at` TIMESTAMP NULL,
  `status` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `laravelangular_db`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `laravelangular_db`.`products` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `value` DECIMAL(10,2) NULL,
  `description` TEXT NULL,
  `photo` TEXT NULL,
  `created_at` TIMESTAMP NULL,
  `updated_at` TIMESTAMP NULL,
  `status` CHAR(1) NULL,
  `departments_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_products_departments_idx` (`departments_id` ASC),
  CONSTRAINT `fk_products_departments`
    FOREIGN KEY (`departments_id`)
    REFERENCES `laravelangular_db`.`departments` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
