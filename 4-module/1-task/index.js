function makeFriendsList(friends) {
  let ul = document.createElement('ul');
  friends.forEach(item => {
    let li = document.createElement('li');
    li.innerHTML = item.firstName + ' ' + item.lastName;
    ul.appendChild(li);
  });
  return ul;
}
