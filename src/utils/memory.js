const featureMemory = new Map();

function createMemory(featureId) {
	const scenarioValues = new Map();
	const featureValues = getFeatureValues(featureId);

	return {
		set(key, value) {
			scenarioValues.set(key, value);
		},

		get(key) {
			return scenarioValues.has(key) ? scenarioValues.get(key) : featureValues.get(key);
		},

		has(key) {
			return scenarioValues.has(key) || featureValues.has(key);
		},

		delete(key) {
			return scenarioValues.delete(key);
		},

		clear() {
			scenarioValues.clear();
		},

		featureSet(key, value) {
			featureValues.set(key, value);
		},

		featureGet(key) {
			return featureValues.get(key);
		},

		featureHas(key) {
			return featureValues.has(key);
		},

		featureDelete(key) {
			return featureValues.delete(key);
		},

		resolve(value) {
			return resolve(value, this);
		},
	};
}

function resolve(value, memory) {
	if (typeof value !== 'string') return value;

	return value.replace(/\$([A-Za-z_][A-Za-z0-9_]*)/g, (placeholder, key) => {
		if (!memory.has(key)) {
			throw new Error(`No value stored for memory key "${key}"`);
		}

		return String(memory.get(key));
	});
}

function getFeatureValues(featureId) {
	if (!featureMemory.has(featureId)) {
		featureMemory.set(featureId, new Map());
	}

	return featureMemory.get(featureId);
}

module.exports = { createMemory, resolve };
