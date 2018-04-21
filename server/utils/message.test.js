const expect = require('expect');
const { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
	it('should generate correct message object', () => {
		const from = 'Raman';
		const text = 'Hey! how are ya'
		const message = generateMessage(from, text);

		expect(message.createdAt).toBeA('number');
		expect(message).toInclude({ from, text });
	});
});

describe('generateLocationMessage', () => {
	it('should generate correct location object', () => {
		const from = 'Vishal';
		const url = 'https://google.com/maps?q=1,1'
		const message = generateLocationMessage(from, 1, 1);

		expect(message.createdAt).toBeA('number');
		expect(message).toInclude({ from, url });
	});
});