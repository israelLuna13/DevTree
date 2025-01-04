import { CSSProperties } from "react";
import ClipLoader from "react-spinners/RingLoader";

const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
  };
  type SpineerProps={
    isLoading:boolean
  }

export default function Spinner({isLoading}:SpineerProps)
{
    //const [loading, setLoading] = useState(true);
    // const [color, setColor] = useState("#");
  
    return (
      <>
        <div className="bg-slate-800 min-h-screen">
         

            <div className="sweet-loading">
              {/* <button onClick={() => setLoading(!loading)}>Toggle Loader</button> */}
              {/* <input value={color} onChange={(input) => setColor(input.target.value)} placeholder="Color of the loader" /> */}

              <ClipLoader
                color={"white"}
                loading={isLoading}
                cssOverride={override}
                size={200}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>

            <div className="text-center mt-10">
              <p className=" font-black text-white uppercase text-xl">
                Please Wait while the next page is displeyed
              </p>
          </div>
        </div>
      </>
    );
}