var priceChanged	= false;
var ie				= new IE();
var ui				= new UI();
var dashboardLogic	= new DashboardLogic();
var formLogic		= new FormLogic();
var combobulate 	= new Combobulate();
var query			= new dashboardLogic.query();
var social			= new SocialMedia();
var carCode			= getQueryParameter( 'm' ) || false;

var addressObj;
var dealersObj;
var responsive;
var dashboard;
var postcodeTimer;

// Selectors for form fields

var form = {

	addresses:			'#addresses',
	address1:			'#address-1',
	address2:			'#address-2',
	address3:			'#address-3',
	addressChooser:		'#address-chooser',
	dealerChooser:		'#dealer-chooser',
	dealers:			'#dealers',

}

// Some not IE-friendly stuff

if( Mini.browser.isIE( '>8' ) || ! Mini.browser.isIE() ) {

	// Preload images

	ui.preloadImages();

	// Make everything responsive

	responsive = new Responsive();

}

// Start dashboard

dashboard = new Dashboard();

// Initialize everything after the page has fully loaded (otherwise dashboard values will be off!)

$( window ).load( function() {

	// We need to update dashboard color once the SVGs have been loaded

	var color		= ( carCode ) ? dashboardLogic.getCarByCode( carCode ).color : false;
	var dashColor	= ( color ) ? color : 'Chili red';

	dashboard.colors( carColors[ dashColor ] );

	// Initialize controls on the homepage

	if( $( '#dash' ).length ) dashboard.init();

	// Color switcher

	$.subscribe( 'colour-change', function( e, color ) { dashboard.colors( color ); } );

	// Show first panel on a page

	ui.showPanel( 'default' );

	// Validate forms

	$( 'form' ).validate();

	// Handle successful form submission
	
	$.subscribe( 'form-ajax-results', function( e, data ) {

		if( data.success ) { ui.showPanel( 'thanks' ); }

	} );

	// Render finance template

	if( $( '#tpl-finance' ).length > 0 ) {

		ui.getTpl( 'finance' ).then( function( tpl ) {

			$( '#tpl-finance' ).replaceWith( ui.renderTpl( tpl, formLogic.getFinance( carCode ) ) );

		} );

	}

	// Initialise form logic and combobulate
	formLogic.init();
	combobulate.init();

} );





