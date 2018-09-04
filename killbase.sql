--psql < killbase.sql
DROP DATABASE IF EXISTS killbase;

CREATE DATABASE killbase;
-- createdb Killbase
-- psql
\c killbase;

CREATE TABLE Assassins (id serial primary key, Full_Name text, Weapon text, Age integer, Price integer, Rating numeric (2,1), Kills integer);
INSERT INTO Assassins (Full_Name, Weapon, Age, Price, Rating, Kills) VALUES ('Alexander Duggan', 'Sniper rifle', 31, 45, 7.5, 28);
INSERT INTO Assassins (Full_Name, Weapon, Age, Price, Rating, Kills) VALUES ('Anton Chigurh', 'Pneumatic bolt gun', 52, 40, 9, 72);
INSERT INTO Assassins (Weapon, Age, Price, Rating, Kills) VALUES ('Pistol', 28, 20, 6.5, 35);
INSERT INTO Assassins (Full_Name, Weapon, Age, Price, Rating, Kills) VALUES ('Jason Bourne', 'Parkour', 27, 25, 7, 48);
INSERT INTO Assassins (Full_Name, Weapon, Age, Price, Rating, Kills) VALUES ('John Wick', 'Lots of guns', 35, 50, 9.5, 433);
INSERT INTO Assassins (Full_Name, Weapon, Age, Price, Rating, Kills) VALUES ('Jules Winnfield', 'Pistol', 26, 15, 6.5, 13);
INSERT INTO Assassins (Full_Name, Weapon, Age, Price, Rating, Kills) VALUES ('Leon', 'Everything', 41, 30, 8.5, 87);
INSERT INTO Assassins (Full_Name, Weapon, Age, Price, Rating, Kills) VALUES ('Nikita Mears', 'Silenced pistols', 28, 30, 7, 32);
INSERT INTO Assassins (Full_Name, Weapon, Age, Price, Rating, Kills) VALUES ('Pickle Rick', 'Lasers and office supplies', 60, 0, 8, 24);

CREATE TABLE code_names (id serial primary key, code_names text, assassins_id integer references assassins (id));
INSERT INTO code_names (code_names, assassins_id) VALUES
('The Jackal', 1),
('Old Man', 2),
('Ghost Dog', 3),
('Baba Yaga', 5),
('The Professional', 7),
('Nikita, La Femme Nikita', 8),
('Solenya', 9);

CREATE TABLE Clients (id serial primary key, Name text);
INSERT INTO Clients (Name) VALUES 
('Marcellus Wallace'),
('Concerto'),
('Mathilda'),
('Winston'),
('Ray Vargo');


CREATE TABLE Targets (id serial primary key, Name text, Location text, Security_Level integer, Target_Photo text);
INSERT INTO Targets (Name, Location, Security_Level, Target_Photo) VALUES
('Butch Coolidge', 'Los Angeles', 3, 'https://goo.gl/LCquZj'),
('The Jaguar', 'Russian Embassy', 9, 'https://goo.gl/6JWsiv'),
('Norman Stansfield', 'Manhattan', 7, 'https://i.imgur.com/mdIk33E.jpg'),
('Santino D''Antonio', 'Continental Hotel', 10, 'https://goo.gl/fUPkYy'),
('Sonny Valerio', 'Queens', 4, 'https://goo.gl/8DHYUS');


CREATE TABLE Contracts (id serial primary key, Target_Name_id integer references Targets (id), Client_id integer references Clients (id), Budget integer, Complete boolean, Assassin_id integer references Assassins (id));
INSERT INTO Contracts (Target_Name_id, Client_id, Budget) VALUES 
(1, 1, 40),
(2, 2, 70),
(3, 3, 35),
(4, 4, 25),
(5, 5, 10);


CREATE TABLE Assassins_Contracts (Assassins_id integer references Assassins (id), Contracts_id integer references Contracts (id));
INSERT INTO Assassins_Contracts (Assassins_id, Contracts_id) VALUES 
(6, 1),
(1, 2),
(5, 2),
(7, 3),
(9, 5),
(6, 5),
(8, 3),
(3, 1);

SELECT * FROM Assassins;
SELECT * FROM Code_names;
SELECT * FROM Clients;
SELECT * FROM Targets;
SELECT * FROM Contracts;
SELECT * FROM Assassins_Contracts;

-- Exercises
-- Select all the assassins, sorted by number of kills. CHECK
-- SELECT Full_name FROM Assassins ORDER BY kills asc;

-- Select all of the assassins older than 30 years old.
-- SELECT Full_name FROM Assassins WHERE AGE>30;

-- Select all of the contracts that can afford to pay Nikita Mears. (Budget >= her price)
-- SELECT Client_Name FROM Contracts WHERE Budget>=30;

-- Count the number of assassins that are capable of taking out Norman Stansfield. (Their rating >= his security level)
-- SELECT COUNT(Full_name) FROM Assassins WHERE Rating>=7;

-- Get the total amount it would require to hire every available assassin.
-- SELECT SUM(Price) FROM Assassins;

-- Assign the following jobs to these assassins:

-- Jules Winnfield -> Butch Coolidge
-- The Jackal -> The Jaguar
-- John Wick -> The Jaguar
-- Leon -> Norman Stansfield
-- Pickle Rick -> Sonny Valerio
-- Jules Winnfield -> Santino D'Antonio
-- Nikita Mears -> Norman Stansfield
-- Ghost Dog -> Butch Coolidge
-- CREATE TABLE Assassins_Contracts (assassins_id integer references Assassins (id), contracts_id integer references Contracts (id));
-- INSERT INTO Assassins_Contracts (assassins_id, contracts_id) VALUES (6, 1);
-- INSERT INTO Assassins_Contracts (assassins_id, contracts_id) VALUES (1, 2);
-- INSERT INTO Assassins_Contracts (assassins_id, contracts_id) VALUES (5, 2);
-- INSERT INTO Assassins_Contracts (assassins_id, contracts_id) VALUES (7, 3);
-- INSERT INTO Assassins_Contracts (assassins_id, contracts_id) VALUES (9, 5);
-- INSERT INTO Assassins_Contracts (assassins_id, contracts_id) VALUES (6, 5);
-- INSERT INTO Assassins_Contracts (assassins_id, contracts_id) VALUES (8, 3);
-- INSERT INTO Assassins_Contracts (assassins_id, contracts_id) VALUES (3, 1);

-- Count the number of currently contracted assassins.
-- SELECT COUNT(assassins_id) FROM assassins_contracts;

-- Find the lowest total cost to complete all assigned contracts.



-- Add a new contract: Snake Plissken, New York, (find a photo), security 5, budget 35, Client is Marcellus Wallace.



-- Assign all assassins with a rate lower than the cost of the new contract to the new contract.

-- Complete these contracts: The Jaguar, by the Jackal; Butch Coolidge, by Ghost Dog; Snake Plissken, by Nikita Mears. (Be sure to increment the number of kills!)

-- Select all the completed contracts, showing only the assassins to be paid, and the amount paid to them. Then show the total cost of the completed contracts.

-- The Jackal has retired. Remove him from the database. (How can we do this while maintaining integrity on the contracts table?)

-- Ghost Dog and Nikita Mears have increased their rates by 5 and 10, respectively. Update their entries to reflect this.

-- The contract on Norman Stansfield has been rescinded. Remove it (and any associated data) from the database.

-- Winston has taken out a contract on John Wick! (Security 9, budget 100) We may have to rethink the way we're structuring our data. How can we refactor our database schema to allow a person to be an assassin, a client, or the target of a contract? Do that, then assign all assassins not already on a job to this new contract.