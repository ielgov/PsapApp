config = {};

config.url = "http://172.27.50.135:9080";

config.categoriesURL = "/PSAP/dbCategories?action=search&type=SOLUTION&parentid=";
config.solutionsURL = "/PSAP/dbCategories?action=search&type=OFERING&parentid=";
config.offeringsURL = "/PSAP/dbAssets?action=search&SubmittedBy="//+"gscgov@us.ibm.com"; // this one doesnt seem to be working right

config.categories = {
	"Intelligent Lead Policing Investigative and Predictive Analytics":"01",
	"Command and Control, Operations, and Emergency Management":"02",
	"Realtime Crime / Fusion Center":"03",
	"Video, Physical Cyber Security and Surveillance":"04"
}