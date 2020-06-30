let userListPage = `<h5>List of MyCMS users</h5>
<ul class="list-group list-group-horizontal-lg">
  <li class="list-group-item">item.username</li>
</ul>` ;

let root = document.querySelector("#root");

const UserListPage = () => {
    return userListPage;  
};

export default UserListPage;