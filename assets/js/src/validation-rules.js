( function( Mini ) {

	$.validator.setDefaults( {

		// Setup form validation rules here

		rules: {

			'name': { required: true },
			'surname': { required: true },
			'address-1': { required: true },
			'address-2': { required: true },
			'address-3': { required: true },
			'address-4': { required: true },
			'home': { required: true },
			'work': { required: true },
			'mobile': { required: true },
			'dealer': { required: true },
			'title': { required: true },
			'postcode': { required: true },
			'email': {

				required: true,
				email: true

			},

		},

		// And new messages here
		
		messages: {

			'name': { required:			'First name is required.' },
			'surname': { required:		'Last name is required.' },
			'address-1': { required:	'Address line 1 is required.' },
			'address-2': { required:	'Address line 2 is required.' },
			'address-3': { required:	'Address line 3 is required.' },
			'address-4': { required:	'Address line 4 is required.' },
			'home': { required:			'Home telephone is required.' },
			'work': { required:			'Work telephone is required.' },
			'mobile': { required:		'Mobile telephone is required.' },
			'dealer': { required:		'Please choose a dealer from the list.' },
			'title': { required:		'Title is required.' },
			'postcode': { required:		'Postcode is required.' },
			'email': {

				required: 'E-mail is required.',
				email: 'Please enter a valid e-mail address.'

			}

		}
		
	} );

} )( Mini );