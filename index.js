import express, { urlencoded } from 'express'
import cors from 'cors'
import { NFC, TAG_ISO_14443_3, TAG_ISO_14443_4, KEY_TYPE_A, KEY_TYPE_B, TransmitError } from 'nfc-pcsc';


console.log('about to implement nfc packages');

// const nfc = new NFC(console);
let nfc = null;
try {
	nfc = new NFC(console);
} catch (error) {
	console.log(error);
}
console.log('nfc instance declared packages');

const app = express();
app.use(express.json());
app.use(urlencoded({
    extended: false
}));
app.use(cors());

// temp variable
let __reader = null;
let __card = null;

app.get('/read', async(req, res)=>{
	try {

		// reader.read(blockNumber, length, blockSize = 4, packetSize = 16)
		await __reader.authenticate(4, KEY_TYPE_A, 'ffffffffffff')
		const data = await __reader.read(4, 16); // starts reading in block 4, continues to 5 and 6 in order to read 12 bytes
		console.log(`data read`, data);
		let payload = data.toString(); // utf8 is default encoding
		payload = payload.replace(" ", "");
		payload = payload.replace(" ", "");
		payload = payload.replace(" ", "");
		payload = payload.replace(" ", "");
		payload = payload.replace(" ", "");
		payload = payload.replace(" ", "");
		payload = payload.replace(" ", "");
		payload = payload.replace(" ", "");
		payload = payload.replace(" ", "");
		payload = payload.replace(" ", "");
		payload = payload.replace(" ", "");
		payload = payload.replace(" ", "");
		payload = payload.replace(" ", "");
		payload = payload.replace(" ", "");
		payload = payload.replace(" ", "");
		payload = payload.replace(" ", "");

		// let _new = "";
		// for (let i = 0; i < payload.length; i++) {
		// 	const element = payload[i];
			
		// 	if( /[A-Za-z0-9]/g.test(element) ){
		// 		_new += element;
		// 	}
		// }
		// console.log(_new);

		// console.log(`data converted`, payload);

		return res.json({
			status: true,
			message: "data fetched successfully",
			data: payload,
			card: __card
		})

	} catch (err) {
		console.error(`error when reading data`, err);
	}

	return res.json({
		status: false,
		message: "no card found",
	})
})

// read data from card
app.post('/write', async(req, res)=>{

    try {
		const body = req.body.data;
		const data = Buffer.allocUnsafe(16);
		data.fill(0);
		const text = body;
		data.write(text); // if text is longer than 12 bytes, it will be cut off
		// reader.write(blockNumber, data, blockSize = 4)
		await __reader.authenticate(4, KEY_TYPE_A, 'ffffffffffff');
		await __reader.write(4, data, 16); // starts writing in block 4, continues to 5 and 6 in order to write 12 bytes
		console.log(`data written`);

		return res.json({
			status: true,
			message: "data written successfully",
			card: __card
		})
	} catch (err) {
		console.error(`error when writing data`, err);
	}

	return res.json({
		status: false,
		message: "no card found",
	})
})

const port = 13252;
app.listen(port, ()=> {
    console.log(`[Server]: I am running at http://localhost:${port}`);
});

// nfc listener

nfc.on('reader', reader => {

	// enable when you want to auto-process ISO 14443-4 tags (standard=TAG_ISO_14443_4)
	// when an ISO 14443-4 is detected, SELECT FILE command with the AID is issued
	// the response is available as card.data in the card event
	// see examples/basic.js line 17 for more info
	// reader.aid = 'F222222222';

    // disable auto processing
    // reader.autoProcessing = false;
    // reader.aid = 'F222222222';

	// const ultralight = new MifareUltralight(reader);

	reader.on('card', async(card) => {

		// card is object containing following data
		// [always] String type: TAG_ISO_14443_3 (standard nfc tags like MIFARE) or TAG_ISO_14443_4 (Android HCE and others)
		// [always] String standard: same as type
		// [only TAG_ISO_14443_3] String uid: tag uid
		// [only TAG_ISO_14443_4] Buffer data: raw data from select APDU response

		console.log(`${reader.reader.name}  card detected`);

		const password = 'FFFFFFFF'; // default password
		const pack = '0000'; // default pack
		// await ultralight.passwordAuthenticate(password, pack);

		// await reader.authenticate(4, KEY_TYPE_A, 'ffffffffffff')
		// await reader.loadAuthenticationKey(0, 'ffffffffffff')
		// await reader.authenticate(4, KEY_TYPE_A, 'ffffffffffff')

        __reader = reader;
        __card = card;

	});

	reader.on('card.off', card => {
		console.log(`${reader.reader.name}  card removed`, card);
	});

	reader.on('error', err => {
		console.log(`${reader.reader.name}  an error occurred`, err);
	});

	reader.on('end', () => {
		console.log(`${reader.reader.name}  device removed`);
	});

});

nfc.on('error', err => {
	console.log('an error occurred', err);
});
