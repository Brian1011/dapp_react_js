function App() {
  return (
    <div className="w-full flex flex-col justify-center mt-4 p-4">
      <h1 className="text-3xl font-bold underline">Greeting</h1>
      <div className="flex flex-row justify-between w-3/4 space-x-2">
        <div>Contract Balance: 0</div>
        <div>
          <div>
            <input
              type="number"
              className="py-2 px-2 border border-gray-500 rounded-md"
            />

            <div className="bg-blue-600 mt-2 text-white rounded-md flex justify-center">
              <div className="py-2 px-2">Deposit</div>
            </div>
          </div>

          <div className="my-8">
            <input
              type="text"
              className="py-2 px-2 border border-gray-500 rounded-md"
            />

            <div className="bg-black mt-2 text-white rounded-md flex justify-center">
              <div className="py-2 px-2">Change</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
