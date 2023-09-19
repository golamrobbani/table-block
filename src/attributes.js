const attributes = {
	blockId: {
		type: 'string',
		default: '12345'
	},
	body: {
		type: 'array',
		default: [
			{
				cells: [
					{ content: '', tag: 'td' },
					{ content: '', tag: 'td' }
				]
			},
			{
				cells: [
					{ content: '', tag: 'td' },
					{ content: '', tag: 'td' }
				]
			}
		]
	}
}

export default attributes;
