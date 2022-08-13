import Link from 'next/link'
import rps from "../assets/rps.png";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

export const GameList = () => {
  return (
    <>
      <div className="mt-5">
        <div className="row mt-5">
          <div className="col p-5">
            <div className="text-center pb-4">
              <h3>Game List</h3>
            </div>
            <div className="text-center" style={{ paddingBottom: 23 }}>
              <OverlayTrigger
                placement="left-start"
                overlay={<Tooltip>Rock Paper Scissors!</Tooltip>}
              >
                <img src={rps} alt="" width="200" />
              </OverlayTrigger>
            </div>

            <div className="pt-3 d-grid">
              <Link to="/rpsgame" className="btn btn-primary">
                PLAY GAME
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
