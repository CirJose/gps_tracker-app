const hexToDecimal = hex => parseInt(hex, 16);
const decToBinary = dec => (dec).toString(2);

const validationBit = (bit) => {
	let binario = decToBinary(hexToDecimal(bit));
	const tam = binario.length;
	binario = tam < 4 ? "0".repeat(4-tam).concat(binario) : binario;
	const digitos = binario.split('');

	return {
		hemisferio: {
			lat: digitos[1] == 1 ? 'N' : 'S',
			lon: digitos[0] == 1 ? 'E' : 'W'
		},
		valido: digitos[2] == 1 ? 'A' : 'V'
	}

}

module.exports = {
	hexToDecimal,
	validationBit
};
