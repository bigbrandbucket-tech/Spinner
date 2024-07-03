import SpinningBlocks from "./components/Spinner";

function App() {
  return (
    <div>
      <div className="text-center">
        <div
          className="font-semibold text-[1.4rem] p-2 pb-3"
          style={{
            borderTop: "1px solid white",
            borderBottom: "1px solid white",
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
