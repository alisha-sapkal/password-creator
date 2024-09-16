import { useState, useCallback, useEffect, useRef} from "react";

function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [char, setChar] = useState(false);
  const [pass, setPass] = useState("");
  const passRef = useRef(null)

  const passGenerator = useCallback(() => {
    let password = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (number) str += "0123456789";
    if (char) str += "!@#$%^&*-_+=[]{}~`";
    for (let i = 1; i <= length; i++) {
      let ch = Math.floor(Math.random() * str.length + 1);
      password += str.charAt(ch);
    }
    setPass(password);
  }, [length, number, char, setPass])

  const copyPassToClipboard = useCallback(() => {
    passRef.current?.select();
    window.navigator.clipboard.writeText(pass)
  }, [pass])

  useEffect(() => {
    passGenerator()
  }, [length, number, char, passGenerator])

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700">
        <h1 className="text-2xl text-white text-center my-5">Pasword Creator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={pass}
            className="outline-none w-full py-1 px-3"
            placeholder="password"
            readOnly
            ref={passRef}
          />
          <button onClick={copyPassToClipboard} className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0">
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={8}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={number}
              id="numberInput"
              onChange={() => {
                setNumber((password) => !password);
              }}
            />
            <label>Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={char}
              id="charInput"
              onChange={() => {
                setNumber((password) => !password);
              }}
            />
            <label>Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;