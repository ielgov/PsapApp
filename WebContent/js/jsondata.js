var appData = {
		'level-one':{
			'dimensions':2,
			'name':'categories',
			'type':'categories',
			'hascenter':false,
		},
		'level-two':{
			'dimensions':3,
			'type':'solutions',
			'hascenter':true,
		},
		'level-three':{
			'dimensions':3,
			'type':'offerings',
			'hascenter':true,
		},
};

var categoryJSON = {
		"categories": [
		           	{
		           		"CategoryId": "01",
		           		"Name": "ILP",
		           		"Display": "Intelligence Led Policing"
		           	}, 
		           	{
		           		"CategoryId": "02",
		           		"Name": "CCOEM",
		           		"Display": "Command Control, Ops, and Emegency Mgmt"
		           	}, 
		           	{
		           		"CategoryId": "03",
		           		"Name": "Real time crime",
		           		"Display": "Real time Crime and Fusion Centers"
		           	}, 
		           	{
		           		"CategoryId": "04",
		           		"Name": "Security",
		           		"Display": "Video, Physical, and Cyber Security"
		           	}
		           	]
		           };

var ccoemJSON = {"02": 
					[
               			{
               			"CategoryId": "201",
               			"Name": "IOC4EM",
               			"Display": "Situation Awareness and Incident Response"
               			}, 
               			{
               			"CategoryId": "202",
               			"Name": "IOT",
               			"Display": "Body Worn Cameras and IOT"
               			},
               			{
                   			"CategoryId": "203",
                   			"Name": "Resiliancy",
                   			"Display": "Resiliancy Assessments"
               			},
               			{
               			"CategoryId": "204",
               			"Name": "Weather",
               			"Display": "Weather Analysis"
               			}, 
               			{
               			"CategoryId": "205",
               			"Name": "Citizens",
               			"Display": "Citizen and Community Engagement"
               			}, 
               			{
               			"CategoryId": "206",
               			"Name": "SMA",
               			"Display": "Social Media Analysis"
               			}, 
               			{
               			"CategoryId": "207",
               			"Name": "Cloud",
               			"Display": "Cloud and Deployment"
               			}, 
               			{
               			"CategoryId": "208",
               			"Name": "FirstResponse",
               			"Display": "Incident Responders"
               			}
               		]
				};