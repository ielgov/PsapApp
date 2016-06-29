var appData = {
		'categories':{
			'id':'level-one',
			'dimensions':2,
			'name':'categories',
			'display':'categories',
			'type':'categories',
			'hascenter':false,
			'usePNG':true,
		},
		'solutions':{
			'id':'level-two',
			'dimensions':3,
			'name':'solutions',
			'display':'solutions',
			'type':'solutions',
			'hascenter':true,
			'usePNG':false,
		},
		'offerings':{
			'id':'level-three',
			'dimensions':3,
			'name':'offerings',
			'display':'offerings',
			'type':'offerings',
			'hascenter':true,
			'usePNG':false,
		},
};
//{"catid":201,"display":"Situational Awareness and Incident Response",
//"catdesc":"Situational Awareness and Incident Response ","parent_catid":2}
var categoryJSON = {
		"categories": [
		           	{
		           		"categoryid": "01",
		           		/*"Name": "ILP",*/
		           		"display": "Intelligence Led Policing"
		           	}, 
		           	{
		           		"categoryid": "02",
		           		/*"Name": "CCOEM",*/
		           		"display": "Command and Control, Operations, and Emergency Management"
		           	}, 
		           	{
		           		"categoryid": "03",
		           		/*"Name": "Real time crime",*/
		           		"display": "Real time Crime and Fusion Centers"
		           	}, 
		           	{
		           		"categoryid": "04",
		           		/*"Name": "Security",*/
		           		"display": "Video, Physical, Cyber Security and Surveillance"
		           	}
		           	]
		           };


var solutionJSON = {
		"01": [
				{
				"categoryid": "101",
				/*"Name": "ILE",*/
				"display": "1Tactical Lead Generation"
				}, 
				{
				"categoryid": "102",
				/*"Name": "IDRes",*/
				"display": "1Identity Resolution"
				}, 
				{
				"categoryid": "103",
				/*"Name": "EIA",*/
				"display": "1Intellgent Analysis"
				}, 
				{
				"categoryid": "104",
				/*"Name": "SMA_WASMA",*/
				"display": "1Social Media Analytics"
				}, 
				{
				"categoryid": "105",
				/*"Name": "PredPolicingSPSS",*/
				"display": "1Proactive Policing"
				}, 
				{
				"categoryid": "106",
				/*"Name": "Dashboard",*/
				"display": "1Reporting and Dashboard"
				}, 
				{
				"categoryid": "107",
				/*"Name": "MobileFirstResponse",*/
				"display": "1Officer Safety, Situation Awareness"
				}, 
				{
				"categoryid": "108",
				/*"Name": "CaseMgr",*/
				"display": "1Investigation Support"
				}
			],
			"02": [
				{
				"categoryid": "201",
				/*"Name": "IOC4EM",*/
				"display": "2Situation Awareness and Incident Response"
				}, 
				{
				"categoryid": "202",
				/*"Name": "IOT",*/
				"display": "2Body Worn Cameras and IOT"
				}, 
				{
				"categoryid": "204",
				/*"Name": "Weather",*/
				"display": "2Weather Analysis"
				}, 
				{
				"categoryid": "205",
				/*"Name": "Citizens",*/
				"display": "2Citizen and Community Engagement"
				}, 
				{
				"categoryid": "206",
				/*"Name": "SMA",*/
				"display": "2Social Media Analysis"
				}, 
				{
				"categoryid": "207",
				/*"Name": "Cloud",*/
				"display": "2Cloud and Deployment"
				}, 
				{
				"categoryid": "208",
				/*"Name": "FirstResponse",*/
				"display": "2Incident Responders"
				}
			]
		};

var offeringsJSON = {
		"101": [
				{
				"categoryid": "1001",
				/*"Name": "ILE-Products",*/
				"display": "1Products"
				}, 
				{
				"categoryid": "1002",
				/*"Name": "ILE-Services",*/
				"display": "1Services"
				},
				{
				"categoryid": "1003",
				/*"Name": "ILE-Reference",*/
				"display": "1References"
				},
				{
				"categoryid": "1004",
				/*"Name": "ILE-Competition",*/
				"display": "1Competition"
				},
				{
				"categoryid": "1005",
				/*"Name": "ILE-WhitePapers",*/
				"display": "1White Papers"
				},
				{
				"categoryid": "1006",
				/*"Name": "ILE-Contacts",*/
				"display": "1Contacts"
				},
				{
				"categoryid": "1007",
				/*"Name": "ILE-ROI",*/
				"display": "1Economic Value (ROI)"
				},
				{
				"categoryid": "1008",
				/*"Name": "ILE-OTHERMaterial",*/
				"display": "1Additional Material"
				}
			],
			"102": [
					{
					"categoryid": "1010",
					/*"Name": "IDRes-Products",*/
					"display": "2Products"
					}, 
					{
					"categoryid": "1011",
					/*"Name": "IDRes-Services",*/
					"display": "2Services"
					},
					{
					"categoryid": "1012",
					/*"Name": "IDRes-Reference",*/
					"display": "2References"
					},
					{
					"categoryid": "1013",
					/*"Name": "IDRes-Competition",*/
					"display": "2Competition"
					},
					{
					"categoryid": "1014",
					/*"Name": "IDRes-WhitePapers",*/
					"display": "2White Papers"
					},
					{
					"categoryid": "1015",
					/*"Name": "IDRes-Contacts",*/
					"display": "2Contacts"
					},
					{
					"categoryid": "1016",
					/*"Name": "IDRes-ROI",*/
					"display": "2Economic Value (ROI)"
					},
					/*{
					"categoryid": "1017",
					"Name": "IDRes-OTHERMaterial",
					"display": "Additional Material"
					}*/
				],
				"201": [
						{
						"categoryid": "2001",
						/*"Name": "IOC4EM-Products",*/
						"display": "Products"
						}, 
						{
						"categoryid": "2002",
						/*"Name": "IOC4EM-Services",*/
						"display": "Services"
						},
						{
						"categoryid": "2003",
						/*"Name": "IOC4EM-Reference",*/
						"display": "References"
						},
						{
						"categoryid": "2004",
						/*"Name": "IOC4EM-Competition",*/
						"display": "Competition"
						},
						{
						"categoryid": "2005",
						/*"Name": "IOC4EM-WhitePapers",*/
						"display": "White Papers"
						},
						{
						"categoryid": "2006",
						/*"Name": "IOC4EM-Contacts",*/
						"display": "Contacts"
						},
						{
						"categoryid": "2007",
						/*"Name": "IOC4EM-ROI",*/
						"display": "Economic Value (ROI)"
						},
						{
						"categoryid": "2008",
						/*"Name": "IOC4EM-OTHERMaterial",*/
						"display": "Additional Material"
						}
					]
			
		};