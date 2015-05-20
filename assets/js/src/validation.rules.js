$.validator.setDefaults( {

	// Setup form validation rules here

	rules: {

		'name':				{

			required: true,
			regexName: true

		},
		'surname':			{

			required: true,
			regexSurame: true

		},
		'address_1':		{ required: true },
		'tel_home':			{

			required: true,
			regexPhoneUK: true

		},
		'dealer':			{ required: true },
		'title':			{ required: true },
		'postcode_search':	{

			required: true,
			regexPostcode: true

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
		'address_1':		{ required: 'Address line 1 is required.' },
		'postcode': 		{ required: 'Postcode is required.' },
		'tel_home':			{ required: 'Home telephone is required.' },
		'dealer': 			{ required: 'Please choose a dealer from the list.' },
		'title': 			{ required: 'Title is required.' },
		'postcode_search': 	{ required: 'Postcode is required.' },
		'email':			{

			required: 'E-mail is required.',
			email: 'Please enter a valid e-mail address.'

		}

	}

} );

$.validator.addMethod(
	'regexPostcode',
	function(value, element, regexp) {
		var check = false;
		var re = new RegExp('^(GIR ?0AA|[A-PR-UWYZ]([0-9]{1,2}|([A-HK-Y][0-9]([0-9ABEHMNPRV-Y])?)|[0-9][A-HJKPS-UW]) ?[0-9][ABD-HJLNP-UW-Z]{2})$', 'i');
		return this.optional(element) || re.test(value);
	},
	'Please enter a valid UK postcode.'
);


$.validator.addMethod(
	'regexPhoneUK',
	function(phone_number, element) {
		phone_number = phone_number.replace(/\s/g, '');
		return this.optional(element) || 
		phone_number.match(/^(((\+44\s?\d{4}|\(?0\d{4}\)?)\s?\d{3}\s?\d{3})|((\+44\s?\d{3}|\(?0\d{3}\)?)\s?\d{3}\s?\d{4})|((\+44\s?\d{2}|\(?0\d{2}\)?)\s?\d{4}\s?\d{4}))(\s?\#(\d{4}|\d{3}))?$/);
	},
	'Please specify a valid phone number.'
);


$.validator.addMethod(
	'regexName',
	function(value, element, regexp) {
		var check = false;
		var re = new RegExp("^[a-zA-Z]'?([a-zA-Z]|\.| |-)+$");
		return this.optional(element) || re.test(value);
	},
	'Please enter a valid name.'
);

$.validator.addMethod(
	'regexSurame',
	function(value, element, regexp) {
		var check = false;
		var re = new RegExp("^[a-zA-Z]'?([a-zA-Z]|\.| |-)+$");
		return this.optional(element) || re.test(value);
	},
	'Please enter a valid last name.'
);