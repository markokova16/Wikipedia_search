/* eslint-disable react/jsx-no-target-blank */
import { useState } from "react";

function App() {
	const [search, setSearch] = useState("");
	const [results, setResults] = useState([]);
	const [searchInfo, setSearchInfo] = useState({});

	const handleSearch = async (e) => {
		e.preventDefault();
		if (search === "") return;

		const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info=inprop=url&utf8=&format=json&origin=*&srlimit=10&srsearch=${search}`;

		const response = await fetch(endpoint);

		if (!response.ok) {
			throw Error(response.statusText);
		}

		const json = await response.json();
		console.log(json);

		setResults(json.query.search);
		setSearchInfo(json.query.searchinfo);
	};

	return (
		<div
			className=" flex flex-col h-screen
		 w-screen items-center place-content-center bg-black text-white"
		>
			<header className="text-center">
				<h1 className="mb-20 text-center text-8xl font-bold text-red-600">
					Wiki Seeker
				</h1>
				<form
					className="text-center text-black mb-5"
					onSubmit={handleSearch}
				>
					<input
						type="search"
						placeholder="  What are you looking for?"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						className="w-[400px] text-left "
					/>
				</form>
				{searchInfo.totalhits ? (
					<p className="text-gray-500 text-xl">
						Search results: {searchInfo.totalhits}
					</p>
				) : (
					<p className="text-gray-500 text-xl">
						Enter your search query above
					</p>
				)}
			</header>
			<div className="p-4 mt-10 bg-gray-400 text-black rounded-xl">
				{results.map((result, i) => {
					const url = `https:/en.wikipedia.org/?curid=${result.pageid}`;
					return (
						<div key={i}>
							<h3 className="mb-3 text-4xl font-bold text-center border-4 border-black">
								{result.title}
							</h3>
							<p
								dangerouslySetInnerHTML={{
									__html: result.snippet,
								}}
								className="mb-2"
							></p>
							<button className="bg-purple-500 hover:bg-pink-300 rounded-full w-24 mb-2">
								<a href={url} target="_blank" rel="nofollow">
									Read More
								</a>
							</button>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default App;
