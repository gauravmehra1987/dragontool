$.validator.setDefaults( {

	// Setup form validation rules here

	rules: {

		'name':				{ required: true },
		'surname':			{ required: true },
		'address-1':		{ required: true },
		'address-2':		{ required: true },
		'address-4':		{ required: true },
		'tel-home':			{

			required: true,
			regexHomePhone: true

		},
		'dealer':			{ required: true },
		'title':			{ required: true },
		'postcode-search':	{

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
		'address-1':		{ required: 'Address line 1 is required.' },
		'address-2':		{ required: 'Address line 2 is required.' },
		'address-4':		{ required: 'Address line 4 is required.' },
		'tel-home':			{ required: 'Home telephone is required.' },
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
	'regexPostcode',
	function(value, element, regexp) {
		var check = false;
		var re = new RegExp('^(GIR ?0AA|[A-PR-UWYZ]([0-9]{1,2}|([A-HK-Y][0-9]([0-9ABEHMNPRV-Y])?)|[0-9][A-HJKPS-UW]) ?[0-9][ABD-HJLNP-UW-Z]{2})$', 'i');
		return this.optional(element) || re.test(value);
	},
	'Please enter a valid UK postcode.'
);

$.validator.addMethod(
	'regexHomePhone',
	function(value, element, regexp) {
		var check = false;
		var re = new RegExp('^(((\+44\s?|0044\s?)?|(\(?0))((2[03489]\)?\s?\d{4}\s?\d{4})|(1[23456789]1\)?\s?\d{3}\s?\d{4})|(1[23456789][234578][0234679]\)?\s?\d{6})|(1[2579][0245][0467]\)?\s?\d{5})|(11[345678]\)?\s?\d{3}\s?\d{4})|(1[35679][234689]\s?[46789][234567]\)?\s?\d{4,5})|([389]\d{2}\s?\d{3}\s?\d{4})|([57][0-9]\s?\d{4}\s?\d{4})|(500\s?\d{6})|(7[456789]\d{2}\s?\d{6})))$');
		return this.optional(element) || re.test(value);
	},
	'Please enter a valid phone number.'
);