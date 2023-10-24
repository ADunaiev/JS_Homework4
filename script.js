const baseUrl = "http://www.omdbapi.com/";
const myApi = "a4a199c8"; 

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);

    // looking for search button
    const searchBtn = document.getElementById('search-btn');
    if (!searchBtn) throw "Can't find id 'rearch-btn'";
    searchBtn.addEventListener('click', searchBtnClicked);

  });

  function searchBtnClicked(e) {
    e.preventDefault();

    //looking for search-textarea
    const searchTextarea = document.getElementById('search-textarea');
    if(!searchTextarea) throw "Can't find id 'search-textarea'";

    //looking for type-select
    const typeSelect = document.getElementById('type-select');
    if(!typeSelect) throw "Can't find id 'type-select'";

    console.log(searchTextarea.value + " " + typeSelect.value);

    fetch (
      `${baseUrl}?apikey=${myApi}&s=` + searchTextarea.value + `&r=json&type=${typeSelect.value}&s`
      //{
        //method: 'GET'
        //s: searchTextarea.value,
        //type: typeSelect.value
      //}

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

    if(json.Response == "False") {
      tempHTML += "<div class='col s12'>";
      tempHTML += "<h3 class='center-align'>Movie not found!</h3>";
      tempHTML += "</div>";
      resultDiv.innerHTML = tempHTML;
    } else {

      tempHTML += "<div class='col s12'>";   

      for(let item of json.Search) {

          tempHTML += "<div class='card large col s4'>";
            tempHTML += "<div class='card-image waves-effect waves-block waves-light'>";
              tempHTML += "<img class='activator' src='";
              tempHTML += item.Poster;
              tempHTML += " alt='poster'>";
            tempHTML += "</div>";
            tempHTML += "<div class='card-content'>";
              tempHTML += "<span class='card-title activator grey-text text-darken-4'>";
                tempHTML += item.Title;
                tempHTML += "<span class='badge' data-badge-caption='";
                tempHTML += item.Type;
                tempHTML += "'></span>";
              tempHTML += "</span>";
              tempHTML += "<br><p>";
                tempHTML += "<button type='submit' class='btn waves-effect waves-light' id='details-btn'>details</button>";
                tempHTML += "<span class='badge'>";
                tempHTML += item.Year;
                tempHTML += "</span>";
              tempHTML += "</p>";
            tempHTML += "</div>";
          tempHTML += "</div>";
      }
  
      tempHTML += "</div>";
      resultDiv.innerHTML = tempHTML;
    }







  }

