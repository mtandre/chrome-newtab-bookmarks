'use strict';

function main() {
    const list = document.querySelector('.bookmarks');

    // get all bookmarks
    chrome.bookmarks.getTree(tree => {
        let bookmarks = getBookmarks(tree);
        bookmarks.sort(aToZ);
        bookmarks.forEach(bookmark => render(list, bookmark));
    });
}

// flatten nested bookmark tree
function getBookmarks(array) {
    var result = [];
    array.forEach(a => {
        if (a.children && a.children.length > 0) {
            result = result.concat(getBookmarks(a.children));
        } else {
            result.push(a);
        }
    });
    return result;
}

// append bookmark list item
function render(list, d) {
    const item = document.createElement('li');
    item.className = 'bookmark';
    item.innerHTML = `<a href="${d.url}">${d.title}</a>`;
    list.appendChild(item);
}

// sort alphabetically by bookmark title
function aToZ(a, b) {
    return a.title.localeCompare(b.title);
}

document.addEventListener('DOMContentLoaded', main);