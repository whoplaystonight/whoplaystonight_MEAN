CREATE DATABASE  IF NOT EXISTS `Who_plays` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `Who_plays`;
-- MySQL dump 10.13  Distrib 5.5.53, for debian-linux-gnu (x86_64)
--
-- Host: 127.0.0.1    Database: Who_plays
-- ------------------------------------------------------
-- Server version	5.5.53-0ubuntu0.14.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `event`
--

DROP TABLE IF EXISTS `event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `event` (
  `event_id` varchar(11) NOT NULL,
  `band_id` varchar(11) DEFAULT NULL,
  `band_name` varchar(50) DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `type_event` varchar(30) DEFAULT NULL,
  `n_participants` varchar(3) DEFAULT NULL,
  `date_event` varchar(10) DEFAULT NULL,
  `type_access` varchar(20) DEFAULT NULL,
  `date_ticket` varchar(10) DEFAULT NULL,
  `openning` varchar(5) DEFAULT NULL,
  `start` varchar(5) DEFAULT NULL,
  `end` varchar(5) DEFAULT NULL,
  `poster` varchar(200) DEFAULT NULL,
  `latitud` float NOT NULL,
  `longitud` float NOT NULL,
  `country` varchar(30) DEFAULT NULL,
  `province` varchar(30) DEFAULT NULL,
  `town` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`event_id`),
  UNIQUE KEY `uniq1` (`event_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event`
--

LOCK TABLES `event` WRITE;
/*!40000 ALTER TABLE `event` DISABLE KEYS */;
INSERT INTO `event` VALUES ('E0000000000','B0000000000','Metronomy','Concierto de presentacion','Performance','5','31/10/2016','Ticket,Invitation','31/10/2016','19:00','22:00','23:00','media/default-avatar.png',38.8229,-0.609039,'ES','46','Ontinyent'),('E0000000001','B0000000001','Tame Impala','Concierto de presentacion','concert','4','31/10/2016','Ticket','24/10/2016','19:00','21:00','23:00','media/default-avatar.png',38.8221,-0.6064,'ES','46','Ontinyent'),('E0000000002','B0000000002','Roosvelt','Concierto de presentacion','concert','4','31/10/2016','Ticket','24/10/2016','19:00','22:00','23:00','media/default-avatar.png',38.8257,-0.591355,'ES','46','Ontinyent'),('E0000000003','B0000000003','Muthemath','Concierto de presentacion','concert','5','31/10/2016','Ticket','24/10/2016','11:00','18:00','19:00','media/default-avatar.png',38.7169,-0.660686,'ES','03','Banyeres de Mariola'),('E0000000004','B0000000004','Royal Blood','Concierto de presentacion','presentation','4','31/10/2016','Ticket','24/10/2016','18:00','20:00','22:00','media/default-avatar.png',38.8197,-0.549042,'ES','46','Agullent'),('E0000000005','B0000000005','Kings of Lion','Concierto de presentacion','unplugged','3','31/10/2016','Invitation','24/10/2016','19:00','20:00','22:00','media/248877012-1025640568-flowers.png',38.9829,-0.517923,'ES','46','Xativa'),('E0000000006','B0000000006','Limbotheque','Concierto de presentacion','presentation','3','28/12/2016','Ticket','07/12/2016','15:00','16:00','22:00','media/default-avatar.png',38.8244,-0.601422,'ES','46','Ontinyent'),('E0000000007','B0000000007','Daft Punk','Concierto de presentacion','presentation','2','28/12/2016','Ticket','15/12/2016','16:00','19:00','22:00','media/1458178167-flowers.png',38.6945,-0.473777,'ES','03','Alcoy'),('E0000000008','B0000000008','Rinoçerose','Concierto de presentacion','presentation','6','29/12/2016','Ticket','15/12/2016','18:00','22:00','23:00','media/default-avatar.png',38.9951,-0.15831,'ES','46','Gandia'),('E0000000009','B0000000009','Morrisey','Concierto de presentacion','concert','4','31/12/2016','Invitation','25/12/2016','20:00','22:00','23:00','media/default-avatar.png',39.4712,-0.387006,'ES','46','Valencia'),('E0000000010','B0000000010','RadioHead','Concierto de presentacion','presentation','4','31/12/2016','Ticket','20/12/2016','20:00','22:00','23:00','media/default-avatar.png',38.3489,-0.477992,'ES','03','Alicante'),('E0000000200','B0000000200','Artic Monkeys','Concierto de presentacion','concert','5','30/11/2016','Ticket','16/11/2016','19:00','20:00','21:00','media/default-avatar.png',38.7679,-0.608551,'ES','46','Bocairent'),('E1234567890','B1234567890','Faith No More','Concierto de presentacion','Concierto','4','31/11/2016','Ticket','31/10/2016','22:00','23:00','02:00','media/default-avatar.png',38.8417,-0.519005,'ES','46','Albaida'),('E1234567895','B1234567895','White Zombies','Concierto de presentacion','Concierto','4','31/11/2016','Ticket','31/10/2016','22:00','23:00','02:00','media/default-avatar.png',38.9154,-0.555398,'ES','46','Olleria');
/*!40000 ALTER TABLE `event` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-02-04 16:55:41
