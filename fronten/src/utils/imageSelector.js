const fetchImage = (x) => {
	switch (x) {
		case "":
			return null;
		case "about":
			return "/images/doro.jpg";
	}
};

export default fetchImage;
