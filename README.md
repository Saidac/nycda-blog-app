<h1>Blog application</h1>
<p>
This is an exercise from NYCDA wdi JS Amsterdam in building a RESTful CRUD application with a MVC framework using a stack of: node, express, postgressql, sequelize, HTTP method override middelware, the pug template engine and Bootstrap for styling.
</p>
<p>
<h2>RESTful Routes</h2>
<table>
  <tr>
    <th>HTTP method</th>
    <th>Route</th>
    <th>View</th>
    <th>Function</th>
  </tr>
  <tr>
    <td>GET</td>
    <td>/entries</td>
    <td>index.pug</td>
    <td>List all blog entries</td>
  </tr>
  <tr>
    <td>GET</td>
    <td>/entries/:id</td>
    <td>show.pug</td>
    <td>Show blog entry</td>
  </tr>
  <tr>
    <td>POST</td>
    <td>/entries/td>
    <td>n/a</td>
    <td>Post entry to server and redirect to ID</td>
  </tr>
  <tr>
    <td>PUT</td>
    <td>/entries/:id </td>
    <td>n/a</td>
    <td>Update blog entry</td>
  </tr>
  <tr>
    <td>DELETE</td>
    <td>/entries/:id </td>
    <td>n/a</td>
    <td>Delete blog entry</td>
  </tr>
  <tr>
    <td>DELETE</td>
    <td>/entries/:id </td>
    <td>n/a</td>
    <td>Delete blog entry</td>
  </tr>
  <tr>
    <td>GET</td>
    <td>/entries/new </td>
    <td>new.pug</td>
    <td>Render view for create new blog entry form</td>
  </tr>
  <tr>
    <td>GET</td>
    <td>/entries/:id/edit</td>
    <td>edit.pug</td>
    <td>Render view for edit blog entry form</td>
  </tr>
</table>
</p>
