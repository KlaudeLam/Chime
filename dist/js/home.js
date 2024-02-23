import { collection, query, orderBy, limit, getDocs } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js';
import { firestore } from './firebase-config.js';

// CAROUSEL

// DISPLAY MUSIC
const colRef = collection(firestore, "songs");

// Order the documents by "date" in descending order - limit the result to 10 documents
const songsQuery = query(colRef, orderBy("date", "desc"), limit(10));

// Execute the query
getDocs(songsQuery)
  .then((snapshot) => {
    snapshot.forEach((doc) => {
        const data = doc.data();
        // foreach: insert adjacent html
        const recentlyReleased = document.getElementById("recently-released");
        recentlyReleased.insertAdjacentHTML("beforeend", `
            <div id='${doc.id}' class="category-content">
                <img src="${data.thumbnail}" alt="">
                <div class="category-content-name">${data.title}</div>
                <a class="category-content-description">${data.artist}</a>
            </div>
        `)
    });
  })
  .catch((error) => {
    console.error("Error getting documents: ", error);
  });