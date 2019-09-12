Generate the sql script.

Change the connection string in the appsettings.json to match the connection string from your local db.

change the following connection string: 
"DefaultConnection": "Server=desktop-s534fuv;Database=MovieHubTry;Trusted_Connection=True;"

"DefaultConnection": "Server=(yourservername);Database=(databasename);Trusted_Connection=True;"



PS: the database name that you will give will create the context class with the same name that of database in the Model.

