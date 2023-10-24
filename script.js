const baseUrl = "http://www.omdbapi.com/";
const myApi = "a4a199c8"; 

var currentPaginationPage = 1;
var newPaginationPage = 1;



document.addEventListener('DOMContentLoaded', function() {
    //activation of Materialize select
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);

    // looking for search button
    const searchBtn = document.getElementById('search-btn');
    if (!searchBtn) throw "Can't find id 'rearch-btn'";
    searchBtn.addEventListener('click', searchBtnClicked);

  });

  function searchBtnClicked(e) {
    e.preventDefault();

    currentPaginationPage = 1;

    //looking for detail-dvi
    const detailDiv = document.getElementById('details-div');
    if (!detailDiv) throw "Can't find id 'details-div'";
    detailDiv.innerHTML = "";

    //looking for search-textarea
    const searchTextarea = document.getElementById('search-textarea');
    if(!searchTextarea) throw "Can't find id 'search-textarea'";

    //looking for type-select
    const typeSelect = document.getElementById('type-select');
    if(!typeSelect) throw "Can't find id 'type-select'";

    //search query to server
    fetch (
      `${baseUrl}?apikey=${myApi}&s=` + searchTextarea.value + `&r=json&type=${typeSelect.value}&s`
    ).then( r => {
      if(r.status === 200) {
        r.json().then(showJson);
      }
      else {
        alert(`fetch error: got status ${r.status}`);
      }
    });
  }

  function showJson(json) {

    //finding result-div
    const resultDiv = document.getElementById('result-div');
    if(!resultDiv) throw "Can't find id 'result-div'";

    let tempHTML = "";

    // if nothing find
    if(json.Response == "False") {
      tempHTML += "<div class='col s12'>";
      tempHTML += "<h3 class='center-align'>Movie not found!</h3>";
      tempHTML += "</div>";
      resultDiv.innerHTML = tempHTML;
    } else {

      tempHTML += "<div class='col s12'>";   

      // movie cards
      for(let item of json.Search) {

          tempHTML += "<div class='card large col s4'>";
            tempHTML += "<div class='card-image waves-effect waves-block waves-light'>";
              tempHTML += "<img class='activator' src='";
              tempHTML += item.Poster;
              tempHTML += " alt='poster'>";
            tempHTML += "</div>";
            tempHTML += "<div class='card-content'>";
              tempHTML += "<span class='card-title activator grey-text text-darken-4 truncate'>";
                tempHTML += item.Title;
                tempHTML += "<span class='badge' data-badge-caption='";
                tempHTML += item.Type;
                tempHTML += "'></span>";
              tempHTML += "</span>";
              tempHTML += "<br><p>";
                tempHTML += "<button type='submit' class='btn waves-effect waves-light' name='detail-btn'>details</button>";
                tempHTML += "<span class='badge'>";
                tempHTML += item.Year;
                tempHTML += "</span>";
              tempHTML += "</p>";
            tempHTML += "</div>";
          tempHTML += "</div>";
      }

      //pagination
      tempHTML += "<ul class='pagination center-align col s12'>";

        if (currentPaginationPage <= 3 ) {
          tempHTML += "<li class='disabled'><a href='#!' name='pagination-back'><i class='material-icons'>chevron_left</i></a></li>";
        }
        else {
          tempHTML += "<li class='waves-effect'><a href='#!' name='pagination-back'><i class='material-icons'>chevron_left</i></a></li>";
        }

        let firstPage = 0;

        if(currentPaginationPage <= 3) {
          firstPage = 1;
        } else if (currentPaginationPage >= 8) {
          firstPage = 6;
        }
        else {
          firstPage = currentPaginationPage -2;
        }
         
        for(let i = firstPage; i < firstPage + 5; i++) {

          if (i == currentPaginationPage) {
            tempHTML += "<li class='active'><a href='#!' name='pagination-btn'>" + i + "</a></li>";
          } else {
            tempHTML += "<li class='waves-effect'><a href='#!' name='pagination-btn'>" + i + "</a></li>";
          }
        }
        

        if (currentPaginationPage >= 8){
          tempHTML += "<li class='disabled'><a href='#!' name='pagination-next'><i class='material-icons'>chevron_right</i></a></li>";
        } else {
          tempHTML += "<li class='waves-effect'><a href='#!' name='pagination-next'><i class='material-icons'>chevron_right</i></a></li>";
        }

      tempHTML += "</ul>";
  
      tempHTML += "</div>";
      resultDiv.innerHTML = tempHTML;
    }

    // find buttons detail
    const detailBtns = document.getElementsByName('detail-btn');
    if(!detailBtns) throw "Can't find name 'detail-btn'";

    for(let item of detailBtns){
      item.addEventListener('click', detailBtnsClicked);
    }

    // find pagination-btn
    const paginationBtns = document.getElementsByName('pagination-btn');
    if (!paginationBtns) throw "Can't find name 'pagination-btn'";

    for(let item of paginationBtns) {
      item.addEventListener('click', paginationBtnClick);
    }
    

    //find pagination-back 
    if(currentPaginationPage > 3) {
      const paginationBack = document.getElementsByName('pagination-back');
      if (!paginationBack) throw "Can't find id 'pagination-back'";
      for(let item of paginationBack) {
        item.addEventListener('click', paginationBackClick);
      }
    }
    

    //find pagination-next 
    if (currentPaginationPage < 8) {
      const paginationNext = document.getElementsByName('pagination-next');
      if (!paginationNext) throw "Can't find id 'pagination-next'";
      for(let item of paginationNext) {
        item.addEventListener('click', paginationNextClick);
      }
    }
  } 

  function paginationBackClick(elem) {
     newPaginationPage = parseInt(currentPaginationPage)-1;
     uploadNewPage();
  }

  function paginationNextClick(elem) {
    newPaginationPage = parseInt(currentPaginationPage)+1;
    uploadNewPage();
  }

  function paginationBtnClick(elem) {

    newPaginationPage = 0;
    newPaginationPage = elem.target.innerText;

    uploadNewPage();
  }
    

  function uploadNewPage(){
    if (currentPaginationPage == newPaginationPage) {
      return;
    } else  {

      //looking for detail-dvi and clear it
      const detailDiv = document.getElementById('details-div');
      if (!detailDiv) throw "Can't find id 'details-div'";
      detailDiv.innerHTML = "";
  
      //looking for search-textarea
      const searchTextarea = document.getElementById('search-textarea');
      if(!searchTextarea) throw "Can't find id 'search-textarea'";
  
      //looking for type-select
      const typeSelect = document.getElementById('type-select');
      if(!typeSelect) throw "Can't find id 'type-select'";

        // server query
        fetch (
          `${baseUrl}?apikey=${myApi}&s=` + searchTextarea.value + `&r=json&type=${typeSelect.value}&page=${newPaginationPage}`
        ).then( r => {
          if(r.status === 200) {
            currentPaginationPage = newPaginationPage;           
            r.json().then(showJson);
          }
          else {
            alert(`fetch error: got status ${r.status}`);
          }
        });
    }
  }

  function detailBtnsClicked(elem) {
    console.log(elem.target.parentElement.parentElement.children[0].innerText);

    fetch (
      `${baseUrl}?apikey=${myApi}&t=${elem.target.parentElement.parentElement.children[0].innerText}`

    ).then( r => {
      if(r.status === 200) {
        r.json().then(showDetails);
      }
      else {
        alert(`fetch error: got status ${r.status}`);
      }
    });
  }

  function showDetails(json) {
    //looking for detail-dvi
    const detailDiv = document.getElementById('details-div');
    if (!detailDiv) throw "Can't find id 'details-div'";

    console.log("showDetails = " + json.Title);

    let tempHTML = "<div class='col s12'>";

        tempHTML += "<h6 class='center-align'>Film info</h6>";

        tempHTML += "<div class='col s5'>";
          tempHTML += "<img src='";
          tempHTML += json.Poster;
          tempHTML += "' alt='Poster' class='responsive-img'>";
        tempHTML += "</div>";

        tempHTML += "<div class='col s7'>";
          tempHTML += "<table>";
            tempHTML += "<tbody>";

              tempHTML += "<tr>";
                tempHTML += "<td><b>Title:</b></td>";
                tempHTML += "<td>";
                tempHTML += json.Title;
                tempHTML += "</td>";
              tempHTML == "</tr>";

              tempHTML += "<tr>";
                tempHTML += "<td><b>Released:</b></td>";
                tempHTML += "<td>";
                tempHTML += json.Released;
                tempHTML += "</td>";
              tempHTML += "</tr>";

              tempHTML += "<tr>";
                tempHTML += "<td><b>Genre:</b></td>";
                tempHTML += "<td>";
                tempHTML += json.Genre;
                tempHTML += "</td>";
              tempHTML += "</tr>";

              tempHTML += "<tr>";
                tempHTML += "<td><b>Country:</b></td>";
                tempHTML += "<td>";
                tempHTML += json.Country;
                tempHTML += "</td>";
              tempHTML += "</tr>";

              tempHTML += "<tr>";
                tempHTML += "<td><b>Director:</b></td>";
                tempHTML += "<td>";
                tempHTML += json.Director;
                tempHTML += "</td>";
              tempHTML += "</tr>";

              tempHTML += "<tr>";
                tempHTML += "<td><b>Writer:</b></td>";
                tempHTML += "<td>";
                tempHTML += json.Writer;
                tempHTML += "</td>";
              tempHTML += "</tr>";

              tempHTML += "<tr>";
                tempHTML += "<td><b>Actors:</b></td>";
                tempHTML += "<td>";
                tempHTML += json.Actors;
                tempHTML += "</td>";
              tempHTML += "</tr>";

              tempHTML += "<tr>";
                tempHTML += "<td><b>Awards:</b></td>";
                tempHTML += "<td>";
                tempHTML += json.Awards;
                tempHTML += "</td>";
              tempHTML += "</tr>";

            tempHTML += "</tbody>";
          tempHTML += "</table>";
      tempHTML += "</div>";
    tempHTML += "</div>";

    detailDiv.innerHTML = tempHTML;

  }

