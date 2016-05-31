var appData = {
		'categories':{
			'id':'level-one',
			'dimensions':2,
			'name':'categories',
			'display':'categories',
			'type':'categories',
			'hascenter':false,
		},
		'solutions':{
			'id':'level-two',
			'dimensions':3,
			'name':'solutions',
			'display':'solutions',
			'type':'solutions',
			'hascenter':true,
		},
		'offerings':{
			'id':'level-three',
			'dimensions':3,
			'name':'offerings',
			'display':'offerings',
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

var solutionJSON = {
		"01": [
				{
				"CategoryId": "101",
				"Name": "ILE",
				"Display": "Tactical Lead Generation"
				}, 
				{
				"CategoryId": "102",
				"Name": "IDRes",
				"Display": "Identity Resolution"
				}, 
				{
				"CategoryId": "103",
				"Name": "EIA",
				"Display": "Intellgent Analysis"
				}, 
				{
				"CategoryId": "104",
				"Name": "SMA_WASMA",
				"Display": "Social Media Analytics"
				}, 
				{
				"CategoryId": "105",
				"Name": "PredPolicingSPSS",
				"Display": "Proactive Policing"
				}, 
				{
				"CategoryId": "106",
				"Name": "Dashboard",
				"Display": "Reporting and Dashboard"
				}, 
				{
				"CategoryId": "107",
				"Name": "MobileFirstResponse",
				"Display": "Officer Safety, Situation Awareness"
				}, 
				{
				"CategoryId": "108",
				"Name": "CaseMgr",
				"Display": "Investigation Support"
				}
			],
			"02": [
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

var offeringsJSON = {
		"101": [
				{
				"CategoryId": "1001",
				"Name": "ILE-Products",
				"Display": "Products"
				}, 
				{
				"CategoryId": "1002",
				"Name": "ILE-Services",
				"Display": "Services"
				},
				{
				"CategoryId": "1003",
				"Name": "ILE-Reference",
				"Display": "References"
				},
				{
				"CategoryId": "1004",
				"Name": "ILE-Competition",
				"Display": "Competition"
				},
				{
				"CategoryId": "1005",
				"Name": "ILE-WhitePapers",
				"Display": "White Papers"
				},
				{
				"CategoryId": "1006",
				"Name": "ILE-Contacts",
				"Display": "Contacts"
				},
				{
				"CategoryId": "1007",
				"Name": "ILE-ROI",
				"Display": "Economic Value (ROI)"
				},
				{
				"CategoryId": "1008",
				"Name": "ILE-OTHERMaterial",
				"Display": "Additional Material"
				}
			],
			"102": [
					{
					"CategoryId": "1010",
					"Name": "IDRes-Products",
					"Display": "Products"
					}, 
					{
					"CategoryId": "1011",
					"Name": "IDRes-Services",
					"Display": "Services"
					},
					{
					"CategoryId": "1012",
					"Name": "IDRes-Reference",
					"Display": "References"
					},
					{
					"CategoryId": "1013",
					"Name": "IDRes-Competition",
					"Display": "Competition"
					},
					{
					"CategoryId": "1014",
					"Name": "IDRes-WhitePapers",
					"Display": "White Papers"
					},
					{
					"CategoryId": "1015",
					"Name": "IDRes-Contacts",
					"Display": "Contacts"
					},
					{
					"CategoryId": "1016",
					"Name": "IDRes-ROI",
					"Display": "Economic Value (ROI)"
					},
					{
					"CategoryId": "1017",
					"Name": "IDRes-OTHERMaterial",
					"Display": "Additional Material"
					}
				],
				"201": [
						{
						"CategoryId": "2001",
						"Name": "IOC4EM-Products",
						"Display": "Products"
						}, 
						{
						"CategoryId": "2002",
						"Name": "IOC4EM-Services",
						"Display": "Services"
						},
						{
						"CategoryId": "2003",
						"Name": "IOC4EM-Reference",
						"Display": "References"
						},
						{
						"CategoryId": "2004",
						"Name": "IOC4EM-Competition",
						"Display": "Competition"
						},
						{
						"CategoryId": "2005",
						"Name": "IOC4EM-WhitePapers",
						"Display": "White Papers"
						},
						{
						"CategoryId": "2006",
						"Name": "IOC4EM-Contacts",
						"Display": "Contacts"
						},
						{
						"CategoryId": "2007",
						"Name": "IOC4EM-ROI",
						"Display": "Economic Value (ROI)"
						},
						{
						"CategoryId": "2008",
						"Name": "IOC4EM-OTHERMaterial",
						"Display": "Additional Material"
						}
					]
			
		};