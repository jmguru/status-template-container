USE cclabs; 
CREATE TABLE `nodestatus` (
  `node` varchar(20) NOT NULL DEFAULT '',
  `status` varchar(20) NOT NULL DEFAULT '',
  PRIMARY KEY (`node`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

INSERT IGNORE INTO `nodestatus` (`node`, `status`)
VALUES
        ('green-12','success'),
        ('blue-12','warning'),
        ('blue-13','info');
