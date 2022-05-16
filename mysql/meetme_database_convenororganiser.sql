-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: meetme_database
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `convenororganiser`
--

DROP TABLE IF EXISTS `convenororganiser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `convenororganiser` (
  `scheduleid` int NOT NULL AUTO_INCREMENT,
  `convenorid` varchar(500) DEFAULT NULL,
  `organiserid` varchar(500) NOT NULL,
  `invitedate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('PENDING','COMPLETED') NOT NULL DEFAULT 'PENDING',
  PRIMARY KEY (`scheduleid`),
  UNIQUE KEY `id_UNIQUE` (`scheduleid`),
  KEY `organiserid_idx` (`organiserid`),
  KEY `convenorid_idx` (`convenorid`),
  CONSTRAINT `convenorid` FOREIGN KEY (`convenorid`) REFERENCES `user` (`USER_ID`),
  CONSTRAINT `organiserid` FOREIGN KEY (`organiserid`) REFERENCES `user` (`USER_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Covenor and Organoser cannot be same';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `convenororganiser`
--

LOCK TABLES `convenororganiser` WRITE;
/*!40000 ALTER TABLE `convenororganiser` DISABLE KEYS */;
INSERT INTO `convenororganiser` VALUES (100,'8a8b242670e8dfe7ef4947a700ba43e98ef30bee','2c18aa98890408ede5cdfd6e53d694dad48d07a9','2022-05-15 07:36:37','COMPLETED');
/*!40000 ALTER TABLE `convenororganiser` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-16  9:38:46
