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

--==============================================================================Tables
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
	imgSrc			VARCHAR(500)	NULL,
	purchaseLink	VARCHAR(500)	NULL,
	isDeleted		BIT				NOT NULL	DEFAULT(0)
);


CREATE TABLE Comments (
	commentId		INT				NOT NULL	PRIMARY KEY		IDENTITY,
	userId			INT				NOT NULL	FOREIGN KEY		REFERENCES Users(userId),
	gameId			INT				NOT NULL	FOREIGN KEY		REFERENCES Games(gameId),
	commentDate		DATETIME		NOT NULL,
	[description]	VARCHAR(2000)	NOT NULL,
	isDeleted		BIT				NOT NULL	DEFAULT(0)
);

CREATE TABLE GameRequests (
	gameRequestId	INT				NOT NULL	PRIMARY KEY		IDENTITY,
	userId			INT				NOT NULL	FOREIGN KEY		REFERENCES Users(userId),
	requestDate		DATE			NOT NULL,
	[description]	VARCHAR(2000)	NOT NULL,
	isPending		BIT				NOT NULL	DEFAULT(1),
	isAccepted		BIT				NOT NULL	DEFAULT(0),
	isDeleted		BIT				NOT NULL	DEFAULT(0)
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
GO

ALTER TABLE Games
ALTER COLUMN price DECIMAL(10,2)
GO

--===============================================================================Function
CREATE FUNCTION fnEncrypt (@str	AS	nvarchar(4000)) RETURNS varbinary(64) AS BEGIN
	RETURN HASHBYTES('SHA2_512', @str)
END
GO
--===============================================================================Stored Procedures
CREATE PROCEDURE [dbo].[spSAVE_Error]
	@params varchar(MAX) = ''
AS
BEGIN
     SET NOCOUNT ON;
     BEGIN TRY
    	INSERT INTO Errors (ERROR_NUMBER,   ERROR_SEVERITY,   ERROR_STATE,   ERROR_PROCEDURE,   ERROR_LINE,   ERROR_MESSAGE, userName, params)
		SELECT				ERROR_NUMBER(), ERROR_SEVERITY(), ERROR_STATE(), ERROR_PROCEDURE(), ERROR_LINE(), ERROR_MESSAGE(), SUSER_NAME(), @params;
     END TRY BEGIN CATCH END CATCH
END
GO
--========================================
CREATE PROCEDURE spValidateLogin
	@userName	varchar(100),
	@password	nvarchar(4000)
AS	BEGIN
	IF EXISTS(SELECT userId FROM Users WHERE (userName = @userName) AND (password = dbo.fnEncrypt(@password))) BEGIN
		SELECT CAST(1 AS bit) AS success, userId FROM Users WHERE (userName = @userName) AND (password = dbo.fnEncrypt(@password))
	END ELSE BEGIN
		SELECT CAST(0 AS bit) AS success, 'Invalid User Name or Password' AS [message]
	END
END
GO
--=======================================
CREATE PROCEDURE spGetUser
	@userId	INT
AS	BEGIN
	SELECT * FROM users WHERE (userId = @userId) AND (isDeleted = 0)
END
GO
--=======================================
CREATE PROCEDURE spAddUpdateDelete_User
	@userId		INT,
	@firstName	VARCHAR(50),
	@lastName	VARCHAR(50),
	@userName	VARCHAR(100),
	@email		VARCHAR(100),
	@password	VARCHAR(4000),
	@delete		BIT = 0

AS BEGIN
	BEGIN TRAN
		BEGIN TRY
			IF(@userId = 0) BEGIN				-- ADD
				-- Check if email or userName is already in use...
				IF NOT EXISTS(SELECT TOP(1) NULL FROM Users WHERE (email = @email) OR (userName = @userName)) BEGIN
					INSERT INTO Users(firstName, lastName, userName, email, password)
					VALUES (@firstName, @lastName, @userName, @email, dbo.fnEncrypt(@password))
					SELECT @@IDENTITY AS userId
				END ELSE BEGIN
					SELECT -1 AS userId, 'Username or email already exists' AS [message]
				END
			END ELSE IF(@delete = 1) BEGIN		-- DELETE
				IF NOT EXISTS (SELECT NULL FROM users WHERE userId = @userId) BEGIN					-- NO SUCH USER
					SELECT -1 AS userId, 'User does not exist' AS [message]
				END ELSE BEGIN
					UPDATE Users SET isDeleted = 1 WHERE userId = @userId
					SELECT 0 AS userId
				END
			END ELSE BEGIN						-- UPDATE
				-- Check if email or userName is already in use but need to EXCLUDE the user that is doing the update
				IF EXISTS(SELECT NULL FROM users WHERE (userId <> @userId) AND ((email = @email) OR (userName = @userName))) BEGIN
					SELECT -1 AS userId, 'Username or email already exists' AS [message]
				END ELSE BEGIN
					UPDATE users
					SET firstName = @firstName,
						lastName = @lastName,
						userName = @userName,
						email = @email
					WHERE userId = @userId

					SELECT @userId AS userId
				END
			END
		END TRY BEGIN CATCH
			IF(@@TRANCOUNT > 0) ROLLBACK TRAN
			DECLARE @errorParams varchar(max) = CONCAT(
														 '	@userId = ',		@userId
														,', @firstName = ',		@firstName
														,', @lastName = ',		@lastName
														,', @userName = ',		@userName
														,', @email = ',			@email
														,', @password = ',		@password
														,', @delete = ',		@delete
												)
			EXEC spSAVE_Error @params = @errorParams
		END CATCH
	IF(@@TRANCOUNT > 0) COMMIT TRAN
END
GO
--=======================================
CREATE PROCEDURE spMakeModerator
	@userId		INT
AS BEGIN
	IF EXISTS(SELECT NULL FROM Users WHERE userId = @userId) BEGIN
		DECLARE @deleted	BIT = (SELECT isDeleted FROM Users WHERE userId = @userId)
		IF (@deleted = 1) BEGIN
			SELECT 'User is deleted, cannot promote' AS [message]
		END ELSE BEGIN
			UPDATE Users SET isModerator = 1
		END
	END ELSE BEGIN
		SELECT 'User does not exist' AS [message]
	END
END
GO
--======================================
CREATE PROCEDURE spDemoteModerator
	@userId		INT
AS BEGIN
	IF EXISTS(SELECT NULL FROM Users WHERE userId = @userId) BEGIN
		DECLARE @deleted	BIT = (SELECT isDeleted FROM Users WHERE userId = @userId)
		IF (@deleted = 1) BEGIN
			SELECT 'User is deleted, cannot promote' AS [message]
		END ELSE BEGIN
			UPDATE Users SET isModerator = 0
		END
	END ELSE BEGIN
		SELECT 'User does not exist' AS [message]
	END
END
GO
--=======================================
CREATE PROCEDURE spMakeAdmin
	@userId		INT
AS BEGIN
	IF EXISTS(SELECT NULL FROM Users WHERE userId = @userId) BEGIN
		DECLARE @deleted	BIT = (SELECT isDeleted FROM Users WHERE userId = @userId)
		IF (@deleted = 1) BEGIN
			SELECT 'User is deleted, cannot promote' AS [message]
		END ELSE BEGIN
			UPDATE Users SET isAdmin = 1
		END
	END ELSE BEGIN
		SELECT 'User does not exist' AS [message]
	END
END
GO
--======================================
CREATE PROCEDURE spDemoteAdmin
	@userId		INT
AS BEGIN
	IF EXISTS(SELECT NULL FROM Users WHERE userId = @userId) BEGIN
		DECLARE @deleted	BIT = (SELECT isDeleted FROM Users WHERE userId = @userId)
		IF (@deleted = 1) BEGIN
			SELECT 'User is deleted, cannot promote' AS [message]
		END ELSE BEGIN
			UPDATE Users SET isAdmin = 0
		END
	END ELSE BEGIN
		SELECT 'User does not exist' AS [message]
	END
END
GO
--=========================================
CREATE PROCEDURE spAddUpdateDelete_Games
	@gameId			INT,
	@title			VARCHAR(100),
	@price			FLOAT,
	@platform		VARCHAR(100),
	@description	VARCHAR(1000),
	@publisher		VARCHAR(100),
	@genre			VARCHAR(50)	,
	@imgSrc			VARCHAR(500),
	@purchaseLink	VARCHAR(500),
	@delete			BIT = 0
AS BEGIN
	BEGIN TRAN
		BEGIN TRY
			IF(@gameId = 0) BEGIN				-- ADD
				IF NOT EXISTS(SELECT TOP(1) NULL FROM Games WHERE title = @title AND publisher = @publisher AND platform = @platform) BEGIN
					INSERT INTO Games(title, price, platform, description, publisher, genre, imgSrc, purchaseLink)
					VALUES (@title, @price, @platform, @description, @publisher, @genre, @imgSrc, @purchaseLink)
					SELECT @@IDENTITY AS gameId
				END ELSE BEGIN
					SELECT -1 AS gameId, 'Game already exists with that title, publisher, and platform' AS [message]
				END
			END ELSE IF(@delete = 1) BEGIN		-- DELETE
				IF NOT EXISTS (SELECT NULL FROM Games WHERE gameId = @gameId) BEGIN
					SELECT -1 AS gameId, 'User does not exist' AS [message]
				END ELSE BEGIN
					UPDATE Games SET isDeleted = 1 WHERE gameId = @gameId
					SELECT 0 AS gameId
				END
			END ELSE BEGIN						-- UPDATE
				IF EXISTS(SELECT NULL FROM Games WHERE (gameId <> @gameId) AND title = @title AND publisher = @publisher AND platform = @platform) BEGIN
					SELECT -1 AS gameId, 'Game already exists with that title, publisher, and platform' AS [message]
				END ELSE BEGIN
					UPDATE Games
					SET title =			@title,
						price =			@price,
						platform =		@platform,
						description =	@description,
						publisher =		@publisher,
						genre =			@genre,
						imgSrc =		@imgSrc,
						purchaseLink =	@purchaseLink
					WHERE gameId = @gameId

					SELECT @gameId AS gameId
				END
			END
		END TRY BEGIN CATCH
			IF(@@TRANCOUNT > 0) ROLLBACK TRAN
			DECLARE @errorParams varchar(max) = CONCAT(
														 '	@gameId = ',			@gameId
														,', @title = ',				@title
														,', @price = ',				@price
														,', @platform = ',			@platform
														,', @description = ',		@description
														,', @publisher = ',			@publisher
														,', @genre	 = ',			@genre
														,', @imgSrc	 = ',			@imgSrc
														,', @purchaseLinke	 = ',	@purchaseLink
														,', @delete	 = ',			@delete
													)
			EXEC spSAVE_Error @params = @errorParams

		END CATCH
	IF(@@TRANCOUNT > 0) COMMIT TRAN
END
GO
--===========================================
CREATE PROCEDURE spGetAllGames

AS BEGIN
	SELECT
		gameId,
		title,
		price,
		description,
		platform,
		publisher,
		genre,
		imgSrc,
		purchaseLink
	FROM Games
	WHERE isDeleted = 0
END
GO
--===========================================
CREATE PROCEDURE spAddUpdateDelete_Requests
	@gameRequestId	INT,				
	@userId			INT,				
	@requestDate	DATE,			
	@description	VARCHAR(2000),				
	@delete			BIT = 0
AS BEGIN
	BEGIN TRAN
		BEGIN TRY
			IF(@gameRequestId = 0) BEGIN				-- ADD
				IF EXISTS(SELECT NULL FROM Users WHERE userId = @userId) BEGIN
					INSERT INTO GameRequests(userId, requestDate, description)
					VALUES (@userId, @requestDate, @description)
					SELECT @@IDENTITY AS gameRequestId
				END ELSE BEGIN
					SELECT -1 as gameRequestId, 'User does not exist' AS [message]
				END
			END ELSE IF(@delete = 1) BEGIN		-- DELETE
				IF NOT EXISTS (SELECT NULL FROM GameRequests WHERE gameRequestId = @gameRequestId AND userId = @userId) BEGIN					
					SELECT -1 AS gameRequestId, 'Request does not exist' AS [message]
				END ELSE BEGIN
					UPDATE GameRequests SET isDeleted = 1 WHERE gameRequestId = @gameRequestId
					SELECT 0 AS gameRequestId
				END 
			END ELSE BEGIN						-- UPDATE
				IF EXISTS(SELECT NULL FROM GameRequests WHERE userId=@userId AND gameRequestId=@gameRequestId) BEGIN
				UPDATE GameRequests 
				SET requestDate =	@requestDate,
					description =	@description
				WHERE gameRequestId = @gameRequestId

				SELECT @gameRequestId AS gameRequestId
				END ELSE BEGIN
					SELECT -1 AS gameRequestId, 'Request does not exist' AS [message]
				END
			END
		END TRY BEGIN CATCH
			IF(@@TRANCOUNT > 0) ROLLBACK TRAN
			DECLARE @errorParams varchar(max) = CONCAT(
														 '	@gameRequestId = ',		@gameRequestId		
														,', @userId = ',			@userId		
														,', @requestDate = ',		@requestDate	
														,', @description = ',		@description	
														,', @delete	 = ',			@delete	
													)
			EXEC spSAVE_Error @params = @errorParams							

		END CATCH
	IF(@@TRANCOUNT > 0) COMMIT TRAN
END
GO
--==========================================
CREATE PROCEDURE spApproveRequest
	@gameRequestId	INT,
	@userId			INT
AS BEGIN
	IF EXISTS (SELECT NULL FROM GameRequests WHERE gameRequestId = @gameRequestId AND isPending = 1) AND
	   EXISTS (SELECT NULL FROM Users WHERE userId = @userId AND isAdmin = 1)BEGIN
		UPDATE GameRequests
		SET isPending = 0,
			isAccepted = 1
		WHERE gameRequestId = @gameRequestId

		SELECT 'Request accepted' AS [message]
	END ELSE BEGIN
		SELECT 'Request or user does not exist or user is not an admin or request not pending' AS [message]
	END
END
GO
--==========================================
CREATE PROCEDURE spDeclineRequest
	@gameRequestId	INT,
	@userId			INT
AS BEGIN
	IF EXISTS (SELECT NULL FROM GameRequests WHERE gameRequestId = @gameRequestId AND isPending = 1) AND
	   EXISTS (SELECT NULL FROM Users WHERE userId = @userId AND isAdmin = 1)BEGIN
		UPDATE GameRequests
		SET isPending = 0,
			isAccepted = 0
		WHERE gameRequestId = @gameRequestId

		SELECT 'Request declined' AS [message]
	END ELSE BEGIN
		SELECT 'Request or user does not exist or user is not an admin or request not pending' AS [message]
	END
END
GO
--===========================================
CREATE PROCEDURE spAddUpdateDelete_Comments
	@commentId		INT,				
	@userId			INT,
	@gameId			INT,
	@commentDate	DATETIME,	
	@description	VARCHAR(2000),			
	@delete			BIT = 0
AS BEGIN
	BEGIN TRAN
		BEGIN TRY
			IF(@commentId = 0) BEGIN				-- ADD
				IF EXISTS(SELECT NULL FROM Users WHERE userId = @userId) AND EXISTS(SELECT NULL FROM Games WHERE gameId = @gameId)BEGIN
					INSERT INTO Comments(userId, gameId, commentDate, description)
					VALUES (@userId, @gameId, @commentDate, @description)
					SELECT @@IDENTITY AS commentId
				END ELSE BEGIN
					IF NOT EXISTS(SELECT NULL FROM Users WHERE userId = @userId) BEGIN
						SELECT -1 as commentId, 'User does not exist' AS [message]
					END ELSE BEGIN 
						SELECT -1 as commentId, 'Game does not exist' AS [message]
					END
				END
			END ELSE IF(@delete = 1) BEGIN		-- DELETE
				IF NOT EXISTS (SELECT NULL FROM Comments WHERE commentId = @commentId AND userId = @userId AND gameId = @gameId) BEGIN					
					SELECT -1 AS gameRequestId, 'Request does not exist' AS [message]
				END ELSE BEGIN
					IF EXISTS (SELECT NULL FROM Users WHERE userId = @userId OR isAdmin = 1 OR isModerator = 1) BEGIN
						UPDATE Comments SET isDeleted = 1 WHERE commentId = @commentId
						SELECT 0 AS commentId
					END ELSE BEGIN
						SELECT -1 as commentId, 'User does not have permission to delete' AS [message]
					END
				END 
			END ELSE BEGIN						-- UPDATE
				IF EXISTS(SELECT NULL FROM Comments WHERE userId=@userId AND commentId=@commentId AND gameId = @gameId) BEGIN
					UPDATE Comments 
					SET commentDate =	@commentDate,
						description =	@description
					WHERE commentId = @commentId

					SELECT @commentId AS gcommentId
				END ELSE BEGIN
					SELECT -1 AS commentId, 'Comment does not exist' AS [message]
				END
			END
		END TRY BEGIN CATCH
			IF(@@TRANCOUNT > 0) ROLLBACK TRAN
			DECLARE @errorParams varchar(max) = CONCAT(
														 '	@commentId = ',			@commentId		
														,', @userId = ',			@userId	
														,', @gameId = ',			@gameId
														,', @commentDate = ',		@commentDate	
														,', @description = ',		@description	
														,', @delete	 = ',			@delete	
													)
			EXEC spSAVE_Error @params = @errorParams							

		END CATCH
	IF(@@TRANCOUNT > 0) COMMIT TRAN
END
GO
--===========================================
CREATE PROCEDURE spGetAllComments
AS BEGIN
	SELECT commentId, c.userId, u.userName, gameId, commentDate, description
	FROM Comments c
		JOIN Users u ON u.userId = c.userId
	WHERE c.isDeleted = 0
END
GO