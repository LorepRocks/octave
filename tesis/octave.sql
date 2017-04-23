SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

DROP SCHEMA IF EXISTS `octave` ;
CREATE SCHEMA IF NOT EXISTS `octave` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE `octave` ;

-- -----------------------------------------------------
-- Table `octave`.`criterio_riesgo`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `octave`.`criterio_riesgo` ;

CREATE TABLE IF NOT EXISTS `octave`.`criterio_riesgo` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(256) NULL,
  `priorizacion` INT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `octave`.`area_impacto`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `octave`.`area_impacto` ;

CREATE TABLE IF NOT EXISTS `octave`.`area_impacto` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(256) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `octave`.`criterios_riesgo_seleccionado`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `octave`.`criterios_riesgo_seleccionado` ;

CREATE TABLE IF NOT EXISTS `octave`.`criterios_riesgo_seleccionado` (
  `criterio_riesgo_id` INT NOT NULL,
  `area_impacto_id` INT NOT NULL,
  `bajo` VARCHAR(500) NULL,
  `moderado` VARCHAR(500) NULL,
  `alto` VARCHAR(500) NULL,
  PRIMARY KEY (`criterio_riesgo_id`, `area_impacto_id`),
  INDEX `fk_criterios_riesgo_seleccionado_criterios_riesgo_idx` (`criterio_riesgo_id` ASC),
  INDEX `fk_criterios_riesgo_seleccionado_area_impacto1_idx` (`area_impacto_id` ASC),
  CONSTRAINT `fk_criterios_riesgo_seleccionado_criterios_riesgo`
    FOREIGN KEY (`criterio_riesgo_id`)
    REFERENCES `octave`.`criterio_riesgo` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_criterios_riesgo_seleccionado_area_impacto1`
    FOREIGN KEY (`area_impacto_id`)
    REFERENCES `octave`.`area_impacto` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `octave`.`activo`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `octave`.`activo` ;

CREATE TABLE IF NOT EXISTS `octave`.`activo` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(256) NULL,
  `descripcion` VARCHAR(500) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `octave`.`criterios_riesgo_activo`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `octave`.`criterios_riesgo_activo` ;

CREATE TABLE IF NOT EXISTS `octave`.`criterios_riesgo_activo` (
  `criterios_riesgo_id` INT NOT NULL,
  `activo_id` INT NOT NULL,
  PRIMARY KEY (`criterios_riesgo_id`, `activo_id`),
  INDEX `fk_criterios_riesgo_seleccionado_has_activo_activo1_idx` (`activo_id` ASC),
  INDEX `fk_criterios_riesgo_seleccionado_has_activo_criterios_riesg_idx` (`criterios_riesgo_id` ASC),
  CONSTRAINT `fk_criterios_riesgo_seleccionado_has_activo_criterios_riesgo_1`
    FOREIGN KEY (`criterios_riesgo_id`)
    REFERENCES `octave`.`criterios_riesgo_seleccionado` (`criterio_riesgo_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_criterios_riesgo_seleccionado_has_activo_activo1`
    FOREIGN KEY (`activo_id`)
    REFERENCES `octave`.`activo` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `octave`.`activo_critico`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `octave`.`activo_critico` ;

CREATE TABLE IF NOT EXISTS `octave`.`activo_critico` (
  `activo_id` INT NOT NULL AUTO_INCREMENT,
  `justificacion` VARCHAR(500) NULL,
  `descripcion` VARCHAR(500) NULL,
  `propietarios` VARCHAR(256) NULL,
  `confidencialidad` VARCHAR(500) NULL,
  `integridad` VARCHAR(500) NULL,
  `requisitos_importantes` VARCHAR(100) NULL,
  PRIMARY KEY (`activo_id`),
  CONSTRAINT `fk_activo_critico_activo1`
    FOREIGN KEY (`activo_id`)
    REFERENCES `octave`.`activo` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `octave`.`Contenedor`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `octave`.`Contenedor` ;

CREATE TABLE IF NOT EXISTS `octave`.`Contenedor` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NULL,
  `descripcion_interno` VARCHAR(500) NULL,
  `propietario_interno` VARCHAR(500) NULL,
  `descripcion_externo` VARCHAR(500) NULL,
  `propietario_externo` VARCHAR(500) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `octave`.`activo_Contenedor`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `octave`.`activo_Contenedor` ;

CREATE TABLE IF NOT EXISTS `octave`.`activo_Contenedor` (
  `activo_id` INT NOT NULL,
  `Contenedor_id` INT NOT NULL,
  PRIMARY KEY (`activo_id`, `Contenedor_id`),
  INDEX `fk_activo_has_Contenedor_Contenedor1_idx` (`Contenedor_id` ASC),
  INDEX `fk_activo_has_Contenedor_activo1_idx` (`activo_id` ASC),
  CONSTRAINT `fk_activo_has_Contenedor_activo1`
    FOREIGN KEY (`activo_id`)
    REFERENCES `octave`.`activo` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_activo_has_Contenedor_Contenedor1`
    FOREIGN KEY (`Contenedor_id`)
    REFERENCES `octave`.`Contenedor` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `octave`.`area_preocupacion`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `octave`.`area_preocupacion` ;

CREATE TABLE IF NOT EXISTS `octave`.`area_preocupacion` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(256) NULL,
  `actor` VARCHAR(256) NULL,
  `medio` VARCHAR(256) NULL,
  `motivo` VARCHAR(256) NULL,
  `resultado` VARCHAR(256) NULL,
  `requisito_seguridad` VARCHAR(256) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `octave`.`activo_area_preocupacion`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `octave`.`activo_area_preocupacion` ;

CREATE TABLE IF NOT EXISTS `octave`.`activo_area_preocupacion` (
  `activo_id` INT NOT NULL,
  `area_id` INT NOT NULL,
  PRIMARY KEY (`activo_id`, `area_id`),
  INDEX `fk_activo_has_area_preocupacion_area_preocupacion1_idx` (`area_id` ASC),
  INDEX `fk_activo_has_area_preocupacion_activo1_idx` (`activo_id` ASC),
  CONSTRAINT `fk_activo_has_area_preocupacion_activo1`
    FOREIGN KEY (`activo_id`)
    REFERENCES `octave`.`activo` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_activo_has_area_preocupacion_area_preocupacion1`
    FOREIGN KEY (`area_id`)
    REFERENCES `octave`.`area_preocupacion` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
