import SpinningBlocks from "./components/Spinner";

function App() {
  return (
    <div>
      <div className="text-center">
        <div
          className="font-semibold text-[1.4rem] p-2 pb-3"
          style={{
            boxShadow: "0px 2px 4px rgba(255, 255, 255, 0.7)", // Adjust shadow parameters as needed
          }}
        >
          HyperLoot
        </div>
      </div>
      <SpinningBlocks />
    </div>
  );
}

export default App;
