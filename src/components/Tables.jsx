import { Table } from "react-bootstrap";

export const Tables = ({ leaderboards }) => {
  return (
    <>
      <div className="row pt-5 pb-5">
        <div className="col-6 offset-3 ps-4 pt-5 pb-5">
          <h3 className="text-center pb-5">Leaderboard</h3>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>UID</th>
                <th>Name</th>
                <th>W / D / L</th>
                <th>Score</th>
              </tr>
            </thead>
            {leaderboards.map((data, index) => (
              <tbody>
                <tr>
                  <td> {index + 1} </td>
                  <td> {data.name} </td>
                  <td>
                    {data.win} / {data.draw} / {data.lose}
                  </td>
                  <td> {data.score} </td>
                </tr>
              </tbody>
            ))}
          </Table>
        </div>
      </div>
    </>
  );
};
