const sortButton = document.getElementById('sortButton');
const listInput = document.getElementById('listInput');
const sortedList = document.getElementById('sortedList');

sortButton.addEventListener('click', () => {
  const items = listInput.value.split(',').map(item => item.trim());
  const sortedItems = items.filter(item => item !== '').sort();
  
  sortedList.innerHTML = '';
  sortedItems.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    sortedList.appendChild(li);
  });
});
