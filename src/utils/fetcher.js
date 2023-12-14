// export const fetcher = (...args) => fetch(...args).then((res) => res.json());

export const fetcher = async (url) => {
	const res = await fetch(url);

	// If the status code is not between 200-299 (both included),
	if (!res.ok) {
		const error = new Error(
			'Une erreur est survenue. Veuillez réessayer plus tard.'
		);
		// Adding info and status for more context.
		error.info = await res.json();
		error.status = res.status;
		throw error;
	}

	return res.json();
};
