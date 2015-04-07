
// Setting up some global variables...
// Creating instances of all the functions and saving as global variables
var ie				= new IE();
var ui				= new UI();
var dashboardLogic	= new DashboardLogic();
var formLogic		= new FormLogic();
var combobulate 	= new Combobulate();
var finance 		= new Finance();
var query			= new dashboardLogic.query();
var dashboard 		= new Dashboard();
var social			= new SocialMedia();
var dials			= new Dials();
//
// carCode is set to false unless it is ??? (not sure what this does)
var carCode	= getQueryParameter( 'm' ) || false;
//
// priceChanged changes based on whether the price dial is changed
// We are setting it to false to start with
var priceChanged = false;
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
	address1:			'#address-1',
	address2:			'#address-2',
	address3:			'#address-3',
	addressChooser:		'#address-chooser',
	dealerChooser:		'#dealer-chooser',
	dealers:			'#dealers',
}


// For modern browsers...
// If browser is above IE8 or not IE at all
if ( Mini.browser.isIE( '>8' ) || ! Mini.browser.isIE() ) {
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
