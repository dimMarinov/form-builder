import { api_endponts } from "./apiEndpoints";


const fieldService =  {
	getField: function(id: number) {
		return {
		  "label": "Sales region",
		  "required": false,
		  "choices": [
			"Asia",
			"Australia",
			"Western Europe",
			"North America",
			"Eastern Europe",
			"Latin America",
			"Middle East and Africa"
		  ],
		  "displayAlpha": true,
		  "default": "North America"
		}
	},
    saveField: async function (fieldJson: object) {
        console.log(fieldJson);
        
        return fetch(api_endponts.save_form, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(fieldJson),
        });
    },
}

export default fieldService