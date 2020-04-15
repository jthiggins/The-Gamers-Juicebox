/**
	Creates the GamersJuiceBox database and all of its tables

	Author: Kareem Ghumrawi
*/

USE master
GO

DROP DATABASE IF EXISTS GamersJuiceBox
GO

CREATE DATABASE GamersJuiceBox
GO

USE GamersJuiceBox
GO

CREATE TABLE Users (
	userId		INT				NOT NULL	PRIMARY KEY		IDENTITY,
	firstName	VARCHAR(50)		NOT NULL,
	lastName	VARCHAR(50)		NOT NULL,
	userName	VARCHAR(100)	NOT NULL,
	email		VARCHAR(100)	NOT NULL,
	[password]	VARBINARY(64)	NOT NULL,
	isAdmin		BIT				NOT NULL	DEFAULT(0),
	isModerator	BIT				NOT NULL	DEFAULT(0),
	isDeleted	BIT				NOT NULL	DEFAULT(0)
);

CREATE TABLE Games (
	gameId			INT				NOT NULL	PRIMARY KEY		IDENTITY,
	title			VARCHAR(100)	NOT NULL,
	price			FLOAT			NOT NULL,
	[platform]		VARCHAR(100)	NOT NULL,
	[description]	VARCHAR(1000)	NOT NULL,
	[publisher]		VARCHAR(100)	NOT NULL,
	genre			VARCHAR(50)		NOT NULL,
	purchaseLink	VARCHAR(500)	NULL
);

CREATE TABLE Comments (
	commentId		INT				NOT NULL	PRIMARY KEY		IDENTITY,
	userId			INT				NOT NULL	FOREIGN KEY		REFERENCES Users(userId),
	commentDate		DATETIME		NOT NULL,
	[description]	VARCHAR(2000)	NOT NULL,
	isDeleted		BIT				NOT NULL	DEFAULT(0)
);

CREATE TABLE GameRequests (
	gameRequestId	INT				NOT NULL	PRIMARY KEY		IDENTITY,
	userId			INT				NOT NULL	FOREIGN KEY		REFERENCES Users(userId),
	requestDate		DATE			NOT NULL,
	[description]	VARCHAR(2000)	NOT NULL,
	isPending		BIT				NOT NULL	DEFAULT(0),
	isAccepted		BIT				NOT NULL	DEFAULT(0),
);

CREATE TABLE [dbo].[errors](
	[errorId] 			INT	IDENTITY(1,1)	NOT NULL PRIMARY KEY,
	[ERROR_NUMBER] 		INT					NOT NULL,
	[ERROR_SEVERITY] 	INT					NOT NULL,
	[ERROR_STATE] 		INT					NOT NULL,
	[ERROR_PROCEDURE] 	VARCHAR(50)			NOT NULL,
	[ERROR_LINE] 		INT					NOT NULL,
	[ERROR_MESSAGE] 	VARCHAR(500)		NOT NULL,
	[errorDate] 		DATETIME			NOT NULL DEFAULT(GETDATE()),
	[resolvedOn]		DATETIME			NULL,
	[comments]			VARCHAR(8000)		NOT NULL DEFAULT(''),
	[userName]			VARCHAR(100)		NOT NULL DEFAULT(''),
	[params]			VARCHAR(MAX)		NOT NULL DEFAULT('')
);
