

/*
    <body>
        <div class="Nav"></div>
        <div class="info">
            <div class="map"> 
            </div>
            <div class="list">
                <div class="option"
                </div>
                <div class="stats">
                </div>
            </div>
        </div>
    </body>

    CSS down here
    .Nav {
        width: 100%;
        height: 20vh; 
        text-Align: center;
        item-align: center;
//px, rem, em, vh
        border-style: solid;
        border-color: #f00;
    }
    .Nav h1 {
        margin: auto;
    }

    .info {
        width 100%;
        height: 700px;
    }

    .map {
        float: left;
        width: 50%;
        height: xpx;
    }

    .list {
        width: 49%
        height: 
        float: right

        position:absolute;
        right:0px
    }

    .option {
        width: 100%
        height: 20px;

        position: absolute;
        top: 0px;
        
    }
    .stats {
        width: 100%;
        position: absolute;
        bottom: 0px;
    }




*/
checkbox.addEventListener('click', () => {
    esOrEl(elStation    ,checkbox,"Elevator")
})
escalCheckbox.addEventListener('click', () => {
    esOrEl(esStation,escalCheckbox,"Escalator")
})

const modalUl = document.querySelector("#modal-Ul")


function displayStation(station,type){
    const newLi = elCreator('li')
        newLi.innerText = `${station.stop_name}`

    let latling = new google.maps.LatLng(station.gtfs_latitude , station.gtfs_longitude)
    let marker = new google.maps.Marker({position: latling, map: map})
    // console.log(marker)
    // marker.data.toggle = "Modal"
    // marker.data.target = "#exampleModalCenter"
    google.maps.event.addListener(marker, 'click', (e) => {
       
       body.className = "modal-open"

       
       modal.className = "modal fade show"
       modal.style = "display:block"

       
        title.innerText = station.stop_name
        clearer(modalUl)
    
    const routes = elCreator("li")
        routes.innerText = station.daytime_routes
    const feature = elCreator("li")
        feature.innerText = type


    const stationsRatingLi = elCreator('li')
        stationsRatingLi.innerText = (calculateRating(station) || 0)
        stationsRatingLi.id = "stationRating"

        modalUl.append(routes,feature, stationsRatingLi)
        

    });

    

    allSubUl.append(newLi)

    newLi.addEventListener('click', (e) => {
        
        displayStats(station,type)
        console.log("click me", station.id)
        formDiv.style = "display:inline-block"
        displayReviewStuff(station)
        formCreator(station)
        clearer(reviewsDiv)
    })
}



trigger.addEventListener("click",() => {
    body.className = ""

       
    modal.className = "modal fade"
    modal.style = "display:none"
})



function displayStats(station,type){
    clearer(statUl)

    const statName = elCreator('p')
        statName.innerText = "Info:"
    const stationName = elCreator("li")
        stationName.innerText = `Stop Name: ${station.stop_name}`
    const routes = elCreator("li")
        routes.innerText = `Routes: ${station.daytime_routes}`
    const feature = elCreator("li")
        feature.innerText = `Feature: ${type}`


    const stationsRatingLi = elCreator('li')
        stationsRatingLi.innerText = `Rating: ${(calculateRating(station) || 0)}`
        stationsRatingLi.id = "stationRating"
    const reviewName = elCreator('p')
        reviewName.innerText = "Reviews:"
    const statReviewBreak = elCreator('br')
    statUl.append(statName, stationName,routes,feature, stationsRatingLi, statReviewBreak, reviewName)
}


function displayReviewStuff(station){
    fetchedReview
    .then(reviewsData => {
        clearer(reviewsDiv)
        reviewsData.forEach((review) => {
            if (station.id === review["station_id"]){
                slapItOnTheDom(review)
            }
        })
    })

   
}


function slapItOnTheDom(review){
    // console.log(review)
    const nameLi = elCreator('li')
        nameLi.innerText = `Name: ${review.name}`
        // console.log(nameLi)
    const ratingLi = elCreator('li')
        ratingLi.innerText = `Rating: ${review.rating}`
        // console.log(ratingLi)
    const contentLi = elCreator('li')
        contentLi.innerText = `Comment: ${review.content}`
        // console.log(contentLi)
    const reviewBreak = elCreator('br')
      
    reviewsDiv.append(nameLi,ratingLi,contentLi, reviewBreak)
}





function elCreator(element){
    return document.createElement(element)
}








function formCreator(station){
    const formName = elCreator('p')
        formName.innerText = "New Review:"

    formDiv.innerHTML = ""
    formDiv.append(formName)

    formDiv.innerHTML += `
    <form id="new-review-form">
    <label>Name</label>
    <input type="text" name="Name"><br>
    <label>Local or Nah?</label>
    <input type="checkbox" name="local Or Nah?"><br>
    <label>Rating</label>
    <input type="integer" name="Rating"><br>
    <label>Content</label>
    <input type="text" name="Content"><br>
    <input type="submit" value="Submit">
  </form>`
  const newForm = formDiv.querySelector("#new-review-form")
//   newForm.dataset
const stationRateLi = document.querySelector("#stationRating")

  newForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const nameValue  = e.target["Name"].value
    const booleanValue  = e.target["local Or Nah?"].checked
    console.log(booleanValue)
    const RatingValue  = e.target["Rating"].value
    const ContentValue  = e.target["Content"].value
    fetch("http://localhost:3000/reviews",{
        method: "POST",
        headers:{
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            name: nameValue,
            station_id: station.id,
            localOrNah:booleanValue,
            rating:RatingValue,
            content:ContentValue,
        })
    })
    .then(r => r.json())
    .then(newReview => {
        console.log("1")
        console.log("displayReviewStuff")
        slapItOnTheDom(newReview)
        station.reviews.push(newReview)
        const stationsRatingLi = document.querySelector("#stationRating")
        stationsRatingLi.innerText = `Rating: ${(calculateRating(station) || 0)}`
        console.log(stationsRatingLi)
        statUl.appendChild(stationsRatingLi)

        // displayStats(station,newReview)
    })

})
}
function trueShow(station){
    window.scroll(0,1000)
    const ShowDiv = document.querySelector(".test")
   const header= elCreator("h2")
   header.innerText = station.stop_name
   ShowDiv.append(header)
}

