const initialState = {
	userProfileData: {},
	userSliderImages: [],
	gridDataSource: [],
}

export default function reducer(state = initialState, action) {
	switch(action.type) {
		case 'FETCH_USER_BIO':
			console.log("case matched" + JSON.stringify(action.data))
			console.log("state object" + JSON.stringify(state))			
			return {
				...state,
				userProfileData: action.data
			}
		case 'FETCH_SLIDER_IMAGES':
			return {
				...state,
				userSliderImages: action.data
			}
		case 'FETCH_GRID_IMAGES':
			return {
				...state,
				gridDataSource: action.data
			}
		default:			
			return state
	}
}