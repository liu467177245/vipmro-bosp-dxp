/**
 * [saveToLocal description]
 * @param  {[string]} key   [键]
 * @param  {[string]} value [值]
 * @return {[type]}       [description]
 */
export function saveToLocal(key, value) {
	var cookieSaas = window.localStorage.__cookieSaas__;
	if (!cookieSaas) {
		cookieSaas = {};
	} else {
		cookieSaas = JSON.parse(cookieSaas);
		if (!cookieSaas[key]) {
			cookieSaas[key] = {};
		}
	}
	cookieSaas[key] = value;
	window.localStorage.__cookieSaas__ = JSON.stringify(cookieSaas);
}

/**
 * [loadFromLocal description]
 * @param  {[string]} key [键]
 * @return {[type]}     [description]
 */
export function loadFromLocal(key) {
	var cookieSaas = window.localStorage.__cookieSaas__;
	if (!cookieSaas) {
		return '';
	}
	cookieSaas = JSON.parse(cookieSaas);
	if (!cookieSaas[key]) {
		return '';
	}
	return cookieSaas[key];
}

/**
 * [description]
 * @param  {[string]} key [键]
 * @return {[type]}     [description]
 */
export function clearLocal(key) {
	var cookieSaas = window.localStorage.__cookieSaas__;
	if (!cookieSaas) {
		return false;
	}
	cookieSaas = JSON.parse(cookieSaas);
	delete cookieSaas[key];
	window.localStorage.__cookieSaas__ = JSON.stringify(cookieSaas);
}
