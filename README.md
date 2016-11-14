<h1>Blog application</h1>
<hr>
<p>
This is an exercise from NYCDA wdi JS Amsterdam in building a restful blog application with a MVC framework using a stack of: node, express, postgressql, sequelize and a HTTP method override middelware for CRUD functionality and pug view engine and Bootstrap for syling.
</p>

<h2>RESTful Routes</h2>

GET     /entries            index.pug     List all posts <br>
GET     /entries/:id        show.pug      Show specific post<br>
<br>
POST    /entries                          Post post to server and redirect to ID<br>
PUT     /entries/:id                      Update post<br>
DELETE  /entries/:id                      Delete post<br>
<br>
GET     /entries/new        new.pug       Render view for create new entry form<br>
GET     /entries/:id/edit   edit.pug      Render view for edit entry form<br>
