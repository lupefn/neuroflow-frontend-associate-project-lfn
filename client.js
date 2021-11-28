const submitButton = document.getElementById("get-button");
const musicTable = document.getElementById("user-data");

/* takes a DOM Node object as an argument
will remove all of its child elements from the DOM
without removing the containing element itself */
function removeChildren(element) {
    while (element.hasChildNodes()) {
        element.lastChild.remove();
    }
}

/* takes in number representing hours and formats it based on it being in the 24-hour format */
function convertTime(hours) {
    if (hours === 0) {
        return 12;
    }
    if (hours <= 12) {
        return hours;
    }
    return hours - 12;
}

/* formats unix timestamp into provided format */
function formatListenDate(listen) {
    const date = new Date(listen);
    const formattedMonth = String(date.getMonth() + 1).padStart(2, '0');
    const formattedDate = String(date.getDate()).padStart(2, '0');
    const formattedMins = String(date.getMinutes()).padStart(2, '0');
    return `${formattedMonth}/${formattedDate}/${date.getFullYear()} ${convertTime(date.getHours())}:${formattedMins} ${date.getHours() < 12 ? "am" : "pm"}`;
}

function formatReleaseDate(release) {
    const year = release.slice(0, 4);
    const month = release.slice(5, 7);
    const day = release.slice(8, 10);
    return `${month}/${day}/${year}`;
}

/* append all album info into a table from it being passed in from the mock API call */
function appendTableBody(albums) {
    // sort albums in ascending order
    albums.sort((first, second) => second.last_listened - first.last_listened);

    // iterate through each album and get its info to display in table
    for (let album of albums) {

        const tr = document.createElement("tr");
        const albumTitleCell = document.createElement("td");
        albumTitleCell.textContent = album.album_title;

        const ratingCell = document.createElement("td");
        // provide alternative messaging if rating is unavailable
        if (album.avg_user_rating == null) {
            ratingCell.textContent = "- -"
        } else {
            ratingCell.textContent = album.avg_user_rating;
        }

        const bandNameCell = document.createElement("td");
        bandNameCell.textContent = album.band_name;

        const genresCell = document.createElement("td");
        genresCell.textContent = album.genres;

        const lastListenedCell = document.createElement("td");
        formattedListenDate = formatListenDate(album.last_listened);
        lastListenedCell.textContent = formattedListenDate;

        const releaseDateCell = document.createElement("td");
        formattedReleaseDate = formatReleaseDate(album.release_date);
        console.log(formattedReleaseDate);
        releaseDateCell.textContent = formattedReleaseDate;

        tr.append(bandNameCell);
        tr.append(albumTitleCell);
        tr.append(genresCell);
        tr.append(lastListenedCell);        
        tr.append(releaseDateCell);
        tr.append(ratingCell);

        musicTable.append(tr);
    }
}

/* called after a button is pressed, mimicking a Fetch API call */
function getInfo() {

    mockFetchHelper(true, musicData, 10)
        .then((response) => {
            removeChildren(musicTable);
            console.log(musicData.albums);
            appendTableBody(musicData.albums);
        })
        .catch((error) => {
            console.log(error);
        });
}

submitButton.addEventListener("click", getInfo);


// I had to move this mockFetchHelper here since Firefox gave me the run around with trying to get this imported at the "top-level", something about a CORS request
// link to issue: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/Errors/CORSRequestNotHttp
// I also kept getting errors about "Uncaught SyntaxError: import declarations may only appear at top level of a module", no matter what I changed in my import statement.

const musicData = {
  "albums": [
    {
      "album_title": "Count Bateman",
      "avg_user_rating": 8.786,
      "band_name": "Frog",
      "genres": ["Indie Rock", "Acoustic"],
      "last_listened": 1609528990000,
      "release_date": "2019/08/16",
    },
    {
      "album_title": "Stay Positive",
      "avg_user_rating": 9.234,
      "band_name": "The Hold Steady",
      "genres": ["Rock", "Punk"],
      "last_listened": 1611766459503,
      "release_date": "2008/07/15",
    },
    {
      "album_title": "Courting Strong",
      "avg_user_rating": null,
      "band_name": "Martha",
      "genres": ["Punk", "Indie Rock"],
      "last_listened": 1610471530000,
      "release_date": "2014/05/26"
    },
    {
      "album_title": "Born Like This",
      "avg_user_rating": 7.983,
      "band_name": "MF Doom",
      "genres": ["Hip-hop", "Rap"],
      "last_listened": 1607951459000,
      "release_date": "2009/03/24"
    },
    {
      "album_title": "Giant Steps",
      "avg_user_rating": 8.444,
      "band_name": "John Coltrane",
      "genres": ["Jazz"],
      "last_listened": 1608786659000,
      "release_date": "1960/02/01"
    }
  ]
}

function mockFetchHelper(
    isSuccess=true,
    returnValue,
    timeoutValue=1000
) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (isSuccess) {
                resolve(returnValue);
            } else {
                reject(returnValue);
            }
        }, timeoutValue);
    });
}