$.validator.setDefaults( {

	// Setup form validation rules here

	rules: {

		'name':				{ required: true },
		'surname':			{ required: true },
		'address-1':		{ required: true },
		'address-2':		{ required: true },
		'address-4':		{ required: true },
		'tel-home':			{ required: true },
		'tel-work':			{ required: true },
		'tel-mobile':		{ required: true },
		'dealer':			{ required: true },
		'title':			{ required: true },
		'postcode-search':	{

			required: true,
			regex: true

		},
		'email':			{

			required: true,
			email: true

		},

	},

	// And new messages here

	messages: {

		'name':				{ required: 'First name is required.' },
		'surname':			{ required: 'Last name is required.' },
		'address-1':		{ required: 'Address line 1 is required.' },
		'address-2':		{ required: 'Address line 2 is required.' },
		'address-4':		{ required: 'Address line 4 is required.' },
		'tel-home':			{ required: 'Home telephone is required.' },
		'tel-work':			{ required: 'Work telephone is required.' },
		'tel-mobile':		{ required: 'Mobile telephone is required.' },
		'dealer': 			{ required: 'Please choose a dealer from the list.' },
		'title': 			{ required: 'Title is required.' },
		'postcode-search': 	{ required: 'Postcode is required.' },
		'email':			{

			required: 'E-mail is required.',
			email: 'Please enter a valid e-mail address.'

		}

	}

} );

$.validator.addMethod(
	'regex',
	function(value, element, regexp) {
		var check = false;
		var re = new RegExp('^([a-zA-Z]){1}([0-9][0-9]|[0-9]|[a-zA-Z][0-9][a-zA-Z]|[a-zA-Z][0-9][0-9]|[a-zA-Z][0-9]){1}([        ])([0-9][a-zA-z][a-zA-z]){1}$');
		return this.optional(element) || re.test(value);
	},
	'Please enter a valid UK postcode.'
);