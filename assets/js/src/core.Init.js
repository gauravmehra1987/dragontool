// Horrible hack to clear the local cache after a day. Implimented an hour before departure. I am sorry.
var lastAccess = store.get('last-access');
if (lastAccess !== undefined) {
	expire = new Date(parseInt(lastAccess) + 86400000);
	var currentDate = new Date();
	if (expire < currentDate) {
		store.clear();
	}
}
else {
	store.clear();
}
store.set('last-access', +new Date())


// Setting up some global variables...
// Creating instances of all the functions and saving as global variables
var ie				= new IE();
var ui				= new UI();
var dataLogic       = new DataLogic();
var dashboardLogic	= new DashboardLogic();
var formLogic		= new FormLogic();
var combobulate 	= new Combobulate();
var finance 		= new Finance();
var query			= new dashboardLogic.query();
var dashboard 		= new Dashboard();
var social			= new SocialMedia();
var dials			= new Dials();
var introAnimations	= new IntroAnimations();
//
// Initialize dataLogic
dataLogic.init();
// carCode is set to false unless it is ??? (not sure what this does)
var carCode	= getQueryParameter( 'm' ) || false;
//
// priceChanged changes based on whether the price dial is changed
// We are setting it to false to start with
var priceChanged = false;
var mpgChanged = false;
var roller1Changed = false;
var roller2Changed = false;
var roller3Changed = false;
var roller4Changed = false;
var roller5Changed = false;
var speedChanged = false;
//
// Setting up some more empty global variables to set later
var addressObj;
var dealersObj;
var responsive;
var postcodeTimer;
//
// Creating a form object with selectors for form fields
var form = {
	addresses:			'#addresses',
	address1:			'#address_1',
	address2:			'#address_2',
	address3:			'#address_3',
	town:				'#town',
	postcodeSearch: 	'#postcode_search',
	postcode:			'#postcode',
	addressLookup: 		'#address_lookup',
	addressChooser:		'#address_chooser',
	dealerChooser:		'#dealer_chooser',
	dealers:			'#dealers'
}
//
// Google analytics helper function for tracking the dashboard dials
var lastTriggeredEvent;

function trackDialEvents( triggeredEvent ) {

	if ( triggeredEvent != lastTriggeredEvent ) {

		_gaq.push(['_trackEvent', 'Dashboard', triggeredEvent ]);

		lastTriggeredEvent = triggeredEvent;

	}
}

//
// For modern browsers...
// If browser is above IE8 or not IE at all
if ( Mini.browser.isIE( '>9' ) || ! Mini.browser.isIE() ) {
	//
	// Preload images
	ui.preloadImages();
	//
	// Create a new instance of the responsive function, making everything responsive
	responsive = new Responsive();
}


// On load!!
// Initialize everything after the page has fully loaded
$( window ).load( function() {

	// Initialize dashboard
	// Which will activate all the dials and change the dashboard color
	dashboard.init();


	// Initialize UI
	// Which will show the first panel, passed in
	ui.init( 'default' );

	// Initialize form logic
	formLogic.init();

	// Initialze finance
	// Which will render the template for the terms and conditions for whichever car in view
	finance.init();

	// Initialize combobulate
	// Which will listen to the on click of the combobulate button
	combobulate.init();
} );

