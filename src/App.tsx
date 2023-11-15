import { SearchPlaceInput } from "./components/SearchPlaceInput/SearchPlaceInput";

function App() {
  return (
    <section
      className={`bg-airpalsGreyBackground flex flex-col items-center justify-center p-5 h-screen w-screen text- [&>h6]:text-md [&>h6]:text-airpalsGreyFont`}
    >
      <h1 className="text-2xl font-bold mb-10">Where are you located?</h1>
      <h2 className="text-1xl font-semibold mb-3">
        So we know where to drop off the stuff
      </h2>
      <h6>We won't share you address</h6>
      <h6>With your ex(or whoever).</h6>
      <SearchPlaceInput />

      <p className="absolute bottom-5 text-xs text-airpalsGreyFont">
        Made with 🤍 by CRS.DEV_
      </p>
    </section>
  );
}

export default App;
