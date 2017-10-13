import configureStore from './store'

export function getUserProfileData() {
	return (dispatch) => {
		let header = new Headers();
    	header.append("Content-Type", "application/json");

	    //set request body parameter to be passed in user bio api
	    let requestBody = {
	      "_method": "GET",
	      "_version": "5.0.5",
	      "_SessionToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOjI3MDc3OTgsImV4cCI6MTUzOTUzNTI1OTM2OH0.UK2qP1yk9QLk_Bkx1Ly0RPaitRYtec8ojZhzYRc0D-g",
	    }

	    //request object
	    let userBioRequestInit = {
	      method: 'POST',
	      headers: header,
	      body: JSON.stringify(requestBody)
	    }

	    let requestToUserBio = new Request('http://api.pumpup.com/1/classes/User/318381', userBioRequestInit)
	    return fetch(requestToUserBio)
	      .then((responseData) => responseData.json())
	      .then((responseDataJson) => {
	       dispatch({type: 'FETCH_USER_BIO', data: responseDataJson})
	      })
	      .catch((error) => {
	        console.log("error fetching user profile" + error)
	      })

		}
}

export function getUserSliderImages() {
	return (dispatch) => {
		let header = new Headers();
    header.append("Content-Type", "application/json");

    // request body for slider images
    let requestBody = {
      "isThumbnailsOnly": true,
      "limit": 5,
      "userId": 2707798,
      "_method": "POST",
      "_version": "5.0.5",
      "_SessionToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOjI3MDc3OTgsImV4cCI6MTUzOTUzNTI1OTM2OH0.UK2qP1yk9QLk_Bkx1Ly0RPaitRYtec8ojZhzYRc0D-g"
    }

    //request object
    let userSliderImagesRequestInit = {
      method: 'POST',
      headers: header,
      body: JSON.stringify(requestBody)
    }
    let userSliderImages = [];
    let requestToUserSliderImages = new Request('http://api.pumpup.com/1/functions/feed/profile/load-batch', userSliderImagesRequestInit)

    return fetch(requestToUserSliderImages)
      .then((responseData) => responseData.json())
      .then((responseDataJson) => {        
        for (let i = 0; i < responseDataJson.result.posts.length; i++) {
          userSliderImages.push(responseDataJson.result.posts[i].thumbnail)
        }
         dispatch({type: 'FETCH_SLIDER_IMAGES', data: userSliderImages})
      })
      .catch((error) => {
        console.log("error fetching user profile" + error)
      })
	}	
}

export function getGridImages() {
	return (dispatch) => {
		let header = new Headers();
    	header.append("Content-Type", "application/json");

    // request body for grid view images
    let requestBody = {
      "isThumbnailsOnly": true,
      "limit": 18,
      "userId": 2707798,
      "_method": "POST",
      "_version": "5.0.5",
      "_SessionToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOjI3MDc3OTgsImV4cCI6MTUzOTUzNTI1OTM2OH0.UK2qP1yk9QLk_Bkx1Ly0RPaitRYtec8ojZhzYRc0D-g"
    }

    //request object
    let userGridViewRequestInit = {
      method: 'POST',
      headers: header,
      body: JSON.stringify(requestBody)
    }

    let requestToGridView = new Request('http://api.pumpup.com/1/functions/feed/popular/load-batch', userGridViewRequestInit)
    
    return fetch(requestToGridView)
      .then((responseData) => responseData.json())
      .then((responseDataJson) => {                        
        dispatch({type: 'FETCH_GRID_IMAGES', data:responseDataJson.result.posts})
      })
      .catch((error) => {
        console.log("error fetching user profile" + error)
      })
	}
}