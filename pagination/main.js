const app = document.getElementById('app');
const articleContainer = document.getElementById('articles');
const paginationContainer = document.getElementById('pagination');

// dummy data
let items = [];
for (let i = 0; i < 100; i++) {
  items = [...items, 'item: ' + i];
}

let paged = 2;
const perPage = 5;
const pages = Math.ceil(items.length / perPage); // max page count

updateArticles(paged, items);
pagination(pages, paged);

/**
 * updateArticles(paged, item)
 */
function updateArticles(paged, items) {
  articleContainer.innerHTML = '';
  function filterItems() {
    return items.slice((paged - 1) * perPage, paged * perPage);
  }

  const arr = filterItems();
  arr.forEach(item => {
    addNewItem(item);
  });

  function addNewItem(item) {
    const article = document.createElement('article');
    article.innerHTML = `<h2>${item}</h2><div class="content">sample sample sample sample sample</div>`;
    articleContainer.appendChild(article);
  }
}

/**
 * pagination(pages, paged)
 */

function pagination(pages, paged) {
  const range = 1;

  const pagination = document.createElement('ul');
  pagination.className = 'pagination';
  paginationContainer.appendChild(pagination);

  _updatePagination(pages, paged);

  function _updatePagination(pages, paged) {
    pagination.innerHTML = '';
    let min = paged - range <= 2 ? 2 : paged - range;
    let max = paged + range >= pages - 1 ? pages - 1 : paged + range;

    // first page
    _createEl(1, paged);
    // out-of-range
    if (min != 2) {
      _createEl(min, paged, '...');
    }
    // arround paged
    for (let i = min; i <= max; i++) {
      _createEl(i, paged);
    }
    // out-of-range
    if (max !== pages - 1) {
      _createEl(max, paged, '...');
    }
    // last page
    _createEl(pages, paged);
  }

  function _createEl(num, paged, text = null) {
    const numItem = document.createElement('li');
    const numItemAnchor = document.createElement('a');

    if (num === paged && !text) {
      numItem.classList.add('current');
    }
    if (text === null) {
      text = num;
    }
    numItemAnchor.href = `page/${num}`;
    numItemAnchor.innerHTML = text;

    numItem.appendChild(numItemAnchor);
    numItemAnchor.addEventListener('click', _click);
    pagination.appendChild(numItem);

    function _click(e) {
      e.preventDefault();
      paged = num;
      updateArticles(paged, items);
      _updatePagination(pages, paged);
    }
  }
}
