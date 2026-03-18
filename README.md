🏡 Real Estate Project📌 Project Description
This project is a full-stack Real Estate system for managing apartments.
The system allows:
Viewing apartments
Searching apartments
Viewing apartment details
Creating new apartments
The project is built using:
SQL Server (Database)
.NET Web API (Server)
Angular (Client)
🗄️ Database Structure
The system is based on three main tables:
Apartments
Stores apartment information:
Title, Description, Price
StatusId (FK)
AgentId (FK)
CreatedAt
Agents
Stores agent details:
FullName, Phone, Email
Statuses
Stores apartment status:
Available, Sold, Under Contract
Relationships
Each apartment belongs to one agent
Each apartment has one status
⚙️ Stored ProceduresApartments
Apartments_GetAll
Apartments_GetById
Apartments_Create
Apartments_Update
Apartments_Delete
Apartments_ChangeStatus
Agents
Agents_GetAll
Agents_GetById
Agents_Create
Agents_Update
Agents_Delete
Statuses
Statuses_GetAll
🔌 How the System Works
Angular sends requests to the .NET API
The API executes stored procedures in SQL Server
The database returns results to the API
The API sends data back to the client
🚀 How to Run the Project1. Database
Run the SQL script to create:
Database
Tables
Stored Procedures
2. Server (.NET)
Run the API project
Server runs on:
https://localhost:7001
3. Client (Angular)
Run:
npm install
ng serve
Open:
http://localhost:4200
